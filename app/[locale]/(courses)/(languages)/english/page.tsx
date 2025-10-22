import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import EnglishCoursesClient from "./EnglishCoursesClient";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "courses" });

  return {
    title: t("english.metadata.title"),
    description: t("english.metadata.description"),
    alternates: {
      canonical: `https://www.costaspanishclass.com/${params.locale}/english`,
      languages: {
        en: "https://www.costaspanishclass.com/en/english",
        es: "https://www.costaspanishclass.com/es/english"
      }
    },
    openGraph: {
      title: t("english.metadata.title"),
      description: t("english.metadata.description"),
      url: `https://www.costaspanishclass.com/${params.locale}/english`,
      siteName: "Costa Spanish Academy",
      locale: params.locale,
      type: "website"
    }
  };
}

export default function Page() {
  return <EnglishCoursesClient />;
}
