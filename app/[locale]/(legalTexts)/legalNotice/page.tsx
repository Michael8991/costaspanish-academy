import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import LegalNotice from "./LegalNotice";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legalNotice" });

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    alternates: {
      canonical: `https://www.costaspanishclass.com/${locale}/legal-notice`,
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

  const t = await getTranslations({ locale, namespace: "legalNotice" });

  const content = {
    title: t("title"),
    intro: t("intro"),

    sections: [
      {
        title: t("sections.owner.title"),
        items: [
          { label: t("sections.owner.items.name.label"), value: t("sections.owner.items.name.value") },
          { label: t("sections.owner.items.id.label"), value: t("sections.owner.items.id.value") },
          { label: t("sections.owner.items.address.label"), value: t("sections.owner.items.address.value") },
          { label: t("sections.owner.items.email.label"), value: t("sections.owner.items.email.value") },
          { label: t("sections.owner.items.activity.label"), value: t("sections.owner.items.activity.value") },
        ],
      },
      {
        title: t("sections.terms.title"),
        paragraphs: [
          t("sections.terms.p1"),
          t("sections.terms.p2"),
        ],
      },
      {
        title: t("sections.ip.title"),
        paragraphs: [
          t("sections.ip.p1"),
          t("sections.ip.p2"),
        ],
      },
      {
        title: t("sections.liability.title"),
        paragraphs: [
          t("sections.liability.p1"),
          t("sections.liability.p2"),
        ],
      },
      {
        title: t("sections.law.title"),
        paragraphs: [
          t("sections.law.p1"),
        ],
      },
      {
        title: t("sections.contact.title"),
        paragraphs: [
          t("sections.contact.p1"),
        ],
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      <LegalNotice content={content} />
    </main>
  );
}
