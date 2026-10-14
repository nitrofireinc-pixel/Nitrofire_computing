import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "cn";

export const metadata: Metadata = {
  title: "Capabilities",
};

const items = [
  {
    n: "01",
    title: "Websites that ship",
    body: "Public sites with real information architecture, not a template with the name swapped. Pages people can find, read, and use on a phone.",
    points: [
      "Clear home, inner pages, and empty states",
      "Desktop and mobile layouts from the first slice",
      "Copy and structure that match how visitors actually arrive",
    ],
  },
  {
    n: "02",
    title: "Performance as a feature",
    body: "A site that looks finished in a screenshot can still feel slow. We treat load time, interaction, and resilience as part of the product.",
    points: [
      "Tight assets, sensible caching, no mystery JavaScript",
      "Accessible markup and keyboard paths",
      "Hosting that is boring and reliable on purpose",
    ],
  },
  {
    n: "03",
    title: "Editable after launch",
    body: "The people who own the site should be able to change it. We build the editing path into the work instead of promising a handbook later.",
    points: [
      "Content that does not require a deploy to update",
      "Honest empty, loading, and error states in the admin path",
      "Source you can keep and continue",
    ],
  },
  {
    n: "04",
    title: "Technical partnership",
    body: "A small studio that stays on the work. Brief, build, ship, then keep the site maintainable instead of handing over a mystery.",
    points: [
      "Scoped slices instead of unbounded retainers",
      "Fixes and features after the first launch",
      "Documentation that matches the running site",
    ],
  },
];

export default function CapabilitiesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="font-mono text-xs tracking-[0.22em] text-primary uppercase">
        Capabilities
      </p>
      <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        Websites built to perform after the launch-day screenshot.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
        We take on public sites and the systems underneath them: structure,
        speed, editing, and a deploy you can trust. If it is not a website or
        the software that keeps one running, it is outside this studio.
      </p>
      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <Card key={item.n} className="bg-card/80">
            <CardHeader>
              <p className="font-mono text-xs text-primary">{item.n}</p>
              <CardTitle className="text-xl">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-6 text-muted-foreground">{item.body}</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-blue" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-12 flex flex-col gap-3 rounded-xl border border-border bg-card/60 p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Have a site that needs to exist — or one that needs replacing?
        </p>
        <Link href="/contact" className={cn(buttonVariants(), "shrink-0")}>
          Start a brief
        </Link>
      </div>
    </div>
  );
}
