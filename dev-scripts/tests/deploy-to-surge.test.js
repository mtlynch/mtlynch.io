const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");

const script = path.resolve(__dirname, "../deploy-to-surge");
const projectArgs = ["--project", "./public", "--domain", "https://mtlynch.io"];

function fixture(t, { repository = true } = {}) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "deploy-to-surge-"));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  const bin = path.join(directory, "bin");
  const calls = path.join(directory, "surge-call.json");
  fs.mkdirSync(bin);
  fs.writeFileSync(
    path.join(bin, "surge"),
    `#!/usr/bin/env node
const fs = require("node:fs");
fs.writeFileSync(process.env.SURGE_TEST_CALLS, JSON.stringify(process.argv.slice(2)));
process.exit(Number(process.env.SURGE_TEST_EXIT_CODE || 0));
`,
    { mode: 0o755 },
  );

  function git(...args) {
    const result = spawnSync("git", args, {
      cwd: directory,
      encoding: "utf8",
    });
    assert.equal(result.status, 0, result.stderr);
    return result.stdout.trim();
  }

  if (repository) {
    git("init", "--quiet", "--initial-branch=master");
    git("config", "user.name", "Deployment test");
    git("config", "user.email", "deployment-test@example.invalid");
    git(
      "-c",
      "core.hooksPath=/dev/null",
      "commit",
      "--no-gpg-sign",
      "--allow-empty",
      "--quiet",
      "--message",
      "Test fixture",
    );
  }

  function deploy(args = [], overrides = {}) {
    const env = {
      ...process.env,
      PATH: `${bin}${path.delimiter}${process.env.PATH}`,
      SURGE_TOKEN: "test-only-token",
      SURGE_TEST_CALLS: calls,
    };
    delete env.CIRCLE_BRANCH;
    delete env.CIRCLE_SHA1;
    delete env.SURGE_TEST_EXIT_CODE;
    for (const [key, value] of Object.entries(overrides)) {
      if (value === undefined) {
        delete env[key];
      } else {
        env[key] = value;
      }
    }
    return spawnSync(script, args, {
      cwd: directory,
      env,
      encoding: "utf8",
    });
  }

  return {
    git,
    deploy,
    called: () => fs.existsSync(calls),
    args: () => JSON.parse(fs.readFileSync(calls, "utf8")),
  };
}

test("local master deploys to production", (t) => {
  const f = fixture(t);
  const result = f.deploy();
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(f.args(), projectArgs);
});

test("local feature branches deploy previews with Git revision metadata", (t) => {
  const f = fixture(t);
  f.git("switch", "--quiet", "--create", "feature/surge");
  const commit = f.git("rev-parse", "HEAD");
  const result = f.deploy([], {
    CIRCLE_BRANCH: "master",
    CIRCLE_SHA1: "not-the-local-commit",
  });
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(f.args(), [
    ...projectArgs,
    "--preview",
    "--message",
    `feature/surge at ${commit}`,
  ]);
});

test("automatic mode rejects detached HEAD before calling Surge", (t) => {
  const f = fixture(t);
  f.git("switch", "--quiet", "--detach");
  const result = f.deploy();
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /detached HEAD/i);
  assert.equal(f.called(), false);
});

test("automatic mode rejects a missing Git repository", (t) => {
  const f = fixture(t, { repository: false });
  const result = f.deploy();
  assert.notEqual(result.status, 0);
  assert.equal(f.called(), false);
});

test("explicit preview works without a checkout and preserves message quoting", (t) => {
  const f = fixture(t, { repository: false });
  const message = "feature/a b;$(false) at abc123";
  const result = f.deploy(["--preview", "--message", message]);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(f.args(), [
    ...projectArgs,
    "--preview",
    "--message",
    message,
  ]);
});

test("explicit preview does not require a revision message", (t) => {
  const f = fixture(t, { repository: false });
  const result = f.deploy(["--preview"]);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(f.args(), [...projectArgs, "--preview"]);
});

test("explicit production works without a checkout", (t) => {
  const f = fixture(t, { repository: false });
  const result = f.deploy(["--production"]);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(f.args(), projectArgs);
});

for (const args of [
  ["--prod"],
  ["unexpected"],
  ["--preview", "--production"],
  ["--production", "--preview"],
  ["--preview", "--preview"],
  ["--production", "--production"],
  ["--message"],
  ["--message", ""],
  ["--preview", "--message", "first", "--message", "second"],
  ["--production", "--message", "preview only"],
]) {
  test(`reject invalid arguments: ${JSON.stringify(args)}`, (t) => {
    const f = fixture(t, { repository: false });
    const result = f.deploy(args);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Usage:/);
    assert.equal(f.called(), false);
  });
}

for (const token of [undefined, ""]) {
  test(`reject ${token === undefined ? "missing" : "empty"} token`, (t) => {
    const f = fixture(t, { repository: false });
    const result = f.deploy(["--production"], { SURGE_TOKEN: token });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /SURGE_TOKEN must be set/);
    assert.equal(f.called(), false);
  });
}

test("Surge failures propagate to the caller", (t) => {
  const f = fixture(t, { repository: false });
  const result = f.deploy(["--production"], { SURGE_TEST_EXIT_CODE: "42" });
  assert.equal(result.status, 42);
});

test("help needs neither credentials nor a checkout", (t) => {
  const f = fixture(t, { repository: false });
  const result = f.deploy(["--help"], { SURGE_TOKEN: undefined });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Usage:/);
  assert.equal(f.called(), false);
});
