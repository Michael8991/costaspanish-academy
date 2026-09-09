"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { ICourseData } from "@/types/courses";
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
      ? { label: t("details.pace"), value: course.hoursPerWeek }
      : null,
    hasValue(course.level)
      ? { label: t("details.level"), value: course.level }
      : isPrivate
        ? { label: t("details.level"), value: t("details.allLevels") }
        : null,
    hasValue(course.format)
      ? { label: t("details.format"), value: course.format }
      : null,
    isPrivate
      ? { label: t("details.groupSize"), value: t("details.privateGroupSize") }
      : hasValue(course.maxPeople)
        ? { label: t("details.groupSize"), value: course.maxPeople }
        : null,
    hasValue(course.duration)
      ? { label: t("details.duration"), value: course.duration }
      : null,
    hasValue(course.modality)
      ? { label: t("details.courseType"), value: t(`modality.${course.modality}`) }
      : null,
  ].filter((detail): detail is Detail => detail !== null);

  const visualLabel = isPrivate ? "1:1" : course.level ?? course.modality ?? "";
  const shortDescription = course.longDesc?.split(/(?<=[.!?])\s+/).slice(0, 2).join(" ");

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{t(`status.${course.status ?? "pending"}`)}</p>
          <h1>{course.title}</h1>
          {hasValue(course.subTitle) && <p className={styles.subtitle}>{course.subTitle}</p>}
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

      <section className={styles.offer} aria-labelledby="course-offer-title">
        <div className={styles.offerIntro}>
          <p className={styles.eyebrow}>{t("offer.eyebrow")}</p>
          <h2 id="course-offer-title">{isPrivate ? t("offer.privateTitle") : t("offer.title")}</h2>
          <p>{isPrivate ? t("offer.privateText") : t("offer.text")}</p>
        </div>

        {isPrivate && (
          <div className={styles.privateFormats} aria-label={t("formats.label")}>
            {(t.raw("formats.options") as Array<{ people: string; label: string }>).map((format) => (
              <div key={format.people}>
                <strong>{format.people}</strong>
                <span>{format.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className={styles.offerAction}>
          {formattedPrice ? (
            <div className={styles.price}>
              <small>{t("offer.currentPrice")}</small>
              <strong>{formattedPrice}</strong>
              <span>{isPrivate ? t("offer.perHour") : t("offer.perMonth")}</span>
            </div>
          ) : (
            <p className={styles.priceReview}>{t("offer.priceOnRequest")}</p>
          )}
          <Link href={`/${locale}/${course.slug}/preinscription`}>
            {t("preRegister")} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {hasValue(course.longDesc) && shortDescription !== course.longDesc && (
        <section className={styles.aboutCourse}>
          <p className={styles.eyebrow}>{t("about.eyebrow")}</p>
          <h2>{t("about.title")}</h2>
          <p>{course.longDesc}</p>
        </section>
      )}
    </>
  );
}
