import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { LanguageProvider } from "@/lib/contexts/LanguageContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Fondasi Creative Agency - Digital Foundation for Your Business",
  description: "We build a solid foundation for your business through technology, creativity, and the right strategy. Services: Website Development, Mobile Development, Media Production, Design Branding, Social Media Management.",
  keywords: ["creative agency", "web development", "mobile development", "branding", "social media", "fondasi"],
  authors: [{ name: "Fondasi Creative Agency" }],
  icons: {
    icon: '/fondasi.svg',
    apple: '/fondasi.svg',
  },
  openGraph: {
    title: "Fondasi Creative Agency",
    description: "Digital Foundation for Your Business",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
