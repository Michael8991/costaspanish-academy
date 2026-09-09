"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { COSTASPANISH_SOCIAL_LINKS } from "@/lib/constants/socialLinks";
import landingTheme from "@/styles/landing/landingTheme.module.css";
import styles from "./topBar.module.css";

export const TopBar = () => {
  const t = useTranslations("TopBar");
  return <motion.aside initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, ease: "easeOut" }} className={`${styles.topBarWrapper} ${landingTheme.theme}`} aria-label={t("utilityLabel")}>
    <p><span>{t("onlineLessons")}</span><span aria-hidden="true"> · </span><span>{t("schedule")}</span></p>
    <nav aria-label={t("socialLabel")}><a href={COSTASPANISH_SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label={t("social.instagramAlt")}>Instagram</a><a href={COSTASPANISH_SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label={t("social.facebookAlt")}>Facebook</a><a href={COSTASPANISH_SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label={t("social.linkedinAlt")}>LinkedIn</a></nav>
  </motion.aside>;
};
