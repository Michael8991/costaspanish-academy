"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  CoursesCatalog,
  type PublicCourseRecord,
} from "@/components/CoursesCatalog/CoursesCatalog";
import landingTheme from "@/styles/landing/landingTheme.module.css";
import styles from "./spanishCourses.module.css";

type SpanishCoursesClientProps = {
  locale: string;
  courses: PublicCourseRecord[];
};

export default function SpanishCoursesClient({
  locale,
  courses,
}: SpanishCoursesClientProps) {
  const t = useTranslations("coursesCatalog");

  return (
    <div className={`${landingTheme.theme} ${styles.page}`}>
      <motion.div
        className={styles.inner}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className={styles.breadcrumb} aria-label={t("breadcrumbs.label")}>
          <Link href={`/${locale}`}>{t("breadcrumbs.home")}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{t("breadcrumbs.courses")}</span>
        </nav>

        <header className={styles.pageHeader}>
          <p className={styles.eyebrow}>{t("header.eyebrow")}</p>
          <h1>
            {t("header.line1")}
            <span>{t("header.line2")}</span>
          </h1>
          <p className={styles.supporting}>{t("header.supporting")}</p>
        </header>

        <CoursesCatalog courses={courses} locale={locale} />

        <aside className={styles.support}>
          <span className={styles.supportDoodle} aria-hidden="true" />
          <div>
            <p className={styles.supportEyebrow}>{t("support.eyebrow")}</p>
            <h2>{t("support.title")}</h2>
            <p>{t("support.text")}</p>
          </div>
          <Link href={`/${locale}/contactUs`}>
            {t("support.cta")} <span aria-hidden="true">→</span>
          </Link>
        </aside>
      </motion.div>
    </div>
  );
}
