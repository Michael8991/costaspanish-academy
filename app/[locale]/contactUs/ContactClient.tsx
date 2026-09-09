"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import landingTheme from "@/styles/landing/landingTheme.module.css";
import { ContactForm } from "./ContactForm";
import styles from "./contactPage.module.css";

export default function ContactClient() {
  const t = useTranslations("contact");

  return (
    <div className={`${landingTheme.theme} ${styles.page}`}>
      <motion.div
        className={styles.inner}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <header className={styles.intro}>
          <p className={styles.eyebrow}>{t("eyebrow")}</p>
          <h1 className={styles.title}>
            {t("heading.line1")}
            <span>{t("heading.line2")}</span>
          </h1>
          <p className={styles.supporting}>{t("supporting")}</p>
        </header>

        <ContactForm />
      </motion.div>
    </div>
  );
}
