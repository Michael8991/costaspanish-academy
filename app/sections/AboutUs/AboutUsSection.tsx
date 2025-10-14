"use client";

import {
  ArrowRight,
  BriefcaseMedical,
  Clock,
  Flame,
  Globe,
  MessageSquare,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export const AboutUsSection = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    const headerOffset = 120;
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  return (
    <section
      id="aboutUs"
      className="bg-white w-full flex justify-center py-10 shadow-md"
    >
      <div className="max-w-7xl w-7xl m-auto  grid grid-cols-1 lg:grid-cols-2 mx-5 lg:mx-3 xl:mx-0 items-center gap-4">
        <div className="order-2 xl:order-1 my-5">
          <div className="relative w-full h-[500px]">
            <div className="absolute top-0 right-0 sm:bottom-10 sm:right-30 md:bottom-10 md:right-50 lg:bottom-10 lg:right-20 xl:bottom-0 xl:right-20 w-full max-w-[200px] xl:max-w-[300px] aspect-[9/16] bg-rose-300 shadow-2xl rounded-md">
              <Image
                fill
                alt="Spanish native teacher"
                src={"/assets/MariaThinking.png"}
                className="object-cover"
                quality={80}
              />
            </div>
            <div className="absolute left-0 bottom-0 sm:bottom-15 sm:left-20 md:bottom-15 md:left-40 lg:bottom-15 lg:left-20 xl:bottom-10 xl:left-20 w-full max-w-[250px] xl:max-w-[300px] aspect-[4/3] bg-rose-300 shadow-2xl  rounded-md ">
              <Image
                fill
                alt="Spanish native teacher"
                src={"/assets/MariaThinking.png"}
                className="object-cover"
                quality={80}
              />
            </div>
            <motion.div
              animate={{
                y: [10, 0, 10, 0, 10],
                x: [10, 0, 10, 0, 10],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex flex-col justify-center absolute top-40 sm:top-30 sm:left-30 md:top-30 md:left-50 lg:top-30 lg:left-30 xl:top-20 xl:left-25  bg-rose-400 text-white shadow-rose-400/50 py-2 px-3  shadow-2xl rounded-sm text-center"
              style={{}}
            >
              <span className="text-2xl font-bold">+3</span>
              <span className="text-md">
                years <br />
                of experience
              </span>
            </motion.div>
          </div>
          {/* <div className="flex w-full justify-center mt-10">
            <button
              onClick={() => scrollToSection("courses")}
              className="group flex gap-2 items-center mt-4 px-6 py-3 rounded-md text-md lg:text-lg shadow-lg shadow-rose-400/50 hover:scale-101 bg-rose-400 text-white cursor-pointer"
            >
              Learn more
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition duration-150 ease-in-out" />
            </button>
          </div> */}
        </div>
        <div className="order-1 md:order-2 space-y-6 my-5">
          <header>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
              Learn <span className="text-rose-400">Spanish</span>
              <br /> with <span className="text-rose-400">Native Teachers</span>
            </h2>
            <p className="mt-2 text-md lg:text-lg font-light text-gray-600 text-center">
              Personalized classes tailored to your pace, level, and goals.
            </p>
          </header>

          <p className="text-gray-700 leading-relaxed text-center lg:text-left">
            At <strong>Costa Spanish Academy</strong>, we help you learn and
            improve your Spanish or English through a practical and personalized
            approach. Our lessons are designed for all ages and profiles,
            offering a flexible and comfortable learning experience.
          </p>
          <p className="text-gray-700 leading-relaxed text-center lg:text-left">
            We believe language learning should be more than grammar — it's
            about connection, culture, and confidence. That's why our classes
            focus on real-world situations, natural conversation, and cultural
            immersion, helping you speak Spanish from day one.
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center gap-2">
              <Flame size={24} className="text-rose-600 " />
              <span>
                <strong>Intensive Spanish Courses Online</strong> - Fast-paced
                programs for quick progress.
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Clock size={24} className="text-rose-600" />
              <span>
                <strong>Semi-Intensive Spanish Courses</strong> - Balanced
                schedule for consistent learning.
              </span>
            </li>
            <li className="flex items-center gap-2">
              <UserRound size={24} className="text-rose-600" />
              <span>
                <strong>Private Spanish Classes for Beginners</strong> -
                One-to-one lessons tailored to your goals.
              </span>
            </li>
            <li className="flex items-center gap-2">
              <MessageSquare size={24} className="text-rose-600" />
              <span>
                <strong>
                  Spanish Conversation Lessons with Native Teachers
                </strong>{" "}
                - Improve fluency and pronunciation through real interaction.
              </span>
            </li>
            <li className="flex items-center gap-2">
              <BriefcaseMedical size={24} className="text-rose-600" />
              <span>
                <strong>Spanish for Specific Purposes</strong> - Specialized
                courses for business, tourism, or healthcare.
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Globe size={24} className="text-rose-600" />
              <span>
                <strong>English Classes for Spanish Speakers</strong> - Standard
                2-hour-per-week lessons (semi-intensive options coming soon).
              </span>
            </li>
          </ul>
          <div className="flex w-full justify-center">
            <button
              onClick={() => scrollToSection("courses")}
              className="group flex gap-2 items-center mt-4 px-6 py-3 rounded-md text-md lg:text-lg shadow-lg shadow-rose-400/50 hover:scale-101 bg-rose-400 text-white cursor-pointer"
            >
              Descubre nuestros cursos
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1.5 transition duration-150 ease-in-out"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
