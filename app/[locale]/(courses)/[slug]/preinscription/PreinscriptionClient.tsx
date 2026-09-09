"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { InformationPanel } from "@/components/PreinscriptionPage/InformationPanel";
import { PreinscriptionForm } from "@/components/PreinscriptionPage/PreinscriptionForm";
import type { ICourseData } from "@/types/courses";
import landingTheme from "@/styles/landing/landingTheme.module.css";
import styles from "./preinscriptionPage.module.css";

type Props = {
  locale: string;
  slug: string;
  course: ICourseData;
};

export default function PreinscriptionClient({ locale, slug, course }: Props) {
  const t = useTranslations("preinscription");
  const catalogPath = course.languageToLearn === "Spanish" ? "spanish" : "english";

  return (
    <div className={`${landingTheme.theme} ${styles.page}`}>
      <div className={styles.inner}>
        <nav className={styles.breadcrumb} aria-label={t("breadcrumbs.label")}>
          <Link href={`/${locale}`}>{t("breadcrumbs.home")}</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/${locale}/${catalogPath}`}>{t("breadcrumbs.courses")}</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/${locale}/${slug}`}>{course.title}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{t("breadcrumbs.preinscription")}</span>
        </nav>

        <header className={styles.intro}>
          <p className={styles.eyebrow}>{t("page.eyebrow")}</p>
          <h1>
            {t("page.heading.line1")}
            <span>{t("page.heading.line2")}</span>
          </h1>
          <p className={styles.supporting}>{t("page.supporting")}</p>
          <div className={styles.reassurance}>
            <strong>{t("page.reassurance.title")}</strong>
            <span>{t("page.reassurance.text")}</span>
          </div>
        </header>

        <section className={styles.shell} aria-label={t("page.shellLabel")}>
          <InformationPanel course={course} />
          <PreinscriptionForm course={course} />
        </section>
      </div>
    </div>
  );
}
