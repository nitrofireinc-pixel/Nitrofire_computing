import type { ReactNode } from "react";
import { policiesUpdated } from "@/lib/site";

export function LegalPage({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="font-mono text-xs tracking-[0.22em] text-primary uppercase">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">{lede}</p>
      <p className="mt-3 text-sm text-muted-foreground">Updated {policiesUpdated}</p>
      <div className="mt-10 space-y-8 text-sm leading-7 text-muted-foreground [&_a]:text-brand-blue [&_a]:hover:underline [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-foreground [&_li]:mt-2 [&_strong]:font-medium [&_strong]:text-foreground [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </article>
  );
}
