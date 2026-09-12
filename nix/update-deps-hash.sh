# SPDX-FileCopyrightText: 2024-2026 Basingstoke Repair Network <dev@basingstoke.repair>
#
# SPDX-License-Identifier: MIT

root="$(git rev-parse --show-toplevel)"
hash="$(prefetch-npm-deps "$root/package-lock.json")"

sed -i -E "s|npmDepsHash = \"sha256-[A-Za-z0-9+/=]+\";|npmDepsHash = \"$hash\";|" "$root/flake.nix"

echo "Updated flake.nix npmDepsHash to $hash"
