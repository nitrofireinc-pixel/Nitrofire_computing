import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { EffectsStore } from "@/components/effects-store";
import { site } from "@/lib/site";

const title = "Effects";
const description =
  "Add-on lighting effects for RGBMatrixFX Pro. Works with Razer keyboards on Linux.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${site.url}/effects` },
  openGraph: { title: `${title} · ${site.name}`, description, url: `${site.url}/effects` },
};

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

      <EffectsStore />
    </div>
  );
}
