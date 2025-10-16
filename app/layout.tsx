import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "remixicon/fonts/remixicon.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inloom Innovative Creations",
  description: "Explore unique handmade products from talented artisans",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://inloom.vercel.app"),
  openGraph: {
    title: "Inloom Innovative Creations",
    description: "Explore unique handmade products from talented artisans",
    url: "https://inloom.vercel.app",
    siteName: "Inloom",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Inloom Innovative Creations",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inloom Innovative Creations",
    description: "Explore unique handmade products from talented artisans",
    images: ["/og-image.png"],
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  manifest: "/site.webmanifest",
  authors: [{ name: "Inloom", url: "https://inloom.vercel.app" }],
  keywords: [
    "handmade",
    "artisanal",
    "crafts",
    "unique products",
    "creative designs",
    "home decor",
    "fashion accessories",
    "gifts",
    "sustainable",
    "custom-made",
  ],
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "E-commerce",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    title: "Inloom Innovative Creations",
    statusBarStyle: "default",
  },
  other: {
    "google-site-verification": "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
