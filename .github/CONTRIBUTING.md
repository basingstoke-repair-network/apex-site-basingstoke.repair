<!--
SPDX-FileCopyrightText: 2024-2026 Basingstoke Repair Network
SPDX-License-Identifier: CC0-1.0
-->

# Contributing

Thanks for considering a contribution to the Basingstoke Repair Network website. This document covers the practical workflow — branch naming, commits, and licensing — for getting a change merged. See [AGENT.md](../AGENT.md) for the fuller project context, tech stack, and coding standards.

## Getting Set Up

```bash
git clone <repository-url>
cd apex-site-basingstoke.repair
npm install
npm run dev
```

Install the [prek](https://github.com/j178/prek) pre-commit hooks once, so lint/format/licensing checks run automatically before each commit:

```bash
prek install
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

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org) specification (enforced by the `conventional-pre-commit` hook at `commit-msg` stage):

```
<type>: <short summary>

<detailed description>
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Commits authored or assisted by an AI assistant must also carry an `Assisted-by:` trailer identifying the tool, e.g. `Assisted-by: Claude Code <noreply@anthropic.com>`.

### Compartmentalized Commits

Commit changes in logical, isolated units — one commit per logical change, related files grouped together, unrelated changes never mixed in the same commit.

## Licensing (REUSE / SPDX)

All files must carry an SPDX license header:

- **Code** (Astro/HTML components, CSS, JS/TS, config files): licensed `MIT`
- **Documentation and images** (Markdown, `README`/`AGENT.md`, images under `public/assets/images/`): licensed `CC0-1.0`
- **JSON files** and **images**: add a companion `.license` file rather than an inline header

`prek run --all-files` includes a REUSE compliance check — run it before opening a PR.

## Before Opening a Pull Request

- [ ] No `\u` escape sequences — use proper UTF-8 characters directly (e.g. `café`, not `café`)
- [ ] All new files have SPDX headers (or `.license` companions)
- [ ] `npm run lint` and `npm run format:check` pass (or `prek run --all-files` to run the full hook suite)
- [ ] `npm run build` completes without errors
- [ ] Playwright visual regression tests pass — see [VISUAL_TESTING.md](../VISUAL_TESTING.md)
- [ ] Responsive design checked on mobile/tablet/desktop
- [ ] Accessibility: keyboard navigation still works, images have alt text
- [ ] Commits are conventional, compartmentalized, and carry an `Assisted-by:` trailer if AI-assisted

## Things Not to Change Without Asking

- Brand colors (`src/styles/global.css`)
- Location information or schedules (`src/content/locations/`)
- Contact information
- Supporter organizations (`src/content/supporters/`)

If in doubt, open an issue or ask before making changes in these areas.
