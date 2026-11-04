{
  systems = ["x86_64-linux"];
  timeout = 7200;

  # External URL extraction is read during evaluation to key the network-enabled
  # fixed-output check by URL contents rather than the entire source tree.
  allow-import-from-derivation = true;

  deploy.surge = {
    package = "packages.x86_64-linux.deploy-to-surge";
    system = "x86_64-linux";
    branches = ":any";
    in-repo = true;
    secrets = ["SURGE_TOKEN"];
  };
}
