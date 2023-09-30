{
  description = "Dev environment for mtlynch.io";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";

    # 18.14.1 release
    nodejs_dep.url = "github:NixOS/nixpkgs/6adf48f53d819a7b6e15672817fa1e78e5f4e84f";

    # 0.117.0 release
    hugo_dep.url = "github:NixOS/nixpkgs/a63a64b593dcf2fe05f7c5d666eb395950f36bc9";
  };

  outputs = { self, nixpkgs, flake-utils, nodejs_dep, hugo_dep }@inputs :
    flake-utils.lib.eachDefaultSystem (system:
    let
      hugo_dep = inputs.hugo_dep.legacyPackages.${system};
      nodejs_dep = inputs.nodejs_dep.legacyPackages.${system};
    in
    {
      devShells.default = nodejs_dep.mkShell {
        packages = [
          hugo_dep.hugo
          nodejs_dep.nodejs-18_x
        ];

        shellHook = ''
          echo "node" "$(node --version)"
          hugo version
        '';
      };
    });
}
