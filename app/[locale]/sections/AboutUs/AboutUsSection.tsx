"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import landingTheme from "@/styles/landing/landingTheme.module.css";
import styles from "./aboutUsSection.module.css";

export const AboutUsSection = () => {
  const t = useTranslations("AboutUsSection");
  const paragraphs = t.raw("paragraphs") as string[];
  const proofPoints = t.raw("proofPoints") as string[];

  const scrollToCourses = () => {
    const element = document.getElementById("courses");
    if (!element) return;
    window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 120, behavior: "smooth" });
  };

  return (
    <section id="aboutUs" className={`${styles.aboutUs} ${landingTheme.theme}`}>
      <motion.div initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .18 }} transition={{ duration: .75, ease: "easeOut" }} className={styles.layout}>
        <div className={styles.visualColumn}>
          <div className={styles.classroomFrame}>
            <Image src="/assets/AulaPrincipalGruposReducidos.png" alt={t("images.classroomAlt")} fill sizes="(max-width: 900px) calc(100vw - 40px), 48vw" className={styles.classroomImage} quality={85} />
          </div>

          <div className={styles.portraitFrame}>
            <Image src="/assets/MariaCuerpoEntero.png" alt={t("images.teacherAlt")} fill sizes="(max-width: 640px) 34vw, (max-width: 900px) 28vw, 17vw" className={styles.portraitImage} quality={85} />
          </div>

          <div className={styles.experienceBadge} aria-label={t("experienceAccessible")}>
            <strong>4+</strong><span>{t("experienceLabel")}</span>
          </div>

          <p className={styles.location}><span>{t("academyLabel")}</span>{t("location")}</p>
          <span className={`${styles.doodle} ${styles.doodleLine}`} aria-hidden="true" />
          <span className={`${styles.doodle} ${styles.doodleAccent}`} aria-hidden="true" />
        </div>

        <div className={styles.contentColumn}>
          <header>
            <p className={styles.eyebrow}>{t("eyebrow")}</p>
            <h2>{t.rich("title", { accent: (chunks) => <span>{chunks}</span>, br: () => <br /> })}</h2>
            <p className={styles.subtitle}>{t("subtitle")}</p>
          </header>

          <div className={styles.story}>{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          <ul className={styles.proofPoints}>{proofPoints.map((point) => <li key={point}>{point}</li>)}</ul>
          <button type="button" onClick={scrollToCourses} className={styles.callToAction}>{t("button")}<span aria-hidden="true">→</span></button>
        </div>
      </motion.div>
    </section>
  );
};
