"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  CalendarDays,
  Check,
  Clock3,
  Coffee,
  Laptop,
  MapPin,
  UsersRound,
} from "lucide-react";
import type { ICourseData } from "@/types/courses";
import { COMMERCIAL_OFFER } from "@/lib/courses/commercialOffer";
import { PUBLIC_SPANISH_OFFERINGS } from "@/lib/courses/publicOfferings";
import styles from "./courseOffer.module.css";

type Props = {
  course: ICourseData;
  locale: string;
  fallbackPrice: string | null;
};
type PrivateMode = "1:1" | "1:2";

const validPrice = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value) && value > 0;

function euro(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function PreRegister({ course, locale }: Pick<Props, "course" | "locale">) {
  const t = useTranslations("coursePage");
  return (
    <Link
      className={styles.cta}
      href={`/${locale}/${course.slug}/preinscription`}
    >
      {t("preRegister")} <span aria-hidden="true">→</span>
    </Link>
  );
}

function PrivateCourseOffer({
  course,
  locale,
}: Pick<Props, "course" | "locale">) {
  const t = useTranslations("coursePage.offerDesign");
  const [mode, setMode] = useState<PrivateMode>("1:1");
  const catalog = COMMERCIAL_OFFER["clases-privadas-espanol"].private;
  // The stored Course price is the current 1:1 single lesson; other prices are absent from the document.
  const single = mode === "1:1" ? Number(course.price) : catalog["1:2"].single;
  const displayed = [
    single,
    catalog[mode].packages[4],
    catalog[mode].packages[8],
    catalog[mode].packages[12],
  ];
  const counts = [1, 4, 8, 12];

  return (
    <section
      className={`${styles.shell} ${styles.private}`}
      aria-labelledby="course-offer-title"
    >
      <p className={styles.eyebrow}>{t("eyebrow")}</p>
      <h2 id="course-offer-title" className={styles.heading}>
        {t("private.title")}
      </h2>
      <p className={styles.intro}>{t("private.subtitle")}</p>
      <div
        className={styles.tabs}
        role="group"
        aria-label={t("private.modeLabel")}
      >
        {(["1:1", "1:2"] as const).map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={mode === value}
            className={mode === value ? styles.activeTab : ""}
            onClick={() => setMode(value)}
          >
            <strong>{value}</strong>
            <span>
              {t(value === "1:1" ? "private.individual" : "private.duo")}
            </span>
          </button>
        ))}
      </div>
      <div className={styles.privateGrid} aria-live="polite">
        {displayed.map((price, index) => {
          if (!validPrice(price)) return null;
          const saving =
            index > 0 && validPrice(single)
              ? Math.round((1 - price / (single * counts[index])) * 100)
              : 0;
          return (
            <article key={counts[index]} className={styles.planCard}>
              <div className={styles.planTop}>
                <h3>
                  {t(
                    index === 0
                      ? "private.single"
                      : `private.package${counts[index]}`,
                  )}
                </h3>
                {saving > 0 && (
                  <span className={styles.badge}>
                    {t("savePercent", { amount: saving })}
                  </span>
                )}
              </div>
              <div className={styles.planPrice}>
                <strong>{euro(price, locale)}</strong>
                {index === 0 && <span>{t("private.perLesson")}</span>}
              </div>
              {index === 0 && (
                <p className={styles.freeClass}>{t("firstClassFree")}</p>
              )}
            </article>
          );
        })}
      </div>
      <div className={styles.privateNote}>
        {mode === "1:2" && <UsersRound aria-hidden="true" size={34} />}
        <div>
          <p>
            {t(mode === "1:1" ? "private.individualNote" : "private.duoNote")}
          </p>
          {mode === "1:2" && <span>{t("private.duoSecondary")}</span>}
        </div>
      </div>
      <PreRegister course={course} locale={locale} />
    </section>
  );
}

function RegularCourseOffer({
  course,
  locale,
}: Pick<Props, "course" | "locale">) {
  const t = useTranslations("coursePage.offerDesign");
  const price = Number(course.price);
  const inPerson = course.format === "Presencial en Torrox";
  return (
    <section
      className={`${styles.shell} ${styles.split}`}
      aria-labelledby="course-offer-title"
    >
      <div className={styles.left}>
        <p className={styles.eyebrow}>{t("eyebrow")}</p>
        <h2 id="course-offer-title" className={styles.heading}>
          {t("common.title")}
        </h2>
        <p className={styles.intro}>{t("common.subtitle")}</p>
        <div className={styles.regularFeatures}>
          <div>
            <UsersRound aria-hidden="true" />
            <strong>{t("regular.group")}</strong>
            <span>{t("regular.groupText")}</span>
          </div>
          {course.maxPeople && (
            <div>
              <UsersRound aria-hidden="true" />
              <strong>
                {t("regular.capacity", { count: course.maxPeople })}
              </strong>
              <span>{t("regular.capacityText")}</span>
            </div>
          )}
          {course.format && (
            <div>
              {inPerson ? (
                <MapPin aria-hidden="true" />
              ) : (
                <Laptop aria-hidden="true" />
              )}
              <strong>
                {inPerson ? t("regular.inPerson") : course.format}
              </strong>
              <span>
                {inPerson
                  ? t("regular.inPersonText")
                  : course.format.toLowerCase() === "online"
                    ? t("regular.onlineText")
                    : t("regular.formatText")}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className={styles.monthlyCard}>
        <p className={styles.cardEyebrow}>{t("regular.monthlyFee")}</p>
        {validPrice(price) ? (
          <div className={styles.monthlyPrice}>
            <strong>{euro(price, locale)}</strong>
            <span>{t("regular.perMonth")}</span>
          </div>
        ) : (
          <p>{t("priceOnRequest")}</p>
        )}
        <p className={styles.cardDescription}>{t("regular.description")}</p>
        <p className={`${styles.freeClass}`}>{t("firstClassFree")}</p>
        <PreRegister course={course} locale={locale} />
        <div className={styles.metadata}>
          {course.level && (
            <span>
              <Check aria-hidden="true" />
              {t("regular.level", { level: course.level })}
            </span>
          )}
          {course.duration && (
            <span>
              <Check aria-hidden="true" />
              {course.duration === "12 meses"
                ? t("regular.duration")
                : course.duration}
            </span>
          )}
          <span>
            <Check aria-hidden="true" />
            {t("regular.weeklyPace")}
          </span>
          {course.hoursPerWeek && (
            <span>
              <Check aria-hidden="true" />
              {t("regular.hoursWeek", { hours: course.hoursPerWeek })}
            </span>
          )}
          {course.modality && (
            <span>
              <Check aria-hidden="true" />
              {t(`modality.${course.modality}`)}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

function IntensiveCourseOffer({
  course,
  locale,
}: Pick<Props, "course" | "locale">) {
  const t = useTranslations("coursePage.offerDesign");
  const weekly = Number(course.price);
  const packagePrice = COMMERCIAL_OFFER["curso-intensivo-espanol-b1"].fourWeeks;
  const saving = validPrice(weekly) ? weekly * 4 - packagePrice : 0;
  return (
    <section
      className={`${styles.shell} ${styles.split} ${styles.intensive}`}
      aria-labelledby="course-offer-title"
    >
      <div className={styles.left}>
        <p className={styles.eyebrow}>{t("intensive.eyebrow")}</p>
        <h2 id="course-offer-title" className={styles.heading}>
          {t("common.title")}
        </h2>
        <p className={styles.intro}>{t("common.subtitle")}</p>
        <div className={styles.factPills}>
          {course.hoursPerWeek && (
            <span>
              <Clock3 aria-hidden="true" />
              {t("intensive.hoursWeek", { hours: course.hoursPerWeek })}
            </span>
          )}
          <span>
            <CalendarDays aria-hidden="true" />
            {t("intensive.hoursDay")}
          </span>
          <span>
            <Coffee aria-hidden="true" />
            {t("intensive.break")}
          </span>
          {course.maxPeople && (
            <span>
              <UsersRound aria-hidden="true" />
              {t("regular.capacity", { count: course.maxPeople })}
            </span>
          )}
          {course.format && (
            <span>
              <Laptop aria-hidden="true" />
              {course.format}
            </span>
          )}
        </div>
      </div>
      <div className={styles.intensiveRight}>
        <div className={styles.intensiveHeader}>
          <strong>{course.level}</strong>
          <span>{t("intensive.course")}</span>
        </div>
        <p className={styles.intensiveSub}>{t("intensive.tagline")}</p>
        <div className={styles.intensiveCards}>
          {validPrice(weekly) && (
            <article className={styles.weekCard}>
              <h3>{t("intensive.oneWeek")}</h3>
              <strong>{euro(weekly, locale)}</strong>
              <p>{t("intensive.weekText")}</p>
            </article>
          )}
          {validPrice(packagePrice) && (
            <article className={`${styles.weekCard} ${styles.featured}`}>
              <div className={styles.planTop}>
                <h3>{t("intensive.fourWeeks")}</h3>
                {saving > 0 && (
                  <span className={styles.badge}>
                    {t("saveMoney", { amount: euro(saving, locale) })}
                  </span>
                )}
              </div>
              <strong>{euro(packagePrice, locale)}</strong>
              <p>{t("intensive.packageText")}</p>
            </article>
          )}
        </div>
        <PreRegister course={course} locale={locale} />
      </div>
    </section>
  );
}

export default function CourseOffer({ course, locale, fallbackPrice }: Props) {
  const t = useTranslations("coursePage");
  const role = PUBLIC_SPANISH_OFFERINGS.find(
    (offering) => offering.slug === course.slug,
  )?.presentationRole;
  if (role === "private")
    return <PrivateCourseOffer course={course} locale={locale} />;
  if (role === "regularGroup")
    return <RegularCourseOffer course={course} locale={locale} />;
  if (role === "intensive")
    return <IntensiveCourseOffer course={course} locale={locale} />;
  return (
    <section
      className={`${styles.shell} ${styles.fallback}`}
      aria-labelledby="course-offer-title"
    >
      <p className={styles.eyebrow}>{t("offer.eyebrow")}</p>
      <h2 id="course-offer-title" className={styles.heading}>
        {t("offer.title")}
      </h2>
      <p>{fallbackPrice ?? t("offer.priceOnRequest")}</p>
      <PreRegister course={course} locale={locale} />
    </section>
  );
}
