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

      # Node.js version compatible with Astro
      nodejs = pkgs.nodejs_20;

      # Build the site using Nix-native NPM building
      site = pkgs.buildNpmPackage {
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
          server = pkgs.writeShellScriptBin "server" ''
            ${pkgs.python3}/bin/python3 -m http.server 8080 --directory ${site}""
          ''; in pkgs.lib.getExe server;
      };
    });
}
