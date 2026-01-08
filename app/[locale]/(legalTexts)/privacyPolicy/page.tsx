import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import PrivacyPolicy from "./PrivacyPolicy";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPolicy" });

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    alternates: {
      canonical: `https://www.costaspanishclass.com/${locale}/privacy-policy`,
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

  const t = await getTranslations({ locale, namespace: "privacyPolicy" });

  const content = {
    title: t("title"),
    intro: t("intro"),
    sections: [
      {
        title: t("sections.owner.title"),
        items: [
          { label: t("sections.owner.items.owner.label"), value: t("sections.owner.items.owner.value") },
          { label: t("sections.owner.items.email.label"), value: t("sections.owner.items.email.value") },
          { label: t("sections.owner.items.activity.label"), value: t("sections.owner.items.activity.value") },
        ],
      },
      {
        title: t("sections.data.title"),
        paragraphs: [
          t("sections.data.p1"),
          t("sections.data.p2"),
        ],
      },
      {
        title: t("sections.purpose.title"),
        paragraphs: [
          t("sections.purpose.p1"),
        ],
      },
      {
        title: t("sections.legalBasis.title"),
        paragraphs: [
          t("sections.legalBasis.p1"),
        ],
      },
      {
        title: t("sections.retention.title"),
        paragraphs: [
          t("sections.retention.p1"),
        ],
      },
      {
        title: t("sections.rights.title"),
        paragraphs: [
          t("sections.rights.p1"),
          t("sections.rights.p2"),
        ],
      },
      {
        title: t("sections.security.title"),
        paragraphs: [
          t("sections.security.p1"),
        ],
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      <PrivacyPolicy content={content} />
    </main>
  );
}
