{
  description = "NixOS configuration";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-24.11";
    disko.url = "github:nix-community/disko";
    disko.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs = { self, nixpkgs, disko }:
  let
    hostname = builtins.getEnv "VM_DESIRED_HOSTNAME";
  in {
    nixosConfigurations.${hostname} = nixpkgs.lib.nixosSystem {
      system = "aarch64-linux";
      modules = [
        ./configuration.nix
        disko.nixosModules.disko
        ./disko-config.nix
      ];
    };
  };
}
