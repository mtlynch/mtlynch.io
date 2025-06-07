{
  description = "Dev environment for gleam-call-elixir-simple";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";

    # 27.3.4
    erlang-nixpkgs.url = "github:NixOS/nixpkgs/8406224e30c258025cb8b31704bdb977a8f1f0";

    # 1.10.0
    gleam-nixpkgs.url = "github:NixOS/nixpkgs/3866ad91cfc172f08a6839def503d8fc2923c603";
  };

  outputs = {
    self,
    flake-utils,
    erlang-nixpkgs,
    gleam-nixpkgs,
  } @ inputs:
    flake-utils.lib.eachDefaultSystem (system: let
      erlang = erlang-nixpkgs.legacyPackages.${system}.beam27Packages.erlang;
      elixir = erlang-nixpkgs.legacyPackages.${system}.beam27Packages.elixir;
      gleam = gleam-nixpkgs.legacyPackages.${system}.gleam;
      inotify-tools = erlang-nixpkgs.legacyPackages.${system}.inotify-tools;
    in {
      devShells.default =
        erlang-nixpkgs.legacyPackages.${system}.mkShell
        {
          packages = [
            erlang
            elixir
            gleam
            inotify-tools
          ];

          shellHook = ''
            echo "erlang" $(erl -eval 'erlang:display(erlang:system_info(otp_release)), halt().' -noshell)
            gleam --version
          '';
        };

      formatter = erlang-nixpkgs.legacyPackages.${system}.alejandra;
    });
}
