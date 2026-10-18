import type { Metadata } from "next";
import { SupportView } from "@/components/support-view";
import { site } from "@/lib/site";

const title = "Support";
const description = `Contact Nitrofire Computing about RGBMatrixFX, Pro, or a purchase. Email ${site.email}.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${site.url}/support` },
  openGraph: {
    title: `${title} · ${site.name}`,
    description,
    url: `${site.url}/support`,
  },
};

export default function SupportPage() {
  return <SupportView />;
}
