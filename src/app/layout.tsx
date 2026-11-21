import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Èrò rẹ ni · We build your idea with you", template: "%s · Èrò rẹ ni" },
  description:
    "You have an idea. You do not know where to start. Share it with your budget. We build the product, the pages, the posts and the sales plan with you, until you can run it alone.",
  openGraph: {
    title: "Èrò rẹ ni · It is your idea",
    description: "You carry the dream. We carry the work.",
    siteName: "Èrò rẹ ni",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f4ef",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
