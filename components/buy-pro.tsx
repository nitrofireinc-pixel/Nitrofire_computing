import { buttonVariants } from "@/components/ui/button";
import { proCheckoutHref, rgb } from "@/lib/site";
import { cn } from "cn";

export function BuyPro({
  tone = "brand",
  size = "lg",
  className,
}: {
  tone?: "brand" | "product";
  size?: "default" | "lg";
  className?: string;
}) {
  const href = proCheckoutHref();
  const comingSoonClass =
    tone === "product"
      ? "disabled:opacity-100 border-[#44d62c]/40 bg-transparent text-[#44d62c]"
      : "disabled:opacity-100 border-primary/40 bg-transparent text-primary";
  const buyClass =
    tone === "product"
      ? "bg-[#44d62c] text-[#0b130a] hover:bg-[#5be044]"
      : undefined;

  if (!href) {
    return (
      <button
        type="button"
        disabled
        className={cn(
          buttonVariants({ variant: "outline", size }),
          comingSoonClass,
          className,
        )}
      >
        Coming soon
      </button>
    );
  }

  return (
    <a
      href={href}
      className={cn(buttonVariants({ size }), buyClass, className)}
      rel="noopener noreferrer"
    >
      Buy Pro — {rgb.priceLabel}
    </a>
  );
}

export function ProCheckoutNote({ className }: { className?: string }) {
  const ready = proCheckoutHref() !== null;
  return (
    <p className={className}>
      One-time purchase of {rgb.priceLabel}. Card payment {ready ? "is" : "will be"}{" "}
      processed by Square. Nitrofire Computing is the seller. We do not store
      your card number.
    </p>
  );
}
