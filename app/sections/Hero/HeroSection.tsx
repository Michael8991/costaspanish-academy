"use client";

import { AcademyHighlights, Circle } from "@/components";
import styles from "./heroSection.module.css";
import { ArrowIcon } from "@/assets/icons/ArrowIcon";

import { motion, useAnimation, useInView } from "motion/react";
import { useMediaQuery } from "react-responsive";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { relative } from "path";

export const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-300px 0px -300px 0px",
  });

  const isRegularScreen = useMediaQuery({ maxWidth: 1150 });

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 1);
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`@container flex flex-col justify-center pb-5 md:pb-0 items-center ${
        scrolled ? `${styles.headerspacerfixedbigscreen}` : ``
      }`}
      style={{
        minHeight: "calc( 100vh - 120px )",
      }}
    >
      <div
        className={`${
          scrolled ? `${styles.headerspacerfixed}` : ``
        } header-spacer`}
      ></div>
      <div
        className={` grid grid-cols-1 lg:grid-cols-2 mt-3 h-fit max-w-7xl mx-auto`}
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
          className={`flex flex-col h-fit`}
        >
          <h1 style={{}} className={`${styles.heroH1} text-center mb-0`}>
            Learn Spanish through its
            <span
              className={`${styles.slidingVertical} flex flex-col items-center w-full `}
            >
              <span className={`flex w-full text-center justify-center`}>
                culture
              </span>
              <span className={`flex w-full text-center justify-center`}>
                people
              </span>
              <span className={`flex w-full text-center justify-center`}>
                language
              </span>
            </span>
          </h1>
          {/* Learn Spanish through its culture, its people, and its language. */}
          <span className={`text-center mb-3`}>
            Expert language training for adults, teens, and kids
          </span>

          <div
            className={`mb-5 sm:!mb-0 sm:grid grid-cols-1 md:grid-cols-2 md:flex items-center justify-center xl:w-fit mx-auto`}
          >
            <div className="justify-center items-center grid-rows-1 w-full flex">
              <a
                href="#courses"
                className={`${styles.callToActionBtn} text-base font-normal py-3 px-3.5 mb-3 sm:!mb-0`}
                style={{ textDecoration: "none" }}
              >
                See our courses
              </a>
            </div>
            <div className="justify-center items-center grid-rows-1 md:ms-4 w-full flex">
              <a
                className={`${styles.seeOurCoursesBtn} ms-2 text-base font-normal gap-1 cursor-pointer`}
              >
                Start Learning Today!
                <ArrowIcon />
              </a>
            </div>
          </div>
        </motion.div>

        <div
          className="flex flex-col justify-end h-full"
          style={{ maxHeight: "400px" }}
        >
          <motion.div
            style={{ zIndex: 2 }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
          >
            <motion.div
              animate={{
                y: isRegularScreen
                  ? [90, 70, 90, 100, 90]
                  : [100, 80, 100, 120, 100],
                x: isRegularScreen
                  ? [30, 25, 30, 25, 30]
                  : [50, 55, 50, 45, 50],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`${styles.floatingBoxShadow} hidden lg:flex z-2 relative w-fit h-16 md:h-18 py-1 px-3 bg-white rounded-2xl flex items-center justify-center font-extrabold text-base md:text-lg`}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  position: "relative",
                  marginRight: "5px",
                }}
              >
                <Image
                  src={"/assets/SpainFlag.png"}
                  alt="Spain Courses"
                  fill
                  className=" w-10 h-10 me-2 md:w-14 md:h-14 md:me-3"
                />
              </div>
              SPANISH
            </motion.div>
          </motion.div>
          <motion.div
            style={{ zIndex: 2 }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
          >
            <motion.div
              key={`uk-flag-${isRegularScreen}`}
              animate={{
                y: isRegularScreen
                  ? [200, 180, 200, 220, 200]
                  : [250, 230, 250, 270, 250],
                x: isRegularScreen
                  ? [310, 315, 310, 315, 310]
                  : [450, 455, 450, 455, 450],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`${styles.floatingBoxShadow} hidden lg:flex z-2 relative w-fit h-16 md:h-18 py-1 px-3 bg-white rounded-2xl flex items-center justify-center font-extrabold text-base md:text-lg`}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  position: "relative",
                  marginRight: "5px",
                }}
              >
                <Image
                  src={"/assets/UKFlag.png"}
                  alt="Spain Courses"
                  fill
                  className="w-10 h-10 me-2 md:w-14 md:h-14 md:me-3"
                />
              </div>
              ENGLISH
            </motion.div>
          </motion.div>
          <Circle />
        </div>
      </div>
      <AcademyHighlights />
    </div>
  );
};
