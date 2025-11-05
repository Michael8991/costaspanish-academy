import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import CoursesLayoutClient from "./CoursesLayoutClient";

export const dynamic = "force-static";

type LayoutParams = Promise<{ locale: string }>;
type LayoutProps = { children: React.ReactNode; params: LayoutParams };

export async function generateMetadata(
    { params }: { params: LayoutParams }
): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "courses" });

    const title = t("metadata.title");
    const description = t("metadata.description");

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

export default async function Layout({ children }: LayoutProps) {
    return <CoursesLayoutClient>{children}</CoursesLayoutClient>;
}
