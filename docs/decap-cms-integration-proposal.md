<!--
SPDX-FileCopyrightText: 2025--2026 Basingstoke Repair Network
SPDX-License-Identifier: MIT
-->

# Proposal: Decap CMS + DecapBridge, with a volunteers-only section

**Status:** Draft for discussion — nothing in this document has been
implemented yet.

## 1. Why this doc exists

`CLAUDE.md` already describes Decap CMS as part of the intended stack
("Git-based headless CMS for content editing via Netlify Identity",
`public/assets/admin/config.yml`), but no `/admin` folder, Decap config, or
identity backend exists in the repo yet. Separately, we want a
**volunteers-only section** of the site — content that shouldn't be public.
This proposes one coherent way to build both at once, since they share the
same authentication problem.

## 2. Two different things called "Decap CMS auth"

It's worth being explicit that this proposal solves two related but
distinct problems with the same login mechanism:

1. **Content editing** — letting a non-technical committee member update
   locations, supporters, hero slides, etc. without touching JSON/git
   directly. This is what `CLAUDE.md` already envisions.
2. **Volunteers-only viewing** — gating a page of the *public* site
   (e.g. rotas, internal documents, contact lists) so only logged-in
   volunteers can see it.

Decap CMS itself only solves (1). Gating (2) means reusing the same login
widget on a normal Astro page, not a CMS feature.

## 3. Why DecapBridge instead of Netlify Identity

The originally-planned backend, Netlify Identity + Git Gateway, is
deprecated by Netlify and shouldn't be adopted for new projects — Netlify
stepped back from Decap CMS and end-of-lifed Identity, which is exactly
why [DecapBridge](https://decapbridge.com) exists: a hosted
authentication/user-management service built specifically to replace that
gap, with no Netlify dependency. Recommendation: **use DecapBridge as the
`backend` in `config.yml` instead of `git-gateway`.**

DecapBridge setup, in short ([docs](https://decapbridge.com/docs/getting-started)):

- Register the site with DecapBridge (GitHub repo path + an access token
  with contents/PR permission).
- DecapBridge generates the `backend:` block for `config.yml`.
- Choose an auth mode: **Classic** (email + password, self-service reset)
  or **PKCE** (SSO via Google/Microsoft, needs Decap CMS ≥ 3.8.3).
- Invite collaborators by email from the DecapBridge dashboard; they set
  their own password/SSO on first login. No Claude/dev involvement needed
  per invite.

**Important limitation to flag now:** DecapBridge (like Decap CMS itself)
has no per-collection role-based access control. Its only roles are
*collaborator* (can edit content) and *admin* (can also invite/manage
users) — see the [Decap CMS discussion on this
gap](https://github.com/decaporg/decap-cms/discussions/6216) and the
[DecapBridge role docs](https://decapbridge.com/docs/introduction). Anyone
invited as a collaborator can edit **every** collection in `config.yml`,
including a future "volunteer resources" collection. There's no built-in
way to say "this person can edit Locations but not Volunteer Resources."
If that separation matters, see §6.

## 4. Proposed CMS setup (problem 1)

Add the admin app and content collections `CLAUDE.md` already describes:

- `public/admin/index.html` — the standard Decap CMS loader (CMS bundle
  from CDN per this project's CDN-first policy, not an npm dependency).
- `public/admin/config.yml` — `backend:` block from DecapBridge, plus
  collections mirroring the existing `src/content/*` schemas so editors
  get a form UI instead of raw JSON:
  - `hero-slides` (matches `heroSlides` schema in `src/content/config.ts`)
  - `locations`
  - `supporters`
- No changes to `src/content/config.ts` needed for this part — Decap just
  needs to write the same JSON shape Astro's content collections already
  read.

## 5. Proposed volunteers-only section (problem 2)

### 5.1 Content

New Astro content collection, e.g. `volunteer-resources`, alongside the
existing ones in `src/content/config.ts`:

```ts
const volunteerResources = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    body: z.string(),       // markdown, rendered client-side or pre-built
    updatedAt: z.string(),
    order: z.number().int(),
  }),
});
```

Editable via a matching `volunteer-resources` collection in
`config.yml`, so the same non-technical volunteers who manage the public
content can manage this too (subject to the caveat in §3).

### 5.2 Gating the page

New route `src/pages/volunteers.astro`. Since this is a static Astro
build (no SSR/API routes, per `CLAUDE.md`), gating happens **client-side**
in the browser, using the same DecapBridge login the CMS uses:

- Page renders a login prompt by default (small vanilla-JS island, no
  framework — consistent with "ship JS only when necessary").
- On click, it opens DecapBridge's hosted login (Classic or PKCE,
  whichever mode the site is configured for) via its JS SDK.
- On successful auth, the script reveals the volunteer content that was
  already included in the static HTML (or fetched from a pre-built JSON
  endpoint), and stores the session so a refresh doesn't require
  re-login.

**This is obscurity, not real access control.** The volunteer content is
still present in the built static output and reachable by anyone who
looks at the page source or network tab — the script only *hides* it
until login. That's an acceptable trade-off for low-sensitivity content
(a volunteer newsletter, a rota, meeting notes) but **not** for anything
genuinely sensitive (personal addresses, phone numbers, safeguarding
information).

### 5.3 If the content needs to be actually private

If §5.2's caveat is a problem, the options — in increasing order of
departure from "static site, no dependencies" — are:

1. **Netlify path-level access control** (paid Netlify feature,
   independent of DecapBridge): password- or SSO-protect the `/volunteers`
   path at the edge, so the HTML itself is never served to anonymous
   visitors. Simplest to reason about, but a recurring cost and a step
   away from the "any static host" portability goal in `CLAUDE.md`.
2. **A small serverless function** (Netlify Function) that verifies the
   DecapBridge/Identity JWT server-side and only then returns the
   protected content over `fetch()`. This directly conflicts with
   `CLAUDE.md`'s "Do NOT ... Introduce server-side rendering or API
   routes" directive, so it needs an explicit exception if chosen.
3. Accept the client-side-only gating in §5.2 and keep genuinely
   sensitive material (safeguarding docs, personal data) out of the CMS
   entirely, e.g. shared via a separate tool the committee already
   trusts (email, a shared drive) rather than the website.

**Recommendation:** start with §5.2 for now (matches current low-JS,
static-only philosophy), and keep an explicit list of what's allowed to
go in `volunteer-resources` — nothing that would be a problem if briefly
exposed. Revisit option 1 or 2 only if a genuinely private use case comes
up.

## 6. If per-collection permissions turn out to matter

Should the "editors shouldn't see volunteer-only content" requirement
become a hard requirement rather than a nice-to-have, the workaround
(since neither Decap CMS nor DecapBridge support it natively) is to run
**two separate `/admin` instances** with two separate DecapBridge
site registrations against the same repo:

- `/admin` — public content editors (Locations, Supporters, Hero Slides).
- `/admin-volunteers` — a second Decap CMS + DecapBridge site, config
  scoped to only the `volunteer-resources` collection, with its own
  separate collaborator list.

This doubles the DecapBridge site count (and likely cost, depending on
their pricing tiers, which aren't published in their docs at the time of
writing) and adds a second thing to keep in sync. Not recommended unless
actually needed — flagged here so it's a known option rather than a
surprise later.

## 7. Rollout plan

1. Register the repo with DecapBridge; pick Classic vs PKCE auth.
2. Add `public/admin/index.html` + `config.yml` with the three existing
   collections (§4). Verify locally (`npm run dev` → `/admin`) and on a
   Netlify preview deploy — Decap CMS's git-gateway-style backends need a
   real deployed origin for OAuth redirects to work, so this step can't
   be fully verified on `localhost` alone.
3. Invite one trusted maintainer as a DecapBridge collaborator, confirm
   they can edit and publish a Locations change end-to-end (commit shows
   up in git history).
4. Add the `volunteer-resources` collection to `src/content/config.ts`
   and `config.yml` (§5.1).
5. Build `src/pages/volunteers.astro` with the client-side gate (§5.2).
6. Update `CLAUDE.md` (`Content Management` section) and `README.md` to
   document the new `/admin` and `/volunteers` routes, and this
   document's §3 limitation about collaborator-level (not per-collection)
   access.
7. Decide, with the committee, whether anything currently planned for
   `volunteer-resources` actually needs §5.3's stronger protection before
   publishing real content there.

## Sources

- [DecapBridge — Introduction](https://decapbridge.com/docs/introduction)
- [DecapBridge — Getting started](https://decapbridge.com/docs/getting-started)
- [Decap CMS — Git Gateway backend](https://decapcms.org/docs/git-gateway-backend/)
- [Decap CMS — Is there a way to restrict content by Roles? (discussion #6216)](https://github.com/decaporg/decap-cms/discussions/6216)
- [Migrating away from Netlify Identity for Decap CMS](https://montagnenoirewebstudio.com/en/blog/migrating-netlify-identity/)
