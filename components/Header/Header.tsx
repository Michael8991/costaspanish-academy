"use client";

import styles from "./header.module.css";
import { StyledWrapped } from "../UI/StyledWrapped";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname, useParams } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

export const Header = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);
  const router = useRouter();
  const t = useTranslations("Header");

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const clickedInside = target.closest(`.${styles.slideBoxMenu}`);
      const clickedHamburger = target.closest("[data-menu-button]");
      if (!clickedInside && !clickedHamburger) setMenuOpen(false);
    }
    if (menuOpen) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);


  const params = useParams();
  const locale = params?.locale as string;

  const scrollToSection = (id: string) => {
    const scrollWithOffset = (targetId: string) => {
      const el = document.getElementById(targetId);
      if (!el) return;
      const yOffset = -120;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    };

    if (pathname !== `/${locale}`) {
      router.push(`/${locale}`);
      setScrollTarget(id);
    } else {
      scrollWithOffset(id);
    }
  };

  useEffect(() => {
    if (!locale) return; // no ejecutar hasta que el idioma esté definido

    if (pathname === `/${locale}` && scrollTarget) {
      const el = document.getElementById(scrollTarget);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setActiveSection(scrollTarget);
      }
      setScrollTarget(null);
    }
    // dependencia fija: las tres siempre definidas
  }, [pathname, scrollTarget, locale || ""]);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.2, rootMargin: "-100px 0px 0px 0px" }
    );
    sections.forEach((sec) => observer.observe(sec));
    return () => sections.forEach((sec) => observer.unobserve(sec));
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 1);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className="@container"
    >
      <div
        className={`${styles.headerWrapper} w-full grid grid-cols-2 lg:grid-cols-3 
          ${scrolled ? `fixed ${styles.headerWrapperFixed} shadow-md z-3` : "bg-transparent"}`}
      >
        {/* LOGO */}
        <div className={`${styles.logoContainer} w-full hidden lg:flex align-middle justify-center`}>
          <div style={{ width: 150, height: 150, position: "relative" }}>
            <Image
              src={"/assets/LogoCostaSpanishRojoCoralFuerte.png"}
              alt="Logo Costa Spanish Class"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </div>

        {/* HAMBURGUESA */}
        <div className="w-full flex justify-end pe-3 lg:hidden">
          <div data-menu-button onClick={() => setMenuOpen((prev) => !prev)}>
            <StyledWrapped onToggle={() => setMenuOpen((prev) => !prev)} isOpen={menuOpen} />
          </div>
        </div>

        {/* NAV Escritorio */}
        <nav className="w-full hidden lg:flex align-middle items-center justify-center" aria-label="Main navigation">
          <ul className={`${styles.navContainer} flex align-middle items-center`}>
            <li className="mx-2 whitespace-nowrap">
              <button onClick={() => scrollToSection("aboutUs")} className={`${styles.navLinks} cursor-pointer ${activeSection === "aboutUs" ? styles.activeNav : ""}`}>
                {t("nav.about")}
              </button>
            </li>
            <li className="mx-2 whitespace-nowrap">
              <button onClick={() => scrollToSection("courses")} className={`${styles.navLinks} cursor-pointer ${activeSection === "courses" ? styles.activeNav : ""}`}>
                {t("nav.courses")}
              </button>
            </li>
            <li className="mx-2 whitespace-nowrap">
              <button onClick={() => scrollToSection("home")} className={`${styles.navLinks} cursor-pointer ${activeSection === "home" ? styles.activeNav : ""}`}>
                {t("nav.home")}
              </button>
            </li>
            <li className="mx-2 whitespace-nowrap">
              <button onClick={() => scrollToSection("testimonials")} className={`${styles.navLinks} cursor-pointer ${activeSection === "testimonials" ? styles.activeNav : ""}`}>
                {t("nav.testimonials")}
              </button>
            </li>
            <li className="mx-2 whitespace-nowrap">
              <Link
                className={`${styles.navLinks} ${pathname === `/${locale}/contactUs` ? styles.activeNav : ""}`}
                href={`/${locale}/contactUs`}
              >
                {t("nav.contact")}
              </Link>
            </li>
            <li className="mx-2 whitespace-nowrap">
              <Link
                className={`${styles.navLinks} ${pathname === `/${locale}/blog` ? styles.activeNav : ""}`}
                href={`/${locale}/blog`}
              >
                {t("nav.blog")}
              </Link>
            </li>
          </ul>
        </nav>

        {/* LOGIN e idioma */}
        <div className={`${styles.rightHeader} w-full hidden lg:flex align-middle items-center`}>
          <LanguageSwitcher />
          <button className={`${styles.loginBtn}`}>
            <Link className={`${styles.noneDecoration}`} href="/auth">
              {t("login")}
            </Link>
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`${styles.slideBoxMenu} fixed top-[130px] left-1/2 -translate-x-1/2 w-80 h-fit bg-white shadow-lg z-50`}
          >
            <ul className="flex flex-col gap-6 p-6">
              {["about", "courses", "home", "testimonials"].map((key) => (
                <li key={key}>
                  <button
                    onClick={() => {
                      scrollToSection(key === "about" ? "aboutUs" : key);
                      setMenuOpen(false);
                    }}
                    className={`${styles.navLinks} ${activeSection === (key === "about" ? "aboutUs" : key)
                      ? styles.activeNav
                      : ""
                      }`}
                  >
                    {t(`nav.${key}`)}
                  </button>
                </li>
              ))}

              <li>
                <Link
                  onClick={() => setMenuOpen(false)}
                  className={`${styles.navLinks} ${pathname === `/${locale}/contactUs` ? styles.activeNav : ""
                    }`}
                  href={`/${locale}/contactUs`}
                >
                  {t("nav.contact")}
                </Link>
              </li>

              <li>
                <Link
                  onClick={() => setMenuOpen(false)}
                  className={`${styles.navLinks} ${pathname === `/${locale}/blog` ? styles.activeNav : ""
                    }`}
                  href={`/${locale}/blog`}
                >
                  {t("nav.blog")}
                </Link>
              </li>


              <li className="flex w-full justify-center">
                <LanguageSwitcher />
                <Link
                  href={`/${locale}/auth`}
                  className={`${styles.loginBtn} ${styles.noneDecoration}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {t("login")}
                </Link>
              </li>
            </ul>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
