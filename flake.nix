{
  description = "Dev environment for mtlynch.io";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";

    # 24.4.1 release
    nodejs-nixpkgs.url = "github:NixOS/nixpkgs/6027c30c8e9810896b92429f0092f624f7b1aace";

    # 0.17.2
    markdown-lint-nixpkgs.url = "github:NixOS/nixpkgs/102a39bfee444533e6b4e8611d7e92aa39b7bec1";

    # 0.24.2 release
    lychee-nixpkgs.url = "github:NixOS/nixpkgs/3d46470bb3030020f7e1361f33514854f5bfa86d";

    # 0.147.5 release
    hugo-nixpkgs.url = "github:NixOS/nixpkgs/e0042dedfbc9134ef973f64e5c7f56a38cc5cc97";

    wordword-pkg.url = "git+https://codeberg.org/mtlynch/wordword.git";
  };

  outputs = {
    self,
    flake-utils,
    nodejs-nixpkgs,
    markdown-lint-nixpkgs,
    lychee-nixpkgs,
    hugo-nixpkgs,
    wordword-pkg,
  } @ inputs:
    flake-utils.lib.eachDefaultSystem (system: let
      hugo = hugo-nixpkgs.legacyPackages.${system}.hugo;
      nodejs = nodejs-nixpkgs.legacyPackages.${system}.nodejs_24;
      lychee = lychee-nixpkgs.legacyPackages.${system}.lychee;
      markdownlint = markdown-lint-nixpkgs.legacyPackages.${system}.markdownlint-cli2;
      wordword = wordword-pkg.packages.${system}.default;
      libxml2 = hugo-nixpkgs.legacyPackages.${system}.libxml2;
      exiftool = hugo-nixpkgs.legacyPackages.${system}.exiftool;
    in {
      devShells.default = hugo-nixpkgs.legacyPackages.${system}.mkShell {
        packages = [
          exiftool
          hugo
          libxml2
          nodejs
          markdownlint
          wordword
          lychee
        ];

        shellHook = ''
          wordword --version
          echo "exiftool" "$(exiftool -ver)"
          lychee --version
          markdownlint-cli2 | head -n 1
          echo "node" "$(node --version)"
          hugo version
        '';
      };

      formatter = hugo-nixpkgs.legacyPackages.${system}.alejandra;
    });
}
