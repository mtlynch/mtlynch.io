{
  description = "Demo Nix dev environment";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";

    # 2.7.18.7 release
    python-nixpkgs.url = "github:NixOS/nixpkgs/517501bcf14ae6ec47efd6a17dda0ca8e6d866f9";
  };

  outputs = {
    self,
    flake-utils,
    python-nixpkgs,
  } @ inputs:
    flake-utils.lib.eachDefaultSystem (system: let
      python-nixpkgs = inputs.python-nixpkgs.legacyPackages.${system};
    in {
      devShells.default = python-nixpkgs.mkShell {
        packages = [
          python-nixpkgs.python2
        ];

        shellHook = ''
          python --version
        '';
      };
    });
}
