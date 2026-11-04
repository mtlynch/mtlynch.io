#!/usr/bin/env python3

"""Exercise the flake's deployment wrapper without contacting Surge."""

import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest


ROOT = Path(__file__).resolve().parents[2]


class DeployToSurgeTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        wrapper = subprocess.check_output(
            ["nix", "eval", "--raw", ".#deploy-to-surge.text"], cwd=ROOT, text=True
        )
        # Only replace dependency resolution, so fake git and surge exercise the
        # generated wrapper and the real deployment script without publishing.
        lines = wrapper.splitlines()
        path_exports = [line for line in lines if line.startswith("export PATH=")]
        if len(path_exports) != 1:
            raise AssertionError("Expected one runtime PATH export in the wrapper")
        cls.wrapper = "\n".join(line for line in lines if line not in path_exports)

    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name)
        self.bin = self.root / "bin"
        self.bin.mkdir()
        self.work = self.root / "work"
        self.work.mkdir()
        self.log = self.root / "surge.json"
        self.script = self.root / "deploy"
        self.script.write_text(self.wrapper)
        self.mock(
            "git",
            """
assert os.getcwd() == os.environ['TEST_CHECKOUT'], 'Git queried after chdir'
if os.environ.get('TEST_NO_GIT'):
    sys.exit('Git must not be called')
if sys.argv[1:] == ['branch', '--show-current']:
    print(os.environ['TEST_BRANCH'])
elif sys.argv[1:] == ['rev-parse', 'HEAD']:
    print('local-sha')
else:
    sys.exit('Unexpected Git arguments: ' + repr(sys.argv))
""",
        )
        self.mock(
            "surge",
            """
with open(os.environ['TEST_LOG'], 'w') as output:
    json.dump({'args': sys.argv[1:], 'site': os.readlink('public'),
               'cwd': os.getcwd()}, output)
sys.exit(int(os.environ.get('TEST_SURGE_EXIT', '0')))
""",
        )
        self.env = {
            key: value
            for key, value in os.environ.items()
            if not key.startswith("NIX_CI_") and key != "SURGE_TOKEN"
        }
        self.env.update(
            PATH=f"{self.bin}:{os.environ['PATH']}",
            TMPDIR=str(self.work),
            SURGE_TOKEN="test-token",
            TEST_LOG=str(self.log),
            TEST_CHECKOUT=str(self.root),
            TEST_BRANCH="local-feature",
        )

    def mock(self, name, body):
        executable = self.bin / name
        executable.write_text(f"#!{sys.executable}\nimport json, os, sys\n" + body)
        executable.chmod(0o755)

    def run_deploy(self, *args, **env):
        result = subprocess.run(
            ["bash", str(self.script), *args],
            cwd=self.root,
            env={**self.env, **env},
            text=True,
            capture_output=True,
        )
        self.assertEqual(list(self.work.iterdir()), [], "Temporary site not removed")
        return result

    def assert_deployed(self, result, preview, message=None):
        self.assertEqual(result.returncode, 0, result.stderr)
        deployed = json.loads(self.log.read_text())
        expected = ["--project", "./public", "--domain", "https://mtlynch.io"]
        if preview:
            expected += ["--preview"]
        if message is not None:
            expected += ["--message", message]
        self.assertEqual(deployed["args"], expected)
        suffix = "-preview-site-0.0.0" if preview else "-site-0.0.0"
        self.assertTrue(deployed["site"].endswith(suffix), deployed["site"])
        self.assertFalse(Path(deployed["cwd"]).exists())

    def test_ci_master(self):
        self.assert_deployed(
            self.run_deploy(NIX_CI_GIT_BRANCH="master", TEST_NO_GIT="1"), False
        )

    def test_ci_preview(self):
        self.assert_deployed(
            self.run_deploy(
                NIX_CI_GIT_BRANCH="feature/a branch",
                NIX_CI_GIT_COMMIT_SHA="ci-sha",
                TEST_NO_GIT="1",
            ),
            True,
            "feature/a branch at ci-sha",
        )

    def test_local_branch_selection(self):
        self.assert_deployed(self.run_deploy(TEST_BRANCH="master"), False)
        self.assert_deployed(
            self.run_deploy(), True, "local-feature at local-sha"
        )

    def test_explicit_modes_override_branch(self):
        self.assert_deployed(
            self.run_deploy("--production", NIX_CI_GIT_BRANCH="feature"), False
        )
        self.assert_deployed(
            self.run_deploy(
                "--preview", "--message", "Manual preview", NIX_CI_GIT_BRANCH="master"
            ),
            True,
            "Manual preview",
        )

    def test_auto_preview_custom_message(self):
        self.assert_deployed(
            self.run_deploy("--message", "Custom message"), True, "Custom message"
        )

    def test_detached_checkout(self):
        result = self.run_deploy(TEST_BRANCH="")
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("Detached HEAD", result.stderr)
        self.assertFalse(self.log.exists())
        self.assert_deployed(self.run_deploy("--preview", TEST_BRANCH=""), True)

    def test_missing_token(self):
        result = self.run_deploy("--production", SURGE_TOKEN="")
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("SURGE_TOKEN must be set", result.stderr)
        self.assertFalse(self.log.exists())

    def test_missing_ci_commit(self):
        result = self.run_deploy(NIX_CI_GIT_BRANCH="feature", TEST_NO_GIT="1")
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("NIX_CI_GIT_COMMIT_SHA must be set", result.stderr)
        self.assertFalse(self.log.exists())

    def test_surge_failure(self):
        result = self.run_deploy("--production", TEST_SURGE_EXIT="42")
        self.assertEqual(result.returncode, 42)
        self.assertTrue(self.log.exists())

    def test_help_without_checkout_or_token(self):
        result = self.run_deploy("--help", TEST_NO_GIT="1", SURGE_TOKEN="")
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn("Usage:", result.stdout)
        self.assertFalse(self.log.exists())

    def test_invalid_production_message(self):
        result = self.run_deploy("--production", "--message", "Not a preview")
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("only supported for previews", result.stderr)
        self.assertFalse(self.log.exists())


if __name__ == "__main__":
    unittest.main()
