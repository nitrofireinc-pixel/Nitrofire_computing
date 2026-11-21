import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { OnionDemo } from "@/components/onion-demo";
import { buttonVariants } from "@/components/ui/button";
import { onion, onionNotice, site } from "@/lib/site";
import { cn } from "cn";

const title = "OnionFruiTux — a one-switch Tor app for Linux";
const description =
  "Free, open-source Linux app that sends apps which follow the system proxy through Tor. One switch, optional exit country, and a clean restore when you turn it off.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ${site.name}` },
  description,
  alternates: { canonical: `${site.url}/onionfruitux` },
  openGraph: {
    title,
    description,
    url: `${site.url}/onionfruitux`,
    siteName: site.name,
    type: "website",
    images: [
      {
        url: "/software/onionfruitux/og.png",
        width: 1200,
        height: 630,
        alt: "OnionFruiTux on a Linux desktop, with the switch on",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/software/onionfruitux/og.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "OnionFruiTux",
  applicationCategory: "SecurityApplication",
  operatingSystem: "Linux",
  softwareVersion: onion.version,
  description:
    "A Linux switch that sends apps which follow the system proxy through the Tor network.",
  url: `${site.url}/onionfruitux`,
  downloadUrl: onion.releases,
  codeRepository: onion.source,
  license: onion.license,
  image: `${site.url}/software/onionfruitux/og.png`,
  offers: {
    "@type": "Offer",
    name: "OnionFruiTux (free, open source)",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: `${site.url}/onionfruitux`,
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
    title: "One switch",
    body: "Turn it on and apps that follow the system proxy leave through Tor. Turn it off and they use the normal network again.",
  },
  {
    n: "02",
    title: "You can see the state",
    body: "The switch is gray when off, orange while Tor is starting (with the bootstrap percent), and green only after a check confirms traffic is using Tor.",
  },
  {
    n: "03",
    title: "Entry and exit country",
    body: "Routes remember an entry country and an exit country. Sites see the exit. New circuit asks Tor for a fresh path.",
  },
  {
    n: "04",
    title: "Some apps stay direct",
    body: "Transmission, qBittorrent, and uTorrent ignore the system proxy and stay on the normal connection. Hosts you list under Settings, Network, also skip Tor.",
  },
  {
    n: "05",
    title: "A clean switch-off",
    body: "The previous proxy settings are saved first. If the app closes or crashes while the switch is on, the next start offers to restore them. OnionFruiTux does not change the firewall, DNS, ProtonVPN, or Tailscale.",
  },
  {
    n: "06",
    title: "A connectivity check",
    body: "After connecting, it checks the Tor check API and can open check.torproject.org. After disconnecting, it checks that the computer can reach the internet directly.",
  },
];

const packages = [
  { distro: "Debian, Ubuntu, Linux Mint, Pop!_OS", kind: ".deb" },
  { distro: "Fedora and openSUSE", kind: ".rpm" },
  { distro: "Arch and Manjaro", kind: ".pkg.tar.zst" },
  { distro: "Any of those, one command", kind: "get.sh installer" },
];

const accentButton = cn(
  buttonVariants({ size: "lg" }),
  "bg-[#7c5cbf] text-[#f4f1ea] hover:bg-[#8d6ed0]",
);

const quietButton = cn(
  buttonVariants({ variant: "outline", size: "lg" }),
  "border-[#3a3548] bg-transparent text-[#f4f1ea] hover:bg-[#221f2e] hover:text-[#f4f1ea] dark:border-[#3a3548] dark:bg-transparent dark:hover:bg-[#221f2e]",
);

export default function OnionFruiTuxPage() {
  return (
    <div className="flex flex-1 flex-col bg-[#111113] text-[#e8e8ea]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative overflow-hidden border-b border-[#2b2b33]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(640px_320px_at_78%_45%,#7c5cbf28,transparent_70%)]"
        />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:py-20">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Image
                src="/software/onionfruitux/onionfruitux.svg"
                alt=""
                width={28}
                height={28}
                className="size-7 rounded-md"
              />
              <p className="text-sm font-medium">OnionFruiTux</p>
              <span className="text-[#8c8c96]" aria-hidden="true">
                ·
              </span>
              <span className="rounded-full bg-[#7c5cbf] px-2 py-0.5 text-xs font-medium text-[#f4f1ea]">
                Free, open source
              </span>
            </div>
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              One switch, through Tor.
            </h1>
            <p className="max-w-lg text-base leading-7 text-[#8c8c96] sm:text-lg">
              OnionFruiTux is a Linux app that sends apps which follow the
              system proxy through the Tor network. Open the window, turn the
              switch on, and those apps leave through Tor. Turn it off and they
              use the normal network again.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={onion.releases} className={accentButton}>
                <Download />
                Download on GitHub
              </a>
              <a href={onion.source} className={quietButton}>
                Source
              </a>
            </div>
          </div>
          <figure className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[#7c5cbf]/20 blur-2xl"
            />
            <div className="relative overflow-hidden rounded-xl ring-1 ring-[#7c5cbf]/35">
              <OnionDemo />
            </div>
            <figcaption className="mt-3 text-center text-sm text-[#8c8c96]">
              Illustration of the OnionFruiTux window on a Linux desktop. The
              loop shows the switch going from off, to connecting, to on, with
              the exit country already set.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="border-b border-[#2b2b33]">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <p className="font-mono text-xs tracking-[0.22em] text-[#7c5cbf] uppercase">
            Features
          </p>
          <h2 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Made to be easy to use, and careful when it turns off.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.n}
                className="rounded-xl bg-[#18181c] p-4 ring-1 ring-[#2b2b33]"
              >
                <p className="font-mono text-xs text-[#7c5cbf]">{feature.n}</p>
                <h3 className="mt-2 text-base font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#8c8c96]">{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#2b2b33]">
        <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <article className="rounded-xl bg-[#18181c] p-6 ring-1 ring-[#2b2b33]">
            <p className="font-mono text-xs tracking-[0.22em] text-[#7c5cbf] uppercase">
              Install
            </p>
            <h2 className="mt-3 text-xl font-semibold">What you need</h2>
            <ul className="mt-6 divide-y divide-[#2b2b33]">
              {packages.map((item) => (
                <li
                  key={item.distro}
                  className="flex flex-col gap-1 py-3 text-sm sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span>{item.distro}</span>
                  <span className="text-[#8c8c96] sm:text-right">{item.kind}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-6 text-[#8c8c96]">
              The first time you turn the switch on, the desktop asks for an
              admin password so OnionFruiTux can start its own Tor. You can also
              pin it to the dock or run <code className="text-[#e8e8ea]">onionfruitux tray</code> for a
              panel icon with the same switch.
            </p>
          </article>
          <article className="rounded-xl bg-[#18181c] p-6 ring-1 ring-[#2b2b33]">
            <p className="font-mono text-xs tracking-[0.22em] text-[#7c5cbf] uppercase">
              Downloads
            </p>
            <h2 className="mt-3 text-xl font-semibold">Get OnionFruiTux</h2>
            <p className="mt-3 text-sm leading-6 text-[#8c8c96]">
              The current release is {onion.version}. It sends apps that follow
              the system proxy through Tor, restores your previous settings when
              the switch turns off, and checks that traffic is using Tor.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={onion.releases} className={accentButton}>
                <Download />
                Latest release
              </a>
              <a href={onion.source} className={quietButton}>
                Source on GitHub
              </a>
            </div>
            <p className="mt-6 text-sm leading-6 text-[#8c8c96]">
              Licensed{" "}
              <a href={onion.license} className="text-[#c4b5fd] hover:underline">
                GPL-3.0-or-later
              </a>
              . One-line installer:
            </p>
            <pre className="mt-3 overflow-x-auto rounded-lg bg-[#111113] p-3 text-xs leading-6 text-[#e8e8ea] ring-1 ring-[#2b2b33]">
              <code>
                {`curl -fsSL https://raw.githubusercontent.com/nitrofireinc-pixel/OnionFruitux/main/get.sh | sudo bash`}
              </code>
            </pre>
            <p className="mt-3 text-sm leading-6 text-[#8c8c96]">
              That command installs the latest packaged release.
            </p>
          </article>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-sm leading-6 text-[#8c8c96]">
            OnionFruiTux is the Linux counterpart to DragonFruit Network&apos;s
            OnionFruit, written independently by {site.name} and licensed{" "}
            <a href={onion.license} className="text-[#c4b5fd] hover:underline">
              GPL-3.0-or-later
            </a>
            . {onionNotice}
          </p>
          <p className="mt-6">
            <Link href="/software" className="text-sm text-[#c4b5fd] hover:underline">
              All software
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
