import type { Metadata } from "next";
import { site } from "@/lib/site";

const defaultImage = {
  url: "/nitrofire-computing-logo.png",
  width: 1107,
  height: 849,
  alt: "Nitrofire Computing logo",
};

/** Per-page title, description, canonical, Open Graph and X tags that all agree. */
export function pageMeta(
  path: string,
  title: string,
  description: string,
  extra: Partial<Metadata> = {},
): Metadata {
  const url = `${site.url}${path}`;
  const full = `${title} · ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: full, description, url, siteName: site.name, type: "website", images: [defaultImage] },
    twitter: { card: "summary_large_image", title: full, description, images: [defaultImage] },
    ...extra,
  };
}
