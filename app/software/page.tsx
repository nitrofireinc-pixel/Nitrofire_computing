import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { BuyPro } from "@/components/buy-pro";
import { buttonVariants } from "@/components/ui/button";
import { rgb, site } from "@/lib/site";
import { cn } from "cn";

const title = "Software";
const description =
  "Software from Nitrofire Computing. RGBMatrixFX is a free Linux lighting app. RGBMatrixFX Pro is a one-time add-on.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${site.url}/software` },
  openGraph: {
    title: `${title} · ${site.name}`,
    description,
    url: `${site.url}/software`,
  },
};

export default function SoftwarePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="font-mono text-xs tracking-[0.22em] text-primary uppercase">
        Software
      </p>
      <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        Desktop software for Linux.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
        Nitrofire Computing publishes software you install and run. RGBMatrixFX
        is the lighting app. The base app is free. Pro is optional.
      </p>
      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        <article className="flex flex-col rounded-xl border border-border bg-card/80 p-6">
          <div className="flex items-center gap-3">
            <Image
              src="/software/rgbmatrixfx.svg"
              alt=""
              width={36}
              height={36}
              className="size-9"
            />
            <p className="font-mono text-xs tracking-[0.22em] text-brand-blue uppercase">
              Free · {rgb.version}
            </p>
          </div>
          <h2 className="mt-4 text-2xl font-semibold">RGBMatrixFX</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Animated lighting for Razer and other compatible keyboards and mice
            via the OpenRazer driver. Fourteen tunable effects, a reactive
            layer, presets, and a live preview. Licensed GPL-3.0-or-later.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/rgbmatrixfx" className={cn(buttonVariants())}>
              Product page
            </Link>
            <a
              href={rgb.releases}
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              <Download />
              Download
            </a>
          </div>
        </article>
        <article className="flex flex-col rounded-xl border border-primary/40 bg-card/80 p-6 ring-1 ring-primary/20">
          <p className="font-mono text-xs tracking-[0.22em] text-primary uppercase">
            Add-on · {rgb.priceLabel}
          </p>
          <h2 className="mt-4 text-2xl font-semibold">RGBMatrixFX Pro</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Holiday and premium effects, and whole-PC RGB sync for motherboard,
            RAM and fans. One-time purchase. The free app stays free.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Holiday and premium effects</li>
            <li>Whole-PC RGB sync for motherboard, RAM and fans</li>
            <li>{rgb.priceLabel}, paid once</li>
          </ul>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BuyPro />
            <Link href="/pricing" className="text-sm text-brand-blue hover:underline">
              Full pricing
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
