import type { Metadata } from "next";
import { SupportView } from "@/components/support-view";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

const title = "Support";
const description = `Contact Nitrofire Computing about RGBMatrixFX, Pro, or a purchase. Email ${site.email}.`;

export const metadata: Metadata = pageMeta("/support", title, description);

export default function SupportPage() {
  return <SupportView />;
}
