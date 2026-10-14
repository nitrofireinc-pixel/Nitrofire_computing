import type { Metadata } from "next";
import { HomeRedirect } from "@/components/home-redirect";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "RGBMatrixFX",
  robots: { index: false, follow: true },
  alternates: { canonical: `${site.url}/` },
};

export default function RgbMatrixFxRedirectPage() {
  return <HomeRedirect />;
}
