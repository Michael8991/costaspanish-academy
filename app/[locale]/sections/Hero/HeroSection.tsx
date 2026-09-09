"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { AcademyHighlights, Circle } from "@/components";
import landingTheme from "@/styles/landing/landingTheme.module.css";
import styles from "./heroSection.module.css";

export const HeroSection = () => {
  const t = useTranslations("HeroSection");
  const animatedWords = t.raw("title.words") as string[];
  const scrollToCourses = () => { const element=document.getElementById("courses"); if(element) window.scrollTo({top:element.getBoundingClientRect().top+window.scrollY-120,behavior:"smooth"}); };
  return <section id="home" className={`${styles.hero} ${landingTheme.theme}`}>
    <div className={styles.heroGrid}>
      <motion.div initial={{opacity:0,y:100}} animate={{opacity:1,y:0}} transition={{duration:1.2,ease:"easeOut",delay:.8}} className={styles.heroCopy}>
        <h1 className={styles.heroH1}>{t("title.base")}<span className={styles.slidingVertical}>{animatedWords.map((word,index)=><span key={index}>{word}</span>)}</span></h1>
        <p className={styles.heroSubtitle}>{t("subtitle")}</p>
        <button onClick={scrollToCourses} className={styles.callToActionBtn}>{t("cta")}<ArrowRight size={18} aria-hidden="true" /></button>
      </motion.div>
      <motion.div initial={{opacity:0,y:70}} animate={{opacity:1,y:0}} transition={{duration:1.2,ease:"easeOut",delay:.8}} className={styles.imageStage}>
        <span className={`${styles.doodle} ${styles.doodleLine}`} aria-hidden="true" />
        <span className={`${styles.doodle} ${styles.doodleCircle}`} aria-hidden="true" />
        <span className={`${styles.doodle} ${styles.doodleAccent}`} aria-hidden="true" />
        <Circle />
        <div className={`${styles.floatingPosition} ${styles.spanishPosition}`}><div className={`${styles.floatingCard} ${styles.spanishMotion}`}><span className={styles.flag}><Image src="/assets/SpainFlag.png" alt={t("flags.spanishAlt")} fill sizes="44px" /></span><strong>SPANISH</strong></div></div>
        <div className={`${styles.floatingPosition} ${styles.privatePosition}`}><div className={`${styles.microBubble} ${styles.privateMotion}`}>{t("floating.private")}</div></div>
        <div className={`${styles.floatingPosition} ${styles.groupPosition}`}><div className={`${styles.microBubble} ${styles.groupMotion}`}>{t("floating.group")}</div></div>
        <div className={`${styles.floatingPosition} ${styles.intensivePosition}`}><div className={`${styles.microBubble} ${styles.intensiveMotion}`}>{t("floating.intensive")}</div></div>
      </motion.div>
    </div>
    <AcademyHighlights />
  </section>;
};
