import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { cn } from "cn";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center px-4 py-20 text-center">
      <Logo className="mb-8 h-28 w-auto" />
      <p className="font-mono text-xs tracking-[0.22em] text-primary uppercase">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">This page is not here.</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        The URL does not match a page on the Nitrofire Computing site.
      </p>
      <Link href="/" className={cn(buttonVariants(), "mt-8")}>
        Back to home
      </Link>
    </div>
  );
}
