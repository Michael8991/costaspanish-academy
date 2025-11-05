import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  const title = t("metadata.title");
  const description = t("metadata.description");

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.costaspanishclass.com/${locale}/contactUs`,
      languages: {
        en: "https://www.costaspanishclass.com/en/contactUs",
        es: "https://www.costaspanishclass.com/es/contactUs",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.costaspanishclass.com/${locale}/contactUs`,
      siteName: "Costa Spanish Academy",
      locale,
      type: "website",
    },
  };
}

export default function Page() {
  return <ContactClient />;
}
