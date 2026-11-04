#!/usr/bin/env python3
"""Integration tests for URL extraction, Nix caching, and local HTML checks.

Run with `nix develop --command python3 dev-scripts/test-link-checks.py`.
Only a local HTTP fixture is contacted; no public websites are checked.
"""

import http.server
import json
from pathlib import Path
import shutil
import subprocess
import tempfile
import threading
import unittest
import uuid


ROOT = Path(__file__).resolve().parent.parent


class LinkChecks(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.requests = []
        cls.run_id = uuid.uuid4().hex
        # Resolve the locked inputs once rather than snapshotting the site's
        # source tree for every small fixture build.
        inputs = subprocess.run(
            [
                "nix", "eval", "--impure", "--json", "--expr",
                f"""let flake = builtins.getFlake "git+file://{ROOT}"; in {{
                  pkgs = flake.inputs.hugo-nixpkgs.outPath;
                  lycheePkgs = flake.inputs.lychee-nixpkgs.outPath;
                }}""",
            ],
            text=True, capture_output=True, check=True, timeout=300,
        )
        cls.inputs = json.loads(inputs.stdout)

        class Handler(http.server.BaseHTTPRequestHandler):
            def do_GET(self):
                cls.requests.append(self.path)
                self.send_response(404 if self.path == "/missing" else 200)
                self.send_header("Content-Type", "text/html")
                self.end_headers()
                self.wfile.write(b'<a href="/must-not-crawl">not an input</a>')

            def log_message(self, *_args):
                pass

        cls.server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), Handler)
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()
        cls.url = f"http://127.0.0.1:{cls.server.server_port}"

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()
        cls.thread.join()

    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix="link-checks-")
        self.addCleanup(self.temp.cleanup)
        self.directory = Path(self.temp.name)
        self.src = self.directory / "src"
        self.src.mkdir()
        self.config = self.directory / "lychee.toml"
        self.config.write_text(
            'no_progress = true\nmax_retries = 0\nexclude_loopback = false\n'
        )
        self.check_script = ROOT / "dev-scripts/check-external-links"

    def nix_build(self, attribute, *, refresh="test", checker_variant=False, success=True):
        # All fixture data is outside the checkout. The production module is used
        # unchanged, including its network-enabled fixed-output derivation.
        expression = f"""
          let
            pkgs = import {self.inputs["pkgs"]} {{ system = "x86_64-linux"; }};
            lycheePkgs = import {self.inputs["lycheePkgs"]} {{ system = "x86_64-linux"; }};
          in (import {ROOT}/nix/external-links.nix {{
            inherit pkgs;
            lychee = if {str(checker_variant).lower()} then pkgs.symlinkJoin {{
              name = "lychee-identity-fixture";
              paths = [lycheePkgs.lychee];
            }} else lycheePkgs.lychee;
            src = builtins.path {{ path = {self.src}; name = "markdown-fixture"; }};
            config = {self.config};
            extractScript = {ROOT}/dev-scripts/extract-external-links;
            checkScript = {self.check_script};
            refresh = {json.dumps(f"{self.run_id}:{refresh}")};
          }}).{attribute}
        """
        result = subprocess.run(
            [
                "nix", "build", "--impure", "--no-link", "--print-out-paths",
                "--expr", expression,
            ],
            text=True,
            capture_output=True,
            timeout=300,
        )
        if success:
            self.assertEqual(result.returncode, 0, result.stderr)
            return Path(result.stdout.strip())
        self.assertNotEqual(result.returncode, 0, result.stdout)
        return result

    def test_external_cache_identity_and_failures(self):
        markdown = self.src / "README.md"
        markdown.write_text(
            f"[one]({self.url}/one)\n[duplicate]({self.url}/one)\n"
            "[local](/page/)\n[self](https://mtlynch.io/page/)\n"
        )
        nested = self.src / "nested"
        nested.mkdir()
        (nested / "page.md").write_text(f"[two]({self.url}/two)\n")
        urls = self.nix_build("urls")
        self.assertEqual(urls.read_text(), f"{self.url}/one\n{self.url}/two\n")

        self.requests.clear()
        first = self.nix_build("check")
        self.assertCountEqual(self.requests, ["/one", "/two"])
        self.assertNotIn("/must-not-crawl", self.requests)
        self.assertEqual(json.loads(first.read_text())["urls"], urls.read_text())

        # Same URL set despite prose, order, and duplicate changes: no requests.
        markdown.write_text(f"New prose.\n[one]({self.url}/one)\n")
        self.requests.clear()
        self.assertEqual(self.nix_build("check"), first)
        self.assertEqual(self.requests, [])

        markdown.write_text(f"[one]({self.url}/one)\n[new]({self.url}/three)\n")
        added = self.nix_build("check")
        self.assertNotEqual(added, first)
        self.assertCountEqual(self.requests, ["/one", "/two", "/three"])

        self.config.write_text(self.config.read_text() + "timeout = 2\n")
        changed_config = self.nix_build("check")
        self.assertNotEqual(changed_config, added)
        refreshed = self.nix_build("check", refresh="next")
        self.assertNotEqual(refreshed, changed_config)
        self.check_script = self.directory / "check-external-links"
        self.check_script.write_text(
            (ROOT / "dev-scripts/check-external-links").read_text() + "\n# policy change\n"
        )
        changed_script = self.nix_build("check", refresh="next")
        self.assertNotEqual(changed_script, refreshed)
        self.assertNotEqual(
            self.nix_build("check", refresh="next", checker_variant=True), changed_script
        )

        markdown.write_text(f"[broken]({self.url}/missing)\n")
        self.requests.clear()
        self.nix_build("check", success=False)
        self.assertIn("/missing", self.requests)
        self.requests.clear()
        self.nix_build("check", success=False)
        self.assertIn("/missing", self.requests)

    def test_empty_url_list(self):
        (self.src / "README.md").write_text("No external links.\n")
        self.requests.clear()
        self.assertEqual(json.loads(self.nix_build("check").read_text())["urls"], "")
        self.assertEqual(self.requests, [])

    def test_extraction_failure_is_not_an_empty_success(self):
        (self.src / "README.md").write_text("No external links.\n")
        self.config.write_text("not valid TOML = [\n")
        self.nix_build("urls", success=False)

    def test_shipped_external_config(self):
        (self.src / "README.md").write_text(
            "[normal](https://www.rust-lang.org/)\n"
            "[excluded host](https://github.com/lycheeverse/lychee)\n"
            "[excluded asset](https://www.rust-lang.org/test.png)\n"
            "[self](https://mtlynch.io/about/)\n"
            "[excluded Reddit](https://www.reddit.com/r/programming/)\n"
            "[old Reddit remains checked](https://old.reddit.com/r/programming/)\n"
        )
        self.config = ROOT / "lychee.toml"
        self.requests.clear()
        self.assertEqual(
            self.nix_build("urls").read_text(),
            "https://old.reddit.com/r/programming/\nhttps://www.rust-lang.org/\n",
        )
        self.assertEqual(self.requests, [])

    def test_local_html_links_fragments_and_assets(self):
        shutil.copy(ROOT / "lychee-local.toml", self.directory)
        public = self.directory / "public"
        public.mkdir()
        (public / "asset.png").write_bytes(b"asset")
        (public / "index.html").write_text(
            '<a href="/target/#exists">relative</a>'
            '<a href="https://mtlynch.io/target/#exists">absolute</a>'
            '<a href="https://not-a-real-host.invalid/">offline</a>'
            '<img src="/asset.png">'
        )
        target = public / "target"
        target.mkdir()
        page = target / "index.html"
        page.write_text('<div id="exists">target</div>')

        def check(success):
            result = subprocess.run(
                ["bash", str(ROOT / "dev-scripts/lint-html")],
                cwd=self.directory, text=True, capture_output=True,
                timeout=60,
            )
            self.assertEqual(result.returncode == 0, success, result.stdout + result.stderr)

        check(True)
        (public / "asset.png").unlink()
        check(False)
        (public / "asset.png").write_bytes(b"asset")
        (public / "index.html").write_text(
            '<a href="https://mtlynch.io/target/#exists">absolute only</a>'
        )
        page.write_text("No matching fragment")
        check(False)
        page.unlink()
        check(False)


if __name__ == "__main__":
    unittest.main()
