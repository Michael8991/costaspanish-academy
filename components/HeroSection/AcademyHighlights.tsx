"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import styles from "./academyHighlights.module.css";

export const AcademyHighlights = () => {
  const t = useTranslations("AcademyHighlights");
  const benefits = t.raw("benefits") as { title: string; text: string }[];
  const facts = t.raw("facts") as string[];
  return <motion.section initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: "easeOut", delay: .6 }} className={styles.highLightsContainer} aria-labelledby="why-costa-title">
    <header><p className={styles.kicker}>{t("kicker")}</p><h2 id="why-costa-title">{t("statement")}</h2><p className={styles.manifesto}>{t("manifesto")}</p></header>
    <div className={styles.content}><ul className={styles.facts}>{facts.map((fact) => <li key={fact}>{fact}</li>)}</ul><ol className={styles.benefits}>{benefits.map((benefit, index) => <li key={benefit.title}><span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div><h3>{benefit.title}</h3><p>{benefit.text}</p></div></li>)}</ol></div>
  </motion.section>;
};
