import type { Metadata } from "next";
import { notFound } from "next/navigation";

import type { ReactNode } from "react";

import { StoreProvider } from "@/store/store-provider";

import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";

import "../globals.css";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NatureArk — Budget and Animal Accounting Control",
  description:
    "Automate the process of accounting, budget management, document creation, and reporting for animals. Simple interface, transparency of expenses, and full control.",

  verification: {
    google: "pB5cDY-2SstUzOLdvx18Zw-Lt6vSvoylDw7CwaMy8uk",
  },

  openGraph: {
    title: "NatureArk — Budget and Animal Accounting Control",
    description:
      "Automate the process of accounting, budget management, document creation, and reporting for animals. Simple interface, transparency of expenses, and full control.",
    url: "https://nature-ark.vercel.app/en",
    siteName: "NatureArk",
    images: [
      {
        url: "https://nature-ark.vercel.app/bison.jpg",
        width: 1200,
        height: 630,
        alt: "NatureArk — Animal accounting and budget control system",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "NatureArk — Budget and Animal Accounting Control",
    description:
      "Automate animal accounting, budget management, document creation, and reporting. Simple and transparent.",
    images: ["https://nature-ark.vercel.app/bison.jpg"],
  },
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
