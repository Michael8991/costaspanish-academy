import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import SpanishCoursesClient from "./SpanishCoursesClient";

import dbConnect from "@/lib/mongo";
import { Course } from "@/models/Course";
import type { ICourseData } from "@/types";

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

  const courses = await Course.find({ languageToLearn: "Spanish" })
    .select("-__v")
    .lean<ICourseData[]>();

  const plainCourses: ICourseData[] = JSON.parse(JSON.stringify(courses));

  return <SpanishCoursesClient locale={locale} courses={plainCourses} />;
}
