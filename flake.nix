# SPDX-FileCopyrightText: 2025 Basingstoke Repair Network <dev@basingstoke.repair>
#
# SPDX-License-Identifier: CC0-1.0
{
  description = "Astro site for Basingstoke Repair Network";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};

      # Build the site using Nix-native NPM building
      site = let
        nodejs = pkgs.nodejs_20;
      in
        pkgs.buildNpmPackage {
          pname = "apex-site-basingstoke-repair";
          version = "0.1.0";

          src = ./.;

          # Hash of the npm dependencies (you may need to update this)
          npmDepsHash = "sha256-cRd/CUw5yl/CFnkXOQCLPCbI+KkqUNNQYSrwjj0+CX8=";

          npmFlags = ["--legacy-peer-deps"];

          # Required for sharp dependency
          nativeBuildInputs = with pkgs; [
            python3
            pkg-config
            vips
          ];

          buildInputs = with pkgs; [
            vips
          ];

          # Use the specified Node.js version
          inherit nodejs;

          # Build script to run
          npmBuildScript = "build";

          # Install phase - copy the built site
          installPhase = ''
            cp -r dist $out
          '';
        };
    in {
      packages.site = site;
      packages.default = self.packages.${system}.site;

      # Apps for easy running
      apps.default = self.apps.${system}.serve;

      apps.serve = {
        type = "app";
        program = let
          inherit (pkgs.lib) getExe;
          server = pkgs.writeShellScriptBin "server" ''
            ${getExe pkgs.python3} -m http.server 8080 --directory ${site}""
          '';
        in
          getExe server;
      };
    });
}
