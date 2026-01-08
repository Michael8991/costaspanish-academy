import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import dbConnect from "@/lib/mongo";
import { Course } from "@/models/Course";
import CourseClient from "./CourseClient";
function serializeMongo(value: any): any {
  if (value === null || value === undefined) return value;

  // Date -> string ISO
  if (value instanceof Date) return value.toISOString();

  // Buffer -> base64 (por si aparece)
  if (typeof Buffer !== "undefined" && Buffer.isBuffer(value)) {
    return value.toString("base64");
  }

  // ObjectId (BSON) -> string
  if (typeof value === "object" && value?._bsontype === "ObjectId") {
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
  const t = await getTranslations({ locale, namespace: "coursesCatalog" });


  await dbConnect();
  const course = await Course.findOne({ slug }).select("-__v").lean<any>();

  if (!course) {
    return {
      title: t("notFoundTitle"),
      description: t("notFoundDescription"),
    };
  }

  
  const title = `${course.title} | Costa Spanish Academy`;
  const description =
    typeof course.longDesc === "string" && course.longDesc.length > 0
      ? course.longDesc.substring(0, 155)
      : t("defaultDescription"); 

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.costaspanishclass.com/${locale}/${course.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.costaspanishclass.com/${locale}/${course.slug}`,
      siteName: "Costa Spanish Academy",
      locale,
      type: "website",
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  await dbConnect();
  const courseRaw = await Course.findOne({ slug }).select("-__v").lean<any>();

  if (!courseRaw) notFound();

  const course = serializeMongo(courseRaw);

  return <CourseClient course={course} locale={locale} />;
}