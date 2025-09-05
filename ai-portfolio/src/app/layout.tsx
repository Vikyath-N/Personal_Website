import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/scroll-progress";
import SiteNav from "@/components/site-nav";
import PortfolioChat from "@/components/chat/PortfolioChat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vikyath Naradasi - AI Engineer & Full-Stack Developer",
  description: "Building delightful AI products with robust systems & polished UX.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ScrollProgress />
        <SiteNav />
        {children}
        <PortfolioChat />
      </body>
    </html>
  );
}
