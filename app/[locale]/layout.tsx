import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer, Header, TopBar } from "@/components";

import { NextIntlClientProvider, useMessages } from 'next-intl';
import { notFound } from "next/navigation";

import { Montserrat } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  weight: ["200", "300", "400", "500", "600", "700", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Costa Spanish",
  description: "Aprende español con expertos",
  icons: {
    icon: "/assets/LogoCostaSpanishRojoCoralFuerte.png",
    type: "img/svg",
  },
};
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  const supportedLocales = ['en', 'es'];
  if (!supportedLocales.includes(locale)) notFound();

  // Cargar mensajes directamente (server-side)
  const common = (await import(`../../messages/${locale}/common.json`)).default;
  const home = (await import(`../../messages/${locale}/home.json`)).default;
  const contact = (await import(`../../messages/${locale}/contact.json`)).default;
  const courses = (await import(`../../messages/${locale}/courses.json`)).default;
  const filters = (await import(`../../messages/${locale}/filters.json`)).default;
  const coursesCatalog = (await import(`../../messages/${locale}/coursesCatalog.json`)).default;
  const coursePage = (await import(`../../messages/${locale}/coursePage.json`)).default;
  const preinscription = (await import(`../../messages/${locale}/preinscription.json`)).default;

  const messages = { ...common, ...home, contact, courses, ...filters, coursesCatalog, coursePage, preinscription };

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <TopBar />
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}