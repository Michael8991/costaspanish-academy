"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { CourseLevel, CourseModality, CourseStatus } from "@/types/courses";
import {
  PUBLIC_SPANISH_OFFERINGS,
  type PublicOfferingKey,
} from "@/lib/courses/publicOfferings";
import styles from "./coursesCatalog.module.css";

export type PublicCourseRecord = {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  level?: CourseLevel;
  format: string;
  modality?: CourseModality;
  status?: CourseStatus;
};

type CoursesCatalogProps = {
  courses: PublicCourseRecord[];
  locale: string;
};

export const CoursesCatalog = ({ courses, locale }: CoursesCatalogProps) => {
  const t = useTranslations("coursesCatalog");
  const bySlug = new Map(courses.map((course) => [course.slug, course]));

  return (
    <motion.div
      className={styles.grid}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {PUBLIC_SPANISH_OFFERINGS.map((offering) => {
        const course = bySlug.get(offering.slug);
        if (!course) return null;

        const key = offering.key as PublicOfferingKey;
        const image = "image" in offering ? offering.image : course.imageUrl;
        const level = "level" in offering ? offering.level : undefined;
        const facts = t.raw(`cards.${key}.facts`) as string[];
        const status = offering.statusKey
          ? t(`statuses.${offering.statusKey}`)
          : null;

        return (
          <motion.article
            key={course.slug}
            className={`${styles.card} ${styles[key]}`}
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.cardTopline}>
              <span>{t(`cards.${key}.eyebrow`)}</span>
              {status && <strong>{status}</strong>}
            </div>

            <div className={styles.visual}>
              <span className={styles.shape} aria-hidden="true" />
              <Image
                src={image}
                alt={t("imageAlt", { title: t(`cards.${key}.title`) })}
                fill
                sizes="(max-width: 760px) calc(100vw - 52px), 560px"
                className={styles.image}
                quality={82}
              />
              <span className={styles.level} aria-hidden="true">
                {level ?? "1:1"}
              </span>
              <span className={styles.doodle} aria-hidden="true" />
            </div>

            <div className={styles.content}>
              <h2>{t(`cards.${key}.title`)}</h2>
              <p className={styles.description}>
                {course.description || t(`cards.${key}.fallbackDescription`)}
              </p>
              <div className={styles.facts} aria-label={t("detailsLabel")}>
                {facts.map((fact) => (
                  <span key={fact}>{fact}</span>
                ))}
              </div>
              {status && <p className={styles.availability}><i aria-hidden="true" />{status}</p>}
              <Link href={`/${locale}/${course.slug}`} className={styles.link}>
                <span className={styles.linkOverlay} aria-hidden="true" />
                {t("viewCourse")} <b aria-hidden="true">→</b>
              </Link>
            </div>
          </motion.article>
        );
      })}
    </motion.div>
  );
};
