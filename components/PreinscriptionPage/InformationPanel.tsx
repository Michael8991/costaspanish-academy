"use client";

import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ICourseData } from "@/types/courses";
import styles from "./informationPanel.module.css";

type Props = { course: ICourseData };

export const InformationPanel = ({ course }: Props) => {
  const t = useTranslations("preinscription.info");
  const steps = t.raw("process.steps") as Array<{ title: string; text: string }>;
  const metadata = [course.level, course.modality].filter(Boolean) as string[];

  return (
    <aside className={styles.panel}>
      <span className={styles.doodle} aria-hidden="true" />

      <div className={styles.courseSummary}>
        <p className={styles.eyebrow}>{t("selectedCourse")}</p>
        <h2>{course.title}</h2>
        {metadata.length > 0 && <p className={styles.metadata}>{metadata.join(" · ")}</p>}
        {course.status && (
          <span className={styles.status}>
            <i aria-hidden="true" />
            {t(`status.${course.status}`)}
          </span>
        )}
      </div>

      <div className={styles.noPayment}>
        <strong>{t("noPayment.title")}</strong>
        <p>{t("noPayment.text")}</p>
      </div>

      <div className={styles.process}>
        <p className={styles.eyebrow}>{t("process.title")}</p>
        <ol>
          {steps.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{step.title}</strong>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.reassurances}>
        <p><strong>{t("response.title")}</strong>{t("response.text")}</p>
        <p><strong>{t("privacy.title")}</strong>{t("privacy.text")}</p>
      </div>

      <div className={styles.contact}>
        <p>{t("contact.title")}</p>
        <span>{t("contact.whatsapp")}</span>
        <a href={`mailto:${t("contact.emailAddress")}`}>
          <Mail aria-hidden="true" size={15} /> {t("contact.email")}
        </a>
      </div>
    </aside>
  );
};
