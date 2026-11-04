{
  description = "Build and development environment for mtlynch.io";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";

    # 24.4.1 release
    nodejs-nixpkgs.url = "github:NixOS/nixpkgs/6027c30c8e9810896b92429f0092f624f7b1aace";

    # 0.17.2
    markdown-lint-nixpkgs.url = "github:NixOS/nixpkgs/102a39bfee444533e6b4e8611d7e92aa39b7bec1";

    # 0.24.2 release
    lychee-nixpkgs.url = "github:NixOS/nixpkgs/3d46470bb3030020f7e1361f33514854f5bfa86d";

    # 0.163.3 release
    hugo-nixpkgs.url = "github:NixOS/nixpkgs/18b9261cb3294b6d2a06d03f96872827b8fe2698";
  };

  outputs = {
    self,
    flake-utils,
    nodejs-nixpkgs,
    markdown-lint-nixpkgs,
    lychee-nixpkgs,
    hugo-nixpkgs,
  } @ inputs:
    flake-utils.lib.eachSystem ["x86_64-linux"] (system: let
      pkgs = hugo-nixpkgs.legacyPackages.${system};
      nodepkgs = nodejs-nixpkgs.legacyPackages.${system};
      hugo = pkgs.hugo;
      nodejs = nodepkgs.nodejs_24;
      pnpm = nodepkgs.pnpm_10.override {inherit nodejs;};
      lychee = lychee-nixpkgs.legacyPackages.${system}.lychee;
      markdownlint = markdown-lint-nixpkgs.legacyPackages.${system}.markdownlint-cli2;
      libxml2 = pkgs.libxml2;
      exiftool = pkgs.exiftool;

      wordwordRelease = {
        platform = "linux";
        arch = "amd64";
        hash = "sha256-+CHzmQ08W7ZN47LWWo0lCVWkg7C6MX13UuAfV7+es3E=";
      };
      wordword = pkgs.stdenvNoCC.mkDerivation {
        pname = "wordword";
        version = "0.1.4";
        src = pkgs.fetchurl {
          url = "https://codefloe.com/mtlynch/wordword/releases/download/0.1.4/wordword-v0.1.4-${wordwordRelease.platform}-${wordwordRelease.arch}.tar.gz";
          inherit (wordwordRelease) hash;
        };
        sourceRoot = ".";
        installPhase = ''
          install --directory "$out/bin"
          install --mode=0755 wordword "$out/bin/wordword"
        '';
      };

      # Package Surge directly from npm.
      surge = pkgs.buildNpmPackage {
        pname = "surge";
        version = "0.56.0";

        src = pkgs.fetchurl {
          url = "https://registry.npmjs.org/surge/-/surge-0.56.0.tgz";
          hash = "sha512-fbU0seoACH1jmXUDLGDibdHcwKoDBDDaSgOKjDmj5SFzKyWiTyJ5H8mhGbrYjg9Hboz7Si5+JpMVlUABuH7Plg==";
        };
        postPatch = ''
          cp ${pkgs.fetchurl {
            url = "https://raw.githubusercontent.com/sintaxi/surge/v0.56.0/package-lock.json";
            hash = "sha256-+eFTOkvh6Mkd2YbXXVkOpTRPAikBtD8REo0UGnbNLvw=";
          }} package-lock.json
        '';
        npmDepsHash = "sha256-Kg9fLn+nx0kHSvfK2ew2v5y1gOTbSWnCDjAU1KHlKHk=";
        dontNpmBuild = true;
      };

      source = pkgs.lib.cleanSource ./.;
      deployToSurgeScript = builtins.path {
        path = ./dev-scripts/deploy-to-surge;
        name = "deploy-to-surge";
      };
      externalLinks = import ./nix/external-links.nix {
        inherit pkgs lychee;
        src = pkgs.lib.fileset.toSource {
          root = ./.;
          fileset = pkgs.lib.fileset.fileFilter (file: file.hasExt "md") ./.;
        };
        config = ./lychee.toml;
        extractScript = ./dev-scripts/extract-external-links;
        checkScript = ./dev-scripts/check-external-links;
        refresh = "1";
      };

      exifMediaSource = pkgs.lib.fileset.toSource {
        root = ./.;
        fileset = pkgs.lib.fileset.unions [
          ./dev-scripts/check-exif-data
          (pkgs.lib.fileset.fileFilter (file:
            builtins.any (extension: pkgs.lib.hasSuffix ".${extension}" (pkgs.lib.toLower file.name)) [
              "gif"
              "jpg"
              "mp4"
              "pdf"
              "png"
              "svg"
              "webp"
            ])
          ./content)
        ];
      };

      pnpmSource = pkgs.lib.fileset.toSource {
        root = ./.;
        fileset = pkgs.lib.fileset.unions [./package.json ./pnpm-lock.yaml];
      };
      pnpmDeps = pnpm.fetchDeps {
        pname = "mtlynch-io-pnpm-deps";
        version = "0.0.0";
        src = pnpmSource;
        fetcherVersion = 2;
        hash = "sha256-TwRdXkuczxFGoGqgSn0bk49SehuoQdQBnK9BzOxBcc0=";
      };
      pnpmDependencies = pkgs.stdenvNoCC.mkDerivation {
        pname = "mtlynch-io-node-modules";
        version = "0.0.0";
        src = pnpmSource;
        nativeBuildInputs = [nodejs pnpm pnpm.configHook];
        inherit pnpmDeps;
        dontBuild = true;
        installPhase = ''
          mkdir -p "$out"
          cp --recursive node_modules "$out/node_modules"
        '';
      };

      mkBuildStep = {
        name,
        command,
        extraInputs ? [],
        setup ? "",
        installCommand ? "echo ${name} > \"$out/done\"",
        src ? source,
      }:
        pkgs.stdenvNoCC.mkDerivation {
          pname = name;
          version = "0.0.0";
          inherit src;
          nativeBuildInputs = [pkgs.bash] ++ extraInputs;
          buildPhase = ''
            export HOME="$TMPDIR/home"
            mkdir -p "$HOME"
            if [ -d ./dev-scripts ]; then
              patchShebangs ./dev-scripts
            fi
            ${setup}
            ${command}
          '';
          installPhase = ''
            mkdir -p "$out"
            ${installCommand}
          '';
        };

      mkSite = {
        name,
        environment,
      }:
        mkBuildStep {
          inherit name;
          command = "hugo --environment ${environment} --minify --cleanDestinationDir";
          extraInputs = [hugo];
          installCommand = ''cp --recursive public/. "$out"'';
        };
      site = mkSite {
        name = "site";
        environment = "production";
      };
      preview-site = mkSite {
        name = "preview-site";
        environment = "dev";
      };

      deploy-to-surge = pkgs.writeShellApplication {
        name = "deploy-to-surge";
        runtimeInputs = [pkgs.bash pkgs.git surge];
        text = ''
          exec bash ${deployToSurgeScript} \
            --production-dir ${site} --preview-dir ${preview-site} "$@"
        '';
      };
    in
      assert (builtins.fromJSON (builtins.readFile ./package.json)).packageManager == "pnpm@${pnpm.version}"; {
        packages = {
          inherit site preview-site deploy-to-surge;
          external-urls = externalLinks.urls;
          check-external-links = externalLinks.check;

          check-duplicate-words = mkBuildStep {
            name = "check-duplicate-words";
            command = "wordword --verbose ./content";
            extraInputs = [wordword];
          };
          check-exif-data = mkBuildStep {
            name = "check-exif-data";
            command = "./dev-scripts/check-exif-data ./content";
            extraInputs = [exiftool pkgs.findutils pkgs.gnugrep];
            src = exifMediaSource;
          };
          check-html = mkBuildStep {
            name = "check-html";
            command = ''
              ln --symbolic ${site} public
              ./dev-scripts/lint-html
            '';
            extraInputs = [lychee];
            # lychee constructs a TLS client even when checking offline.
            setup = ''export SSL_CERT_FILE=${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt'';
          };
          check-markdown = mkBuildStep {
            name = "check-markdown";
            command = "./dev-scripts/lint-markdown";
            extraInputs = [markdownlint];
          };
          check-prettier = mkBuildStep {
            name = "check-prettier";
            command = ''
              ln --symbolic ${pnpmDependencies}/node_modules node_modules
              ./dev-scripts/check-formatting
            '';
            extraInputs = [nodejs];
          };
          check-seo-metadata = mkBuildStep {
            name = "check-seo-metadata";
            command = ''
              ln --symbolic ${site} public
              ./dev-scripts/check-seo-metadata
            '';
            extraInputs = [pkgs.gnugrep];
          };
          check-trailing-newline = mkBuildStep {
            name = "check-trailing-newline";
            command = "./dev-scripts/check-trailing-newline";
            extraInputs = [pkgs.git pkgs.findutils pkgs.gnugrep];
            setup = ''
              git init --quiet
              git add --all
            '';
          };
          check-trailing-whitespace = mkBuildStep {
            name = "check-trailing-whitespace";
            command = "./dev-scripts/check-trailing-whitespace";
            extraInputs = [pkgs.gnugrep];
          };
          check-xml = mkBuildStep {
            name = "check-xml";
            command = ''
              ln --symbolic ${site} public
              ./dev-scripts/lint-xml
            '';
            extraInputs = [libxml2];
          };
        };

        checks.all = pkgs.linkFarm "all-flake-targets" self.packages.${system};

        devShells.default = pkgs.mkShell {
          packages = [
            exiftool
            hugo
            libxml2
            nodejs
            pnpm
            pkgs.python3
            pkgs.git
            markdownlint
            surge
            wordword
            lychee
          ];

          shellHook = ''
            if [ -L node_modules ] || [ ! -e node_modules ]; then
              ln --symbolic --force --no-target-directory \
                ${pnpmDependencies}/node_modules node_modules
            fi

            wordword --version
            echo "exiftool" "$(exiftool -ver)"
            lychee --version
            (markdownlint-cli2 --help || test "$?" -eq 2) | sed -n '1p'
            echo "node" "$(node --version)"
            echo "pnpm" "$(pnpm --version)"
            echo "surge" "$(surge --version)"
            hugo version
          '';
        };

        formatter = hugo-nixpkgs.legacyPackages.${system}.alejandra;
      });
}
