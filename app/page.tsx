import type { Metadata } from "next";
import Link from "next/link";
import { SoftwareTeaser } from "@/components/software-teaser";
import { BuyPro, ProCheckoutNote } from "@/components/buy-pro";
import { buttonVariants } from "@/components/ui/button";
import { rgb, site } from "@/lib/site";
import { cn } from "cn";

export const metadata: Metadata = {
  description: site.description,
  alternates: { canonical: `${site.url}/` },
  openGraph: {
    title: site.name,
    description: site.description,
    url: `${site.url}/`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.email,
  description: site.description,
  logo: `${site.url}/nitrofire-computing-logo.png`,
};

export default function HomePage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="border-b border-border/70">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="font-mono text-xs tracking-[0.22em] text-brand-blue uppercase">
            {site.name}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {site.tagline}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Desktop software you download and run. RGBMatrixFX is our lighting
            app for Razer and other compatible keyboards and mice via the
            OpenRazer driver. The app is free and open source. Pro is a one-time
            add-on.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/rgbmatrixfx" className={cn(buttonVariants({ size: "lg" }))}>
              See RGBMatrixFX
            </Link>
            <Link
              href="/pricing"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Pricing
            </Link>
          </div>
        </div>
      </section>
      <SoftwareTeaser />
      <section className="border-t border-border/70">
        <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <article className="rounded-xl border border-border bg-card/80 p-6">
            <p className="font-mono text-xs tracking-[0.22em] text-brand-blue uppercase">
              Free
            </p>
            <h2 className="mt-3 text-xl font-semibold">RGBMatrixFX</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
              The lighting app, version {rgb.version}. Licensed GPL-3.0-or-later.
              Download it, read the source, and keep the lighting running after
              you close the window.
            </p>
            <Link
              href="/rgbmatrixfx"
              className={cn(buttonVariants({ variant: "outline" }), "mt-6")}
            >
              Product page
            </Link>
          </article>
          <article className="rounded-xl border border-primary/40 bg-card/80 p-6 ring-1 ring-primary/20">
            <p className="font-mono text-xs tracking-[0.22em] text-primary uppercase">
              Pro · {rgb.priceLabel}
            </p>
            <h2 className="mt-3 text-xl font-semibold">RGBMatrixFX Pro</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
              A paid add-on with holiday and premium effects, and whole-PC RGB
              sync for motherboard, RAM and fans.
            </p>
            <ProCheckoutNote className="mt-3 max-w-md text-sm leading-6 text-muted-foreground" />
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <BuyPro />
              <Link
                href="/pricing"
                className="text-sm text-brand-blue hover:underline"
              >
                Compare Free and Pro
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
