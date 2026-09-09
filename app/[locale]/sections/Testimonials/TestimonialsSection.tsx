import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import landingTheme from "@/styles/landing/landingTheme.module.css";
import { TestimonialCard, type Testimonial } from "./TestimonialCard";
import {
  HOME_TESTIMONIAL_IDS,
  PREPLY_URL,
  TESTIMONIALS,
} from "./testimonials.data";
import styles from "./testimonialsSection.module.css";

type PreplyStats = {
  anonymousEvaluations: number;
  confidence: number;
  clarity: number;
  progress: number;
  preparation: number;
  publicReviews: number;
  lessonsTaught: number;
  typicalLessonsTaken: string;
  sourceUrl: string;
};

const preplyStats: PreplyStats = {
  anonymousEvaluations: 5,
  confidence: 5,
  clarity: 4.8,
  progress: 4.8,
  preparation: 5,
  publicReviews: 4,
  lessonsTaught: 103,
  typicalLessonsTaken: "12+",
  sourceUrl: PREPLY_URL,
};

export const TestimonialsSection = async () => {
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: "home.TestimonialsSection",
  });
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  const testimonials: Testimonial[] = TESTIMONIALS.map((definition) => ({
    ...definition,
    text: t(`reviews.${definition.id}.text`),
    date: definition.date
      ? dateFormatter.format(new Date(`${definition.date}T00:00:00Z`))
      : undefined,
    context: definition.contextKey ? t(definition.contextKey) : undefined,
    sourceCta:
      definition.source === "preply"
        ? t("links.preply")
        : definition.source === "facebook"
          ? t("links.facebook")
          : undefined,
  }));
  const byId = new Map(
    testimonials.map((testimonial) => [testimonial.id, testimonial]),
  );
  const homeTestimonials = HOME_TESTIMONIAL_IDS.map((id) =>
    byId.get(id),
  ).filter((testimonial): testimonial is Testimonial => Boolean(testimonial));
  const variants = ["featured", "local", "wide", "featured", "local"] as const;
  const metrics = [
    { value: preplyStats.confidence.toFixed(1), label: t("stats.confidence") },
    { value: preplyStats.clarity.toFixed(1), label: t("stats.clarity") },
    { value: preplyStats.progress.toFixed(1), label: t("stats.progress") },
    {
      value: preplyStats.preparation.toFixed(1),
      label: t("stats.preparation"),
    },
  ];

  return (
    <section
      id="testimonials"
      className={`${styles.testimonials} ${landingTheme.theme}`}
    >
      <div className={styles.inner}>
        <header className={styles.sectionHeader}>
          <p className={styles.eyebrow}>{t("eyebrow")}</p>
          <h2>{t("title")}</h2>
          <p className={styles.supporting}>{t("supporting")}</p>
        </header>

        <article className={styles.statsSheet}>
          {/* <span className={styles.backSheet} aria-hidden="true" /> */}
          <div className={styles.statsHeader}>
            <div>
              <Image
                src="/assets/Preply_idxfA4aZwE_0.svg"
                alt=""
                width={92}
                height={25}
              />
              <span>{t("stats.classRating")}</span>
            </div>
            <a
              href={preplyStats.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("links.profile")}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className={styles.metrics}>
            {metrics.map((metric, index) => (
              <div
                key={metric.label}
                className={index === 0 ? styles.primaryMetric : undefined}
              >
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
          <div className={styles.facts}>
            <div>
              <strong>{preplyStats.lessonsTaught}</strong>
              <span>{t("stats.lessonsTaught")}</span>
            </div>
            <div>
              <strong>{preplyStats.typicalLessonsTaken}</strong>
              <span>{t("stats.typicalLessons")}</span>
            </div>
            <div>
              <strong>{preplyStats.publicReviews}</strong>
              <span>{t("stats.publicReviews")}</span>
            </div>
          </div>
          <p className={styles.basis}>
            {t("stats.basis", { count: preplyStats.anonymousEvaluations })}
          </p>
        </article>

        <div className={styles.reviewGrid}>
          {homeTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              variant={variants[index]}
              ratingLabel={
                testimonial.rating
                  ? t("rating", { rating: testimonial.rating })
                  : undefined
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};
