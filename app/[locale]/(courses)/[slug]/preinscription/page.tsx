// app/[locale]/(courses)/[slug]/preinscription/page.tsx
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import dbConnect from "@/lib/mongo";
import { Course } from "@/models/Course";
import PreinscriptionClient from "./PreinscriptionClient";

function serializeMongo(value: any): any {
  if (value === null || value === undefined) return value;

  if (value instanceof Date) return value.toISOString();

  if (typeof Buffer !== "undefined" && Buffer.isBuffer(value)) {
    return value.toString("base64");
  }

  // ObjectId -> string (robusto)
  if (
    typeof value === "object" &&
    value &&
    (value?._bsontype === "ObjectId" || typeof value.toHexString === "function")
  ) {
    return value.toString();
  }

  if (Array.isArray(value)) return value.map(serializeMongo);

  if (typeof value === "object") {
    const out: any = {};
    for (const [k, v] of Object.entries(value)) out[k] = serializeMongo(v);
    return out;
  }

  return value;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "preinscription" });

  await dbConnect();
  const courseRaw = await Course.findOne({ slug }).select("-__v").lean<any>();

  if (!courseRaw) {
    return {
      title: t("metadata.notFoundTitle"),
      description: t("metadata.notFoundDescription"),
    };
  }

  const course = serializeMongo(courseRaw);

  const title = `${course.title} | ${t("metadata.titleSuffix")}`;
  const description = t("metadata.description", { course: course.title });

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.costaspanishclass.com/${locale}/${slug}/preinscription`,
      languages: {
        en: `https://www.costaspanishclass.com/en/${slug}/preinscription`,
        es: `https://www.costaspanishclass.com/es/${slug}/preinscription`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.costaspanishclass.com/${locale}/${slug}/preinscription`,
      siteName: "Costa Spanish Academy",
      locale,
      type: "website",
      images: course.imageUrl ? [course.imageUrl] : undefined,
    },
  };
}

export default async function PreinscriptionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  await dbConnect();
  const courseRaw = await Course.findOne({ slug }).select("-__v").lean<any>();

  if (!courseRaw) notFound();

  const course = serializeMongo(courseRaw);

  return <PreinscriptionClient locale={locale} slug={slug} course={course} />;
}
