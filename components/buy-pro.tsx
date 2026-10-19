import { buttonVariants } from "@/components/ui/button";
import { ProCheckout } from "@/components/pro-checkout";
import { proCheckoutEnabled, rgb } from "@/lib/site";
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
  const comingSoonClass =
    tone === "product"
      ? "disabled:opacity-100 border-[#44d62c]/40 bg-transparent text-[#44d62c]"
      : "disabled:opacity-100 border-primary/40 bg-transparent text-primary";
  const buyClass =
    tone === "product"
      ? "bg-[#44d62c] text-[#0b130a] hover:bg-[#5be044]"
      : undefined;

  if (!proCheckoutEnabled) {
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
    <ProCheckout
      className={cn(buttonVariants({ size }), buyClass, className)}
    />
  );
}

export function ProCheckoutNote({ className }: { className?: string }) {
  return <p className={className}>One-time purchase of {rgb.priceLabel}.</p>;
}
