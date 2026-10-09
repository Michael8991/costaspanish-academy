import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { Footer, Header, TopBar } from "@/components";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import CookieBanner from "@/components/cookies/CookieBanner";
import AnalyticsLoader from "@/components/cookies/AnalyticsLoader";
import { ConsentProvider } from "@/components/cookies/ConsentProvider";
import { CampaignContextManager } from "@/components/analytics/CampaignContextManager";
import { GoogleTagManagerLoader } from "@/components/analytics/GoogleTagManagerLoader";
import { GoogleVirtualPageView } from "@/components/analytics/GoogleVirtualPageView";
import { resolveGoogleTagManagerConfig } from "@/lib/analytics/googleTagManager";
import JanuaryPromoPopup from "@/components/promo/JanuaryPromoPopup";

const geistSans = Geist({
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

const montserrat = Montserrat({
  weight: ["200", "300", "400", "500", "600", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Costa Spanish",
  description: "Aprende español con expertos",
  icons: {
    icon: "/assets/LogoCostaSpanishRojoCoralFuerte.png",
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  const supportedLocales = ["en", "es"];
  if (!supportedLocales.includes(locale)) notFound();

  const googleTagManagerConfig = resolveGoogleTagManagerConfig({
    gtmId: process.env.NEXT_PUBLIC_GTM_ID,
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
  });

  const common = (await import(`../../messages/${locale}/common.json`)).default;
  const home = (await import(`../../messages/${locale}/home.json`)).default;
  const contact = (await import(`../../messages/${locale}/contact.json`)).default;
  const courses = (await import(`../../messages/${locale}/courses.json`)).default;
  const filters = (await import(`../../messages/${locale}/filters.json`)).default;
  const coursesCatalog = (await import(`../../messages/${locale}/coursesCatalog.json`)).default;
  const coursePage = (await import(`../../messages/${locale}/coursePage.json`)).default;
  const preinscription = (await import(`../../messages/${locale}/preinscription.json`)).default;
  const cookies = (await import(`../../messages/${locale}/cookies.json`)).default;
  const promoPopup = (await import(`../../messages/${locale}/promoPopup.json`)).default;


  const messages = {
    ...common,
    ...home,
    contact,
    courses,
    ...filters,
    coursesCatalog,
    coursePage,
    preinscription,
    cookies,
    promoPopup,
  };

  return (
    <html
      lang={locale}
      className={`${geistSans.className} ${geistMono.className} ${montserrat.className}`}
    >
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ConsentProvider>
            <Suspense fallback={null}>
              <CampaignContextManager />
            </Suspense>
            <GoogleTagManagerLoader config={googleTagManagerConfig} />
            <GoogleVirtualPageView />
            <JanuaryPromoPopup />
            <AnalyticsLoader />
            <CookieBanner policyHref={`/${locale}/cookiesPolicy`} />
            <TopBar />
            <Header />
            <main>{children}</main>
            <Footer />
          </ConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
