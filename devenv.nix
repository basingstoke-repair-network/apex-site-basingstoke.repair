# SPDX-FileCopyrightText: 2025 Basingstoke Repair Network <dev@basingstoke.repair>
#
# SPDX-License-Identifier: MIT

{ pkgs, lib, config, inputs, ... }:

{
  # https://devenv.sh/packages/
  packages = [ pkgs.git ];

  languages = {
    javascript = {
      enable = true;
      npm = {
        enable = true;
        install.enable = true;
      };
    };
    nix.enable = true;
    typescript.enable = true;
  };

  devcontainer.enable = true;
  difftastic.enable = true;
}
