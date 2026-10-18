import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { BuyPro, ProCheckoutNote } from "@/components/buy-pro";
import { buttonVariants } from "@/components/ui/button";
import { rgb, site } from "@/lib/site";
import { cn } from "cn";

const title = "Pricing";
const description = `RGBMatrixFX is free. RGBMatrixFX Pro is ${rgb.priceLabel}, paid once, for holiday and premium effects and whole-PC RGB sync.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${site.url}/pricing` },
  openGraph: {
    title: `${title} · ${site.name}`,
    description,
    url: `${site.url}/pricing`,
  },
};

const freePoints = [
  "14 tunable effects, including Flame, Wave, Aurora and Starlight",
  "Keyboard and mouse lit as one scene",
  "Reactive ripples, key fades, highlights and zones",
  "Presets you can save, import and export",
  "GPL-3.0-or-later, with source on GitHub",
];

const proPoints = [
  "Everything in the free app",
  "Holiday and premium effects",
  "Whole-PC RGB sync for motherboard, RAM and fans",
  `${rgb.priceLabel}, one-time purchase`,
];

export default function PricingPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="font-mono text-xs tracking-[0.22em] text-primary uppercase">
        Pricing
      </p>
      <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        Free app. Optional add-on.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
        RGBMatrixFX is free to download and use. RGBMatrixFX Pro is {rgb.priceLabel},
        paid once, for the extra effects and whole-PC sync.
      </p>
      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        <article className="flex flex-col rounded-xl border border-border bg-card/80 p-6">
          <p className="font-mono text-xs tracking-[0.22em] text-brand-blue uppercase">
            RGBMatrixFX
          </p>
          <p className="mt-4 text-4xl font-semibold tracking-tight">$0</p>
          <p className="mt-2 text-sm text-muted-foreground">Free to download and use.</p>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-muted-foreground">
            {freePoints.map((point) => (
              <li key={point} className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-blue" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <a
            href={rgb.releases}
            className={cn(buttonVariants({ size: "lg" }), "mt-8 w-fit")}
          >
            <Download />
            Download on GitHub
          </a>
        </article>
        <article className="flex flex-col rounded-xl border border-primary/40 bg-card/80 p-6 ring-1 ring-primary/20">
          <p className="font-mono text-xs tracking-[0.22em] text-primary uppercase">
            RGBMatrixFX Pro
          </p>
          <p className="mt-4 text-4xl font-semibold tracking-tight">{rgb.priceLabel}</p>
          <p className="mt-2 text-sm text-muted-foreground">One-time purchase. No subscription.</p>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-muted-foreground">
            {proPoints.map((point) => (
              <li key={point} className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <BuyPro />
          </div>
          <ProCheckoutNote className="mt-4 max-w-md text-sm leading-6 text-muted-foreground" />
        </article>
      </div>
      <div className="mt-10 max-w-3xl space-y-3 text-sm leading-6 text-muted-foreground">
        <p>
          Pro runs with the free app. You need Linux and the OpenRazer driver
          for compatible keyboards and mice. Motherboard, RAM and fan lighting
          is detected with OpenRGB; syncing those devices is part of Pro.
        </p>
        <p>
          Refunds are covered in the{" "}
          <Link href="/refunds" className="text-brand-blue hover:underline">
            Refund Policy
          </Link>
          . Purchases are also covered by the{" "}
          <Link href="/terms" className="text-brand-blue hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-brand-blue hover:underline">
            Privacy Policy
          </Link>
          . Questions go to{" "}
          <a href={`mailto:${site.email}`} className="text-brand-blue hover:underline">
            {site.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
