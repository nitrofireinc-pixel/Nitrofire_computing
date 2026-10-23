"use client";

// Effects page catalog + per-effect checkout. The catalog comes from the license Worker
// (/api/effects, proxied by worker/index.ts) and is edited on the admin page.
import { useCallback, useEffect, useRef, useState } from "react";
import { Download, LoaderCircle, Tag, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardSkeleton, ErrorNote } from "@/components/square-card";
import { api, cardStyle, EMAIL_RE, loadSquare, SDK, type SquareCard, type SquareEnv } from "@/lib/square";
import { cn } from "cn";

export type Effect = {
  slug: string;
  name: string;
  description: string;
  price: number;
  free: boolean;
  preview: string | null;
  download: string | null;
  available: boolean;
};
type Session = { id: string; token: string; appId: string; locationId: string; env: SquareEnv; amount: number };
type Done = { effect: string; claim: string; download: string; emailed: boolean; email: string; amount: number; test: boolean };
type Quote = { list: number; discount: number; total: number; coupon: { code: string; label: string } | null };

const usd = (c: number) => `$${(c / 100).toFixed(2)}`;

function Card({ e, onBuy }: { e: Effect; onBuy: (e: Effect) => void }) {
  return (
    <article className={cn("flex flex-col rounded-xl border bg-card/80 p-4", e.free ? "border-primary/60" : "border-border")}>
      {e.preview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={e.preview}
          alt={`${e.name} effect preview on a keyboard and mouse`}
          width={480}
          height={137}
          loading="lazy"
          decoding="async"
          className="aspect-[480/137] w-full rounded-lg bg-[#0a0a0d] object-cover"
        />
      ) : (
        <div className="aspect-[480/137] w-full rounded-lg bg-[#0a0a0d]" />
      )}
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h2 className="text-xl font-semibold">{e.name}</h2>
        {e.free ? (
          <p className="flex items-baseline gap-2">
            <s className="text-sm text-muted-foreground">{usd(e.price)}</s>
            <span className="font-mono text-sm font-semibold tracking-wider text-primary">FREE</span>
          </p>
        ) : (
          <p className="font-mono text-sm font-semibold">{usd(e.price)}</p>
        )}
      </div>
      <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{e.description}</p>
      {e.free && e.download ? (
        <>
          <a href={e.download} download className={cn(buttonVariants(), "mt-5 w-full")}>
            <Download aria-hidden="true" /> Free download
          </a>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            In RGBMatrixFX Pro, choose File &gt; Import presets and pick the file.
          </p>
        </>
      ) : e.available ? (
        <button type="button" onClick={() => onBuy(e)} aria-haspopup="dialog" className={cn(buttonVariants(), "mt-5 w-full")}>
          Buy — {usd(e.price)}
        </button>
      ) : (
        <button type="button" disabled className={cn(buttonVariants({ variant: "outline" }), "mt-5 w-full")}>
          Coming soon
        </button>
      )}
    </article>
  );
}

function Skeleton() {
  return (
    <div className="flex animate-pulse flex-col rounded-xl border border-border bg-card/80 p-4" aria-hidden>
      <div className="aspect-[480/137] w-full rounded-lg bg-[#0a0a0d]" />
      <div className="mt-4 h-5 w-32 rounded bg-secondary" />
      <div className="mt-3 h-3 w-full rounded bg-secondary" />
      <div className="mt-2 h-3 w-2/3 rounded bg-secondary" />
      <div className="mt-5 h-9 w-full rounded-lg bg-secondary" />
    </div>
  );
}

export function EffectsStore({ initial }: { initial?: Effect[] }) {
  const [effects, setEffects] = useState<Effect[] | null>(initial ?? null);
  const [loadError, setLoadError] = useState(false);
  const [buying, setBuying] = useState<Effect | null>(null);

  useEffect(() => {
    let off = false;
    fetch("/api/effects")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: { effects: Effect[] }) => !off && setEffects(d.effects))
      .catch(() => !off && setLoadError(true));
    return () => {
      off = true;
    };
  }, []);

  return (
    <>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {effects
          ? effects.map((e) => <Card key={e.slug} e={e} onBuy={setBuying} />)
          : !loadError && [0, 1, 2].map((i) => <Skeleton key={i} />)}
      </div>
      {loadError && !effects && (
        <p role="alert" className="mt-10 text-sm text-muted-foreground">
          The effects couldn&apos;t load. Please refresh the page.
        </p>
      )}
      <EffectCheckout key={buying?.slug ?? ""} effect={buying} onClose={() => setBuying(null)} />
    </>
  );
}

type Step = "details" | "card" | "done";

function EffectCheckout({ effect, onClose }: { effect: Effect | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const card = useRef<SquareCard | null>(null);
  const busyRef = useRef(false);
  const [step, setStep] = useState<Step>("details");
  const [email, setEmail] = useState("");
  const [confirm, setConfirm] = useState("");
  const [code, setCode] = useState("");
  const [quote, setQuote] = useState<Quote | null>(null);
  const [codeError, setCodeError] = useState("");
  const [fieldError, setFieldError] = useState<{ email?: string; confirm?: string }>({});
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [cardReady, setCardReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [done, setDone] = useState<Done | null>(null);

  const setBusyBoth = (v: boolean) => {
    busyRef.current = v;
    setBusy(v);
  };

  useEffect(() => {
    if (effect) dialogRef.current?.showModal();
  }, [effect]);

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
    const onClosed = () => onClose();
    d.addEventListener("cancel", onCancel);
    d.addEventListener("close", onClosed);
    return () => {
      d.removeEventListener("cancel", onCancel);
      d.removeEventListener("close", onClosed);
    };
  }, [onClose]);

  useEffect(() => {
    if (step !== "card" || !session || !cardRef.current) return;
    let cancelled = false;
    setCardReady(false);
    (async () => {
      try {
        await loadSquare(SDK[session.env]);
        if (cancelled || !window.Square) return;
        const c = await window.Square.payments(session.appId, session.locationId).card({ style: cardStyle });
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

  async function applyCode() {
    if (!effect || busyRef.current) return;
    const c = code.trim();
    setCodeError("");
    if (!c) {
      setQuote(null);
      return;
    }
    setBusyBoth(true);
    try {
      setQuote(await api<Quote>("/api/effects/quote", { slug: effect.slug, coupon: c }));
    } catch (err) {
      setQuote(null);
      setCodeError((err as Error).message);
    } finally {
      setBusyBoth(false);
    }
  }

  async function submitDetails(e: React.FormEvent) {
    e.preventDefault();
    if (!effect || busyRef.current) return;
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
      const r = await api<Session & Partial<Done> & { status?: string }>("/api/effects/checkout", {
        slug: effect.slug,
        email: a,
        email_confirm: b,
        coupon: quote?.coupon?.code ?? (code.trim() || undefined),
      });
      if (r.status === "paid") {
        setDone(r as unknown as Done);
        setStep("done");
      } else {
        setSession(r);
        setStep("card");
      }
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
        amount: (session.amount / 100).toFixed(2),
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
      setDone(await api<Done>(`/api/effects/checkout/${session.id}/pay`, { token: session.token, source_id: t.token }));
      setStep("done");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusyBoth(false);
    }
  }

  const total = quote ? quote.total : effect?.price ?? 0;
  const sandbox = session ? session.env !== "production" : !!done?.test;
  const field = "h-10 focus-visible:border-primary focus-visible:ring-primary/30";

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="fx-checkout-title"
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl bg-card p-0 text-card-foreground shadow-2xl ring-1 ring-border backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      {effect && (
        <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="fx-checkout-title" className="text-lg font-semibold">
                {step === "done" ? "You're all set" : effect.name}
              </h2>
              {step !== "done" && (
                <p className="mt-1 text-sm text-muted-foreground">Effect for RGBMatrixFX Pro · {usd(effect.price)}</p>
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

          {sandbox && (
            <p className="mt-3 inline-block rounded-md bg-secondary px-2 py-1 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
              Sandbox test mode
            </p>
          )}

          {step === "details" && (
            <form onSubmit={submitDetails} noValidate className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fx-email">Email</Label>
                <Input id="fx-email" type="email" inputMode="email" autoComplete="email" autoFocus required value={email}
                  onChange={(e) => setEmail(e.target.value)} aria-invalid={!!fieldError.email} aria-describedby="fx-email-help" className={field} />
                <p id="fx-email-help" className={cn("text-xs", fieldError.email ? "text-destructive" : "text-muted-foreground")}>
                  {fieldError.email ?? "Your download link is sent here."}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fx-email2">Confirm email</Label>
                <Input id="fx-email2" type="email" inputMode="email" autoComplete="email" required value={confirm}
                  onChange={(e) => setConfirm(e.target.value)} aria-invalid={!!fieldError.confirm} className={field} />
                {fieldError.confirm && <p className="text-xs text-destructive">{fieldError.confirm}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="fx-code">Coupon code</Label>
                <div className="flex gap-2">
                  <Input id="fx-code" autoComplete="off" autoCapitalize="characters" spellCheck={false} value={code}
                    onChange={(e) => {
                      setCode(e.target.value.toUpperCase());
                      setQuote(null);
                      setCodeError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        void applyCode();
                      }
                    }}
                    placeholder="Optional" aria-invalid={!!codeError} className={cn(field, "font-mono uppercase")} />
                  <button type="button" onClick={applyCode} disabled={busy || !code.trim()}
                    className={cn(buttonVariants({ variant: "outline" }), "h-10 shrink-0 px-4")}>
                    Apply
                  </button>
                </div>
                {codeError && <p className="text-xs text-destructive">{codeError}</p>}
                {quote?.coupon && (
                  <p className="flex items-center gap-1.5 text-xs text-primary">
                    <Tag className="size-3.5" aria-hidden /> {quote.coupon.code}: {quote.coupon.label}
                  </p>
                )}
              </div>
              <div className="flex items-baseline justify-between border-t border-border pt-4 text-sm">
                <span className="text-muted-foreground">Total</span>
                <span className="flex items-baseline gap-2 font-mono font-semibold">
                  {quote && quote.discount > 0 && <s className="text-xs font-normal text-muted-foreground">{usd(quote.list)}</s>}
                  {total === 0 ? "FREE" : usd(total)}
                </span>
              </div>
              <ErrorNote message={error} />
              <button type="submit" disabled={busy} className={cn(buttonVariants({ size: "lg" }), "h-10 w-full")}>
                {busy ? <LoaderCircle className="animate-spin" aria-hidden /> : null}
                {busy ? "One moment…" : total === 0 ? "Get it free" : "Continue"}
              </button>
            </form>
          )}

          {step === "card" && session && (
            <form onSubmit={pay} className="mt-6 space-y-4" aria-busy={busy}>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="truncate text-muted-foreground">{email.trim().toLowerCase()}</span>
                <button type="button" disabled={busy} onClick={() => { setError(""); setSession(null); setStep("details"); }}
                  className="shrink-0 text-primary hover:underline disabled:opacity-50">
                  Change
                </button>
              </div>
              <div role="group" aria-labelledby="fx-card-label" className="space-y-2">
                <p id="fx-card-label" className="text-sm leading-none font-medium">Card details</p>
                <div className="relative min-h-[142px]">
                  <div ref={cardRef} className={cn("transition-opacity duration-300", cardReady ? "opacity-100" : "opacity-0")} />
                  {!cardReady && !error && <CardSkeleton />}
                </div>
              </div>
              <ErrorNote message={error} />
              <button type="submit" disabled={busy || !cardReady} className={cn(buttonVariants({ size: "lg" }), "h-10 w-full")}>
                {busy ? <LoaderCircle className="animate-spin" aria-hidden /> : null}
                {busy ? "Processing…" : `Pay ${usd(session.amount)}`}
              </button>
            </form>
          )}

          {step === "done" && done && (
            <div className="mt-5 space-y-4" role="status">
              <p className="text-sm text-muted-foreground">
                {done.effect} is yours. In RGBMatrixFX Pro, choose File &gt; Import presets and pick the file.
              </p>
              <a href={done.download} className={cn(buttonVariants({ size: "lg" }), "h-10 w-full")}>
                <Download aria-hidden /> Download {done.effect}
              </a>
              <p className="text-sm leading-6 text-muted-foreground">
                {done.emailed ? <>We also emailed the link to <span className="text-foreground">{done.email}</span>. </> : null}
                Your <a href={done.claim} className="text-primary hover:underline">effect page</a> always has a fresh download link.
              </p>
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}
