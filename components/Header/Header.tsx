"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import landingTheme from "@/styles/landing/landingTheme.module.css";
import { StyledWrapped } from "../UI/StyledWrapped";
import LanguageSwitcher from "./LanguageSwitcher";
import styles from "./header.module.css";

const sectionLinks = [{ key: "about", id: "aboutUs" }, { key: "courses", id: "courses" }, { key: "testimonials", id: "testimonials" }] as const;

export const Header = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { locale } = useParams();
  const t = useTranslations("Header");

  const scrollToSection = (id: string) => {
    const scroll = () => { const el = document.getElementById(id); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 104, behavior: "smooth" }); };
    if (pathname !== `/${locale}`) { router.push(`/${locale}`); setScrollTarget(id); } else scroll();
  };

  useEffect(() => { if (pathname === `/${locale}` && scrollTarget) { const timer = window.setTimeout(() => scrollToSection(scrollTarget), 0); setScrollTarget(null); return () => window.clearTimeout(timer); } }, [pathname, scrollTarget, locale]);
  useEffect(() => { const sections = document.querySelectorAll("section[id]"); const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)), { threshold: .2, rootMargin: "-100px 0px 0px 0px" }); sections.forEach((section) => observer.observe(section)); return () => observer.disconnect(); }, []);
  useEffect(() => { const handler = () => setScrolled(window.scrollY > 8); handler(); window.addEventListener("scroll", handler, { passive: true }); return () => window.removeEventListener("scroll", handler); }, []);
  useEffect(() => { const handler = (event: MouseEvent) => { const target = event.target as HTMLElement; if (!target.closest(`.${styles.slideBoxMenu}`) && !target.closest("[data-menu-button]")) setMenuOpen(false); }; if (menuOpen) document.addEventListener("click", handler); return () => document.removeEventListener("click", handler); }, [menuOpen]);

  return <motion.header initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: "easeOut", delay: .2 }} className={`${styles.headerShell} ${landingTheme.theme}`}>
    <div className={`${styles.headerWrapper} ${scrolled ? styles.headerWrapperFixed : styles.headerWrapperInitial}`}>
      <Link href={`/${locale}`} className={styles.logoLink} aria-label="CostaSpanish — Home"><span className={styles.logoSlot}>
        <Image src="/assets/LogoCostaSpanishRojoCoralFuerte.png" alt="CostaSpanish" fill priority className={`${styles.brandLogo} ${styles.verticalLogo} ${scrolled ? styles.logoHidden : styles.logoVisible}`} />
        <Image src="/assets/CostaSpanish-VHorizontal.png" alt="" aria-hidden="true" fill priority className={`${styles.brandLogo} ${styles.horizontalLogo} ${scrolled ? styles.logoVisible : styles.logoHidden}`} />
      </span></Link>
      <nav className={styles.desktopNav} aria-label="Main navigation"><ul className={styles.navContainer}>{sectionLinks.map(({ key, id }) => <li key={key}><button onClick={() => scrollToSection(id)} className={`${styles.navLinks} ${activeSection === id ? styles.activeNav : ""}`}>{t(`nav.${key}`)}</button></li>)}</ul></nav>
      <div className={styles.rightHeader}><LanguageSwitcher /><Link href={`/${locale}/contactUs`} className={styles.contactCta}>{t("nav.contact")}</Link><a href="https://app.costaspanishclass.com" className={styles.loginBtn}>{t("login")}</a></div>
      <div className={styles.mobileMenuButton} data-menu-button><StyledWrapped onToggle={() => setMenuOpen((open) => !open)} isOpen={menuOpen} /></div>
    </div>
    <AnimatePresence>{menuOpen && <motion.nav initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "100%", opacity: 0 }} transition={{ duration: .3, ease: "easeInOut" }} className={`${styles.slideBoxMenu} ${scrolled ? styles.slideBoxMenuScrolled : ""}`} aria-label="Mobile navigation"><ul>
      {sectionLinks.map(({ key, id }) => <li key={key}><button onClick={() => { scrollToSection(id); setMenuOpen(false); }} className={`${styles.navLinks} ${activeSection === id ? styles.activeNav : ""}`}>{t(`nav.${key}`)}</button></li>)}
      <li><Link onClick={() => setMenuOpen(false)} href={`/${locale}/contactUs`} className={styles.contactCta}>{t("nav.contact")}</Link></li>
      <li className={styles.mobileUtilities}><LanguageSwitcher /><a href="https://app.costaspanishclass.com" className={styles.loginBtn}>{t("login")}</a></li>
    </ul></motion.nav>}</AnimatePresence>
  </motion.header>;
};
