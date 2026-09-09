"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { IFaqData } from "@/types/courses";
import styles from "./faqAccordion.module.css";

type FaqAccordionProps = { faqs: IFaqData[] };

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const t = useTranslations("coursePage");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (faqs.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="course-faq-title">
      <header className={styles.header}>
        <p className={styles.eyebrow}>{t("faq.eyebrow")}</p>
        <h2 id="course-faq-title">{t("faq.title")}</h2>
        <p>{t("faq.description")}</p>
      </header>

      <div className={styles.questions}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const panelId = `course-faq-${index}`;
          const buttonId = `course-faq-button-${index}`;

          return (
            <div className={styles.item} key={faq.question}>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{faq.question}</span>
                <b aria-hidden="true">{isOpen ? "−" : "+"}</b>
              </button>
              {isOpen && (
                <div id={panelId} role="region" aria-labelledby={buttonId} className={styles.answer}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
