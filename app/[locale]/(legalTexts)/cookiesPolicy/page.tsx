import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import CookiesPolicy from "./CookiesPolicy";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cookiesPolicy" });

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    alternates: {
      canonical: `https://www.costaspanishclass.com/${locale}/cookies`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "cookiesPolicy" });

  const content = {
    title: t("title"),
    intro: t("intro"),
    sections: [
      {
        title: t("sections.what.title"),
        paragraphs: [t("sections.what.p1")],
      },
      {
        title: t("sections.types.title"),
        paragraphs: [
          t("sections.types.p1"),
          t("sections.types.p2"),
        ],
      },
      {
        title: t("sections.used.title"),
        items: [
          { label: t("sections.used.items.technical.label"), value: t("sections.used.items.technical.value") },
          { label: t("sections.used.items.analytics.label"), value: t("sections.used.items.analytics.value") }
        ],
      },
      {
        title: t("sections.manage.title"),
        paragraphs: [
          t("sections.manage.p1"),
          t("sections.manage.p2"),
        ],
      },
      {
        title: t("sections.update.title"),
        paragraphs: [t("sections.update.p1")],
      }
    ],
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      <CookiesPolicy content={content} />
    </main>
  );
}
