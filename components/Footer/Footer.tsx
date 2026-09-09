"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { COSTASPANISH_SOCIAL_LINKS, SITE_CREDITS } from "@/lib/constants/socialLinks";
import styles from "./Footer.module.css";

const navigation = [
  { key: "about", hash: "aboutUs" },
  { key: "courses", hash: "courses" },
  { key: "testimonials", hash: "testimonials" },
] as const;

const socials = [
  { key: "instagram", href: COSTASPANISH_SOCIAL_LINKS.instagram, icon: "/assets/instagram.svg", wide: false },
  { key: "facebook", href: COSTASPANISH_SOCIAL_LINKS.facebook, icon: "/assets/facebook.svg", wide: false },
  { key: "linkedin", href: COSTASPANISH_SOCIAL_LINKS.linkedin, icon: "/assets/linkedin (1).svg", wide: false },
  { key: "preply", href: COSTASPANISH_SOCIAL_LINKS.preply, icon: "/assets/Preply_idxfA4aZwE_0.svg", wide: true },
] as const;

export const Footer = () => {
  const t = useTranslations("Footer");
  const { locale } = useParams<{ locale: string }>();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <span className={styles.decoration} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.mainGrid}>
          <section className={styles.brand} aria-label="CostaSpanish">
            <Link href={"/" + locale} className={styles.logoLink} aria-label={t("homeAria")}>
              <Image src="/assets/LogoCostaSpanishRojoCoralFuerte.png" alt="" fill sizes="150px" className={styles.logo} />
            </Link>
            <p className={styles.statement}>{t("statement")}</p>
            <p className={styles.location}>{t("location")}</p>
            <Link href={"/" + locale + "#courses"} className={styles.courseLink}>
              {t("courseCta")}<span aria-hidden="true">→</span>
            </Link>
          </section>

          <nav className={styles.column} aria-label={t("exploreAria")}>
            <p className={styles.columnLabel}>{t("explore")}</p>
            <ul>
              {navigation.map(({ key, hash }) => (
                <li key={key}><Link href={"/" + locale + "#" + hash}>{t("nav." + key)}</Link></li>
              ))}
              <li><Link href={"/" + locale + "/contactUs"}>{t("nav.contact")}</Link></li>
            </ul>
          </nav>

          <nav className={styles.column} aria-label={t("connectAria")}>
            <p className={styles.columnLabel}>{t("connect")}</p>
            <ul className={styles.socialList}>
              {socials.map(({ key, href, icon, wide }) => (
                <li key={key}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={t("socialAria", { platform: t("socials." + key) })}>
                    <span className={[styles.socialIcon, wide ? styles.preplyIcon : ""].join(" ")}>
                      <Image src={icon} alt="" fill sizes="56px" />
                    </span>
                    <span>{t("socials." + key)}</span>
                    <span className={styles.externalArrow} aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.bottomBar}>
          <p>{t("rights", { year: currentYear })}</p>
          <div className={styles.legal}>
            <Link href={"/" + locale + "/cookiesPolicy"}>{t("legal.cookiesPolicy")}</Link>
            <button type="button" onClick={() => window.dispatchEvent(new Event("cookies:open"))}>{t("legal.configureCookies")}</button>
            <Link href={"/" + locale + "/legalNotice"}>{t("legal.notice")}</Link>
            <Link href={"/" + locale + "/privacyPolicy"}>{t("legal.privacyPolicy")}</Link>
          </div>
          <a className={styles.credit} href={SITE_CREDITS.michaelLinkedIn} target="_blank" rel="noopener noreferrer" aria-label={t("creditAria")}>
            <span>{t("credit")}</span>
            <strong>Michael Rodríguez <i aria-hidden="true">↗</i></strong>
          </a>
        </div>
      </div>
    </footer>
  );
};
