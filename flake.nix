{
  description = "Dev environment for mtlynch.io";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";

    # 18.14.1 release
    nodejs-nixpkgs.url = "github:NixOS/nixpkgs/6adf48f53d819a7b6e15672817fa1e78e5f4e84f";

    # 0.17.2
    markdown-lint-nixpkgs.url = "github:NixOS/nixpkgs/102a39bfee444533e6b4e8611d7e92aa39b7bec1";

    # 5.0.8 release
    html-proofer-nixpkgs.url = "github:NixOS/nixpkgs/5ed627539ac84809c78b2dd6d26a5cebeb5ae269";

    # 0.147.5 release
    hugo-nixpkgs.url = "github:NixOS/nixpkgs/e0042dedfbc9134ef973f64e5c7f56a38cc5cc97";

    wordword-pkg.url = "git+https://codeberg.org/mtlynch/wordword.git";
  };

  outputs = {
    self,
    flake-utils,
    nodejs-nixpkgs,
    markdown-lint-nixpkgs,
    html-proofer-nixpkgs,
    hugo-nixpkgs,
    wordword-pkg,
  } @ inputs:
    flake-utils.lib.eachDefaultSystem (system: let
      hugo = hugo-nixpkgs.legacyPackages.${system}.hugo;
      nodejs = nodejs-nixpkgs.legacyPackages.${system}.nodejs-18_x;
      html-proofer = html-proofer-nixpkgs.legacyPackages.${system}.html-proofer;
      markdownlint = markdown-lint-nixpkgs.legacyPackages.${system}.markdownlint-cli2;
      wordword = wordword-pkg.packages.${system}.default;
      libxml2 = hugo-nixpkgs.legacyPackages.${system}.libxml2;
    in {
      devShells.default = hugo-nixpkgs.legacyPackages.${system}.mkShell {
        packages = [
          hugo
          libxml2
          nodejs
          markdownlint
          wordword
          html-proofer
        ];

        shellHook = ''
          wordword --version
          echo "htmlproofer" "$(htmlproofer --version)"
          markdownlint-cli2 | head -n 1
          echo "node" "$(node --version)"
          hugo version
        '';
      };

      formatter = hugo-nixpkgs.legacyPackages.${system}.alejandra;
    });
}
