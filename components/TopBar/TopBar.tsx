"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { TrackedExternalLink } from "@/components/analytics/TrackedExternalLink";
import { COSTASPANISH_SOCIAL_LINKS } from "@/lib/constants/socialLinks";
import landingTheme from "@/styles/landing/landingTheme.module.css";
import styles from "./topBar.module.css";

export const TopBar = () => {
  const t = useTranslations("TopBar");
  return <motion.aside initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, ease: "easeOut" }} className={`${styles.topBarWrapper} ${landingTheme.theme}`} aria-label={t("utilityLabel")}>
    <p><span>{t("onlineLessons")}</span><span aria-hidden="true"> · </span><span>{t("schedule")}</span></p>
    <nav aria-label={t("socialLabel")}><TrackedExternalLink platform="instagram" sourceSection="navbar" href={COSTASPANISH_SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label={t("social.instagramAlt")}>Instagram</TrackedExternalLink><TrackedExternalLink platform="facebook" sourceSection="navbar" href={COSTASPANISH_SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label={t("social.facebookAlt")}>Facebook</TrackedExternalLink><TrackedExternalLink platform="linkedin" sourceSection="navbar" href={COSTASPANISH_SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label={t("social.linkedinAlt")}>LinkedIn</TrackedExternalLink></nav>
  </motion.aside>;
};
