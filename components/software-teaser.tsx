import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { rgb } from "@/lib/site";
import { cn } from "cn";

export function SoftwareTeaser() {
  return (
    <section className="border-t border-border/70">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <p className="font-mono text-xs tracking-[0.22em] text-primary uppercase">
          Our software
        </p>
        <div className="mt-6 overflow-hidden rounded-2xl border border-[#2b2b33] bg-[#111113] text-[#e8e8ea]">
          <div className="grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10 lg:p-10">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <Image
                  src="/software/rgbmatrixfx.svg"
                  alt=""
                  width={40}
                  height={40}
                  className="size-10"
                />
                <p className="text-base font-semibold">RGBMatrixFX</p>
                <span className="rounded-full border border-[#2b2b33] px-2 py-0.5 text-xs text-[#8c8c96]">
                  open source
                </span>
              </div>
              <h2 className="max-w-md text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Chroma-style lighting for Linux.
              </h2>
              <p className="max-w-md text-sm leading-6 text-[#8c8c96] sm:text-base sm:leading-7">
                Animated effects for Razer keyboards and mice, set up in a few
                clicks. Free and open source, built by Nitrofire Computing.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/software"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-[#44d62c] text-[#0b130a] hover:bg-[#5be044]",
                  )}
                >
                  Learn more
                </Link>
                <a
                  href={rgb.releases}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "border-[#2b2b33] bg-transparent text-[#e8e8ea] hover:bg-[#202026] hover:text-[#e8e8ea] dark:border-[#2b2b33] dark:bg-transparent dark:hover:bg-[#202026]",
                  )}
                >
                  <Download />
                  Download on GitHub
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
                sizes="(min-width:1024px) 560px, 100vw"
                className="relative h-auto w-full rounded-xl ring-1 ring-[#44d62c]/30"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
