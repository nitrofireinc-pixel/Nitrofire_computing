import Link from "next/link";
import { Logo } from "@/components/logo";
import { nav, policies, razerNotice, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-sm space-y-4">
            <Logo className="h-24 w-auto" />
            <p className="text-sm leading-6 text-muted-foreground">{site.tagline}</p>
          </div>
          <div className="flex max-w-xl flex-col gap-4">
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm" aria-label="Pages">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={site.github}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                GitHub
              </a>
              <a
                href={`mailto:${site.email}`}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {site.email}
              </a>
            </nav>
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm" aria-label="Policies">
              {policies.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <p className="border-t border-border/70 pt-6 text-xs leading-5 text-muted-foreground">
          {razerNotice}
        </p>
      </div>
    </footer>
  );
}
