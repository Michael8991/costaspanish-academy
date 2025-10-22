'use client';

import { AcademyHighlights, Circle } from "@/components";
import styles from "./heroSection.module.css";
import { motion } from "motion/react";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export const HeroSection = () => {
  const t = useTranslations("HeroSection");
  const isRegularScreen = useMediaQuery({ maxWidth: 1150 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 1);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    const headerOffset = 120;
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const animatedWords = t.raw("title.words") as string[];

  return (
    <section
      id="home"
      className={`@container flex flex-col justify-center pb-5 md:pb-0 items-center ${scrolled ? styles.headerspacerfixedbigscreen : ""
        }`}
      style={{ minHeight: "calc(100vh - 120px)" }}
    >
      <div className={`${scrolled ? styles.headerspacerfixed : ""} header-spacer`} />

      <div className="grid grid-cols-1 lg:grid-cols-2 mt-3 h-fit max-w-7xl mx-auto">
        {/* Text Column */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
          className="flex flex-col h-fit"
        >
          <h1 className={`${styles.heroH1} text-center mb-0`}>
            {t("title.base")}
            <span className={`${styles.slidingVertical} flex flex-col items-center w-full`}>
              {animatedWords.map((word, index) => (
                <span key={index} className="flex w-full text-center justify-center">
                  {word}
                </span>
              ))}
            </span>
          </h1>

          <p className="text-center mb-3">{t("subtitle")}</p>

          <div className="mb-5 sm:!mb-0 sm:grid grid-cols-1 md:grid-cols-2 md:flex items-center justify-center xl:w-fit mx-auto">
            <div className="justify-center items-center grid-rows-1 w-full flex">
              <button
                onClick={() => scrollToSection("courses")}
                className={`${styles.callToActionBtn} hover:scale-103 transition duration-150 ease-in-out group flex items-center gap-1 cursor-pointer text-base font-normal py-3 px-3.5 mb-3 sm:!mb-0`}
              >
                {t("cta")}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition duration-150 ease-in-out" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Image Column */}
        <div className="flex flex-col justify-end h-full" style={{ maxHeight: "400px" }}>
          {/* Spain Flag */}
          <motion.div
            style={{ zIndex: 2 }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
          >
            <motion.div
              animate={{
                y: isRegularScreen ? [90, 70, 90, 100, 90] : [100, 80, 100, 120, 100],
                x: isRegularScreen ? [30, 25, 30, 25, 30] : [50, 55, 50, 45, 50],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className={`${styles.floatingBoxShadow} hidden lg:flex z-2 relative w-fit h-16 md:h-18 py-1 px-3 bg-white rounded-2xl items-center justify-center font-extrabold text-base md:text-lg`}
            >
              <div style={{ width: 50, height: 50, position: "relative", marginRight: "5px" }}>
                <Image
                  src="/assets/SpainFlag.png"
                  alt={t("flags.spanishAlt")}
                  fill
                  className="w-10 h-10 me-2 md:w-14 md:h-14 md:me-3"
                  loading="lazy"
                />
              </div>
              SPANISH
            </motion.div>
          </motion.div>

          {/* UK Flag */}
          <motion.div
            style={{ zIndex: 2 }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
          >
            <motion.div
              animate={{
                y: isRegularScreen ? [200, 180, 200, 220, 200] : [250, 230, 250, 270, 250],
                x: isRegularScreen ? [310, 315, 310, 315, 310] : [450, 455, 450, 455, 450],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className={`${styles.floatingBoxShadow} hidden lg:flex z-2 relative w-fit h-16 md:h-18 py-1 px-3 bg-white rounded-2xl items-center justify-center font-extrabold text-base md:text-lg`}
            >
              <div style={{ width: 50, height: 50, position: "relative", marginRight: "5px" }}>
                <Image
                  src="/assets/UKFlag.png"
                  alt={t("flags.englishAlt")}
                  fill
                  className="w-10 h-10 me-2 md:w-14 md:h-14 md:me-3"
                  loading="lazy"
                />
              </div>
              ENGLISH
            </motion.div>
          </motion.div>
          <Circle />
        </div>
      </div>

      <AcademyHighlights />
    </section>
  );
};
