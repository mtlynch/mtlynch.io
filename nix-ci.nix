{
  systems = ["x86_64-linux"];
  timeout = 7200;

  test = {
    external-links = {
      package = "packages.x86_64-linux.check-external-links";
      system = "x86_64-linux";
      branches = "any";
    };
  };

  deploy = {
    surge = {
      package = "packages.x86_64-linux.deploy-to-surge";
      system = "x86_64-linux";
      branches = "any";
      secrets = ["SURGE_TOKEN"];
    };
  };
}
