{
  description = "Demo Nix dev environment";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";

    # 2.7.18.7 release
    python_dep.url = "github:NixOS/nixpkgs/517501bcf14ae6ec47efd6a17dda0ca8e6d866f9";
  };

  outputs = { self, flake-utils, python_dep }@inputs :
    flake-utils.lib.eachDefaultSystem (system:
    let
      python_dep = inputs.python_dep.legacyPackages.${system};
    in
    {
      devShells.default = python_dep.mkShell {
        packages = [
          python_dep.python2
        ];

        shellHook = ''
          python --version
        '';
      };
    });
}
