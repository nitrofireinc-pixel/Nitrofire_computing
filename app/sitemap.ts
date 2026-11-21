import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

// Public pages only. /contact is a noindex duplicate of /support; admin, claim and API live elsewhere.
const pages = ["/", "/software", "/rgbmatrixfx", "/onionfruitux", "/effects", "/pricing", "/support", "/refunds", "/terms", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((p) => ({
    url: `${site.url}${p}`,
    changeFrequency: p === "/effects" ? "weekly" : "monthly",
    priority: p === "/" ? 1 : p === "/rgbmatrixfx" || p === "/onionfruitux" || p === "/effects" ? 0.9 : 0.5,
  }));
}
