"use client";

import Image from "next/image";
import Link from "next/link";
import { useAnalytics } from "@/components/analytics/useAnalytics";
import { normalizeAnalyticsLocale } from "@/lib/analytics/normalization";
import styles from "./landingCourseCard.module.css";

type LandingCourseCardProps = {
  href: string;
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
  status?: string;
  cta: string;
  level?: string;
  variant: "private" | "a1" | "a2" | "intensive";
  slug: string;
  locale: string;
};

export function LandingCourseCard({ href, image, imageAlt, eyebrow, title, description, tags, status, cta, level, variant, slug, locale }: LandingCourseCardProps) {
  const analytics = useAnalytics();

  return (
    <Link
      href={href}
      className={`${styles.card} ${styles[variant]}`}
      onClick={() => analytics.track("course_cta_click", {
        course_slug: slug,
        cta_type: "details",
        source_section: "courses",
        locale: normalizeAnalyticsLocale(locale),
      })}
    >
      <article>
        <div className={styles.topLine}><span className={styles.eyebrow}>{eyebrow}</span></div>
        <div className={styles.imageFrame}>
          <span className={styles.shape} aria-hidden="true" />
          <Image src={image} alt={imageAlt} fill sizes="(max-width: 720px) calc(100vw - 56px), (max-width: 1280px) 44vw, 520px" className={styles.image} quality={82} />
          <span className={styles.level} aria-hidden="true">{level ?? "1:1"}</span>
          <span className={styles.doodle} aria-hidden="true" />
        </div>
        <div className={styles.content}>
          <div className={styles.tags}>{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <h3>{title}</h3>
          <p>{description}</p>
          {status && <span className={styles.status}><i aria-hidden="true" />{status}</span>}
          <span className={styles.cta}>{cta}<b aria-hidden="true">→</b></span>
        </div>
      </article>
    </Link>
  );
}
