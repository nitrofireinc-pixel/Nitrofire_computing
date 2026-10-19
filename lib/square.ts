// Shared Square Web Payments helpers for the Buy Pro and Donate popups.
// The SDK is loaded from Square only once a popup reaches its card step.

export type TokenResult = {
  status: string;
  token?: string;
  errors?: { message?: string }[];
};
export type SquareCard = {
  attach: (target: string | HTMLElement) => Promise<void>;
  tokenize: (details?: Record<string, unknown>) => Promise<TokenResult>;
  destroy: () => Promise<boolean>;
};
export type SquarePayments = {
  card: (options?: { style?: Record<string, Record<string, string>> }) => Promise<SquareCard>;
};
declare global {
  interface Window {
    Square?: { payments: (appId: string, locationId: string) => SquarePayments };
  }
}

export type SquareEnv = "sandbox" | "production";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const SDK = {
  sandbox: "https://sandbox.web.squarecdn.com/v1/square.js",
  production: "https://web.squarecdn.com/v1/square.js",
} as const;

// Square card box styling. Only the selectors and properties Square documents for
// CardClassSelectors are used (developer.squareup.com/docs/web-payments/customize-styles).
// Colors match the popup: --card #071226, Input bg (white 4% over card) #111c2f,
// --input border over card #2a3344, --primary #ff7200 (Pay button), --destructive #ff6568,
// --muted-foreground #9aa8c0, radius 12px (--radius, same as the email fields).
// fontSize stays at 16px: Square's maximum, and it stops iOS from zooming into the field.
export const cardStyle = {
  ".input-container": {
    borderColor: "#2a3344",
    borderRadius: "12px",
    borderWidth: "1px",
  },
  ".input-container.is-focus": { borderColor: "#ff7200" },
  ".input-container.is-error": { borderColor: "#ff6568" },
  input: {
    backgroundColor: "#111c2f",
    color: "#f3f6fb",
    fontFamily: "helvetica neue, sans-serif",
    fontSize: "16px",
    fontWeight: "normal",
  },
  "input.is-focus": { backgroundColor: "#111c2f", color: "#f3f6fb" },
  "input.is-error": { color: "#ff6568" },
  "input::placeholder": { color: "#9aa8c0" },
  "input.is-focus::placeholder": { color: "#6f7d96" },
  "input.is-error::placeholder": { color: "#ff6568" },
  ".message-text": { color: "#9aa8c0" },
  ".message-icon": { color: "#9aa8c0" },
  ".message-text.is-error": { color: "#ff6568" },
  ".message-icon.is-error": { color: "#ff6568" },
};

let sdkPromise: Promise<void> | null = null;
let sdkSrc = "";
export function loadSquare(src: string): Promise<void> {
  if (window.Square && sdkSrc === src) return Promise.resolve();
  if (sdkPromise && sdkSrc === src) return sdkPromise;
  sdkSrc = src;
  sdkPromise = new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      sdkPromise = null;
      s.remove();
      reject(new Error("load"));
    };
    document.head.appendChild(s);
  });
  return sdkPromise;
}

export async function api<T>(path: string, body: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(path, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("We couldn't connect. Check your internet connection and try again.");
  }
  const data = (await res.json().catch(() => ({}))) as T & { error?: string };
  if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
  return data;
}
