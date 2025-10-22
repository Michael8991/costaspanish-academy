import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import SpanishCoursesClient from "./SpanishCoursesClient";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "courses" });

  return {
    title: t("spanish.metadata.title"),
    description: t("spanish.metadata.description"),
    alternates: {
      canonical: `https://www.costaspanishclass.com/${params.locale}/spanish`,
      languages: {
        en: "https://www.costaspanishclass.com/en/spanish",
        es: "https://www.costaspanishclass.com/es/spanish"
      }
    },
    openGraph: {
      title: t("spanish.metadata.title"),
      description: t("spanish.metadata.description"),
      url: `https://www.costaspanishclass.com/${params.locale}/spanish`,
      siteName: "Costa Spanish Academy",
      locale: params.locale,
      type: "website"
    }
  };
}

export default function Page() {
  return <SpanishCoursesClient />;
}
