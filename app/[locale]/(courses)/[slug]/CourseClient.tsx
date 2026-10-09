"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { useAnalytics } from "@/components/analytics/useAnalytics";
import CourseMainSection from "@/components/CourseMainSection/CourseMainSection";
import CourseModule from "@/components/CourseModules/CourseModule";
import FaqAccordion from "@/components/Faq/FaqAccordion";
import {
  normalizeAnalyticsLocale,
  normalizeCourseType,
} from "@/lib/analytics/normalization";
import type { ICourseData, IFaqData } from "@/types/courses";
import landingTheme from "@/styles/landing/landingTheme.module.css";
import styles from "./coursePage.module.css";

type CourseClientProps = {
  locale: string;
  course: ICourseData;
};

export default function CourseClient({ locale, course }: CourseClientProps) {
  const t = useTranslations("coursePage");
  const analytics = useAnalytics();
  const trackedCourseView = useRef<string | null>(null);
  const faqs = t.raw("faq.items") as IFaqData[];
  const catalogPath = course.languageToLearn === "Spanish" ? "spanish" : "english";
  const analyticsLocale = normalizeAnalyticsLocale(locale);

  useEffect(() => {
    const viewKey = `${analyticsLocale}:${course.slug}`;
    if (!analytics.enabled || trackedCourseView.current === viewKey) return;

    trackedCourseView.current = viewKey;
    analytics.track("course_view", {
      course_slug: course.slug,
      course_type: normalizeCourseType(course.modality),
      locale: analyticsLocale,
    });
  }, [analytics, analyticsLocale, course.modality, course.slug]);

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
          <Link
            href={`/${locale}/contactUs`}
            onClick={() => analytics.track("course_cta_click", {
              course_slug: course.slug,
              cta_type: "contact",
              source_section: "course_detail",
              locale: analyticsLocale,
            })}
          >
            {t("support.cta")} <span aria-hidden="true">→</span>
          </Link>
        </aside>
      </div>
    </div>
  );
}
