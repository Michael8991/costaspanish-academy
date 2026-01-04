import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import dbConnect from "@/lib/mongo";
import { Course } from "@/models/Course";
import CourseClient from "./CourseClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "coursesCatalog" });

  // CAMBIO 1: en vez de mockCourses, consultamos Mongo Atlas por slug
  await dbConnect();
  const course = await Course.findOne({ slug }).select("-__v").lean<any>();

  if (!course) {
    return {
      title: t("notFoundTitle"),
      description: t("notFoundDescription"),
    };
  }

  // CAMBIO 2: metadata basada en el curso real
  const title = `${course.title} | Costa Spanish Academy`;
  const description =
    typeof course.longDesc === "string" && course.longDesc.length > 0
      ? course.longDesc.substring(0, 155)
      : t("defaultDescription"); // si no tienes esta key, cambia por un string fijo

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

  // CAMBIO 3: el Page (Server) carga el curso desde DB
  await dbConnect();
  const course = await Course.findOne({ slug }).select("-__v").lean<any>();

  // CAMBIO 4: si no existe, 404 real
  if (!course) notFound();

  // CAMBIO 5: pasamos course y locale al Client Component
  return <CourseClient course={course} locale={locale} />;
}
