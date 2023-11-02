{
  description = "Dev environment for mtlynch.io";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";

    # 18.14.1 release
    nodejs_dep.url = "github:NixOS/nixpkgs/6adf48f53d819a7b6e15672817fa1e78e5f4e84f";

    # 0.9.0
    markdown_lint_dep.url = "github:NixOS/nixpkgs/12bdeb01ff9e2d3917e6a44037ed7df6e6c3df9d";

    # 0.119.0 release
    hugo_dep.url = "github:NixOS/nixpkgs/75a52265bda7fd25e06e3a67dee3f0354e73243c";
  };

  outputs = { self, nixpkgs, flake-utils, nodejs_dep, markdown_lint_dep, hugo_dep }@inputs :
    flake-utils.lib.eachDefaultSystem (system:
    let
      hugo_dep = inputs.hugo_dep.legacyPackages.${system};
      nodejs_dep = inputs.nodejs_dep.legacyPackages.${system};
      markdown_lint_dep = inputs.markdown_lint_dep.legacyPackages.${system};
    in
    {
      devShells.default = hugo_dep.mkShell {
        packages = [
          hugo_dep.hugo
          nodejs_dep.nodejs-18_x
          markdown_lint_dep.markdownlint-cli2
        ];

        shellHook = ''
          markdownlint-cli2 | head -n 1
          echo "node" "$(node --version)"
          hugo version
        '';
      };
    });
}
