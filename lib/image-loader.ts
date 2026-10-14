"use client";

/**
 * Static-export image loader. Screenshots are prebuilt WebP at 720 and 1440.
 * Other public files are served as-is.
 */
export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (src.startsWith("/software/") && src.endsWith(".webp")) {
    const base = src.slice(0, -".webp".length);
    if (/-\d+$/.test(base) || base.endsWith("/og") || base.endsWith("demo-poster")) {
      return src;
    }
    const variant = width <= 750 ? "720" : "1440";
    return `${base}-${variant}.webp`;
  }
  return src;
}
