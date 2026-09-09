"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import CourseMainSection from "@/components/CourseMainSection/CourseMainSection";
import CourseModule from "@/components/CourseModules/CourseModule";
import FaqAccordion from "@/components/Faq/FaqAccordion";
import type { ICourseData, IFaqData } from "@/types/courses";
import landingTheme from "@/styles/landing/landingTheme.module.css";
import styles from "./coursePage.module.css";

type CourseClientProps = {
  locale: string;
  course: ICourseData;
};

export default function CourseClient({ locale, course }: CourseClientProps) {
  const t = useTranslations("coursePage");
  const faqs = t.raw("faq.items") as IFaqData[];
  const catalogPath = course.languageToLearn === "Spanish" ? "spanish" : "english";

  return (
    <div className={`${landingTheme.theme} ${styles.page}`}>
      <div className={styles.inner}>
        <nav className={styles.breadcrumb} aria-label={t("breadcrumbs.label")}>
          <Link href={`/${locale}`}>{t("breadcrumbs.home")}</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/${locale}/${catalogPath}`}>{t("breadcrumbs.courses")}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{course.title}</span>
        </nav>

        <CourseMainSection course={course} locale={locale} />
        <CourseModule course={course} />
        <FaqAccordion faqs={faqs} />

        <aside className={styles.finalCta}>
          <span className={styles.doodle} aria-hidden="true" />
          <div>
            <p className={styles.eyebrow}>{t("support.eyebrow")}</p>
            <h2>{t("support.title")}</h2>
            <p>{t("support.text")}</p>
          </div>
          <Link href={`/${locale}/contactUs`}>
            {t("support.cta")} <span aria-hidden="true">→</span>
          </Link>
        </aside>
      </div>
    </div>
  );
}
