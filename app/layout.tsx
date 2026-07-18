import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { SITE_FULL_RELEASE } from "@/content/site-config";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "US, Inc. — Trial Ends",
    template: "US, Inc. — %s",
  },
  description:
    "The most successful merger of two people, live since 2026. Trial ends December 13, 2026.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fullSite = SITE_FULL_RELEASE;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        {fullSite ? (
          <>
            <SiteHeader />
            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
              {children}
            </main>
            <SiteFooter />
          </>
        ) : (
          <main className="flex min-h-full flex-1 flex-col">{children}</main>
        )}
      </body>
    </html>
  );
}
