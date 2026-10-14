# Nitrofire Computing

Source for [nitrofirecomputing.com](https://nitrofirecomputing.com).

Next.js App Router, Tailwind CSS v4, shadcn/ui, and the Geist and Geist Mono fonts. Pages are statically exported and served by a Cloudflare Worker (Workers static assets). The contact form does not store messages: it validates in the browser, then copies the brief or opens the visitor’s mail client.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

`/` is the RGBMatrixFX page. The studio pitch, including the Our software card, is at `/services`. `/software` and `/rgbmatrixfx` redirect to `/`. In `next dev` those redirects are client-side. The deployed Worker returns HTTP 301.

## Production build

```bash
npm run build
```

Static files are written to `out/`.

Preview the Worker locally (does not touch Cloudflare):

```bash
npm run build
npx wrangler dev
```

`compatibility_date` is `2026-10-13`, the newest date Wrangler 4.150 accepts. `/software` and `/rgbmatrixfx` (with or without a trailing slash) return 301 to `/`. Files under `/software/` such as screenshots are served as assets. Unknown paths return the site 404 page.

## Deploy

`wrangler.jsonc` names the Worker **`nitrofire-computing`**, which is the live Worker for https://nitrofirecomputing.com.

**`npx wrangler deploy` replaces that Worker.** Do not run it until you intend to replace the live site. This repo’s setup does not declare a custom domain or route. Confirm the existing `nitrofirecomputing.com` binding in the Cloudflare dashboard before and after the first deploy; Wrangler can overwrite routes that are listed in config, and this config lists none.

1. `npx wrangler login` with the account that owns the Worker.
2. `npm run build`
3. `npx wrangler deploy`

Nothing in the npm scripts runs a deploy.

## Why this deploy path

The live site is a prerendered Next.js app (Turbopack `/_next` output, `cf-cache-status: HIT`) with no server data. A static export plus a small Worker for the `/software` and `/rgbmatrixfx` redirects matches that and deploys with Wrangler. Cloudflare’s current Next.js guide prefers [vinext](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/) for new apps that need the Next server runtime on Workers. This site does not: the pages are static, and the form never leaves the browser. OpenNext would add that same unused server runtime.
