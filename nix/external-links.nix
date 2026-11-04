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
      SSL_CERT_FILE = "${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt";
    } ''
      cd "$src"
      bash ${extractScript} ${config} > "$out"
    '';

  # Reading the generated list is intentional import-from-derivation: source
  # changes may rebuild extraction, but only list/policy changes invalidate checks.
  manifestText = builtins.toJSON {
    urls = builtins.readFile urls;
    checker = builtins.hashString "sha256" "${lychee}";
    config = builtins.hashFile "sha256" config;
    script = builtins.hashFile "sha256" checkScript;
    inherit refresh;
  };
  manifest = pkgs.writeText "external-link-manifest.json" manifestText;

  check =
    pkgs.runCommand "check-external-links" {
      nativeBuildInputs = [pkgs.bash pkgs.coreutils lychee];
      SSL_CERT_FILE = "${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt";
      outputHashMode = "flat";
      outputHashAlgo = "sha256";
      outputHash = builtins.hashString "sha256" manifestText;
    } ''
      export HOME="$TMPDIR"
      bash ${checkScript} ${config} ${urls}
      # Never publish the expected output unless every non-excluded URL passed.
      cp ${manifest} "$out"
    '';
in {
  inherit urls check;
}
