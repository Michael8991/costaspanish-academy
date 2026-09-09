import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import SpanishCoursesClient from "./SpanishCoursesClient";

import dbConnect from "@/lib/mongo";
import { Course } from "@/models/Course";
import { PUBLIC_SPANISH_OFFERINGS } from "@/lib/courses/publicOfferings";
import type { PublicCourseRecord } from "@/components/CoursesCatalog/CoursesCatalog";

type LocalizedValue = string | Record<string, string>;

function localized(value: LocalizedValue | undefined, locale: string) {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[locale] ?? value.es ?? value.en ?? "";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "courses" });

  const title = t("spanish.metadata.title");
  const description = t("spanish.metadata.description");

  return {
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
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  await dbConnect();

  const slugs = PUBLIC_SPANISH_OFFERINGS.map(({ slug }) => slug);
  const records = await Course.find({
    languageToLearn: "Spanish",
    slug: { $in: slugs },
  })
    .select("_id slug title longDesc imageUrl level format modality status")
    .lean();

  const bySlug = new Map(records.map((course) => [course.slug, course]));
  const courses = PUBLIC_SPANISH_OFFERINGS.flatMap((offering) => {
    const course = bySlug.get(offering.slug);
    if (!course) return [];

    return [{
      id: String(course._id),
      slug: course.slug,
      title: localized(course.title as unknown as LocalizedValue, locale),
      description: localized(course.longDesc as unknown as LocalizedValue, locale),
      imageUrl: course.imageUrl,
      level: course.level,
      format: course.format,
      modality: course.modality,
      status: course.status,
    } satisfies PublicCourseRecord];
  });

  return <SpanishCoursesClient locale={locale} courses={courses} />;
}
