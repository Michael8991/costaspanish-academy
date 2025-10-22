"use client";
import styles from "./academyHighlights.module.css";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const AcademyHighlights = () => {
  const t = useTranslations("AcademyHighlights");
  const cards = t.raw("cards") as {
    title: string;
    text: string;
    alt: string;
  }[];

  return (
    <motion.div
      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
      className={`${styles.highLightsContainer} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 align-middle z-2 px-9 py-4 max-w-6xl xl:mx-auto mx-3`}
    >
      {/* Title */}
      <div className="flex flex-col justify-center text-center md:text-left">
        <p className="font-extrabold text-4xl mb-2">{t("title")}</p>
        <p className="italic font-light m-0">{t("subtitle")}</p>
      </div>

      {/* Cards */}
      {cards.map((card, index) => {
        const icons = ["/assets/CheckIcon.png", "/assets/BooksIcon.png", "/assets/WeCareIcon.png"];
        return (
          <div key={index} className="flex flex-col items-center justify-center text-center">
            <h5 className="flex text-center items-center font-normal">
              <div style={{ width: 50, height: 50, position: "relative", marginRight: "5px" }}>
                <Image
                  src={icons[index]}
                  alt={card.alt}
                  fill
                  style={{ objectFit: "contain", marginRight: "5px" }}
                  loading="lazy"
                />
              </div>
              {card.title}
            </h5>
            <p className="text-center font-normal text-base">{card.text}</p>
          </div>
        );
      })}
    </motion.div>
  );
};
