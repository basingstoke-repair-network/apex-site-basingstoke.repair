<!--
SPDX-FileCopyrightText: 2024-2026 Basingstoke Repair Network
SPDX-License-Identifier: CC0-1.0
-->

# Contributing

Thanks for considering a contribution to the Basingstoke Repair Network website. This document covers the practical workflow — branch naming, commits, and licensing — for getting a change merged. See [AGENT.md](../AGENT.md) for the fuller project context, tech stack, and coding standards.

## Getting Set Up

Ideally, use the provided [dev container](../.devcontainer.json) (VS Code: "Dev Containers: Reopen in Container") — it provisions the pinned Node.js version and tooling for you via `devenv`, so you can skip straight to `npm run dev`.

If you're not using the dev container or Nix/`devenv`, match the pinned Node.js version from [`.nvmrc`](../.nvmrc) before installing:

```bash
git clone <repository-url>
cd apex-site-basingstoke.repair
nvm use
npm install
npm run dev
```

Install the [prek](https://github.com/j178/prek) pre-commit hooks once, so lint/format/licensing checks run automatically before each commit:

```bash
prek install
```

To run the same checks manually (e.g. before committing, without installing the git hook), install prek itself first:

```bash
npm install -g @j178/prek   # or: pnpm add -g @j178/prek / bun install -g @j178/prek

prek run --all-files
```

### Using Nix, devenv, or a Dev Container

The repo ships a [Nix flake](../flake.nix) that packages the built site, and a [devenv](https://devenv.sh) environment (`devenv.nix`) that provisions Node.js and npm for you — no manual `npm install` needed. You'll still need to run `prek install` yourself once inside the shell (see [#208](https://github.com/basingstoke-repair-network/apex-site-basingstoke.repair/issues/208) for automating that too).

If you have [Nix](https://nixos.org) and [direnv](https://direnv.net) installed, `cd` into the repo and run `direnv allow` once; `.envrc` loads the devenv shell automatically from then on.

Without direnv, enter the shell manually:

```bash
devenv shell
```

VS Code users can instead reopen the repo in the provided dev container (`.devcontainer.json`, based on `ghcr.io/cachix/devenv/devcontainer`) via the "Dev Containers: Reopen in Container" command — it provisions the same devenv environment on first build.

`flake.nix` also exposes a plain Nix package build of the site (`nix build`) and a `nix run` target that serves the built output locally — mainly useful for CI/deployment parity checks, not day-to-day development.

If `nix build` fails after a `package-lock.json` change, the pinned `npmDepsHash` in `flake.nix` is stale. Refresh it with:

```bash
nix run .#update-deps-hash
# or: nix-update --flake --use-update-script site
```

## Branch Naming

Each pull request should solve one specific issue. Name branches as:

```
$issueThisSolves/$conventionalCommitScope-$short-summary
```

- `$issueThisSolves`: the issue number the PR addresses
- `$conventionalCommitScope`: the Conventional Commits type of the change (e.g. `feat`, `fix`, `docs`, `chore`)
- `$short-summary`: a short, dash-separated summary

Example: `190/docs-update-readme`

A branch's commits don't all have to share the branch's type — each commit should stick to a single Conventional Commits type, but the branch as a whole can mix them. For example, a `feat/…` branch can carry a `feat` commit for the feature itself, plus a `docs` commit updating documentation to reflect it, or a `fix` commit for a bug caught while building it out.

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org) specification (enforced by the `conventional-pre-commit` hook at `commit-msg` stage):

```
<type>(<scope>/<issue-number>): <short summary>

<detailed description>
```

- `<type>`: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- `<scope>`: a short label for the area of the change (e.g. `contributing`, `nix`, `locations`)
- `<issue-number>`: the issue the commit addresses

Example: `docs(contributing/198): add CONTRIBUTING.md`

Commits authored or assisted by an AI assistant must also carry an `Assisted-by:` trailer identifying the tool, e.g. `Assisted-by: Claude Code <noreply@anthropic.com>`.

### Compartmentalized Commits

Commit changes in logical, isolated units — one commit per logical change, related files grouped together, unrelated changes never mixed in the same commit.

## Pull Request Titles

Title pull requests the same way as commits, but reference the issue with a `#` instead of a slash:

```
<type>(#<issue-number>): <short summary>
```

Example: `docs(#198): add CONTRIBUTING.md`

## Licensing (REUSE / SPDX)

All files must carry an SPDX license header:

- **Code** (Astro/HTML components, CSS, JS/TS, config files): licensed `MIT`
- **Documentation and images** (Markdown, `README`/`AGENT.md`, images under `public/assets/images/`): licensed `CC0-1.0`
- **JSON files** and **images**: add a companion `.license` file rather than an inline header

`prek run --all-files` includes a REUSE compliance check — run it before opening a PR.

## Before Opening a Pull Request

Run `prek run --all-files` — it covers:

- [ ] SPDX/REUSE license headers on all new files (or `.license` companions)
- [ ] Conventional Commits message format
- [ ] Linting (`npm run lint`) and formatting (`npm run format:check`)
- [ ] Whitespace, end-of-file, merge-conflict, and large-file checks

Check these manually — `prek run --all-files` doesn't cover them:

- [ ] No `\u` escape sequences — use proper UTF-8 characters directly (e.g. `café`, not `café`)
- [ ] `npm run build` completes without errors
- [ ] Playwright visual regression tests pass — see [VISUAL_TESTING.md](../VISUAL_TESTING.md)
- [ ] Responsive design checked on mobile/tablet/desktop
- [ ] Accessibility: keyboard navigation still works, images have alt text
- [ ] Commits are compartmentalized and carry an `Assisted-by:` trailer if AI-assisted

## Things Not to Change Without Asking

- Brand colors (`src/styles/global.css`)
- Location information or schedules (`src/content/locations/`)
- Contact information
- Supporter organizations (`src/content/supporters/`)

If in doubt, open an issue or ask before making changes in these areas.
