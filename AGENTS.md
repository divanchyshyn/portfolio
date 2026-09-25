# Portfolio Agent Guide

## Project goal

A personal website for Dmytro Ivanchyshyn (.NET Tech Lead): who he is, his
experience, skills and projects. The site is deliberately simple visually but
modern, fully responsive, and equally at home on a phone or a 4K screen. The
CV markdown/pdf the site was originally filled from is source material only —
the typed data module under `src/data/` is what the site renders.

## Stack and deployment

- Astro with TypeScript and vanilla CSS. Zero client-side JavaScript: the only
  script is the inline theme bootstrap/toggle. Do not add a framework, a UI
  library, or client-side islands without a human decision.
- The site is fully static: no server-side rendering at request time, no API
  dependencies, no runtime secrets. Adding anything the browser needs at
  runtime from a server is an amendment to this rule, agreed deliberately,
  never an implementation detail.
- Cloudflare Workers serves the generated `dist/` directory as static assets,
  deployed by `.github/workflows/deploy-cloudflare.yml` behind the
  `cloudflare-production` environment's required reviewers (Worker
  configuration in `wrangler.jsonc`). This is the canonical site at
  <https://divanchyshyn.com/>.
- GitHub Pages keeps publishing the same site through
  `.github/workflows/deploy-pages.yml` automatically, with no approval step, at
  `https://divanchyshyn.github.io/portfolio/`.
- `site` and `base` come from the environment (`ASTRO_SITE`, `ASTRO_BASE`) so
  the two targets build differently on purpose: Pages builds with
  `base: /portfolio`, Cloudflare builds with the root base. Each deploy
  publishes its own verified build artifact — never a second, unchecked build.
- Reference every asset through Vite imports or `import.meta.env.BASE_URL`
  prefixes so both deploy targets work.

## Structure

```text
public/                                  Copied verbatim: robots.txt
src/assets/                              Committed artwork imported by components
src/components/                          One component per page section, with scoped styles
src/components/*.test.ts                 Component smoke tests (Container API)
src/data/cv.ts                           Typed single source of truth for all site content
src/data/cv.test.ts                      Data integrity tests
src/layouts/BaseLayout.astro             <head>, meta/SEO, theme bootstrap, header/footer shell
src/pages/index.astro                    The one page
src/pages/404.astro                      Not-found page (served by both hosts)
src/styles/global.css                    Design tokens, reset, shared primitives
astro.config.mjs                         Site/base from env, sitemap integration
vitest.config.ts                         Vitest on the Astro toolchain
eslint.config.js                         ESLint flat config (core, astro, typescript)
.github/workflows/ci.yml                 Lint, check, tests, build + Lighthouse budgets on pushes and pull requests
.github/workflows/deploy-pages.yml       Automatic GitHub Pages deploy on main
.github/workflows/deploy-cloudflare.yml  Cloudflare deploy on main behind required reviewers
.github/workflows/codeql.yml             CodeQL security analysis
.github/dependabot.yml                   Weekly dependency and GitHub Actions updates
```

## Content

- All visible content lives in `src/data/cv.ts`. Editing what the site says
  means editing that file, never hard-coding text inside components.
- Experience entries are ordered most-recent-first; the data tests enforce
  required fields, ISO `YYYY-MM` dates, ordered periods and unique tech lists.
- The employment history mirrors the CV. When the CV changes, update
  `src/data/cv.ts` in the same change as any claim it affects (for example
  `profile.careerStart`, which `yearsOfExperience()` derives the headline
  number from).

## Naming

- Every name in the codebase is English: file names, component and file names,
  exported helpers, data keys, CSS class names, comments, test names, docs.
- Asset filenames are English kebab-case describing the subject
  (`profile.jpg`, `og.jpg`). Assets are not routes, so they may be renamed,
  replaced or added freely as long as every import moves with them.

## Theming and design direction

- Dark theme is the default; a light theme exists as an explicit visitor
  choice. The contract: `localStorage` key `theme` with values `light` |
  `dark`, applied as `document.documentElement.dataset.theme`. The bootstrap
  in `BaseLayout.astro` and the toggle in `Header.astro` implement this
  contract together; when touching either, re-check the flash-of-wrong-theme
  behaviour (the bootstrap must stay in `<head>`, inline, before paint).
- Colours are CSS custom properties in `src/styles/global.css`. Both palettes
  must keep text/background pairs at WCAG AA contrast (4.5:1) or better;
  check any new colour against the theme it renders in.
- Layouts are mobile-first and responsive; verify changes at narrow widths.
  Text must remain readable and tap targets usable.
- Respect `prefers-reduced-motion`, keep a skip link, keep semantic headings
  (one `h1`, sections as `h2`, entries as `h3`) and visible focus states.
  Accessibility is asserted at 100 in Lighthouse CI — treat any drop as a
  regression to fix, not a budget to relax.

## Testing

- Vitest. Data tests in `src/data/cv.test.ts` guard content integrity;
  component smoke tests render `.astro` components through the Astro
  Container API (`experimental_AstroContainer`) and assert what the rendered
  HTML contains. Tests compare against escaped text (`&` renders as `&amp;`).
- Test files sit next to the code they cover as `*.test.ts` and are never
  imported by a page, so they stay out of the production build.
- Cover data changes with data tests and section changes with at least one
  rendered assertion. Keep tests deterministic: `yearsOfExperience` accepts a
  fixed `now` for exactly this reason.

## CI

`.github/workflows/ci.yml` runs lint, type check, the test suite, the build
and Lighthouse budget assertions on every push and pull request.
`.github/workflows/deploy-cloudflare.yml` runs the same checks on `main` and
then waits, behind the `cloudflare-production` environment's required
reviewers, for a human to approve the deploy. `.github/workflows/
deploy-pages.yml` publishes to GitHub Pages automatically. Failing checks can
therefore never reach either host, and nothing reaches divanchyshyn.com
without approval. Keep all workflows green before handing off changes.

## Linting

- `npm.cmd run lint` runs ESLint (flat config in `eslint.config.js`): core
  recommended rules, Astro component rules (including a11y), and
  typescript-eslint recommended for `.ts` files. The TS configs are scoped to
  `**/*.ts` on purpose: unrestricted, they would claim `**/*.astro` and
  replace the Astro parser, so do not "simplify" that mapping away.
- `npm.cmd run check` runs `astro check` for template and TypeScript errors.
- Fix findings at the source instead of adding suppressions. If a suppression
  is truly warranted, scope it to the line with a comment explaining why.
- Browser globals are enabled for `src/` and `.astro` files; Node globals for
  the config files at the repo root.

## Implementation expectations

- Prefer small components and plain CSS over adding styling or state libraries.
- Keep styles scoped inside each component; `src/styles/global.css` holds only
  tokens, the reset and genuinely shared primitives (`.container`, `.chip`,
  `.btn`, `.section`).
- New sections are a component plus a nav link, a data entry and a test.
- Build (`npm.cmd run build`), lint (`npm.cmd run lint`), check
  (`npm.cmd run check`), and test (`npm.cmd run test`) before handing off
  changes. For visual changes, also verify the affected section locally at
  desktop and phone widths (`npm.cmd run dev`).

## Definition of done

A change, whether written by a person or by the coding agent, is finished only
when:

- `npm.cmd run lint`, `npm.cmd run check`, `npm.cmd run test` and
  `npm.cmd run build` all pass (use `npm.cmd` in PowerShell on this machine).
- Content changes update `src/data/cv.ts` (plus its tests when the shape of
  the data changes), and the rendered sections stay covered by component tests.
- New components keep one semantic heading level and work on narrow screens.
- No new runtime or dev dependency is added without a human decision.
- The production build still contains `dist/index.html` and `dist/404.html`.
- No deploy happens outside the two workflows; the Cloudflare deploy is always
  human-approved.

## Useful commands

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run build
npm.cmd run preview
npm.cmd run lint
npm.cmd run check
npm.cmd run test
npm.cmd run test:watch
```

Use `npm.cmd` in PowerShell on this machine because its execution policy may
block `npm.ps1`.