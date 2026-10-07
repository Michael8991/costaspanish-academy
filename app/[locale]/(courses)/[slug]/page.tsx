import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import dbConnect from "@/lib/mongo";
import {
  getPublicCourseBySlug,
  PUBLIC_COURSE_DETAIL_PROJECTION,
} from "@/lib/courses/publicCourses";
import type { ICourseData } from "@/types/courses";
import CourseClient from "./CourseClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "coursePage" });


  await dbConnect();
  const course = await getPublicCourseBySlug<ICourseData>(
    slug,
    PUBLIC_COURSE_DETAIL_PROJECTION,
  );

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
  const course = await getPublicCourseBySlug<ICourseData>(
    slug,
    PUBLIC_COURSE_DETAIL_PROJECTION,
  );

  if (!course) notFound();

  return <CourseClient course={course} locale={locale} />;
}
