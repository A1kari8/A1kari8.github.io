{
  description = "Pnpm Flake";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };
      in
      {
        devShells.default = pkgs.mkShell {
          name = "blog-devshell";
          shell = pkgs.zsh;

          packages = with pkgs; [
            nodejs_24
            pnpm
            biome
          ];

          shellHook = ''
          '';
        };
      }
    );
}
