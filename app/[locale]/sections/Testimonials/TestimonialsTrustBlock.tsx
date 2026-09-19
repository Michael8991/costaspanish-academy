import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { PREPLY_URL } from "./testimonials.data";
import styles from "./testimonialsTrustStrip.module.css";

const stats = {
  anonymousEvaluations: 5,
  confidence: 5,
  clarity: 4.8,
  progress: 4.8,
  preparation: 5,
  publicReviews: 4,
  lessonsTaught: 103,
  typicalLessonsTaken: "12+",
};

export async function TestimonialsTrustBlock({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "home.TestimonialsSection" });
  const secondaryMetrics = [
    { value: stats.clarity.toFixed(1), label: t("stats.clarity") },
    { value: stats.progress.toFixed(1), label: t("stats.progress") },
    { value: stats.preparation.toFixed(1), label: t("stats.preparation") },
  ];

  return <aside className={styles.strip} aria-label={t("stats.classRating")}>
    <div className={styles.mainLine}>
      <div className={styles.brand}>
        <Image src="/assets/Preply_idxfA4aZwE_0.svg" alt="Preply" width={58} height={16} />
      </div>
      <div className={styles.primaryMetric}>
        <strong>{stats.confidence.toFixed(1)}</strong>
        <span>{t("stats.confidence")}</span>
      </div>
      <div className={styles.facts}>
        <span><strong>{stats.lessonsTaught}</strong> {t("stats.lessonsTaught")}</span>
        <span><strong>{stats.typicalLessonsTaken}</strong> {t("stats.typicalLessons")}</span>
        <span><strong>{stats.publicReviews}</strong> {t("stats.publicReviews")}</span>
      </div>
      <a href={PREPLY_URL} target="_blank" rel="noopener noreferrer">
        {t("links.profile")} <span aria-hidden="true">↗</span>
      </a>
    </div>
    <div className={styles.detailLine}>
      {secondaryMetrics.map((metric) => <span key={metric.label}>{metric.label} <strong>{metric.value}</strong></span>)}
      <span className={styles.basis}>{t("stats.basis", { count: stats.anonymousEvaluations })}</span>
    </div>
  </aside>;
}
