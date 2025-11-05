import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import EnglishCoursesClient from "./EnglishCoursesClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "courses" });

  const title = t("english.metadata.title");
  const description = t("english.metadata.description");

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.costaspanishclass.com/${locale}/english`,
      languages: {
        en: "https://www.costaspanishclass.com/en/english",
        es: "https://www.costaspanishclass.com/es/english",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.costaspanishclass.com/${locale}/english`,
      siteName: "Costa Spanish Academy",
      locale,
      type: "website",
    },
  };
}

export default function Page() {
  return <EnglishCoursesClient />;
}
