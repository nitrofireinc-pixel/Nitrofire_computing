# Nitrofire Computing

Source for [nitrofirecomputing.com](https://nitrofirecomputing.com).

Next.js App Router, Tailwind CSS v4, shadcn/ui, and the Geist and Geist Mono fonts. Pages are statically exported and served by a Cloudflare Worker (Workers static assets). The support form does not store messages: it validates in the browser, then copies the message or opens the visitor’s mail client.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

`/` introduces Nitrofire Computing and the RGBMatrixFX products. The catalog is `/software`. The product page is `/rgbmatrixfx`. Pricing is `/pricing`. Support is `/support` (`/contact` shows the same page and points canonical URLs at `/support`). Refunds, terms, and privacy are `/refunds`, `/terms`, and `/privacy`.

RGBMatrixFX Pro checkout is a popup with Square’s card form (`components/pro-checkout.tsx`): email (entered twice), then the card, then the license key with a copy button and the download link. The site Worker forwards `/api/checkout*` to the license Worker through the `LICENSE` service binding, which charges the card with Square’s Payments API and mints the key; the browser only talks to this site. Square’s SDK is loaded from `sandbox.web.squarecdn.com` or `web.squarecdn.com`, whichever environment the license Worker reports. The site sends no Content-Security-Policy; if one is added, allow Square’s Web Payments SDK domains.

The popup is off unless the site is built with `NEXT_PUBLIC_PRO_CHECKOUT=on`; otherwise every buy control stays on “Coming soon”.

Staging (Square sandbox): `NEXT_PUBLIC_PRO_CHECKOUT=on npm run build && npx wrangler deploy -c wrangler.staging.jsonc` deploys the separate Worker `nitrofire-computing-staging` (workers.dev only), bound to `rgbmatrixfx-license-staging`.

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

`compatibility_date` is `2026-10-13`, the newest date Wrangler 4.150 accepts. `/software` and `/rgbmatrixfx` are pages in the static export. Files under `/software/` such as screenshots are served as assets. Unknown paths return the site 404 page.

## Deploy

`wrangler.jsonc` names the Worker **`nitrofire-computing`**, which is the live Worker for https://nitrofirecomputing.com.

**`npx wrangler deploy` replaces that Worker.** The config binds two custom domains, `nitrofirecomputing.com` and `www.nitrofirecomputing.com`. Wrangler replaces that Worker’s custom-domain set with the hostnames in `routes`, so both must stay listed. `license.nitrofirecomputing.com` is a different Worker (`rgbmatrixfx-license`) and is not in this file. `workers_dev` and `preview_urls` stay enabled, matching the Worker before this repo’s first deploy.

1. `npx wrangler login` with the account that owns the Worker.
2. `npm run build` (add `NEXT_PUBLIC_PRO_CHECKOUT=on` once the license Worker has live Square settings)
3. `npx wrangler deploy`

Nothing in the npm scripts runs a deploy.

## Why this deploy path

The live site is a prerendered Next.js app (Turbopack `/_next` output, `cf-cache-status: HIT`) with no server data. A static export plus a small Worker for the `/software` and `/rgbmatrixfx` redirects matches that and deploys with Wrangler. Cloudflare’s current Next.js guide prefers [vinext](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/) for new apps that need the Next server runtime on Workers. This site does not: the pages are static, and the form never leaves the browser. OpenNext would add that same unused server runtime.
