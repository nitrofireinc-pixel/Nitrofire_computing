import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "cn";

export const metadata: Metadata = {
  title: "Engagements",
};

const engagements = [
  {
    eyebrow: "Weeks, not quarters",
    title: "New website",
    description: "Operators who need a working site, not a deck of mockups.",
    body: "A new public site that has to exist in the world. We take a sharp brief and ship a complete first slice — usable, deployable, and ready to grow.",
  },
  {
    eyebrow: "Scoped replacement",
    title: "Rebuild a slow or brittle site",
    description: "Teams stuck on a stack that only one person understands.",
    body: "The current site still resolves, but nobody wants to touch it. We replace the load-bearing pieces without a theatrical rewrite of everything at once.",
  },
  {
    eyebrow: "Defined cadence",
    title: "Launch and keep going",
    description: "Organizations that need a computing partner, not a body shop.",
    body: "After the first ship, keep a regular engineering slice: content tools, performance, and the unglamorous work of keeping production healthy.",
  },
];

export default function WorkPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="font-mono text-xs tracking-[0.22em] text-primary uppercase">
        Engagements
      </p>
      <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        How the work is scoped.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
        This studio takes website work. Engagements are written around a
        shippable slice — not an open-ended “digital transformation.” Case
        studies for other organizations are not published here.
      </p>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {engagements.map((item) => (
          <Card key={item.title} className="bg-card/80">
            <CardHeader>
              <p className="font-mono text-xs text-brand-blue">{item.eyebrow}</p>
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="leading-6 text-muted-foreground">{item.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-12 flex flex-col gap-3 rounded-xl border border-border bg-card/60 p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          If the closest fit is “something else,” say so in the brief.
        </p>
        <Link href="/contact" className={cn(buttonVariants(), "shrink-0")}>
          Start a brief
        </Link>
      </div>
    </div>
  );
}
