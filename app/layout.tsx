import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { HalloweenOverlay } from "@/components/halloween-overlay";
import { HolidayThemes } from "@/components/holiday-themes";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    images: [
      {
        url: "/nitrofire-computing-logo.png",
        width: 1107,
        height: 849,
        alt: "Nitrofire Computing logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: [
      {
        url: "/nitrofire-computing-logo.png",
        width: 1107,
        height: 849,
        alt: "Nitrofire Computing logo",
      },
    ],
  },
  icons: {
    icon: "/nitrofire-computing-logo.png",
    apple: "/nitrofire-computing-logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <div className="flex min-h-full flex-1 flex-col">
          <SiteHeader />
          <main className="flex flex-1 flex-col">{children}</main>
          <SiteFooter />
        </div>
        <HalloweenOverlay />
        <HolidayThemes />
      </body>
    </html>
  );
}
