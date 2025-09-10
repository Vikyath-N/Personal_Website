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
  description: "AI Engineer and Full-Stack Developer specializing in machine learning, computer vision, and modern web applications. Building delightful AI products with robust systems & polished UX.",
  keywords: ["AI Engineer", "Full-Stack Developer", "Machine Learning", "Computer Vision", "React", "Next.js", "Python", "TensorFlow", "Portfolio"],
  authors: [{ name: "Vikyath Naradasi" }],
  creator: "Vikyath Naradasi",
  publisher: "Vikyath Naradasi",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://personal-website-ef637.web.app",
    title: "Vikyath Naradasi - AI Engineer & Full-Stack Developer",
    description: "AI Engineer and Full-Stack Developer specializing in machine learning, computer vision, and modern web applications.",
    siteName: "Vikyath Naradasi Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vikyath Naradasi - AI Engineer & Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vikyath Naradasi - AI Engineer & Full-Stack Developer",
    description: "AI Engineer and Full-Stack Developer specializing in machine learning, computer vision, and modern web applications.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
  },
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
        suppressHydrationWarning
      >
        <ScrollProgress />
        <SiteNav />
        {children}
        <PortfolioChat />
      </body>
    </html>
  );
}
