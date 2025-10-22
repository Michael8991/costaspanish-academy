import { getTranslations } from "next-intl/server";
import ContactClient from "./ContactClient";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "contact" });

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    alternates: {
      canonical: `https://www.costaspanishclass.com/${params.locale}/contactUs`,
      languages: {
        en: "https://www.costaspanishclass.com/en/contactUs",
        es: "https://www.costaspanishclass.com/es/contactUs",
      },
    },
    openGraph: {
      title: t("metadata.title"),
      description: t("metadata.description"),
      url: `https://www.costaspanishclass.com/${params.locale}/contactUs`,
      siteName: "Costa Spanish Academy",
      locale: params.locale,
      type: "website",
    },
  };
}

export default function Page() {
  return <ContactClient />;
}
