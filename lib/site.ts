export const site = {
  name: "Nitrofire Computing",
  description:
    "Nitrofire Computing publishes independent software for Linux. RGBMatrixFX is a free, open-source lighting app, with an optional Pro add-on.",
  tagline: "Independent software for Linux.",
  url: "https://nitrofirecomputing.com",
  email: "nitrofireinc@gmail.com",
  github: "https://github.com/nitrofireinc-pixel/Nitrofire_computing",
} as const;

export const rgb = {
  name: "RGBMatrixFX",
  version: "1.2.1",
  priceUsd: "9.99",
  priceLabel: "$9.99 USD",
  releases: "https://github.com/nitrofireinc-pixel/RGBMatrixFX/releases/latest",
  source: "https://github.com/nitrofireinc-pixel/RGBMatrixFX",
  license: "https://www.gnu.org/licenses/gpl-3.0.html",
  page: "/rgbmatrixfx",
} as const;

/**
 * RGBMatrixFX Pro checkout: a popup with Square's card form (components/pro-checkout.tsx).
 * The site Worker forwards /api/checkout to the license Worker, which charges the card and
 * returns the license key.
 *
 * Off by default: every Buy control shows "Coming soon". Build with
 * NEXT_PUBLIC_PRO_CHECKOUT=on to turn the Buy Pro popup on.
 */
export const proCheckoutEnabled: boolean =
  process.env.NEXT_PUBLIC_PRO_CHECKOUT === "on";

export const proCheckoutApi = "/api/checkout";

export const nav = [
  { href: "/", label: "Home" },
  { href: "/software", label: "Software" },
  { href: "/rgbmatrixfx", label: "RGBMatrixFX" },
  { href: "/pricing", label: "Pricing" },
  { href: "/support", label: "Support" },
] as const;

export const policies = [
  { href: "/refunds", label: "Refund Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
] as const;

export const policiesUpdated = "18 October 2026";

export const supportTopics = [
  { value: "rgbmatrixfx", label: "RGBMatrixFX" },
  { value: "pro", label: "RGBMatrixFX Pro" },
  { value: "purchase", label: "A purchase or refund" },
  { value: "other", label: "Something else" },
] as const;

export type SupportTopic = (typeof supportTopics)[number]["value"];

export const razerNotice =
  "RGBMatrixFX is an independent Nitrofire Computing project. It is not affiliated with, working for, endorsed, sponsored, or authorized by Razer Inc. Razer is a trademark of Razer Inc.";

export const effects = [
  "Flame",
  "Wave",
  "Aurora",
  "Starlight",
  "Deep Breath",
  "Colour Sweep",
  "Hue Loop",
  "Solid Colour",
  "Night Sparks",
  "Ember Flicker",
  "Press Fade",
  "Ring Burst",
  "Colour Spin",
  "Sound Bars",
] as const;
