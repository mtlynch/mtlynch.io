{
  description = "Dev environment for mtlynch.io";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/release-23.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
    let
      pkgs = import nixpkgs { inherit system; };

      pkgs_for_hugo = import (builtins.fetchTarball {
        # 0.117.0 release
        url = "https://github.com/NixOS/nixpkgs/archive/a63a64b593dcf2fe05f7c5d666eb395950f36bc9.tar.gz";
        sha256 = "025g15svjinkn4ny2gzhkvzip37m1dc2sa5564gvgi6r5ngh16pr";
      }) {inherit system; };

    in
    {
      devShells.default = pkgs_for_hugo.mkShell {
        packages = with pkgs; [
          pkgs_for_hugo.hugo
        ];

        shellHook = ''
          hugo version
        '';
      };
    });
}
