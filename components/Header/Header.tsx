// import sloganLogoEmpresa from '../../../assets/sloganLogoRojoCoralFuerte.png'

"use client";

import styles from "./header.module.css";
import { StyledWrapped } from "../UI/StyledWrapped";

import { Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export const Header = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const [scrollTarget, setScrollTarget] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    const scrollWithOffset = (targetId: string) => {
      const el = document.getElementById(targetId);
      if (!el) return;
      const yOffset = -120; // altura de tu header fijo
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    };

    if (pathname !== "/") {
      setScrollTarget(id); // recordamos a qué sección queremos ir
      router.push("/"); // vamos a home
    } else {
      scrollWithOffset(id); // scroll con offset
    }
  };

  useEffect(() => {
    if (pathname === "/" && scrollTarget) {
      const el = document.getElementById(scrollTarget);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setActiveSection(scrollTarget); // activamos la sección en el header
      }
      setScrollTarget(null); // reseteamos
    }
  }, [pathname, scrollTarget]);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: "-100px 0px 0px 0px" }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      sections.forEach((sec) => observer.unobserve(sec));
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 1);
    };

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
        className={`${
          styles.headerWrapper
        } w-full grid grid-cols-2 lg:grid-cols-3 
             sm:mt-0 
            ${
              scrolled
                ? `fixed ${styles.headerWrapperFixed} shadow-md z-3`
                : "bg-transparent "
            } `}
      >
        {/* LOGO */}
        <div
          className={`${styles.logoContainer} w-full hidden lg:flex align-middle justify-center`}
        >
          <div style={{ width: 150, height: 150, position: "relative" }}>
            <Image
              src={"/assets/LogoCostaSpanishRojoCoralFuerte.png"}
              alt="Logo costaSpanish academia de idiomas"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
          {/* <img src={sloganLogoEmpresa} alt="HablamosEspañol" style={{ height: 150 }} /> */}
        </div>

        {/* HAMBURGUESA */}
        <div className="w-full flex justify-end pe-3 lg:hidden">
          <StyledWrapped onToggle={setMenuOpen} />
        </div>

        {/* NAV para Escritorio */}
        <div
          className={`w-full hidden lg:flex align-middle items-center justify-center`}
        >
          <ul
            className={`${styles.navContainer} flex align-middle items-center`}
          >
            {/* <li className="mx-2 whitespace-nowrap">
              <Link
                className={`${styles.navLinks} 
                ${(activeSection === "aboutUs" && pathname === "/") || pathname === "/#aboutUs" ? styles.activeNav : ""}`}
                href="#aboutUs"
              >
                About us
              </Link>
            </li>
            <li className="mx-2 whitespace-nowrap">
              <Link
                className={`${styles.navLinks} 
              ${activeSection === "courses" && pathname === "/" ? styles.activeNav : ""}`}
                href="#courses"
              >
                Our courses
              </Link>
            </li>
            <li className="mx-2 whitespace-nowrap">
              <Link
                className={`${styles.navLinks} ${pathname === "/" && activeSection === "home" ? styles.activeNav : ""} `}
                href="/"
              >
                Home
              </Link>
            </li> */}
            {/* <li className="mx-2 whitespace-nowrap">
              <Link
                className={`${styles.navLinks} ${activeSection === "testimonials" && pathname === "/" ? styles.activeNav : ""}`}
                href="#testimonials"
              >
                Testimonials
              </Link>
            </li> */}
            <li className="mx-2 whitespace-nowrap">
              <button
                onClick={() => scrollToSection("aboutUs")}
                className={`${styles.navLinks} ${activeSection === "aboutUs" ? styles.activeNav : ""} cursor-pointer`}
              >
                About us
              </button>
            </li>
            <li className="mx-2 whitespace-nowrap">
              <button
                onClick={() => scrollToSection("courses")}
                className={`${styles.navLinks} ${activeSection === "courses" ? styles.activeNav : ""} cursor-pointer`}
              >
                Our courses
              </button>
            </li>
            <li className="mx-2 whitespace-nowrap">
              <button
                onClick={() => scrollToSection("home")}
                className={`${styles.navLinks} ${activeSection === "home" ? styles.activeNav : ""} cursor-pointer`}
              >
                Home
              </button>
            </li>
            <li className="mx-2 whitespace-nowrap">
              <button
                onClick={() => scrollToSection("testimonials")}
                className={`${styles.navLinks} ${activeSection === "testimonials" ? styles.activeNav : ""} cursor-pointer`}
              >
                Testimonials
              </button>
            </li>
            <li className="mx-2 whitespace-nowrap">
              <Link
                className={`${styles.navLinks} ${
                  pathname === "/contactUs" ? styles.activeNav : ""
                }`}
                href="/contactUs"
              >
                Contact us
              </Link>
            </li>
            <li className="mx-2 whitespace-nowrap">
              <Link
                className={`${styles.navLinks} ${
                  pathname === "/blog" ? styles.activeNav : ""
                }`}
                href="/blog"
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* IDIOMA y LOGIN */}
        <div
          className={`${styles.rightHeader} w-full hidden lg:flex align-middle items-center`}
        >
          <div className={``}>
            <button className={`${styles.switchBtnLng} flex`}>
              <span className="font-medium" style={{ color: "#FB6F92" }}>
                EN
              </span>
              <Globe
                aria-label="selector de idioma"
                className="ms-1"
                color="#FB6F92"
              />
            </button>
          </div>
          <div className={``}>
            <button className={`${styles.loginBtn}`}>
              <Link className={`${styles.noneDecoration}`} href="/auth">
                Log in
              </Link>
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`${styles.slideBoxMenu} fixed top-[130px] left-1/2 -translate-x-1/2 w-80 h-fit bg-white shadow-lg z-50`}
          >
            {/* <div className="fixed top-[150px] right-0 w-64 h-screen bg-white shadow-lg z-50 transition-transform duration-500 ease-in-out"> */}
            <ul className="flex flex-col gap-6 p-6">
              <li>
                <Link href="#aboutUs">About us</Link>
              </li>
              <li>
                <Link href="#courses">Our courses</Link>
              </li>
              <li>
                <Link href="#">Home</Link>
              </li>
              <li>
                <Link href="#testimonials">Testimonials</Link>
              </li>
              <li>
                <Link href="#">Contact us</Link>
              </li>
              <li>
                <Link href="#">Blog</Link>
              </li>
              <li className="flex w-full justify-center">
                <button className={`${styles.loginBtn}`}>
                  <a className={`${styles.noneDecoration}`} href="">
                    Log in
                  </a>
                </button>
                <button className={`${styles.switchBtnLng} flex`}>
                  <span className="font-medium" style={{ color: "#FB6F92" }}>
                    EN
                  </span>
                  <Globe className="ms-1" color="#FB6F92" />
                </button>
              </li>
            </ul>
            {/* </div> */}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
