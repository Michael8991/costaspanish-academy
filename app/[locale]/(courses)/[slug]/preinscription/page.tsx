import { getTranslations } from "next-intl/server";
import { mockCourses } from "@/lib/mockcourses/mockCourses";
import { Metadata } from "next";
import PreinscriptionClient from "./PreinscriptionClient";

type Props = {
    params: { locale: string; slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const t = await getTranslations({ locale: params.locale, namespace: "preinscription" });
    const course = mockCourses.find((c) => c.slug === params.slug);

    if (!course) {
        return {
            title: t("metadata.notFoundTitle"),
            description: t("metadata.notFoundDescription"),
        };
    }

    return {
        title: `${course.title} | ${t("metadata.titleSuffix")}`,
        description: t("metadata.description", { course: course.title }),
        alternates: {
            canonical: `https://www.costaspanishclass.com/${params.locale}/${params.slug}/preinscription`,
            languages: {
                en: `https://www.costaspanishclass.com/en/${params.slug}/preinscription`,
                es: `https://www.costaspanishclass.com/es/${params.slug}/preinscription`,
            },
        },
        openGraph: {
            title: `${course.title} | ${t("metadata.titleSuffix")}`,
            description: t("metadata.description", { course: course.title }),
            url: `https://www.costaspanishclass.com/${params.locale}/${params.slug}/preinscription`,
            siteName: "Costa Spanish Academy",
            locale: params.locale,
            type: "website",
            images: [course.imageUrl],
        },
    };
}

export default async function PreinscriptionPage({ params }: Props) {
    const { locale, slug } = params;
    return <PreinscriptionClient locale={locale} slug={slug} />;
}
