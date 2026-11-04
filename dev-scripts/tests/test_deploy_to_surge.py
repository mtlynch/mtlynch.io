#!/usr/bin/env python3

"""Exercise the real deployment script without Nix or contacting Surge."""

import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest


ROOT = Path(__file__).resolve().parents[2]
SCRIPT = ROOT / "dev-scripts" / "deploy-to-surge"


class DeployToSurgeTest(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name)
        self.bin = self.root / "bin"
        self.bin.mkdir()
        self.production = self.site("production site")
        self.preview = self.site("preview site")
        self.public = self.site("public")
        self.log = self.root / "surge.json"
        self.mock(
            "git",
            """
assert os.getcwd() == os.environ['TEST_CHECKOUT'], 'Git queried after chdir'
if os.environ.get('TEST_NO_GIT'):
    sys.exit('Git must not be called')
if sys.argv[1:] == ['branch', '--show-current']:
    print(os.environ['TEST_BRANCH'])
elif sys.argv[1:] == ['rev-parse', 'HEAD']:
    if os.environ.get('TEST_NO_SHA'):
        sys.exit('Git SHA must not be queried')
    print('local-sha')
else:
    sys.exit('Unexpected Git arguments: ' + repr(sys.argv))
""",
        )
        self.mock(
            "surge",
            """
project = sys.argv[sys.argv.index('--project') + 1]
with open(os.path.join(project, 'index.html')) as site:
    content = site.read()
with open(os.environ['TEST_LOG'], 'w') as output:
    json.dump({'args': sys.argv[1:], 'content': content,
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
            SURGE_TOKEN="test-token",
            TEST_LOG=str(self.log),
            TEST_CHECKOUT=str(self.root),
            TEST_BRANCH="local-feature",
        )

    def site(self, name):
        directory = self.root / name
        directory.mkdir()
        index = directory / "index.html"
        index.write_text(name)
        index.chmod(0o444)
        directory.chmod(0o555)
        return directory

    def mock(self, name, body):
        executable = self.bin / name
        executable.write_text(f"#!{sys.executable}\nimport json, os, sys\n" + body)
        executable.chmod(0o755)

    def run_deploy(self, *args, directories=True, **env):
        self.log.unlink(missing_ok=True)
        before = sorted(self.root.iterdir())
        directory_args = (
            ["--production-dir", str(self.production), "--preview-dir", str(self.preview)]
            if directories
            else []
        )
        result = subprocess.run(
            [str(SCRIPT), *directory_args, *args],
            cwd=self.root,
            env={**self.env, **env},
            text=True,
            capture_output=True,
        )
        self.assertEqual(
            sorted(path for path in self.root.iterdir() if path != self.log), before
        )
        return result

    def assert_deployed(self, result, preview, message=None, project=None):
        self.assertEqual(result.returncode, 0, result.stderr)
        deployed = json.loads(self.log.read_text())
        if project is None:
            project = str(self.preview if preview else self.production)
        expected = ["--project", project, "--domain", "https://mtlynch.io"]
        if preview:
            expected += ["--preview"]
        if message is not None:
            expected += ["--message", message]
        self.assertEqual(deployed["args"], expected)
        self.assertEqual(deployed["content"], Path(project).name)
        self.assertEqual(deployed["cwd"], str(self.root))
        self.assertFalse(self.public.is_symlink())

    def assert_rejected(self, result, error="Usage:"):
        self.assertNotEqual(result.returncode, 0)
        self.assertIn(error, result.stderr)
        self.assertFalse(self.log.exists())

    def test_ci_master(self):
        self.assert_deployed(
            self.run_deploy(NIX_CI_GIT_BRANCH="master", TEST_NO_GIT="1"), False
        )

    def test_ci_preview(self):
        self.assert_deployed(
            self.run_deploy(
                NIX_CI_GIT_BRANCH="feature/a branch",
                NIX_CI_GIT_COMMIT_SHA="ci sha with spaces",
                TEST_NO_GIT="1",
            ),
            True,
            "feature/a branch at ci sha with spaces",
        )

    def test_local_branch_selection(self):
        self.assert_deployed(self.run_deploy(TEST_BRANCH="master"), False)
        self.assert_deployed(self.run_deploy(), True, "local-feature at local-sha")

    def test_empty_ci_branch_uses_git(self):
        self.assert_deployed(
            self.run_deploy(NIX_CI_GIT_BRANCH="", NIX_CI_GIT_COMMIT_SHA="unused"),
            True,
            "local-feature at local-sha",
        )

    def test_explicit_modes_override_branch(self):
        self.assert_deployed(
            self.run_deploy(
                "--production", NIX_CI_GIT_BRANCH="feature", TEST_NO_GIT="1"
            ),
            False,
        )
        self.assert_deployed(
            self.run_deploy(
                "--preview", "--message", "Manual preview",
                NIX_CI_GIT_BRANCH="master", TEST_NO_GIT="1",
            ),
            True,
            "Manual preview",
        )

    def test_explicit_preview_needs_no_metadata(self):
        self.assert_deployed(self.run_deploy("--preview", TEST_NO_GIT="1"), True)

    def test_auto_preview_custom_message(self):
        self.assert_deployed(
            self.run_deploy("--message", "Custom message", TEST_NO_SHA="1"),
            True,
            "Custom message",
        )
        self.assert_deployed(
            self.run_deploy(
                "--message", "CI custom message",
                NIX_CI_GIT_BRANCH="feature", TEST_NO_GIT="1",
            ),
            True,
            "CI custom message",
        )

    def test_detached_checkout(self):
        self.assert_rejected(self.run_deploy(TEST_BRANCH=""), "detached HEAD")
        self.assert_deployed(self.run_deploy("--preview", TEST_BRANCH=""), True)
        self.assert_deployed(self.run_deploy("--production", TEST_BRANCH=""), False)

    def test_missing_token(self):
        self.assert_rejected(
            self.run_deploy("--production", SURGE_TOKEN="", TEST_NO_GIT="1"),
            "SURGE_TOKEN must be set",
        )

    def test_missing_ci_commit(self):
        for commit in (None, ""):
            with self.subTest(commit=commit):
                env = {} if commit is None else {"NIX_CI_GIT_COMMIT_SHA": commit}
                self.assert_rejected(
                    self.run_deploy(
                        NIX_CI_GIT_BRANCH="feature", TEST_NO_GIT="1", **env
                    ),
                    "NIX_CI_GIT_COMMIT_SHA must be set",
                )

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
        for args in (("--production",), ()):
            with self.subTest(args=args):
                self.assert_rejected(
                    self.run_deploy(
                        *args, "--message", "Not a preview", TEST_BRANCH="master"
                    ),
                    "only supported for previews",
                )

    def test_default_public_directory(self):
        for mode in ("--production", "--preview"):
            with self.subTest(mode=mode):
                self.assert_deployed(
                    self.run_deploy(mode, directories=False, TEST_NO_GIT="1"),
                    mode == "--preview",
                    project="./public",
                )

    def test_directory_flags_are_order_independent(self):
        for mode in ("--production", "--preview"):
            for args in (
                (mode, "--preview-dir", str(self.preview),
                 "--production-dir", str(self.production)),
                ("--production-dir", str(self.production), mode,
                 "--preview-dir", str(self.preview)),
            ):
                with self.subTest(args=args):
                    self.assert_deployed(
                        self.run_deploy(*args, directories=False, TEST_NO_GIT="1"),
                        mode == "--preview",
                    )

    def test_message_before_mode(self):
        self.assert_deployed(
            self.run_deploy("--message", "Custom message", "--preview", TEST_NO_GIT="1"),
            True,
            "Custom message",
        )

    def test_one_directory_override_preserves_other_default(self):
        for mode, option, directory in (
            ("--preview", "--production-dir", self.production),
            ("--production", "--preview-dir", self.preview),
        ):
            with self.subTest(mode=mode):
                self.assert_deployed(
                    self.run_deploy(mode, option, str(directory), directories=False),
                    mode == "--preview",
                    project="./public",
                )

    def test_unknown_arguments(self):
        for argument in ("--unknown", "unexpected", "--preview=yes"):
            with self.subTest(argument=argument):
                self.assert_rejected(self.run_deploy(argument, TEST_NO_GIT="1"))

    def test_missing_or_empty_option_values(self):
        for option in ("--message", "--production-dir", "--preview-dir"):
            for values in ((), ("",), ("--preview",)):
                with self.subTest(option=option, values=values):
                    self.assert_rejected(
                        self.run_deploy(option, *values, TEST_NO_GIT="1")
                    )

    def test_conflicting_or_duplicate_modes(self):
        for first in ("--production", "--preview"):
            for second in ("--production", "--preview"):
                with self.subTest(first=first, second=second):
                    self.assert_rejected(
                        self.run_deploy(first, second, TEST_NO_GIT="1")
                    )


if __name__ == "__main__":
    unittest.main()
