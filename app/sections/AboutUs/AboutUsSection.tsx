"use client";

import styles from "./aboutUsSection.module.css";

import {
  BicepsFlexed,
  Dot,
  Drama,
  Earth,
  HeartHandshake,
  Library,
  Target,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export const AboutUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "100px" });

  const refWho = useRef(null);
  const isInViewWHo = useInView(refWho, {
    once: true,
    margin: "100px",
  });

  const refMission = useRef(null);
  const isInViewMission = useInView(refMission, {
    once: true,
    margin: "100px",
  });

  const refDifferent = useRef(null);
  const isInViewDifferent = useInView(refDifferent, {
    once: true,
    margin: "100px",
  });

  return (
    <div id="aboutUs" className={`${styles.aboutUsWrapper} w-full py-5`}>
      <div className={`grid grid-cols-1`}>
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`${styles.aboutUsTitles} @container pt-2 text-center text-8xl font-extrabold`}
        >
          About Us
        </motion.p>
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          className={`${styles.aboutUsText} w-full text-center text-base font-light`}
        >
          Empowering students through culture and connection
        </motion.p>
        <motion.div
          ref={refWho}
          initial={{ opacity: 0, y: -30 }}
          animate={isInViewWHo ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          className={`@container grid grid-cols-1 my-12 gap-1`}
        >
          <div className="w-full max-w-6xl mx-auto">
            <p
              className={`${styles.aboutUsSubtitles} w-full text-center text-2xl italic`}
            >
              Who we are?
            </p>

            {/* <p className={`${styles.aboutUsText} w-full text-justify mb-2 text-base font-normal`}>
                            We are more than a language academy.
                        </p> */}

            <p
              className={`${styles.aboutUsText} w-full max-w-6xl mx-auto text-justify mb-2 text-base font-normal`}
            >
              Founded with the passion to share the beauty of the Spanish
              language, our academy offers a warm, personalized environment
              where students of all ages and backgrounds feel supported in their
              learning journey.
            </p>

            <p
              className={`${styles.aboutUsText} w-full text-justify mb-2 text-base font-normal`}
            >
              We believe that language is more than grammar and vocabulary —
              it's a bridge to new experiences, friendships, and opportunities.
              That's why we focus on real communication, cultural immersion, and
              a teaching style that adapts to each student's needs.
            </p>

            <p
              className={`${styles.aboutUsText} w-full text-justify mb-2 text-base font-normal`}
            >
              Whether you're a child taking your first steps in Spanish, a
              teenager preparing for official exams, or an adult discovering a
              new passion, we're here to help you grow with purpose and joy.
            </p>

            <p
              className={`${styles.aboutUsText} w-full mb-0 italic text-center text-sm font-light`}
            >
              We don't just teach languages - We open doors to new cultures,
              ideas, and opportunities.
            </p>
            {/* <p className={`${styles.aboutUsText} w-full mb-0 italic text-center text-sm font-light`}>We open doors to new cultures, ideas, and opportunities.</p> */}
          </div>
        </motion.div>
        <div className="flex flex-col w-full align-center justify-center items-center">
          <motion.p
            ref={refMission}
            initial={{ opacity: 0, y: -30 }}
            animate={isInViewMission ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            className={`${styles.aboutUsSubtitles} text-2xl italic m-0 text-center`}
          >
            Our Mission
          </motion.p>
          <div
            className={`container grid grid-cols-1 md:grid-cols-2 my-6 items-center`}
          >
            <motion.div
              ref={refMission}
              initial={{ opacity: 0, x: -30 }}
              animate={isInViewMission ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
              className="flex flex-col justify-center md:me-4"
            >
              <div className="my-2 flex w-full justify-end align-middle">
                <div className="flex flex-col w-fit justify-center">
                  <p
                    className={`${styles.aboutUsText} w-full mb-0 text-right text-base font-normal`}
                  >
                    Empower confident communication.
                  </p>
                  <p
                    className={`${styles.aboutUsText} w-full text-right text-sm font-light mb-0`}
                  >
                    We help students speak Spanish with ease and authenticity.
                  </p>
                </div>
                <div className="flex w-fit items-center">
                  <div
                    className="flex items-center ms-2 justify-center rounded-full border-1 p-2 w-10 h-10"
                    style={{ color: "#3F6844" }}
                  >
                    <BicepsFlexed
                      className={`w-7 h-7`}
                      strokeWidth={1}
                      style={{ color: "#3F6844" }}
                    />
                  </div>
                </div>
              </div>

              <div className="my-2 flex w-full justify-end align-middle">
                <div className="flex flex-col w-fit justify-center">
                  <p
                    className={`${styles.aboutUsText} w-full text-right text-base m-0 font-normal`}
                  >
                    Inclusive and personalized learning.
                  </p>
                  <p
                    className={`${styles.aboutUsText} w-full text-right text-sm font-light mb-0`}
                  >
                    For all ages, backgrounds, and learning goals.
                  </p>
                </div>
                <div className="flex w-fit items-center">
                  <div
                    className="flex items-center align-middle ms-2 justify-center rounded-full border-1 p-2 w-10 h-10"
                    style={{ color: "#3F6844" }}
                  >
                    <Earth
                      className={`w-7 h-7`}
                      strokeWidth={1}
                      style={{ color: "#3F6844" }}
                    />
                  </div>
                </div>
              </div>

              <div className="my-2 flex w-full justify-end align-middle">
                <div className="flex flex-col w-fit justify-center">
                  <p
                    className={`${styles.aboutUsText} w-full text-right text-base m-0 font-normal`}
                  >
                    Modern, effective methodology.
                  </p>
                  <p
                    className={`${styles.aboutUsText} w-full text-right text-sm font-light mb-0`}
                  >
                    We combine culture, conversation, and real-world practice.
                  </p>
                </div>
                <div className="flex w-fit items-center">
                  <div
                    className="flex items-center ms-2 justify-center rounded-full border-1 p-2 w-10 h-10"
                    style={{ color: "#3F6844" }}
                  >
                    <Library
                      className={`w-7 h-7`}
                      strokeWidth={1}
                      style={{ color: "#3F6844" }}
                    />
                  </div>
                </div>
              </div>

              <div className="my-2 flex w-full justify-end align-middle">
                <div className="flex flex-col w-fit justify-center">
                  <p
                    className={`${styles.aboutUsText} w-full text-right text-base m-0 font-normal`}
                  >
                    Joyful and immersive experiences.
                  </p>
                  <p
                    className={`${styles.aboutUsText} w-full text-right text-sm font-light mb-0`}
                  >
                    Learning is dynamic, relevant, and fun.
                  </p>
                </div>
                <div className="flex w-fit items-center">
                  <div
                    className="flex items-center ms-2 justify-center rounded-full border-1 p-2 w-10 h-10"
                    style={{ color: "#3F6844" }}
                  >
                    <Drama
                      className={`w-7 h-7`}
                      strokeWidth={1}
                      style={{ color: "#3F6844" }}
                    />
                  </div>
                </div>
              </div>

              <div className="my-2 flex w-full justify-end align-middle">
                <div className="flex flex-col w-fit justify-center">
                  <p
                    className={`${styles.aboutUsText} w-full text-right text-base m-0 font-normal`}
                  >
                    A human and student-centered approach.
                  </p>
                  <p
                    className={`${styles.aboutUsText} w-full text-right text-sm font-light mb-0`}
                  >
                    We teach with empathy, support, and care.
                  </p>
                </div>
                <div className="flex w-fit items-center">
                  <div
                    className="flex items-center ms-2 justify-center rounded-full border-1 p-2 w-10 h-10"
                    style={{ color: "#3F6844" }}
                  >
                    <HeartHandshake
                      className={`w-7 h-7`}
                      strokeWidth={1}
                      style={{ color: "#3F6844" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              ref={refMission}
              initial={{ opacity: 0, x: 30 }}
              animate={isInViewMission ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
              className="flex justify-center"
            >
              <div
                style={{
                  width: 450,
                  height: 350,
                  position: "relative",
                  marginRight: "5px",
                }}
              >
                <Image
                  src={"/assets/youngStudents.jpg"}
                  alt="OurMision"
                  className="shadow"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
        <div className="my-6">
          <motion.img
            ref={refDifferent}
            initial={{ opacity: 0, y: 100 }}
            animate={isInViewDifferent ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src={"../../../assets/SevillaPhoto.jpg"}
            alt="Photo of Sevilla"
            height={0}
            width={0}
            style={{
              width: "100%",
              height: "240px",
              objectFit: "cover",
              overflow: "hidden",
            }}
            className="my-4"
          />
          <div className={`@container`}>
            <p
              className={`${styles.aboutUsSubtitles} w-full max-w-6xl mx-auto text-center mb-6 text-2xl italic`}
            >
              What Makes Us Different
            </p>
            {/* <div className='grid grid-cols-2'>
                            <div className='flex flex-col items-center'>
                            <div className='flex w-fit items-center'>
                            <div className='flex items-center ms-2 justify-center rounded-full border-1 p-2 w-10 h-10' style={{ color: '#3F6844' }}>
                            <HeartHandshake className={`w-7 h-7`} strokeWidth={1} style={{ color: '#3F6844' }} />
                            </div>
                            
                            </div>
                            </div>
                            <div className='flex flex-col items-center'>col2</div>
                            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
