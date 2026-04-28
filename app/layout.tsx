import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/lib/smooth-scroll";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "North&Co — Premium Web Design & Development Agency",
  description:
    "An award-winning agency crafting high-fidelity brand systems, digital products and immersive web experiences for global luxury brands.",
  keywords: ["web design", "development", "luxury brands", "digital agency"],
  authors: [{ name: "North&Co" }],
  openGraph: {
    title: "North&Co — Premium Web Design & Development Agency",
    description: "Web Design · Product Engineering · Brand Identity.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}