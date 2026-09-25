# Dmytro Ivanchyshyn — portfolio

A personal website for Dmytro Ivanchyshyn, .NET Tech Lead: experience, skills
and projects. Built with Astro and TypeScript, zero client-side JavaScript,
dark theme by default with a light option, fully responsive.

- **Canonical site:** <https://divanchyshyn.com/> (Cloudflare Workers, deploy
  behind a required human reviewer)
- **Mirror:** <https://divanchyshyn.github.io/portfolio/> (GitHub Pages,
  automatic deploy on push to `main`)

## Local development

```sh
npm install
npm run dev
```

Open the address Vite prints. All visible content lives in
[`src/data/cv.ts`](./src/data/cv.ts) — a typed module with the employment
history, skills, languages, education and projects. Editing what the site
says means editing that file; the components render it. The conventions,
theming contract and definition of done live in [`AGENTS.md`](./AGENTS.md).

## Quality gates

Every push and pull request runs lint, type check, tests, build and Lighthouse
budget assertions (`.github/workflows/ci.yml`):

```sh
npm run lint        # ESLint: core, Astro (incl. a11y), typescript-eslint
npm run check       # astro check: template + TypeScript diagnostics
npm run test        # Vitest: data integrity + rendered-section smoke tests
npm run build       # production build into dist/
```

Lighthouse budgets live in `lighthouserc.json`: performance ≥ 95,
accessibility = 100, best practices ≥ 95, SEO ≥ 90. A drop below a budget
fails CI.

Dependency and GitHub Actions updates arrive as weekly grouped Dependabot
pull requests, and CodeQL scans the code on pull requests and weekly.

## Deployment

Two deploy pipelines read from `main`, each publishing its own verified build:

- `.github/workflows/deploy-cloudflare.yml` runs all checks on `main`, stores
  the build as an artifact, then waits for a human to approve the
  `cloudflare-production` environment before `wrangler deploy` publishes it to
  [divanchyshyn.com](https://divanchyshyn.com/). Worker configuration lives in
  `wrangler.jsonc`.
- `.github/workflows/deploy-pages.yml` builds with `base: /portfolio` and
  publishes to GitHub Pages automatically, no approval step.

The two builds differ on purpose: `astro.config.mjs` reads `ASTRO_SITE` and
`ASTRO_BASE` from the environment, so the Pages build runs under `/portfolio/`
while the Cloudflare build sits at the domain root.

### One-time setup

These are account settings, not files, and must be done by hand once:

1. **Cloudflare secrets** — Settings → Secrets and variables → Actions:
   create `CLOUDFLARE_API_TOKEN` (a token with permission to deploy Workers on
   the account) and `CLOUDFLARE_ACCOUNT_ID`.

2. **`cloudflare-production` environment with a required reviewer** — do this
   *before* the first merge to `main`, otherwise the first deploy runs
   unreviewed: Settings → Environments → `cloudflare-production` → Required
   reviewers → add yourself.

3. **GitHub Pages** — Settings → Pages → Source: *GitHub Actions*.

4. **Custom domain** — after the first Cloudflare deploy creates the `portfolio`
   Worker, attach `divanchyshyn.com` to it in the Cloudflare dashboard
   (Worker → Settings → Domains & Routes). The domain is intentionally absent
   from `wrangler.jsonc` to keep account details out of the repository.

5. **Branch protection** — protect `main`: require a pull request, the CI and
   CodeQL checks, and a human review before merging.

## Updating content

Edit [`src/data/cv.ts`](./src/data/cv.ts) and run the checks above. The data
tests (`npm run test`) enforce required fields, ISO dates, ordering and
unique lists, and the component tests assert the rendered sections, so a
half-filled entry fails the build instead of shipping.
