"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  amountError,
  normalizeDonateAmount,
  OPEN_DOWNLOAD_DONATE_EVENT,
  openDonateCheckout,
  rememberDownloadDonate,
  startFreeDownload,
} from "@/lib/donate";
import { donateEnabled, donateMaxUsd, donateMinUsd } from "@/lib/site";
import { cn } from "cn";

const CHIPS = [3, 5, 10] as const;
const DEFAULT_AMOUNT = "10";

/**
 * Thank-you card shown after a free RGBMatrixFX download starts.
 * Donate opens the existing Square checkout with the chosen amount.
 * Renders nothing unless NEXT_PUBLIC_DONATE=on.
 */
export function DownloadDonateCard() {
  if (!donateEnabled) return null;
  return <DownloadDonateDialog />;
}

function DownloadDonateDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const customRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const descId = useId();
  const amountLabelId = useId();
  const helpId = useId();
  const [chip, setChip] = useState<string>(DEFAULT_AMOUNT);
  const [custom, setCustom] = useState("");
  const [customTouched, setCustomTouched] = useState(false);

  const chosen = chip === "other" ? normalizeDonateAmount(custom) : chip;
  const customErr = chip === "other" && customTouched ? amountError(custom) : undefined;

  const close = useCallback((remember = true) => {
    if (remember) rememberDownloadDonate();
    dialogRef.current?.close();
  }, []);

  const open = useCallback(() => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setChip(DEFAULT_AMOUNT);
    setCustom("");
    setCustomTouched(false);
    dialogRef.current?.showModal();
  }, []);

  useEffect(() => {
    const onOpen = () => open();
    window.addEventListener(OPEN_DOWNLOAD_DONATE_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_DOWNLOAD_DONATE_EVENT, onOpen);
  }, [open]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onClose = () => {
      const el = lastFocus.current;
      if (el && typeof el.focus === "function") el.focus();
    };
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  function selectChip(value: string) {
    setChip(value);
    if (value === "other") {
      setTimeout(() => customRef.current?.focus(), 0);
    }
  }

  function donate() {
    if (!chosen) {
      if (chip === "other") {
        setCustomTouched(true);
        customRef.current?.focus();
      }
      return;
    }
    rememberDownloadDonate();
    dialogRef.current?.close();
    openDonateCheckout({ amount: chosen });
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={descId}
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
      onClose={() => rememberDownloadDonate()}
      className="download-donate-shell backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="download-donate-card bg-card text-card-foreground shadow-2xl ring-1 ring-border">
      <div className="sheet-handle" aria-hidden="true" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id={titleId} className="flex items-center gap-2 text-lg font-semibold leading-snug">
            <Check className="size-5 shrink-0 text-[#44d62c]" strokeWidth={2.25} aria-hidden />
            Your download has started
          </h2>
          <p className="mt-1.5 text-[0.8125rem] text-muted-foreground">
            Didn&apos;t start?{" "}
            <button
              type="button"
              onClick={() => startFreeDownload()}
              className="text-brand-blue underline underline-offset-2 hover:text-foreground"
            >
              Retry
            </button>
          </p>
        </div>
        <button
          type="button"
          onClick={() => close()}
          aria-label="Close"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "-mt-1.5 -mr-1.5 size-11 shrink-0 rounded-md p-0",
          )}
        >
          <X className="size-5" />
        </button>
      </div>

      <p id={descId} className="mt-4 text-base leading-relaxed">
        Free forever. If it helps you, a few bucks keeps it going.
      </p>

      <form
        noValidate
        className="mt-5"
        onSubmit={(e) => {
          e.preventDefault();
          donate();
        }}
      >
        <span id={amountLabelId} className="block text-sm font-medium">
          One-time donation (USD)
        </span>
        <div className="mt-2.5 grid grid-cols-4 gap-2" role="group" aria-labelledby={amountLabelId}>
          {CHIPS.map((v) => {
            const value = String(v);
            const on = chip === value;
            return (
              <button
                key={v}
                type="button"
                aria-pressed={on}
                onClick={() => selectChip(value)}
                className={cn(
                  "h-12 rounded-xl text-[0.95rem] font-medium ring-1 transition-colors ring-inset",
                  on
                    ? "bg-primary/15 text-primary ring-primary"
                    : "bg-input/30 text-foreground ring-input hover:ring-primary/60",
                )}
              >
                ${v}
              </button>
            );
          })}
          <button
            type="button"
            aria-pressed={chip === "other"}
            onClick={() => selectChip("other")}
            className={cn(
              "h-12 rounded-xl text-[0.95rem] font-medium ring-1 transition-colors ring-inset",
              chip === "other"
                ? "bg-primary/15 text-primary ring-primary"
                : "bg-input/30 text-foreground ring-input hover:ring-primary/60",
            )}
          >
            Other
          </button>
        </div>

        {chip === "other" && (
          <div className="relative mt-2.5">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground">
              $
            </span>
            <Input
              ref={customRef}
              inputMode="decimal"
              autoComplete="off"
              value={custom}
              placeholder="Amount"
              aria-label="Custom one-time amount in US dollars"
              aria-invalid={!!customErr}
              aria-describedby={helpId}
              onChange={(e) => setCustom(e.target.value)}
              onBlur={() => setCustomTouched(true)}
              className="h-12 pl-7 text-base focus-visible:border-primary focus-visible:ring-primary/30 md:text-base"
            />
          </div>
        )}
        <p
          id={helpId}
          className={cn(
            "mt-1.5 text-xs",
            customErr ? "text-destructive" : "text-muted-foreground",
            chip === "other" ? "" : "sr-only",
          )}
        >
          {customErr ?? `Any amount from $${donateMinUsd} to $${donateMaxUsd.toLocaleString("en-US")}.`}
        </p>

        <div className="mt-5 flex flex-col gap-2.5">
          <button
            type="submit"
            disabled={!chosen}
            className={cn(buttonVariants({ size: "lg" }), "h-12 w-full text-[0.95rem]")}
          >
            {chosen ? `Donate $${chosen}` : "Donate"}
          </button>
          <button
            type="button"
            onClick={() => close()}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 w-full text-[0.95rem]")}
          >
            No thanks — just download
          </button>
        </div>
      </form>
      </div>
    </dialog>
  );
}
