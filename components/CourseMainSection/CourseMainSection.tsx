"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { ICourseData } from "@/types/courses";
import { COMMERCIAL_OFFER } from "@/lib/courses/commercialOffer";
import { PUBLIC_SPANISH_OFFERINGS } from "@/lib/courses/publicOfferings";
import CourseOffer from "@/components/CourseOffer/CourseOffer";
import styles from "./courseMainSection.module.css";

type CourseProps = {
  course: ICourseData;
  locale: string;
};

type Detail = { label: string; value: string };

const hasValue = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

export default function CourseMainSection({ course, locale }: CourseProps) {
  const t = useTranslations("coursePage");
  const activeLocale = useLocale();
  const isPrivate = course.status === "private" || course.modality === "Private";
  const isOfficial = course.slug in COMMERCIAL_OFFER;
  const isRegular = PUBLIC_SPANISH_OFFERINGS.some((offering) => offering.slug === course.slug && offering.presentationRole === "regularGroup");
  const numericPrice = Number(course.price);
  const hasCanonicalPrice = Number.isFinite(numericPrice) && numericPrice > 0;
  const formattedPrice = hasCanonicalPrice
    ? new Intl.NumberFormat(activeLocale, {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }).format(numericPrice)
    : null;

  const details: Detail[] = [
    hasValue(course.hoursPerWeek)
      ? { label: t("details.pace"), value: /^\d+(\.\d+)?$/.test(course.hoursPerWeek) ? t("details.hoursPerWeek", { hours: course.hoursPerWeek }) : course.hoursPerWeek }
      : null,
    hasValue(course.level)
      ? { label: t("details.level"), value: course.level }
      : isPrivate
        ? { label: t("details.level"), value: t("details.allLevels") }
        : null,
    hasValue(course.format)
      ? { label: t("details.format"), value: isRegular && course.format === "Presencial en Torrox" ? t("details.inPersonTorrox") : course.format }
      : null,
    isPrivate
      ? { label: t("details.groupSize"), value: t("details.privateGroupSize") }
      : hasValue(course.maxPeople)
        ? { label: t("details.groupSize"), value: course.maxPeople }
        : null,
    hasValue(course.duration)
      ? { label: t("details.duration"), value: isRegular && course.duration === "12 meses" ? t("details.twelveMonths") : course.duration }
      : null,
    hasValue(course.modality)
      ? { label: t("details.courseType"), value: t(`modality.${course.modality}`) }
      : null,
  ].filter((detail): detail is Detail => detail !== null);

  const visualLabel = isPrivate ? "1:1 · 1:2" : course.level ?? course.modality ?? "";
  const shortDescription = isOfficial
    ? t(`commercialDescriptions.${course.slug}`)
    : course.longDesc?.split(/(?<=[.!?])\s+/).slice(0, 2).join(" ");
  const aboutDescription = isRegular ? t(`regularAbout.${course.slug}`) : course.longDesc;

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{t(`status.${course.status ?? "pending"}`)}</p>
          <h1>{isOfficial ? t(`commercialTitles.${course.slug}`) : course.title}</h1>
          {hasValue(course.subTitle) && <p className={styles.subtitle}>{isRegular ? t("regularSubtitle") : course.subTitle}</p>}
          {hasValue(shortDescription) && <p className={styles.description}>{shortDescription}</p>}
        </div>

        <div className={styles.visual}>
          <span className={styles.shape} aria-hidden="true" />
          <Image
            src={course.imageUrl}
            alt={t("hero.imageAlt", { title: course.title })}
            fill
            sizes="(max-width: 800px) calc(100vw - 52px), 520px"
            className={styles.image}
            quality={82}
          />
          {visualLabel && <span className={styles.visualLabel} aria-hidden="true">{visualLabel}</span>}
          <span className={styles.doodle} aria-hidden="true" />
        </div>
      </section>

      {details.length > 0 && (
        <section className={styles.glance} aria-labelledby="course-glance-title">
          <p id="course-glance-title" className={styles.glanceTitle}>{t("details.title")}</p>
          <dl>
            {details.map((detail) => (
              <div key={`${detail.label}-${detail.value}`}>
                <dt>{detail.label}</dt>
                <dd>{detail.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <CourseOffer course={course} locale={locale} fallbackPrice={formattedPrice} />

      {hasValue(aboutDescription) && shortDescription !== aboutDescription && (
        <section className={styles.aboutCourse}>
          <p className={styles.eyebrow}>{t("about.eyebrow")}</p>
          <h2>{t("about.title")}</h2>
          <p>{aboutDescription}</p>
        </section>
      )}
    </>
  );
}
