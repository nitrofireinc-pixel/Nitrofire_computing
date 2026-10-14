import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/logo";
import { SoftwareTeaser } from "@/components/software-teaser";
import { cn } from "cn";

const pillars = [
  {
    title: "Public sites",
    body: "Pages that hold up under real traffic and real phones.",
  },
  {
    title: "Production deploys",
    body: "A launch you can click, not a folder of mockups.",
  },
  {
    title: "Owned source",
    body: "You keep the repo. We do not trap the work.",
  },
];

const capabilities = [
  {
    n: "01",
    title: "Websites that ship",
    body: "Public sites with real information architecture, not a template with the name swapped. Pages people can find, read, and use on a phone.",
  },
  {
    n: "02",
    title: "Performance as a feature",
    body: "A site that looks finished in a screenshot can still feel slow. We treat load time, interaction, and resilience as part of the product.",
  },
  {
    n: "03",
    title: "Editable after launch",
    body: "The people who own the site should be able to change it. We build the editing path into the work instead of promising a handbook later.",
  },
  {
    n: "04",
    title: "Technical partnership",
    body: "A small studio that stays on the work. Brief, build, ship, then keep the site maintainable instead of handing over a mystery.",
  },
];

const steps = [
  {
    n: "01",
    title: "Brief",
    body: "What has to exist, who uses it, and what “done” means. We will push back if the scope is a slogan instead of a website.",
  },
  {
    n: "02",
    title: "Build",
    body: "Working pages in the repo. You can click them, break them, and tell us what is wrong. We do not disappear into a design cave.",
  },
  {
    n: "03",
    title: "Harden",
    body: "Empty states, errors, mobile, access, and deploy. A site is not shipped because the happy path looks good in a screenshot.",
  },
  {
    n: "04",
    title: "Hand off",
    body: "You own the source. We leave it in a state a competent engineer can continue — including us, if you want the next slice.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="border-b border-border/70">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:py-20">
          <div className="space-y-6">
            <Badge variant="outline" className="border-brand-blue/40 text-brand-blue">
              Accepting new briefs
            </Badge>
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              We build websites that perform.
            </h1>
            <p className="max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
              Nitrofire Computing is an independent studio that designs, builds,
              and ships production websites. Fast to load, clear to use, and
              left in a state you can keep changing. Registered nonprofits
              receive a discounted rate.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
                Start a brief
                <ArrowRight />
              </Link>
              <Link
                href="/capabilities"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                See capabilities
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <Logo priority className="h-auto w-full max-w-md lg:max-w-lg" />
          </div>
        </div>
      </section>
      <section className="border-b border-border/70">
        <div className="mx-auto grid w-full max-w-6xl gap-px bg-border/70 px-0 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="bg-background px-4 py-8 sm:px-6">
              <p className="font-mono text-xs tracking-[0.2em] text-brand-blue uppercase">
                {pillar.title}
              </p>
              <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="border-b border-border/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="max-w-2xl space-y-2">
            <p className="font-mono text-xs tracking-[0.22em] text-primary uppercase">
              Nonprofit discount
            </p>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Lower rates for registered nonprofits.
            </h2>
            <p className="text-sm leading-6 text-muted-foreground">
              Schools, churches, community groups, and other registered
              nonprofits get a discounted engagement on new sites and ongoing
              work. Mention nonprofit status in the brief and we will price
              accordingly.
            </p>
          </div>
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "lg" }), "shrink-0")}
          >
            Ask in a brief
          </Link>
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="font-mono text-xs tracking-[0.22em] text-primary uppercase">
              Capabilities
            </p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              What we actually build
            </h2>
          </div>
          <Link href="/capabilities" className="text-sm text-brand-blue hover:underline">
            Full capabilities
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {capabilities.map((item) => (
            <Card key={item.n} className="bg-card/80">
              <CardHeader>
                <p className="font-mono text-xs text-primary">{item.n}</p>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-6 text-muted-foreground">{item.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <SoftwareTeaser />
      <section className="border-t border-border/70 bg-card/40">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <p className="font-mono text-xs tracking-[0.22em] text-primary uppercase">
            Process
          </p>
          <h2 className="mt-2 max-w-lg text-2xl font-semibold tracking-tight sm:text-3xl">
            Brief, build, harden, hand off.
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.n} className="space-y-3">
                <p className="font-mono text-sm text-brand-blue">{step.n}</p>
                <h3 className="text-base font-semibold">{step.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
