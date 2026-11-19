import { donateMaxUsd, donateMinUsd, rgb } from "@/lib/site";

/** Remember that the post-download donation card was dismissed or a donation was made. */
export const DOWNLOAD_DONATE_STORAGE_KEY = "nfc-download-donate-seen";

export const OPEN_DONATE_EVENT = "nfc:open-donate";
export const OPEN_DOWNLOAD_DONATE_EVENT = "nfc:open-download-donate";

export type OpenDonateDetail = { amount?: string };

declare global {
  interface WindowEventMap {
    "nfc:open-donate": CustomEvent<OpenDonateDetail>;
    "nfc:open-download-donate": Event;
  }
}

const AMOUNT_RE = /^\d{1,7}(\.\d{1,2})?$/;

/** "12.50" / "$12.5" / "1,000" -> cents, or null if it isn't a plain dollar amount */
export function parseCents(raw: string): number | null {
  const s = raw.replace(/[$,\s]/g, "");
  if (!AMOUNT_RE.test(s)) return null;
  return Math.round(Number(s) * 100);
}

export function amountError(raw: string): string | undefined {
  if (!raw.trim()) return "Enter an amount.";
  const c = parseCents(raw);
  if (c === null) return "Enter an amount in dollars, like 5 or 12.50.";
  if (c < donateMinUsd * 100) return `Minimum is $${donateMinUsd}.`;
  if (c > donateMaxUsd * 100) return `Maximum is $${donateMaxUsd.toLocaleString("en-US")}.`;
  return undefined;
}

/** Normalized dollar string ("10" or "12.50"), or null if the amount is not allowed. */
export function normalizeDonateAmount(raw: string): string | null {
  if (amountError(raw)) return null;
  const c = parseCents(raw);
  if (c === null) return null;
  return c % 100 ? (c / 100).toFixed(2) : String(c / 100);
}

export function hasDownloadDonateBeenSeen(): boolean {
  try {
    return window.localStorage.getItem(DOWNLOAD_DONATE_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function rememberDownloadDonate(): void {
  try {
    window.localStorage.setItem(DOWNLOAD_DONATE_STORAGE_KEY, "1");
  } catch {
    /* private mode or disabled storage: the card may show again */
  }
}

/** Open the site's existing Square donate checkout, optionally with a pre-filled amount. */
export function openDonateCheckout(detail?: OpenDonateDetail): void {
  window.dispatchEvent(new CustomEvent(OPEN_DONATE_EVENT, { detail: detail ?? {} }));
}

/** Show the post-download thank-you donation card (no-op if nothing is listening). */
export function requestDownloadDonateCard(): void {
  window.dispatchEvent(new Event(OPEN_DOWNLOAD_DONATE_EVENT));
}

/** Open the free RGBMatrixFX releases page in a new tab so this page can stay put. */
export function startFreeDownload(href: string = rgb.releases): void {
  const a = document.createElement("a");
  a.href = href;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  a.remove();
}
