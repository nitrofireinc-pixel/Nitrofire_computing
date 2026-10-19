"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy, Download, LoaderCircle, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { proCheckoutApi, rgb } from "@/lib/site";
import { cn } from "cn";

// Square Web Payments SDK (loaded from Square only after the buyer enters their email).
type TokenResult = {
  status: string;
  token?: string;
  errors?: { message?: string }[];
};
type SquareCard = {
  attach: (target: string | HTMLElement) => Promise<void>;
  tokenize: (details?: Record<string, unknown>) => Promise<TokenResult>;
  destroy: () => Promise<boolean>;
};
type SquarePayments = {
  card: (options?: { style?: Record<string, Record<string, string>> }) => Promise<SquareCard>;
};
declare global {
  interface Window {
    Square?: { payments: (appId: string, locationId: string) => SquarePayments };
  }
}

type Session = {
  id: string;
  token: string;
  appId: string;
  locationId: string;
  env: "sandbox" | "production";
};
type Result = {
  license: string;
  download: string;
  claim: string;
  emailed: boolean;
  email: string;
  test: boolean;
};
type Step = "email" | "card" | "done";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SDK = {
  sandbox: "https://sandbox.web.squarecdn.com/v1/square.js",
  production: "https://web.squarecdn.com/v1/square.js",
} as const;

// Square card box styling. Only the selectors and properties Square documents for
// CardClassSelectors are used (developer.squareup.com/docs/web-payments/customize-styles).
// Colors match the popup: --card #071226, Input bg (white 4% over card) #111c2f,
// --input border over card #2a3344, --primary #ff7200 (Pay button), --destructive #ff6568,
// --muted-foreground #9aa8c0, radius 12px (--radius, same as the email fields).
// fontSize stays at 16px: Square's maximum, and it stops iOS from zooming into the field.
const cardStyle = {
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
function loadSquare(src: string): Promise<void> {
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

async function api<T>(path: string, body: unknown): Promise<T> {
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

export function ProCheckout({ className }: { className?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const card = useRef<SquareCard | null>(null);
  const busyRef = useRef(false);
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [confirm, setConfirm] = useState("");
  const [fieldError, setFieldError] = useState<{ email?: string; confirm?: string }>({});
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [cardReady, setCardReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);

  const setBusyBoth = (v: boolean) => {
    busyRef.current = v;
    setBusy(v);
  };

  const open = () => {
    setError("");
    dialogRef.current?.showModal();
  };

  const close = useCallback(() => {
    if (busyRef.current) return;
    dialogRef.current?.close();
  }, []);

  // keep the dialog open while a payment is in flight (Escape / backdrop)
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onCancel = (e: Event) => {
      if (busyRef.current) e.preventDefault();
    };
    d.addEventListener("cancel", onCancel);
    return () => d.removeEventListener("cancel", onCancel);
  }, []);

  // mount Square's card field when the card step starts
  useEffect(() => {
    if (step !== "card" || !session || !cardRef.current) return;
    let cancelled = false;
    setCardReady(false);
    (async () => {
      try {
        await loadSquare(SDK[session.env]);
        if (cancelled || !window.Square) return;
        const payments = window.Square.payments(session.appId, session.locationId);
        const c = await payments.card({ style: cardStyle });
        if (cancelled) {
          void c.destroy();
          return;
        }
        await c.attach(cardRef.current!);
        card.current = c;
        setCardReady(true);
      } catch {
        if (!cancelled) setError("The card form couldn't load. Please refresh the page and try again.");
      }
    })();
    return () => {
      cancelled = true;
      const c = card.current;
      card.current = null;
      if (c) void c.destroy();
    };
  }, [step, session]);

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    if (busyRef.current) return;
    const a = email.trim().toLowerCase();
    const b = confirm.trim().toLowerCase();
    const errs: { email?: string; confirm?: string } = {};
    if (!EMAIL_RE.test(a)) errs.email = "Enter a valid email address.";
    else if (a !== b) errs.confirm = "The email addresses don't match.";
    setFieldError(errs);
    setError("");
    if (errs.email || errs.confirm) return;
    setBusyBoth(true);
    try {
      const s = await api<Session>(proCheckoutApi, { email: a, email_confirm: b });
      setSession(s);
      setStep("card");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusyBoth(false);
    }
  }

  async function pay(e: React.FormEvent) {
    e.preventDefault();
    if (busyRef.current || !card.current || !session) return;
    setBusyBoth(true);
    setError("");
    try {
      const t = await card.current.tokenize({
        amount: rgb.priceUsd,
        currencyCode: "USD",
        intent: "CHARGE",
        customerInitiated: true,
        sellerKeyedIn: false,
        billingContact: { email: email.trim().toLowerCase() },
      });
      if (t.status !== "OK" || !t.token) {
        const msg = t.errors?.[0]?.message;
        throw new Error(msg ? `${msg}.`.replace(/\.\.$/, ".") : "Please check your card details.");
      }
      const r = await api<Result>(`${proCheckoutApi}/${session.id}/pay`, {
        token: session.token,
        source_id: t.token,
      });
      setResult(r);
      setStep("done");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusyBoth(false);
    }
  }

  async function copyKey() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.license);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const sandbox = (session?.env ?? "production") !== "production";

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className={className}
      >
        Buy Pro — {rgb.priceLabel}
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby="pro-checkout-title"
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl bg-card p-0 text-card-foreground shadow-2xl ring-1 ring-border backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="pro-checkout-title" className="text-lg font-semibold">
                {step === "done" ? "You're all set" : "RGBMatrixFX Pro"}
              </h2>
              {step !== "done" && (
                <p className="mt-1 text-sm text-muted-foreground">
                  One-time purchase of {rgb.priceLabel}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={close}
              disabled={busy}
              aria-label="Close"
              className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), "-mt-1 -mr-2")}
            >
              <X />
            </button>
          </div>

          {sandbox && step !== "email" && (
            <p className="mt-3 inline-block rounded-md bg-secondary px-2 py-1 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
              Sandbox test mode
            </p>
          )}

          {step === "email" && (
            <form onSubmit={submitEmail} noValidate className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pro-email">Email</Label>
                <Input
                  id="pro-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  autoFocus
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!fieldError.email}
                  aria-describedby="pro-email-help"
                  className="h-10 focus-visible:border-primary focus-visible:ring-primary/30"
                />
                <p id="pro-email-help" className={cn("text-xs", fieldError.email ? "text-destructive" : "text-muted-foreground")}>
                  {fieldError.email ?? "Your license key is sent here."}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pro-email2">Confirm email</Label>
                <Input
                  id="pro-email2"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  aria-invalid={!!fieldError.confirm}
                  aria-describedby={fieldError.confirm ? "pro-email2-err" : undefined}
                  className="h-10 focus-visible:border-primary focus-visible:ring-primary/30"
                />
                {fieldError.confirm && (
                  <p id="pro-email2-err" className="text-xs text-destructive">
                    {fieldError.confirm}
                  </p>
                )}
              </div>
              <ErrorNote message={error} />
              <button
                type="submit"
                disabled={busy}
                className={cn(buttonVariants({ size: "lg" }), "h-10 w-full")}
              >
                {busy ? <LoaderCircle className="animate-spin" aria-hidden /> : null}
                {busy ? "One moment…" : "Continue"}
              </button>
            </form>
          )}

          {step === "card" && (
            <form onSubmit={pay} className="mt-6 space-y-4" aria-busy={busy}>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="truncate text-muted-foreground">{email.trim().toLowerCase()}</span>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => {
                    setError("");
                    setSession(null);
                    setStep("email");
                  }}
                  className="shrink-0 text-primary hover:underline disabled:opacity-50"
                >
                  Change
                </button>
              </div>
              <div role="group" aria-labelledby="pro-card-label" className="space-y-2">
                <p id="pro-card-label" className="text-sm leading-none font-medium">
                  Card details
                </p>
                {/* Square renders the card fields in its own iframe (PCI); in this popup's width
                    it uses its two-line layout: a 97px iframe plus its 45px message line (measured on
                    Square SDK 1.87.0). The skeleton holds that space until it loads. */}
                <div className="relative min-h-[142px]">
                  <div
                    ref={cardRef}
                    className={cn("transition-opacity duration-300", cardReady ? "opacity-100" : "opacity-0")}
                  />
                  {!cardReady && !error && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 animate-pulse overflow-hidden rounded-xl bg-[#111c2f] ring-1 ring-[#2a3344] ring-inset"
                    >
                      <div className="flex h-12 items-center px-3.5">
                        <div className="h-2.5 w-28 rounded-full bg-[#2a3344]" />
                      </div>
                      <div className="grid h-12 grid-cols-3 items-center border-t border-[#2a3344] px-3.5">
                        <div className="h-2.5 w-12 rounded-full bg-[#2a3344]" />
                        <div className="h-2.5 w-10 rounded-full bg-[#2a3344]" />
                        <div className="h-2.5 w-10 rounded-full bg-[#2a3344]" />
                      </div>
                    </div>
                  )}
                  {!cardReady && !error && (
                    <span className="sr-only" role="status">Loading card form…</span>
                  )}
                </div>
              </div>
              <ErrorNote message={error} />
              <button
                type="submit"
                disabled={busy || !cardReady}
                className={cn(buttonVariants({ size: "lg" }), "h-10 w-full")}
              >
                {busy ? <LoaderCircle className="animate-spin" aria-hidden /> : null}
                {busy ? "Processing…" : `Pay ${rgb.priceLabel}`}
              </button>
            </form>
          )}

          {step === "done" && result && (
            <div className="mt-5 space-y-4" role="status">
              <p className="text-sm text-muted-foreground">Here is your RGBMatrixFX Pro license key.</p>
              <div className="rounded-xl bg-background p-3 font-mono text-xs leading-5 break-all select-all ring-1 ring-border">
                {result.license}
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={copyKey}
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-10 w-full sm:w-auto sm:flex-1")}
                >
                  {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
                  {copied ? "Copied" : "Copy key"}
                </button>
                <a
                  href={result.download}
                  className={cn(buttonVariants({ size: "lg" }), "h-10 w-full sm:w-auto sm:flex-1")}
                >
                  <Download aria-hidden />
                  Download Pro
                </a>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                {result.emailed
                  ? <>We also emailed your key to <span className="text-foreground">{result.email}</span>.</>
                  : <>Keep this key somewhere safe.</>}{" "}
                Install steps and a fresh download link are on{" "}
                <a href={result.claim} className="text-primary hover:underline">your key page</a>.
              </p>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}

function ErrorNote({ message }: { message: string }) {
  return (
    <p role="alert" className={cn("text-sm text-destructive", !message && "sr-only")}>
      {message}
    </p>
  );
}
