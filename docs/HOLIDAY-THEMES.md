# Holiday themes: technical handoff

Audience: the assistant/developer who builds the on/off backend. Status: code merged, **off by default**, nothing deployed.

## Files
| Path | Role |
|---|---|
| `components/halloween-overlay.tsx` | Existing Halloween overlay (PR #6). Server-renderable JSX; renders only when `NEXT_PUBLIC_HOLIDAY_THEME === "halloween"`. Unchanged. CSS: `.hw-*` in `app/globals.css`. |
| `components/holiday-themes.tsx` | `"use client"` `HolidayThemes()`; returns `null`, mounts in `useEffect`, cleanup on unmount/key change. Ignores `halloween` and empty. |
| `lib/holiday-themes.js` | `// @ts-nocheck` port. Exports `HOLIDAY_THEME_KEYS: string[]` and `mountHolidayTheme(key: string): (() => void) \| null`. Injects one `<style>` + one `<div id="nf-holiday-<key>">`; returns cleanup removing both. Unknown key → `null`. Idempotent (no-op if id exists). |
| `app/layout.tsx` | Renders `<HalloweenOverlay />` then `<HolidayThemes />` at end of `<body>`. |

## Key flow (today)
`NEXT_PUBLIC_HOLIDAY_THEME` (inlined at **build time** by Next) → trimmed/lowercased in `HolidayThemes` → `mountHolidayTheme(key)` in `useEffect` (client only, static export safe). `halloween` → HalloweenOverlay JSX instead. Unset/unknown → nothing. No date auto-pick. Changing theme = rebuild + deploy.

## Themes
| Key | Label | Suggested window | Motion |
|---|---|---|---|
| `halloween` | Halloween (existing overlay: webs, spider, bat) | Oct 1 – Oct 31 | yes |
| `newyear` | New Year's | Dec 31 – Jan 2 | yes |
| `mlk` | Martin Luther King Jr. Day | 3rd Mon of Jan (Fri–Mon) | no |
| `presidents` | Presidents' Day | 3rd Mon of Feb (Fri–Mon) | yes |
| `valentines` | Valentine's Day | Feb 10 – Feb 14 | yes |
| `stpatricks` | St. Patrick's Day | Mar 14 – Mar 17 | yes |
| `easter` | Easter / Spring | Good Friday – Easter Monday | yes |
| `memorial` | Memorial Day | Last Mon of May (Sat–Mon) | no |
| `juneteenth` | Juneteenth | Jun 17 – Jun 19 | yes |
| `july4` | Independence Day | Jul 1 – Jul 5 | yes |
| `labor` | Labor Day | 1st Mon of Sep (Fri–Mon) | yes |
| `indigenous` | Columbus Day / Indigenous Peoples' Day | 2nd Mon of Oct (Sat–Mon) | yes |
| `halloweendrum` | Halloween (band add-on) | Oct 24 – Oct 31 | yes |
| `veterans` | Veterans Day | Nov 9 – Nov 11 | no |
| `thanksgiving` | Thanksgiving | Mon – Sun of Thanksgiving week | yes |
| `hanukkah` | Hanukkah | 8 nights (2026: Dec 4–12 · 2027: Dec 24–Jan 1 · 2028: Dec 12–20) | yes |
| `winter` | Winter (December, non-denominational) | Dec 1 – Dec 20 (and Jan 3 – Jan 15 if wanted) | yes |
| `christmas` | Christmas | Dec 21 – Dec 26 | yes |
Moving dates: MLK (3rd Mon Jan), Presidents (3rd Mon Feb), Memorial (last Mon May), Labor (1st Mon Sep), Indigenous (2nd Mon Oct), Thanksgiving (4th Thu Nov), Easter (computus). Hanukkah: 2026 Dec 4–12, 2027 Dec 24–Jan 1, 2028 Dec 12–20. "Motion: no" = `solemn` (no particles); the centre piece still sways unless reduced motion.

## Enable / disable (current, build-time)
```
rm -rf .next out
NEXT_PUBLIC_PRO_CHECKOUT=on NEXT_PUBLIC_DONATE=on NEXT_PUBLIC_HOLIDAY_THEME=<key> npm run build
npx -y node@22 node_modules/wrangler/bin/wrangler.js deploy   # only with Trevor's approval
```
Off: same, omitting `NEXT_PUBLIC_HOLIDAY_THEME`. Always `rm -rf .next out` (stale Turbopack cache once dropped CSS).

## Layout decisions
- Layer: `position:fixed; top:4.5rem` (5rem ≥640px) = header height (`h-[4.5rem] sm:h-20`), so nothing covers logo/nav. `z-index:30`: above content, below sticky header (z-40) and `<dialog>` top layer. Same as `.hw-overlay`.
- `pointer-events:none`, `aria-hidden`, `contain:strict`.
- Pieces: top garland strip, mirrored top corner clusters (200px desktop / 96px phone, top two pieces hidden on phone), glowing centre piece at `left:50%` under the header (84px / 48px phone), up to 10 falling particles (5 on phone).
- Dark bg (#010516): white drop-shadow glow added to garland and corners because the pack's dark ink outlines (`HT_INK #16202c`) vanish on dark.
- `prefers-reduced-motion`: all animation off, particles hidden. Hidden ≤340px and in print.

## Provenance
- Source: `/workspace/efhs-deploy/site-content.js` (efhsband), commit `4d5ffd1` (top-corner/centre layout, no bottom badge) on top of `56ab543` (Halloween glow). Lines ~3152–3315 copied verbatim (HT_* art, garland, particles, corner pieces); `mountHolidayTheme` rewritten (ids `nf-holiday-*`, z-30, below-header offset, cleanup return; efhsband `placeCenter` header-gap logic dropped).
- Reference pack: `/workspace/efhs-holiday-themes/` (themes.json windows, README).
- Removed: efhsband CMS `holiday_theme` setting, `HOLIDAY_THEMES` whitelist in worker.mjs, D1 site_content, admin.js checkbox.

## Caveats
- Centre pieces are **band instruments** (trumpet, snare, sax…) from the efhsband design: off-brand for Nitrofire; swap `HT_INSTR`/`motif` art before going live.
- Screenshot-checked only a few themes (see PR report); others build but are visually unverified on the Nitrofire header.
- Some pack colours (navy bunting, dark poppies) are low contrast on #010516 even with glow.
- `halloweendrum` is an alternative Halloween; `halloween` stays the existing overlay.

## Future backend: implementation plan
1. **Data model**: single setting `holiday_theme` (string key or `""`), optional `holiday_auto` (bool), `updated_at`. Store in the license Worker's D1 (`settings` table: `key TEXT PRIMARY KEY, value TEXT`) or a KV key. One active theme at a time.
2. **Whitelist**: validate against `HOLIDAY_THEME_KEYS` + `halloween` on write (copy the list into the Worker; keep in sync).
3. **Endpoints** (license Worker):
   - `GET /public/holiday-theme` → `{ "theme": "<key>|" }`, CORS for nitrofirecomputing.com, `Cache-Control: public, max-age=300`.
   - `POST /admin/holiday-theme` `{ theme, auto }` → auth required.
4. **Auth**: reuse existing admin auth on `license.nitrofirecomputing.com/admin` (session/Access); never expose the write route publicly; CSRF-protect form.
5. **Admin UI**: dropdown of keys + "Off", optional "auto by date" toggle, preview link.
6. **Client**: make selection runtime. In `HolidayThemes`, fetch the public endpoint in `useEffect` (AbortController, ~3s timeout), cache in `sessionStorage` for 5 min. Fallback on failure: `NEXT_PUBLIC_HOLIDAY_THEME` build value, else nothing (never block render).
7. **Halloween**: currently build-time JSX. Either (a) make `HalloweenOverlay` a client component taking `active: boolean` and render it from `HolidayThemes` when key = `halloween`, keeping markup/CSS identical; or (b) toggle a `data-holiday="halloween"` attribute on `<html>` and gate `.hw-overlay` via CSS. Remove the env check inside it once runtime selection works.
8. **Auto-schedule (optional)**: compute active key from windows above (Nth-weekday helper, Easter computus, Hanukkah table) in the Worker so the client stays dumb; manual setting overrides auto.
9. **Preview mode**: `?holiday=<key>` query param honoured client-side (whitelisted) to preview without changing the setting.
10. Test: each key mounts/unmounts cleanly, no layout shift, header/menus clickable, reduced-motion static.

## efhsband original (reference)
CMS Site settings checkbox → D1 `site_content.holiday_theme` (one key or empty) → worker.mjs whitelists against `HOLIDAY_THEMES` and returns it in the public settings payload → site-content.js `mounts = { halloween: mountHalloweenOverlay, ...EFHS_HOLIDAY_MOUNTS }[key]()`. Kill switch: `HOLIDAY_THEMES_ENABLED=false` or `no-holiday-theme` class on html/body. No scheduling.
