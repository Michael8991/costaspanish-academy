import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import dbConnect from "@/lib/mongo";
import { Course } from "@/models/Course";
import type { ICourseData } from "@/types";
import landingTheme from "@/styles/landing/landingTheme.module.css";
import { LandingCourseCard } from "./LandingCourseCard";
import styles from "./coursesSection.module.css";
import { PUBLIC_SPANISH_OFFERINGS } from "@/lib/courses/publicOfferings";

export const CoursesSection = async () => {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "home.CoursesSection" });
  await dbConnect();
  const slugs = PUBLIC_SPANISH_OFFERINGS.map(({ slug }) => slug);
  const records = await Course.find({ slug: { $in: slugs }, languageToLearn: "Spanish" }).select("_id slug imageUrl level format modality status").lean<ICourseData[]>();
  const bySlug = new Map(records.map((course) => [course.slug, course]));

  return (
    <section id="courses" className={`${styles.courses} ${landingTheme.theme}`}>
      <div className={styles.inner}>
        <header className={styles.sectionHeader}>
          <div><p className={styles.eyebrow}>{t("eyebrow")}</p><h2>{t("title")}</h2></div>
          <p>{t("supporting")}</p>
        </header>
        <div className={styles.grid}>
          {PUBLIC_SPANISH_OFFERINGS.map((selection) => {
            const { key, slug } = selection;
            const course = bySlug.get(slug);
            if (!course) return null;
            const tags = t.raw(`cards.${key}.tags`) as string[];
            const image = "image" in selection ? selection.image : course.imageUrl;
            const level = "level" in selection ? selection.level : undefined;
            const status = selection.statusKey
              ? t(`statuses.${selection.statusKey}`)
              : undefined;
            return <LandingCourseCard key={slug} href={`/${locale}/${slug}`} image={image} imageAlt={t("imageAlt", { title: t(`cards.${key}.title`) })} eyebrow={t(`cards.${key}.eyebrow`)} title={t(`cards.${key}.title`)} description={t(`cards.${key}.description`)} tags={tags} status={status} cta={t("viewCourse")} level={level} variant={key} />;
          })}
        </div>
        <div className={styles.footer}><Link href={`/${locale}/spanish`}>{t("viewAll")}<span aria-hidden="true">→</span></Link></div>
      </div>
    </section>
  );
};
