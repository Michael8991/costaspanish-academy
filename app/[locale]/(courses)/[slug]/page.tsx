import { getTranslations } from "next-intl/server";
import { mockCourses } from "@/lib/mockcourses/mockCourses";
import CourseClient from "./CourseClient";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "coursesCatalog" });
  const course = mockCourses.find((c) => c.slug === params.slug);

  if (!course) {
    return {
      title: t("notFoundTitle"),
      description: t("notFoundDescription"),
    };
  }

  const title = `${course.title} | Costa Spanish Academy`;
  const description = course.longDesc.substring(0, 155);

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.costaspanishclass.com/${params.locale}/${course.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.costaspanishclass.com/${params.locale}/${course.slug}`,
      siteName: "Costa Spanish Academy",
      locale: params.locale,
      type: "website",
    },
  };
}

export default function Page() {
  return <CourseClient />;
}
