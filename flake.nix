{
  description = "Build and development environment for mtlynch.io";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";

    # 24.4.1 release
    nodejs-nixpkgs.url = "github:NixOS/nixpkgs/6027c30c8e9810896b92429f0092f624f7b1aace";

    # 0.17.2
    markdown-lint-nixpkgs.url = "github:NixOS/nixpkgs/102a39bfee444533e6b4e8611d7e92aa39b7bec1";

    # 5.0.8 release
    html-proofer-nixpkgs.url = "github:NixOS/nixpkgs/5ed627539ac84809c78b2dd6d26a5cebeb5ae269";

    # 0.163.3 release
    hugo-nixpkgs.url = "github:NixOS/nixpkgs/18b9261cb3294b6d2a06d03f96872827b8fe2698";
  };

  outputs = {
    self,
    flake-utils,
    nodejs-nixpkgs,
    markdown-lint-nixpkgs,
    html-proofer-nixpkgs,
    hugo-nixpkgs,
  } @ inputs:
    flake-utils.lib.eachSystem ["aarch64-darwin" "aarch64-linux" "x86_64-linux"] (system: let
      pkgs = hugo-nixpkgs.legacyPackages.${system};
      nodepkgs = nodejs-nixpkgs.legacyPackages.${system};
      hugo = pkgs.hugo;
      nodejs = nodepkgs.nodejs_24;
      pnpm = nodepkgs.pnpm_10.override {inherit nodejs;};
      html-proofer = html-proofer-nixpkgs.legacyPackages.${system}.html-proofer;
      markdownlint = markdown-lint-nixpkgs.legacyPackages.${system}.markdownlint-cli2;
      libxml2 = pkgs.libxml2;
      exiftool = pkgs.exiftool;

      wordwordRelease =
        {
          "aarch64-darwin" = {
            platform = "macos";
            arch = "arm64";
            hash = "sha256-4R9+7/p0TvxOIAX06BPXPtKzGJT0GWjxVhk8NPl2asE=";
          };
          "aarch64-linux" = {
            platform = "linux";
            arch = "arm64";
            hash = "sha256-wgKF/uQLlR+XrgWKbwzCcohLKSyR2hRaDjh7h/FaQB4=";
          };
          "x86_64-linux" = {
            platform = "linux";
            arch = "amd64";
            hash = "sha256-+CHzmQ08W7ZN47LWWo0lCVWkg7C6MX13UuAfV7+es3E=";
          };
        }.${
          system
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

      # Surge 0.43.0 is not yet in nixpkgs, so package it directly from npm.
      surge = pkgs.buildNpmPackage {
        pname = "surge";
        version = "0.43.0";

        src = pkgs.fetchurl {
          url = "https://registry.npmjs.org/surge/-/surge-0.43.0.tgz";
          hash = "sha512-I9X4//GQVTL/teTB/OcmO5wgIvFAv9O8Qq1PJWOIF7KZvpiN6Jd6UTaUXqOuTwH7cb00/IEhyLDUdf7d8LoiCQ==";
        };
        postPatch = ''
          cp ${pkgs.fetchurl {
            url = "https://raw.githubusercontent.com/sintaxi/surge/v0.43.0/package-lock.json";
            hash = "sha256-P6MXXH+3yuOSexcUv6ykTjSiEI6J2wnxqbBTaYYA9HI=";
          }} package-lock.json
        '';
        npmDepsHash = "sha256-81FdvkEZm4J3AJwEAgZoZ3uWFRsDybsH8CAMNhRpVWw=";
        dontNpmBuild = true;
      };

      deployToSurgeScript = builtins.path {
        path = ./dev-scripts/deploy-to-surge;
        name = "deploy-to-surge";
      };
      checkExifDataScript = builtins.path {
        path = ./dev-scripts/check-exif-data;
        name = "check-exif-data";
      };
      lintHtmlScript = builtins.path {
        path = ./dev-scripts/lint-html;
        name = "lint-html";
      };

      exifMediaSource = pkgs.lib.fileset.toSource {
        root = ./.;
        fileset = pkgs.lib.fileset.fileFilter (file:
          builtins.any file.hasExt [
            "avif"
            "bmp"
            "gif"
            "heic"
            "heif"
            "jpeg"
            "jpg"
            "jxl"
            "png"
            "svg"
            "tif"
            "tiff"
            "webp"
            "3g2"
            "3gp"
            "asf"
            "avi"
            "flv"
            "m2ts"
            "m4v"
            "mkv"
            "mov"
            "mp4"
            "mpeg"
            "mpg"
            "mts"
            "ogv"
            "ts"
            "webm"
            "wmv"
          ])
        ./content;
      };

      pnpmSource = pkgs.lib.fileset.toSource {
        root = ./.;
        fileset = pkgs.lib.fileset.unions [
          ./package.json
          ./pnpm-lock.yaml
        ];
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
        nativeBuildInputs = [
          nodejs
          pnpm
          pnpm.configHook
          pkgs.python3
          pkgs.pkg-config
          pkgs.gcc
        ];
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
        src ? nodepkgs.lib.cleanSource ./.,
      }:
        pkgs.stdenvNoCC.mkDerivation {
          pname = name;
          version = "0.0.0";
          inherit src;
          nativeBuildInputs = [pkgs.bash] ++ extraInputs;
          buildPhase = ''
            export HOME="$TMPDIR/home"
            mkdir -p "$HOME"
            export CI=1

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
          installCommand = ''
            cp --recursive public/. "$out"
          '';
        };

      site = mkSite {
        name = "site";
        environment = "production";
      };

      preview-site = mkSite {
        name = "preview-site";
        environment = "dev";
      };

      check-external-links = pkgs.writeShellApplication {
        name = "check-external-links";
        runtimeInputs = [pkgs.coreutils html-proofer];
        text = ''
          work_directory="$(mktemp --directory)"
          trap 'rm --recursive --force "$work_directory"' EXIT
          cd "$work_directory"
          ln --symbolic ${site} public
          ${lintHtmlScript}
        '';
      };

      deploy-to-surge = pkgs.writeShellApplication {
        name = "deploy-to-surge";
        runtimeInputs = [pkgs.coreutils surge];
        text = ''
          work_directory="$(mktemp --directory)"
          trap 'rm --recursive --force "$work_directory"' EXIT
          cd "$work_directory"

          if [[ -n "''${NIX_CI_GIT_BRANCH-}" && "''${NIX_CI_GIT_BRANCH}" != master ]]; then
            ln --symbolic ${preview-site} public
          else
            ln --symbolic ${site} public
          fi

          ${deployToSurgeScript}
        '';
      };
    in {
      packages = {
        inherit site preview-site check-external-links deploy-to-surge;

        check-duplicate-words = mkBuildStep {
          name = "check-duplicate-words";
          command = "wordword --verbose ./content";
          extraInputs = [wordword];
        };

        check-exif-data = mkBuildStep {
          name = "check-exif-data";
          command = "bash ${checkExifDataScript} ./content";
          extraInputs = [exiftool pkgs.findutils pkgs.gnugrep];
          src = exifMediaSource;
        };

        check-html = mkBuildStep {
          name = "check-html";
          command = ''
            ln --symbolic ${site} public
            ./dev-scripts/lint-html --quick
          '';
          extraInputs = [html-proofer];
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

      devShells.default = pkgs.mkShell {
        packages = [
          exiftool
          html-proofer
          hugo
          libxml2
          markdownlint
          nodejs
          pnpm
          surge
          wordword
        ];

        shellHook = ''
          wordword --version
          echo "exiftool" "$(exiftool -ver)"
          echo "htmlproofer" "$(htmlproofer --version)"
          markdownlint-cli2 | head -n 1
          echo "node" "$(node --version)"
          echo "pnpm" "$(pnpm --version)"
          echo "surge" "$(surge --version)"
          hugo version
        '';
      };

      formatter = pkgs.alejandra;
    });
}
