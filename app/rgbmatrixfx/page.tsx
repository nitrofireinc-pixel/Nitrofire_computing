import type { Metadata } from "next";
import { RgbRedirect } from "./redirect";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "RGBMatrixFX",
  robots: { index: false, follow: true },
  alternates: { canonical: `${site.url}/software` },
};

export default function RgbMatrixFxRedirectPage() {
  return <RgbRedirect />;
}
