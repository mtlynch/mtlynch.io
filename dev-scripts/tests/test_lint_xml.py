import os
from pathlib import Path
import subprocess
import tempfile
import unittest


SCRIPT = Path(__file__).resolve().parents[1] / "lint-xml"


class LintXmlTests(unittest.TestCase):
    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()
        self.root = Path(self.temp_dir.name)
        self.site = self.root / "site output"
        self.site.mkdir()
        (self.root / "public").symlink_to(self.site, target_is_directory=True)
        self.bin = self.root / "bin"
        self.bin.mkdir()
        self.log = self.root / "xmllint.log"
        self.xmllint = self.bin / "xmllint"
        self.xmllint.write_text(
            "#!/usr/bin/env python3\n"
            "import os, sys\n"
            "with open(os.environ['XML_LOG'], 'a') as log:\n"
            "    log.write(sys.argv[-1] + '\\n')\n"
            "sys.exit(int(os.environ.get('XML_EXIT', '0')))\n"
        )
        self.xmllint.chmod(0o755)

    def tearDown(self):
        self.temp_dir.cleanup()

    def run_script(self, **extra_env):
        env = os.environ.copy()
        env.update({
            "PATH": f"{self.bin}:{env['PATH']}",
            "XML_LOG": str(self.log),
            **extra_env,
        })
        return subprocess.run(
            [str(SCRIPT)], cwd=self.root, env=env, text=True,
            stdout=subprocess.PIPE, stderr=subprocess.PIPE,
        )

    def test_lints_xml_under_symlinked_public_including_spaces(self):
        files = [self.site / "one.xml", self.site / "a directory" / "two file.xml"]
        files[1].parent.mkdir()
        for path in files:
            path.write_text("<root />")

        result = self.run_script()

        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(
            set(self.log.read_text().splitlines()),
            {str(Path("public") / path.relative_to(self.site)) for path in files},
        )

    def test_xmllint_failure_propagates(self):
        (self.site / "bad.xml").write_text("<bad>")

        result = self.run_script(XML_EXIT="7")

        self.assertEqual(result.returncode, 7, result.stderr)

    def test_missing_public_fails(self):
        (self.root / "public").unlink()

        result = self.run_script()

        self.assertNotEqual(result.returncode, 0)
        self.assertIn("public", result.stderr)


if __name__ == "__main__":
    unittest.main()
