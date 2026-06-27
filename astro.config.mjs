import { defineConfig } from 'astro/config';

// Deployed as a GitHub Pages project site. The account's verified custom domain
// serves it at tangemicioglu.com/itr-atlas/. Internal links built via
// src/lib/url.ts respect the `/itr-atlas` base, so they resolve correctly under
// the custom domain and the github.io fallback alike.
export default defineConfig({
  site: 'https://tangemicioglu.com',
  base: '/itr-atlas',
});
