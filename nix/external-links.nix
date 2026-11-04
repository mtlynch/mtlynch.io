{
  pkgs,
  lychee,
  src,
  config,
  extractScript,
  checkScript,
  # Bump this value to recheck an otherwise unchanged URL list.
  refresh,
}: let
  urls =
    pkgs.runCommand "external-urls.txt" {
      inherit src;
      nativeBuildInputs = [pkgs.bash pkgs.coreutils lychee];
      # lychee constructs a TLS client even in offline dump mode.
      SSL_CERT_FILE = "${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt";
    } ''
      cd "$src"
      bash ${extractScript} ${config} > "$out"
    '';

  runner = pkgs.writeShellApplication {
    name = "run-external-link-check";
    runtimeInputs = [pkgs.bash lychee];
    text = ''
      export SSL_CERT_FILE=${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt
      exec bash ${checkScript} ${config} "$1"
    '';
  };

  # Reading the generated list is intentional import-from-derivation: source
  # changes may rebuild extraction, but only list/policy changes invalidate checks.
  manifestText = builtins.toJSON {
    urls = builtins.readFile urls;
    # The runner path encodes lychee, config, script, CA bundle, wrapper logic,
    # and build tools. Updating the general nixpkgs pin also invalidates checks.
    checker = builtins.hashString "sha256" "${runner}";
    inherit refresh;
  };
  manifest = pkgs.writeText "external-link-manifest.json" manifestText;

  check =
    pkgs.runCommand "check-external-links" {
      nativeBuildInputs = [pkgs.coreutils];
      outputHashMode = "flat";
      outputHashAlgo = "sha256";
      outputHash = builtins.hashString "sha256" manifestText;
    } ''
      export HOME="$TMPDIR"
      ${runner}/bin/run-external-link-check ${urls}
      # Never publish the expected output unless every non-excluded URL passed.
      cp ${manifest} "$out"
    '';
in {
  inherit urls check;
}
