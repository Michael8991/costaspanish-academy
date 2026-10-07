// app/[locale]/(courses)/[slug]/preinscription/page.tsx
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import dbConnect from "@/lib/mongo";
import {
  getPublicCourseBySlug,
  PUBLIC_COURSE_DETAIL_PROJECTION,
} from "@/lib/courses/publicCourses";
import type { ICourseData } from "@/types/courses";
import PreinscriptionClient from "./PreinscriptionClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "preinscription" });

  await dbConnect();
  const course = await getPublicCourseBySlug<ICourseData>(
    slug,
    PUBLIC_COURSE_DETAIL_PROJECTION,
  );

  if (!course) {
    return {
      title: t("metadata.notFoundTitle"),
      description: t("metadata.notFoundDescription"),
    };
  }

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
  const course = await getPublicCourseBySlug<ICourseData>(
    slug,
    PUBLIC_COURSE_DETAIL_PROJECTION,
  );

  if (!course) notFound();

  return <PreinscriptionClient locale={locale} slug={slug} course={course} />;
}
