#!/usr/bin/env python3
"""Regression tests for build-all-flake-targets using a fake nix executable."""

import os
import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest


SCRIPTS_DIR = Path(__file__).resolve().parent.parent


class BuildAllFlakeTargetsTest(unittest.TestCase):
    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp_dir.cleanup)
        self.repo = Path(self.temp_dir.name) / "repo"
        scripts = self.repo / "dev-scripts"
        scripts.mkdir(parents=True)
        for name in ("build-all-flake-targets", "upload-to-nixci-cache"):
            shutil.copy2(SCRIPTS_DIR / name, scripts / name)

        self.bin_dir = Path(self.temp_dir.name) / "bin"
        self.bin_dir.mkdir()
        self.log = Path(self.temp_dir.name) / "nix.log"
        self.responses = Path(self.temp_dir.name) / "responses"
        self.responses.mkdir()
        self.nix = self.bin_dir / "nix"
        self.nix.write_text(
            f"#!{sys.executable}\n"
            "import json, os, pathlib, sys\n"
            "args = sys.argv[1:]\n"
            "with open(os.environ['NIX_LOG'], 'a') as log:\n"
            "    log.write(json.dumps(args) + '\\n')\n"
            "kind = ('system' if args[:2] == ['eval', '--raw'] and '--expr' in args\n"
            "        else 'targets' if args[:2] == ['eval', '--raw']\n"
            "        else 'build' if args[0] == 'build' else 'copy' if args[0] == 'copy' else 'other')\n"
            "response = pathlib.Path(os.environ['NIX_RESPONSES']) / kind\n"
            "if response.with_suffix('.status').exists():\n"
            "    status = int(response.with_suffix('.status').read_text())\n"
            "    if status: sys.exit(status)\n"
            "if response.exists(): sys.stdout.write(response.read_text())\n"
        )
        self.nix.chmod(0o755)
        self.env = os.environ.copy()
        self.env["PATH"] = f"{self.bin_dir}{os.pathsep}{self.env['PATH']}"
        self.env["NIX_LOG"] = str(self.log)
        self.env["NIX_RESPONSES"] = str(self.responses)

    def respond(self, kind, output):
        (self.responses / kind).write_text(output)

    def fail_command(self, kind, status=17):
        (self.responses / f"{kind}.status").write_text(str(status))

    def run_script(self, script):
        return subprocess.run(
            [str(self.repo / "dev-scripts" / script)],
            env=self.env,
            text=True,
            capture_output=True,
            check=False,
        )

    def log_lines(self):
        return self.log.read_text().splitlines() if self.log.exists() else []

    def test_enumerates_builds_and_uploads_preserving_paths(self):
        self.respond("system", "x86_64-linux")
        self.respond("targets", "alpha\nwith space\n")
        self.respond("build", "/nix/store/first output\n/nix/store/second\n")

        result = self.run_script("build-all-flake-targets")

        self.assertEqual(result.returncode, 0, result.stderr)
        lines = [json.loads(line) for line in self.log_lines()]
        self.assertEqual(len(lines), 4)
        self.assertEqual(lines[0], ["eval", "--raw", "--impure", "--expr", "builtins.currentSystem"])
        self.assertEqual(lines[1], [
            "eval", "--raw", ".#packages.x86_64-linux", "--apply",
            'packages: builtins.concatStringsSep "\\n" (builtins.attrNames packages)',
        ])
        self.assertEqual(lines[2], ["build", "--print-out-paths", ".#alpha", ".#with space"])
        self.assertEqual(
            lines[3],
            ["copy", "/nix/store/first output", "/nix/store/second", "--to",
             "https://cache.nix-ci.com?compression=xz&parallel-compression=true"],
        )

    def test_target_enumeration_failure_does_not_build_or_upload(self):
        self.respond("system", "x86_64-linux")
        self.fail_command("targets")

        result = self.run_script("build-all-flake-targets")

        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(len(self.log_lines()), 2)

    def test_build_failure_does_not_upload(self):
        self.respond("system", "x86_64-linux")
        self.respond("targets", "alpha\n")
        self.fail_command("build")

        result = self.run_script("build-all-flake-targets")

        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(len(self.log_lines()), 3)

    def test_upload_failure_propagates(self):
        self.respond("system", "x86_64-linux")
        self.respond("targets", "alpha\n")
        self.respond("build", "/nix/store/output\n")
        self.fail_command("copy", 23)

        result = self.run_script("build-all-flake-targets")

        self.assertEqual(result.returncode, 23)
        self.assertEqual(json.loads(self.log_lines()[-1])[0], "copy")

    def test_system_evaluation_failure_propagates(self):
        self.fail_command("system", 19)

        result = self.run_script("build-all-flake-targets")

        self.assertEqual(result.returncode, 19)
        self.assertEqual(len(self.log_lines()), 1)


if __name__ == "__main__":
    unittest.main()
