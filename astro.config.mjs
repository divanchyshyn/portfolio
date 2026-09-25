// Astro configuration. `site` and `base` come from the environment so the same
// source builds correctly for both deploy targets:
//
// - Cloudflare Workers (the canonical site, https://divanchyshyn.com/):
//   no env vars needed, the defaults below apply.
// - GitHub Pages (project site at https://divanchyshyn.github.io/portfolio/):
//   `.github/workflows/deploy-pages.yml` sets ASTRO_SITE and ASTRO_BASE=/portfolio,
//   and this build is deployed there untouched.
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.ASTRO_SITE ?? 'https://divanchyshyn.com';
const base = process.env.ASTRO_BASE ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});