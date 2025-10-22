
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import CoursesLayoutClient from "./CoursesLayoutClient";

export const dynamic = "force-static";

type Props = {
    children: React.ReactNode;
    params: { locale: string };
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({ locale: params.locale, namespace: "courses" });

    const title = t("metadata.title");
    const description = t("metadata.description");
    const locale = params.locale;

    return {
        title,
        description,
        alternates: {
            canonical: `https://www.costaspanishclass.com/${locale}/courses`,
            languages: {
                en: "https://www.costaspanishclass.com/en/courses",
                es: "https://www.costaspanishclass.com/es/courses",
            },
        },
        openGraph: {
            title,
            description,
            url: `https://www.costaspanishclass.com/${locale}/courses`,
            siteName: "Costa Spanish Academy",
            locale,
            type: "website",
        },
    };
}

// Render principal
export default function Layout({ children }: Props) {
    return <CoursesLayoutClient>{children}</CoursesLayoutClient>;
}
