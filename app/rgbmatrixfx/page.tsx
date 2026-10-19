import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { BuyPro, ProCheckoutNote } from "@/components/buy-pro";
import { DonateCallout } from "@/components/donate";
import { DemoLoop } from "@/components/demo-loop";
import { effects, razerNotice, rgb, site } from "@/lib/site";
import { cn } from "cn";

const title = "RGBMatrixFX — animated lighting for Linux";
const description =
  "Free, open-source animated lighting for Razer and other compatible keyboards and mice on Linux, via the OpenRazer driver. 14 tunable effects, with an optional Pro add-on.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ${site.name}` },
  description,
  alternates: { canonical: `${site.url}/rgbmatrixfx` },
  openGraph: {
    title,
    description,
    url: `${site.url}/rgbmatrixfx`,
    siteName: site.name,
    type: "website",
    images: [
      {
        url: "/software/og.png",
        width: 1200,
        height: 630,
        alt: "RGBMatrixFX: animated lighting for Linux",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/software/og.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "RGBMatrixFX",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Linux",
  softwareVersion: rgb.version,
  description:
    "Animated lighting effects for Razer and other compatible keyboards and mice on Linux, via the OpenRazer driver.",
  url: `${site.url}/rgbmatrixfx`,
  downloadUrl: rgb.releases,
  codeRepository: rgb.source,
  license: rgb.license,
  image: `${site.url}/software/01-main-flame.webp`,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: site.name,
    url: site.url,
  },
};

const features = [
  {
    n: "01",
    title: "14 effects",
    body: "Flame, Wave, Aurora, Starlight and more. Every one is fully tunable.",
  },
  {
    n: "02",
    title: "One scene, two devices",
    body: "Waves and ripples travel from keyboard to mouse as a single scene.",
  },
  {
    n: "03",
    title: "Reactive layer",
    body: "Ripples and key fades on keypresses, clicks and scrolling.",
  },
  {
    n: "04",
    title: "Gamer Controls",
    body: "Highlight key groups, or keep WASD lit with one click.",
  },
  {
    n: "05",
    title: "Separate zones",
    body: "Keys, keyboard logo, mouse logo and scroll wheel, each on its own.",
  },
  {
    n: "06",
    title: "Presets",
    body: "Save your setups, and import or export them.",
  },
  {
    n: "07",
    title: "Light on resources",
    body: "About 28 updates per second at roughly 3% CPU, with a live preview.",
  },
  {
    n: "08",
    title: "Keeps running",
    body: "Lighting stays on with the window closed, and reconnects after crashes or re-plugs.",
  },
];

const shots = [
  {
    name: "02-reactive",
    caption: "Reactive layer",
    alt: "RGBMatrixFX reactive layer with ripples on a keyboard and mouse",
  },
  {
    name: "03-highlights",
    caption: "Highlight keys",
    alt: "RGBMatrixFX highlighting key groups on a keyboard",
  },
  {
    name: "04-zones",
    caption: "Zones",
    alt: "RGBMatrixFX separate lighting zones for keys, logos, and the scroll wheel",
  },
];

const needs = [
  {
    item: "Razer and other compatible keyboards and mice",
    note: "via the OpenRazer driver (required)",
  },
  {
    item: "Motherboard, RAM and fan RGB",
    note: "detected via OpenRGB; syncing is a Pro feature",
  },
  {
    item: "Other OpenRGB keyboards and mice",
    note: "planned",
  },
  {
    item: "Linux with a systemd user session",
    note: "developed on Ubuntu / GNOME",
  },
];

const packages = [
  { distro: "Debian 13+, Ubuntu 25.10+", kind: ".deb" },
  { distro: "Fedora", kind: ".rpm" },
  { distro: "Arch, Manjaro, EndeavourOS", kind: "AUR PKGBUILD" },
  {
    distro: "Any distro, incl. Ubuntu 24.04 and Debian 12",
    kind: "x86_64 AppImage",
  },
  { distro: "From source", kind: "git clone, then ./install.sh" },
];

const greenButton = cn(
  buttonVariants({ size: "lg" }),
  "bg-[#44d62c] text-[#0b130a] hover:bg-[#5be044]",
);

const quietButton = cn(
  buttonVariants({ variant: "outline", size: "lg" }),
  "border-[#2b2b33] bg-[#202026] text-[#e8e8ea] hover:bg-[#2b2b33] hover:text-[#e8e8ea] dark:border-[#2b2b33] dark:bg-[#202026] dark:hover:bg-[#2b2b33]",
);

export default function RgbMatrixFxPage() {
  return (
    <div className="rgbx flex flex-1 flex-col bg-[#111113] text-[#e8e8ea]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative overflow-hidden border-b border-[#2b2b33]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(640px_320px_at_78%_45%,#44d62c24,transparent_70%)]"
        />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:py-20">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-medium">RGBMatrixFX</p>
              <span className="text-[#8c8c96]" aria-hidden="true">
                ·
              </span>
              <span className="rounded-full bg-[#44d62c] px-2 py-0.5 text-xs font-medium text-[#0b130a]">
                Free {rgb.version}
              </span>
            </div>
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Animated lighting for Linux.
            </h1>
            <p className="max-w-lg text-base leading-7 text-[#8c8c96] sm:text-lg">
              Effects for Razer and other compatible keyboards and mice via the
              OpenRazer driver. Open source, from Nitrofire Computing.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={rgb.releases} className={greenButton}>
                <Download />
                Download on GitHub
              </a>
              <a href={rgb.source} className={quietButton}>
                View source
              </a>
            </div>
          </div>
          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[#44d62c]/20 blur-2xl"
            />
            <Image
              src="/software/01-main-flame.webp"
              alt="RGBMatrixFX showing the Flame effect on a keyboard and mouse"
              width={1440}
              height={900}
              priority
              sizes="(min-width:1024px) 560px, 100vw"
              className="relative h-auto w-full rounded-xl ring-1 ring-[#44d62c]/35"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-[#2b2b33]">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <p className="font-mono text-xs tracking-[0.22em] text-[#44d62c] uppercase">
            What it is
          </p>
          <h2 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            A desktop app you can close and leave running.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#8c8c96]">
            RGBMatrixFX is a small background engine plus a desktop app. Pick an
            effect, tune it, and close the window; the lighting keeps running.
            The app follows your desktop&apos;s light or dark theme and accent
            color. It works with Razer and other compatible keyboards and mice
            via the OpenRazer driver.
          </p>
        </div>
      </section>

      <section className="border-b border-[#2b2b33]">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <p className="font-mono text-xs tracking-[0.22em] text-[#44d62c] uppercase">
            Features
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            What it does
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <article
                key={feature.n}
                className="rounded-xl bg-[#18181c] p-4 ring-1 ring-[#2b2b33]"
              >
                <p className="font-mono text-xs text-[#44d62c]">{feature.n}</p>
                <h3 className="mt-2 text-base font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#8c8c96]">{feature.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-6 text-[#8c8c96]">
            Effects: {effects.join(", ")}.
          </p>
          <div className="relative mt-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 rounded-3xl bg-[#44d62c]/10 blur-2xl"
            />
            <div className="relative">
              <DemoLoop />
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {shots.map((shot) => (
              <figure key={shot.name}>
                <Image
                  src={`/software/${shot.name}.webp`}
                  alt={shot.alt}
                  width={1440}
                  height={900}
                  sizes="(min-width:768px) 33vw, 100vw"
                  className="h-auto w-full rounded-xl ring-1 ring-[#44d62c]/25"
                />
                <figcaption className="mt-3 text-center text-sm text-[#8c8c96]">
                  {shot.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#2b2b33]">
        <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <article className="rounded-xl bg-[#18181c] p-6 ring-1 ring-[#2b2b33]">
            <p className="font-mono text-xs tracking-[0.22em] text-[#44d62c] uppercase">
              Hardware & requirements
            </p>
            <h2 className="mt-3 text-xl font-semibold">What you need</h2>
            <ul className="mt-6 divide-y divide-[#2b2b33]">
              {needs.map((need) => (
                <li
                  key={need.item}
                  className="flex flex-col gap-1 py-3 text-sm sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span>{need.item}</span>
                  <span className="text-[#8c8c96] sm:text-right">{need.note}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-xl bg-[#18181c] p-6 ring-1 ring-[#2b2b33]">
            <p className="font-mono text-xs tracking-[0.22em] text-[#44d62c] uppercase">
              Install
            </p>
            <h2 className="mt-3 text-xl font-semibold">Pick your package</h2>
            <ul className="mt-6 divide-y divide-[#2b2b33]">
              {packages.map((item) => (
                <li
                  key={item.distro}
                  className="flex flex-col gap-2 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <span>{item.distro}</span>
                  <code className="w-fit shrink-0 rounded-md bg-[#202026] px-2 py-1 font-mono text-xs text-[#44d62c]">
                    {item.kind}
                  </code>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-[#8c8c96]">
              All packages are on the{" "}
              <a href={rgb.releases} className="text-[#44d62c] hover:underline">
                GitHub Releases page
              </a>
              .
            </p>
          </article>
        </div>
      </section>

      <section>
        <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <article className="rounded-xl bg-[#18181c] p-6 ring-1 ring-[#2b2b33]">
            <p className="font-mono text-xs tracking-[0.22em] text-[#44d62c] uppercase">
              Pro · {rgb.priceLabel}
            </p>
            <h2 className="mt-3 text-xl font-semibold">RGBMatrixFX Pro</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#8c8c96]">
              A paid add-on with holiday and premium effects, and whole-PC RGB
              sync for motherboard, RAM and fans.
            </p>
            <ProCheckoutNote className="mt-3 max-w-md text-sm leading-6 text-[#8c8c96]" />
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <BuyPro tone="product" />
              <Link href="/pricing" className="text-sm text-[#44d62c] hover:underline">
                See pricing
              </Link>
            </div>
          </article>
          <article className="rounded-xl bg-[#18181c] p-6 ring-1 ring-[#2b2b33]">
            <p className="font-mono text-xs tracking-[0.22em] text-[#44d62c] uppercase">
              Open source
            </p>
            <h2 className="mt-3 text-xl font-semibold">Free, and yours to read.</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#8c8c96]">
              Licensed{" "}
              <a href={rgb.license} className="text-[#44d62c] hover:underline">
                GPL-3.0-or-later
              </a>{" "}
              with the RGBMatrixFX plugin exception. The source, issues and
              releases live on{" "}
              <a href={rgb.source} className="text-[#44d62c] hover:underline">
                GitHub
              </a>
              .
            </p>
          </article>
        </div>
        <div className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6 [&:empty]:hidden">
          <DonateCallout tone="product" className="-mt-8" />
        </div>
        <p className="mx-auto w-full max-w-6xl px-4 pb-16 text-xs leading-5 text-[#8c8c96] sm:px-6">
          {razerNotice}
        </p>
      </section>
    </div>
  );
}
