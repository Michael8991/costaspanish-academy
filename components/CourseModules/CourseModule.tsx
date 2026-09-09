"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { ICourseData } from "@/types/courses";
import styles from "./courseModule.module.css";

type CourseModulesProps = { course: ICourseData };

export default function CourseModule({ course }: CourseModulesProps) {
  const t = useTranslations("coursePage");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const modules = course.modules?.filter((module) => module?.title) ?? [];

  if (modules.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="course-modules-title">
      <header className={styles.header}>
        <p className={styles.eyebrow}>{t("modules.eyebrow")}</p>
        <h2 id="course-modules-title">{t("modules.title")}</h2>
        <p>{t("modules.description")}</p>
      </header>

      <div className={styles.list}>
        {modules.map((module, index) => {
          const isOpen = openIndex === index;
          const panelId = `course-module-${index}`;
          const buttonId = `course-module-button-${index}`;

          return (
            <div className={styles.module} key={`${module.title}-${index}`}>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.moduleTitle}>{module.title}</span>
                {module.duration && <span className={styles.duration}>{module.duration}</span>}
                <span className={styles.toggle} aria-hidden="true">{isOpen ? "−" : "+"}</span>
              </button>

              {isOpen && (
                <div id={panelId} role="region" aria-labelledby={buttonId} className={styles.panel}>
                  {module.type && <p className={styles.type}>{module.type}</p>}
                  {module.submodules && module.submodules.length > 0 && (
                    <ul>
                      {module.submodules.map((submodule, subIndex) => (
                        <li key={`${submodule.title}-${subIndex}`}>
                          <span>{submodule.title}</span>
                          {submodule.duration && <small>{submodule.duration}</small>}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
