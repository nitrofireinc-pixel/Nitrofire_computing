import type { Metadata } from "next";
import Link from "next/link";
import { Download, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "cn";

const title = "Effects";
const description =
  "Add-on lighting effects for RGBMatrixFX Pro. Works with Razer keyboards on Linux.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${site.url}/effects` },
  openGraph: { title: `${title} · ${site.name}`, description, url: `${site.url}/effects` },
};

type Effect = {
  name: string;
  blurb: string;
  free?: boolean;
  gif: string;
};

const effects: Effect[] = [
  {
    name: "Halloween",
    gif: "/effects/halloween.gif",
    blurb: "Jack-o'-lantern candles flicker over a drifting purple mist with ghoulish green wisps.",
    free: true,
  },
  {
    name: "Starfield",
    gif: "/effects/starfield.gif",
    blurb: "Soft blue twinkles with bright shooting stars streaking over a dark sky.",
  },
  {
    name: "Fireworks",
    gif: "/effects/fireworks.gif",
    blurb: "Rockets launch from the bottom row and burst into colorful sparks.",
  },
  {
    name: "Snowfall",
    gif: "/effects/snowfall.gif",
    blurb: "Gentle flakes drift down the keyboard and settle on a cool blue glow.",
  },
  {
    name: "Christmas",
    gif: "/effects/christmas.gif",
    blurb: "Red and green lights chase like a string of tree lights, with golden sparkle.",
  },
];

function Preview({ e }: { e: Effect }) {
  // Short looping GIF rendered from the real effect code on the keyboard + mouse layout.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={e.gif}
      alt={`${e.name} effect preview on a keyboard and mouse`}
      width={480}
      height={137}
      loading="lazy"
      decoding="async"
      className="aspect-[480/137] w-full rounded-lg bg-[#0a0a0d] object-cover"
    />
  );
}

export default function EffectsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="font-mono text-xs tracking-[0.22em] text-primary uppercase">Effects</p>
      <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        New lighting effects for RGBMatrixFX Pro.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
        Add-on effects you load into RGBMatrixFX Pro. Works with Razer keyboards on Linux.
      </p>
      <div className="mt-6 flex max-w-2xl items-start gap-3 rounded-xl border border-brand-blue/40 bg-brand-blue/10 p-4 text-sm leading-6">
        <Sparkles className="mt-0.5 size-4 shrink-0 text-brand-blue" aria-hidden="true" />
        <p>
          These effects require{" "}
          <Link href="/rgbmatrixfx" className="font-medium text-foreground underline underline-offset-4">
            RGBMatrixFX Pro
          </Link>
          . They will not load in the free app.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {effects.map((e) => (
          <article
            key={e.name}
            className={cn(
              "flex flex-col rounded-xl border bg-card/80 p-4",
              e.free ? "border-primary/60" : "border-border",
            )}
          >
            <Preview e={e} />
            <div className="mt-4 flex items-baseline justify-between gap-3">
              <h2 className="text-xl font-semibold">{e.name}</h2>
              {e.free ? (
                <p className="flex items-baseline gap-2">
                  <s className="text-sm text-muted-foreground">$1.99</s>
                  <span className="font-mono text-sm font-semibold tracking-wider text-primary">FREE</span>
                </p>
              ) : (
                <p className="font-mono text-sm font-semibold">$1.99</p>
              )}
            </div>
            <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{e.blurb}</p>
            {e.free ? (
              <>
                <a
                  href="/effects/Halloween.rfxpro"
                  download="Halloween.rfxpro"
                  className={cn(buttonVariants(), "mt-5 w-full")}
                >
                  <Download aria-hidden="true" /> Free download
                </a>
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  In RGBMatrixFX Pro, choose File &gt; Import presets and pick the file.
                </p>
              </>
            ) : (
              // MOCKUP: no per-effect checkout yet.
              <button
                type="button"
                disabled
                className={cn(buttonVariants({ variant: "outline" }), "mt-5 w-full")}
              >
                Coming soon
              </button>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
