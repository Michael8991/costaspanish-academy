import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import SpanishCoursesClient from "./SpanishCoursesClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "courses" });

  const title = t("spanish.metadata.title");
  const description = t("spanish.metadata.description");


  const metadata: Metadata = {
    title,
    description,
    alternates: {
      canonical: `https://www.costaspanishclass.com/${locale}/spanish`,
      languages: {
        en: "https://www.costaspanishclass.com/en/spanish",
        es: "https://www.costaspanishclass.com/es/spanish",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.costaspanishclass.com/${locale}/spanish`,
      siteName: "Costa Spanish Academy",
      locale,
      type: "website",
    },
  };

  return metadata;
}

export default function Page() {
  return <SpanishCoursesClient />;
}
