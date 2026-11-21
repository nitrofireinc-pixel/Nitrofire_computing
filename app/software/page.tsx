import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { BuyPro } from "@/components/buy-pro";
import { FreeDownloadLink } from "@/components/free-download";
import { buttonVariants } from "@/components/ui/button";
import { onion, rgb, site } from "@/lib/site";
import { cn } from "cn";

const title = "Software";
const description =
  "Software from Nitrofire Computing. RGBMatrixFX is a free Linux lighting app, with an optional Pro add-on. OnionFruitux is a free Linux Tor app.";

export const metadata: Metadata = pageMeta("/software", title, description);

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
        is the lighting app. The base app is free. Pro is optional. OnionFruitux
        is a free app that sends system-proxy apps through Tor.
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
            <FreeDownloadLink className={cn(buttonVariants({ variant: "outline" }))}>
              <Download />
              Download
            </FreeDownloadLink>
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
        <article className="flex flex-col rounded-xl border border-border bg-card/80 p-6 lg:col-span-2">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <Image
                  src="/software/onionfruitux/onionfruitux.svg"
                  alt=""
                  width={36}
                  height={36}
                  className="size-9 rounded-md"
                />
                <p className="font-mono text-xs tracking-[0.22em] text-brand-blue uppercase">
                  Free · open source
                </p>
              </div>
              <h2 className="mt-4 text-2xl font-semibold">OnionFruitux</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                A Linux switch that sends apps which follow the system proxy
                through Tor. Turn it off and your previous proxy settings are
                put back. Transmission and other apps that ignore the system
                proxy stay on the normal connection. Licensed GPL-3.0-or-later.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/onionfruitux" className={cn(buttonVariants())}>
                  Product page
                </Link>
                <a href={onion.releases} className={cn(buttonVariants({ variant: "outline" }))}>
                  <Download />
                  Download
                </a>
              </div>
            </div>
            <Image
              src="/software/onionfruitux/desktop-on.webp"
              alt="Illustration of a Linux desktop with the OnionFruitux window open and the switch on"
              width={1440}
              height={900}
              sizes="(min-width:1024px) 420px, 100vw"
              className="h-auto w-full rounded-xl ring-1 ring-border"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
