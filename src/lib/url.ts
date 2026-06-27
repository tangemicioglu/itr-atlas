/**
 * Build a site-internal URL that respects Astro's configured `base`.
 *
 * `import.meta.env.BASE_URL` always ends with a trailing slash ("/" at the
 * site root, "/itr-atlas/" when deployed under a sub-path). Vite inlines this
 * value at build time, so the helper works in both `.astro` frontmatter and
 * client-side `<script>` blocks.
 */
export function url(path = "/"): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}` || "/";
}
