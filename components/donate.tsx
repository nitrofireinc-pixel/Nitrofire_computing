"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Heart, LoaderCircle, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CardSkeleton, ErrorNote } from "@/components/square-card";
import { donateApi, donateChips, donateEnabled, donateMaxUsd, donateMinUsd } from "@/lib/site";
import { api, cardStyle, EMAIL_RE, loadSquare, SDK, type SquareCard, type SquareEnv } from "@/lib/square";
import { cn } from "cn";

type Session = {
  id: string;
  token: string;
  appId: string;
  locationId: string;
  env: SquareEnv;
  amount: number;
};
type Result = { amount: number; emailed: boolean; test: boolean };
type Step = "amount" | "card" | "done";
type FieldErrors = { amount?: string; email?: string };

const AMOUNT_RE = /^\d{1,7}(\.\d{1,2})?$/;
const fmt = (cents: number) =>
  "$" + (cents % 100 ? (cents / 100).toFixed(2) : (cents / 100).toLocaleString("en-US"));

/** "12.50" / "$12.5" / "1,000" -> cents, or null if it isn't a plain dollar amount */
function parseCents(raw: string): number | null {
  const s = raw.replace(/[$,\s]/g, "");
  if (!AMOUNT_RE.test(s)) return null;
  return Math.round(Number(s) * 100);
}

function amountError(raw: string): string | undefined {
  if (!raw.trim()) return "Enter an amount.";
  const c = parseCents(raw);
  if (c === null) return "Enter an amount in dollars, like 5 or 12.50.";
  if (c < donateMinUsd * 100) return `Minimum is $${donateMinUsd}.`;
  if (c > donateMaxUsd * 100) return `Maximum is $${donateMaxUsd.toLocaleString("en-US")}.`;
  return undefined;
}

export function DonateButton({
  className,
  variant = "outline",
  label = "Support the project",
}: {
  className?: string;
  variant?: "default" | "outline";
  label?: string;
}) {
  if (!donateEnabled) return null;
  return <Donate className={cn(buttonVariants({ variant, size: "lg" }), className)} label={label} />;
}

function Donate({ className, label }: { className?: string; label: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const card = useRef<SquareCard | null>(null);
  const busyRef = useRef(false);
  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState("10");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [fieldError, setFieldError] = useState<FieldErrors>({});
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [cardReady, setCardReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const setBusyBoth = (v: boolean) => {
    busyRef.current = v;
    setBusy(v);
  };

  const open = () => {
    setError("");
    if (step === "done") {
      // a fresh donation each time the popup is reopened after a thank-you
      setStep("amount");
      setSession(null);
      setResult(null);
    }
    dialogRef.current?.showModal();
  };

  const close = useCallback(() => {
    if (busyRef.current) return;
    dialogRef.current?.close();
  }, []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onCancel = (e: Event) => {
      if (busyRef.current) e.preventDefault();
    };
    d.addEventListener("cancel", onCancel);
    return () => d.removeEventListener("cancel", onCancel);
  }, []);

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

  async function submitAmount(e: React.FormEvent) {
    e.preventDefault();
    if (busyRef.current) return;
    const errs: FieldErrors = { amount: amountError(amount) };
    const em = email.trim().toLowerCase();
    if (em && !EMAIL_RE.test(em)) errs.email = "Enter a valid email address, or leave it empty.";
    setFieldError(errs);
    setError("");
    if (errs.amount || errs.email) return;
    setBusyBoth(true);
    try {
      const s = await api<Session>(donateApi, {
        amount_cents: parseCents(amount),
        email: em || undefined,
        name: name.trim() || undefined,
        message: message.trim() || undefined,
      });
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
      const em = email.trim().toLowerCase();
      const t = await card.current.tokenize({
        amount: (session.amount / 100).toFixed(2),
        currencyCode: "USD",
        intent: "CHARGE",
        customerInitiated: true,
        sellerKeyedIn: false,
        // Square requires billingContact for CHARGE verification; it may be empty (email is optional here)
        billingContact: em ? { email: em } : {},
      });
      if (t.status !== "OK" || !t.token) {
        const msg = t.errors?.[0]?.message;
        throw new Error(msg ? `${msg}.`.replace(/\.\.$/, ".") : "Please check your card details.");
      }
      const r = await api<Result>(`${donateApi}/${session.id}/pay`, { token: session.token, source_id: t.token });
      setResult(r);
      setStep("done");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusyBoth(false);
    }
  }

  const sandbox = (session?.env ?? "production") !== "production";

  return (
    <>
      <button type="button" onClick={open} aria-haspopup="dialog" className={className}>
        <Heart aria-hidden />
        {label}
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby="donate-title"
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl bg-card p-0 text-card-foreground shadow-2xl ring-1 ring-border backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="donate-title" className="text-lg font-semibold">
                {step === "done" ? "Thank you!" : "Support RGBMatrixFX development"}
              </h2>
              {step !== "done" && (
                <p className="mt-1 text-sm text-muted-foreground">
                  RGBMatrixFX is free. Donations help fund new effects, more devices and fixes.
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

          {sandbox && step !== "amount" && (
            <p className="mt-3 inline-block rounded-md bg-secondary px-2 py-1 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
              Sandbox test mode
            </p>
          )}

          {step === "amount" && (
            <form onSubmit={submitAmount} noValidate className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="donate-amount">Amount (USD)</Label>
                <div className="grid grid-cols-4 gap-2" role="group" aria-label="Quick amounts">
                  {donateChips.map((v) => {
                    const on = parseCents(amount) === v * 100;
                    return (
                      <button
                        key={v}
                        type="button"
                        aria-pressed={on}
                        onClick={() => {
                          setAmount(String(v));
                          setFieldError((f) => ({ ...f, amount: undefined }));
                        }}
                        className={cn(
                          "h-10 rounded-xl text-sm font-medium ring-1 transition-colors ring-inset",
                          on
                            ? "bg-primary/15 text-primary ring-primary"
                            : "bg-input/30 text-foreground ring-input hover:ring-primary/60",
                        )}
                      >
                        ${v}
                      </button>
                    );
                  })}
                </div>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="donate-amount"
                    inputMode="decimal"
                    autoComplete="off"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    onBlur={() => amount.trim() && setFieldError((f) => ({ ...f, amount: amountError(amount) }))}
                    aria-invalid={!!fieldError.amount}
                    aria-describedby="donate-amount-help"
                    className="h-10 pl-7 focus-visible:border-primary focus-visible:ring-primary/30"
                  />
                </div>
                <p id="donate-amount-help" className={cn("text-xs", fieldError.amount ? "text-destructive" : "text-muted-foreground")}>
                  {fieldError.amount ?? `Any amount from $${donateMinUsd} to $${donateMaxUsd.toLocaleString("en-US")}.`}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="donate-email">
                  Email <span className="font-normal text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="donate-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!fieldError.email}
                  aria-describedby="donate-email-help"
                  className="h-10 focus-visible:border-primary focus-visible:ring-primary/30"
                />
                <p id="donate-email-help" className={cn("text-xs", fieldError.email ? "text-destructive" : "text-muted-foreground")}>
                  {fieldError.email ?? "For a thank-you note. Never shared."}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="donate-name">
                  Name <span className="font-normal text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="donate-name"
                  autoComplete="name"
                  maxLength={80}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10 focus-visible:border-primary focus-visible:ring-primary/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="donate-message">
                  Message <span className="font-normal text-muted-foreground">(optional)</span>
                </Label>
                <Textarea
                  id="donate-message"
                  rows={2}
                  maxLength={500}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-16 focus-visible:border-primary focus-visible:ring-primary/30"
                />
              </div>
              <ErrorNote message={error} />
              <button type="submit" disabled={busy} className={cn(buttonVariants({ size: "lg" }), "h-10 w-full")}>
                {busy ? <LoaderCircle className="animate-spin" aria-hidden /> : null}
                {busy ? "One moment…" : "Continue"}
              </button>
            </form>
          )}

          {step === "card" && session && (
            <form onSubmit={pay} className="mt-6 space-y-4" aria-busy={busy}>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="truncate text-muted-foreground">
                  Donation: <span className="text-foreground">{fmt(session.amount)}</span>
                </span>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => {
                    setError("");
                    setSession(null);
                    setStep("amount");
                  }}
                  className="shrink-0 text-primary hover:underline disabled:opacity-50"
                >
                  Change
                </button>
              </div>
              <div role="group" aria-labelledby="donate-card-label" className="space-y-2">
                <p id="donate-card-label" className="text-sm leading-none font-medium">
                  Card details
                </p>
                <div className="relative min-h-[142px]">
                  <div
                    ref={cardRef}
                    className={cn("transition-opacity duration-300", cardReady ? "opacity-100" : "opacity-0")}
                  />
                  {!cardReady && !error && <CardSkeleton />}
                </div>
              </div>
              <ErrorNote message={error} />
              <button
                type="submit"
                disabled={busy || !cardReady}
                className={cn(buttonVariants({ size: "lg" }), "h-10 w-full")}
              >
                {busy ? <LoaderCircle className="animate-spin" aria-hidden /> : null}
                {busy ? "Processing…" : `Donate ${fmt(session.amount)}`}
              </button>
            </form>
          )}

          {step === "done" && result && (
            <div className="mt-5 space-y-4" role="status">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Heart aria-hidden className="size-5" />
                </span>
                <p className="text-sm leading-6 text-muted-foreground">
                  Your <span className="text-foreground">{fmt(result.amount)}</span> donation is in. It really
                  helps keep RGBMatrixFX going.
                </p>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                {result.emailed ? "We sent a thank-you note to your email. " : ""}
                {email.trim() ? "Your receipt is sent separately." : "Thanks for being part of the project."}
              </p>
              <button type="button" onClick={close} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-10 w-full")}>
                Close
              </button>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}

/** A short "Support the project" block with the Donate button; renders nothing unless NEXT_PUBLIC_DONATE=on. */
export function DonateCallout({
  tone = "brand",
  title = "Support the project",
  text = "RGBMatrixFX is free and open source. If it brightens your setup, a donation helps fund new effects, more devices and fixes.",
  className,
}: {
  tone?: "brand" | "product";
  title?: string;
  text?: string;
  className?: string;
}) {
  if (!donateEnabled) return null;
  const product = tone === "product";
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-xl p-5 ring-1 sm:flex-row sm:items-center sm:justify-between",
        product ? "bg-[#18181c] ring-[#2b2b33]" : "bg-card/60 ring-border",
        className,
      )}
    >
      <div className="space-y-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className={cn("max-w-xl text-sm leading-6", product ? "text-[#8c8c96]" : "text-muted-foreground")}>{text}</p>
      </div>
      <Donate
        label="Donate"
        className={cn(
          buttonVariants({ variant: "outline", size: "lg" }),
          "shrink-0",
          product && "border-[#44d62c]/40 bg-transparent text-[#44d62c] hover:bg-[#44d62c]/10 hover:text-[#5be044]",
        )}
      />
    </div>
  );
}
