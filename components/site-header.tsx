"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { nav } from "@/lib/site";
import { cn } from "cn";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="relative mx-auto flex h-[4.5rem] w-full max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <Link href="/" className="flex items-center" aria-label="Nitrofire Computing">
          <Logo priority className="h-14 w-auto sm:h-16" />
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm transition-colors",
                isActive(pathname, item.href)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "sm" }), "ml-2")}
          >
            Start a brief
          </Link>
        </nav>
        <details key={pathname} className="group md:hidden">
          <summary
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "cursor-pointer list-none [&::-webkit-details-marker]:hidden",
            )}
          >
            <Menu className="group-open:hidden" aria-hidden="true" />
            <X className="hidden group-open:block" aria-hidden="true" />
            <span className="sr-only">Menu</span>
          </summary>
          <div className="absolute inset-x-0 top-full z-50 border-b border-border bg-background px-4 py-4 shadow-lg sm:px-6">
            <nav id="mobile-nav" className="flex flex-col gap-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-3 py-3 text-base",
                    isActive(pathname, item.href)
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "lg" }), "mt-2")}
              >
                Start a brief
              </Link>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
