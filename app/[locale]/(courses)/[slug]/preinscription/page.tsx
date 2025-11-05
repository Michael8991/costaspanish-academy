import { getTranslations } from "next-intl/server";
import { mockCourses } from "@/lib/mockcourses/mockCourses";
import type { Metadata } from "next";
import PreinscriptionClient from "./PreinscriptionClient";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
    const { locale, slug } = await params;
    const t = await getTranslations({ locale, namespace: "preinscription" });

    const course = mockCourses.find((c) => c.slug === slug);

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
            images: [course.imageUrl],
        },
    };
}

export default async function PreinscriptionPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    return <PreinscriptionClient locale={locale} slug={slug} />;
}
