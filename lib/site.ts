export const site = {
  name: "Nitrofire Computing",
  description:
    "Nitrofire Computing designs and ships production websites — fast, clear, and built to keep working after launch.",
  url: "https://nitrofirecomputing.com",
  email: "nitrofireinc@gmail.com",
  github: "https://github.com/nitrofireinc-pixel/Nitrofire_computing",
} as const;

export const rgb = {
  name: "RGBMatrixFX",
  version: "1.2.1",
  releases: "https://github.com/nitrofireinc-pixel/RGBMatrixFX/releases/latest",
  source: "https://github.com/nitrofireinc-pixel/RGBMatrixFX",
  license: "https://www.gnu.org/licenses/gpl-3.0.html",
  page: "/software",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/work", label: "Engagements" },
  { href: "/software", label: "Software" },
  { href: "/contact", label: "Contact" },
] as const;

export const projectTypes = [
  { value: "new-site", label: "New website" },
  { value: "rebuild", label: "Rebuild / replace" },
  { value: "partnership", label: "Ongoing partnership" },
  { value: "other", label: "Something else" },
] as const;

export type ProjectType = (typeof projectTypes)[number]["value"];
