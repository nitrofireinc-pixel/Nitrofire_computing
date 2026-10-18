import type { Metadata } from "next";
import { SupportView } from "@/components/support-view";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support",
  description: `Contact Nitrofire Computing about RGBMatrixFX, Pro, or a purchase. Email ${site.email}.`,
  robots: { index: false, follow: true },
  alternates: { canonical: `${site.url}/support` },
};

export default function ContactPage() {
  return <SupportView />;
}
