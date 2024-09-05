{
  description = "Dev environment for mtlynch.io";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";

    # 18.14.1 release
    nodejs-nixpkgs.url = "github:NixOS/nixpkgs/6adf48f53d819a7b6e15672817fa1e78e5f4e84f";

    # 0.9.0
    markdown-lint-nixpkgs.url = "github:NixOS/nixpkgs/12bdeb01ff9e2d3917e6a44037ed7df6e6c3df9d";

    # 0.119.0 release
    hugo-nixpkgs.url = "github:NixOS/nixpkgs/75a52265bda7fd25e06e3a67dee3f0354e73243c";
  };

  outputs = { self, flake-utils, nodejs-nixpkgs, markdown-lint-nixpkgs, hugo-nixpkgs }@inputs :
    flake-utils.lib.eachDefaultSystem (system:
    let
      hugo = hugo-nixpkgs.legacyPackages.${system}.hugo;
      nodejs = nodejs-nixpkgs.legacyPackages.${system}.nodejs-18_x;
      markdownlint = markdown-lint-nixpkgs.legacyPackages.${system}.markdownlint-cli2;
    in
    {
      devShells.default = hugo-nixpkgs.legacyPackages.${system}.mkShell {
        packages = [
          hugo
          nodejs
          markdownlint
        ];

        shellHook = ''
          markdownlint-cli2 | head -n 1
          echo "node" "$(node --version)"
          hugo version
        '';
      };
    });
}
