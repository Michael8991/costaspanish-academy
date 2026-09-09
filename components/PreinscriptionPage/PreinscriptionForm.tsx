"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import type { ICourseData } from "@/types/courses";
import styles from "./preinscriptionForm.module.css";

type CourseProp = { course: ICourseData };

type FormFields = {
  name: string;
  email: string;
  phone: string;
  country: string;
  level: string;
  nativeLanguage: string;
  availability: string;
  experience: string;
  previousCourses: string;
  goals: string;
  notes: string;
  privacy: boolean;
  course: string;
};

const sectionKeys = ["personal", "course", "background", "additional"] as const;

export const PreinscriptionForm = ({ course }: CourseProp) => {
  const t = useTranslations("preinscription.form");
  const locale = useLocale();
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormFields>({ mode: "onChange" });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const sanitizedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        typeof value === "string" ? value.trim() : value,
      ])
    );

    try {
      const res = await fetch("/api/preinscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanitizedData),
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const result = await res.json();
      if (!result.success) throw new Error(result.error || "Error");

      setSubmitMessage({ type: "success", text: t("messages.successText") });
      reset();
    } catch {
      setSubmitMessage({ type: "error", text: t("messages.errorText") });
    } finally {
      setTimeout(() => setSubmitMessage(null), 10000);
    }
  };

  const controlClass = (invalid: boolean) =>
    `${styles.control} ${invalid ? styles.invalid : ""}`;

  const error = (id: string, message?: string) =>
    message ? <p id={id} className={styles.error} role="alert">{message}</p> : null;

  return (
    <div className={styles.panel}>
      <header className={styles.formHeader}>
        <p className={styles.eyebrow}>{t("eyebrow")}</p>
        <h2>{t("title")}</h2>
        <p>{t("supporting")}</p>
        <small>{t("requiredNote")}</small>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <input type="hidden" {...register("course")} value={course.title} />

        <fieldset className={styles.formSection}>
          <legend><span>01</span>{t(`sections.${sectionKeys[0]}`)}</legend>
          <div className={styles.twoColumns}>
            <div className={styles.field}>
              <label htmlFor="prereg-name">{t("labels.name")}</label>
              <input {...register("name", { required: t("errors.name") })} id="prereg-name" type="text" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "prereg-name-error" : undefined} className={controlClass(Boolean(errors.name))} />
              {error("prereg-name-error", errors.name?.message)}
            </div>
            <div className={styles.field}>
              <label htmlFor="prereg-email">{t("labels.email")}</label>
              <input {...register("email", { required: t("errors.email"), pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/, message: t("errors.email") } })} id="prereg-email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "prereg-email-error" : undefined} className={controlClass(Boolean(errors.email))} />
              {error("prereg-email-error", errors.email?.message)}
            </div>
            <div className={styles.field}>
              <label htmlFor="prereg-phone">{t("labels.phone")}</label>
              <input {...register("phone")} id="prereg-phone" type="tel" autoComplete="tel" className={styles.control} />
            </div>
            <div className={styles.field}>
              <label htmlFor="prereg-country">{t("labels.country")}</label>
              <input {...register("country")} id="prereg-country" type="text" autoComplete="country-name" className={styles.control} />
            </div>
          </div>
        </fieldset>

        <fieldset className={styles.formSection}>
          <legend><span>02</span>{t(`sections.${sectionKeys[1]}`)}</legend>
          <div className={styles.selectedCourse}>
            <small>{t("labels.course")}</small>
            <strong>{course.title}</strong>
          </div>
          <div className={styles.twoColumns}>
            <div className={styles.field}>
              <label htmlFor="prereg-level">{t("labels.level")}</label>
              <select {...register("level", { required: t("errors.level") })} id="prereg-level" defaultValue="" aria-invalid={Boolean(errors.level)} aria-describedby={errors.level ? "prereg-level-error" : undefined} className={controlClass(Boolean(errors.level))}>
                <option value="" disabled>{t("options.selectLevel")}</option>
                {(["A1", "A2", "B1", "B2", "C1", "C2"] as const).map((level) => <option key={level} value={level}>{t(`options.levels.${level}`)}</option>)}
              </select>
              {error("prereg-level-error", errors.level?.message)}
            </div>
            <div className={styles.field}>
              <label htmlFor="prereg-language">{t("labels.nativeLanguage")}</label>
              <input {...register("nativeLanguage", { required: t("errors.nativeLanguage") })} id="prereg-language" type="text" aria-invalid={Boolean(errors.nativeLanguage)} aria-describedby={errors.nativeLanguage ? "prereg-language-error" : undefined} className={controlClass(Boolean(errors.nativeLanguage))} />
              {error("prereg-language-error", errors.nativeLanguage?.message)}
            </div>
            <div className={`${styles.field} ${styles.fullWidth}`}>
              <label htmlFor="prereg-availability">{t("labels.availability")}</label>
              <select {...register("availability", { required: t("errors.availability") })} id="prereg-availability" defaultValue="" aria-invalid={Boolean(errors.availability)} aria-describedby={errors.availability ? "prereg-availability-error" : undefined} className={controlClass(Boolean(errors.availability))}>
                <option value="" disabled>{t("options.selectAvailability")}</option>
                {(["morning", "afternoon", "evening", "flexible"] as const).map((option) => <option key={option} value={option}>{t(`options.availability.${option}`)}</option>)}
              </select>
              {error("prereg-availability-error", errors.availability?.message)}
            </div>
          </div>
        </fieldset>

        <fieldset className={styles.formSection}>
          <legend><span>03</span>{t(`sections.${sectionKeys[2]}`)}</legend>
          <div className={styles.twoColumns}>
            <div className={styles.field}>
              <label htmlFor="prereg-experience">{t("labels.experience")}</label>
              <select {...register("experience", { required: t("errors.experience") })} id="prereg-experience" defaultValue="" aria-invalid={Boolean(errors.experience)} aria-describedby={errors.experience ? "prereg-experience-error" : undefined} className={controlClass(Boolean(errors.experience))}>
                <option value="" disabled>{t("options.selectExperience")}</option>
                {(["none", "lessThan1", "1to3", "moreThan3"] as const).map((option) => <option key={option} value={option}>{t(`options.experience.${option}`)}</option>)}
              </select>
              {error("prereg-experience-error", errors.experience?.message)}
            </div>
            <div className={styles.field}>
              <label htmlFor="prereg-previous">{t("labels.previousCourses")}</label>
              <select {...register("previousCourses", { required: t("errors.previousCourses") })} id="prereg-previous" defaultValue="no" aria-invalid={Boolean(errors.previousCourses)} aria-describedby={errors.previousCourses ? "prereg-previous-error" : undefined} className={controlClass(Boolean(errors.previousCourses))}>
                <option value="no">{t("options.no")}</option>
                <option value="yes">{t("options.yes")}</option>
              </select>
              {error("prereg-previous-error", errors.previousCourses?.message)}
            </div>
            <div className={`${styles.field} ${styles.fullWidth}`}>
              <label htmlFor="prereg-goals">{t("labels.goals")}</label>
              <textarea {...register("goals", { required: t("errors.goals") })} id="prereg-goals" rows={5} placeholder={t("placeholders.goals")} aria-invalid={Boolean(errors.goals)} aria-describedby={errors.goals ? "prereg-goals-error" : undefined} className={controlClass(Boolean(errors.goals))} />
              {error("prereg-goals-error", errors.goals?.message)}
            </div>
          </div>
        </fieldset>

        <fieldset className={styles.formSection}>
          <legend><span>04</span>{t(`sections.${sectionKeys[3]}`)}</legend>
          <p className={styles.sectionSupporting}>{t("additionalSupporting")}</p>
          <div className={styles.field}>
            <label htmlFor="prereg-notes">{t("labels.notes")}</label>
            <textarea {...register("notes")} id="prereg-notes" rows={4} placeholder={t("placeholders.notes")} className={styles.control} />
          </div>
        </fieldset>

        <div className={styles.consent}>
          <input {...register("privacy", { required: t("errors.privacy") })} id="prereg-privacy" type="checkbox" aria-invalid={Boolean(errors.privacy)} aria-describedby={errors.privacy ? "prereg-privacy-error" : undefined} />
          <label htmlFor="prereg-privacy">
            {t("labels.privacyBefore")} <Link href={`/${locale}/privacyPolicy`}>{t("labels.privacyLink")}</Link>{t("labels.privacyAfter")}
          </label>
        </div>
        {error("prereg-privacy-error", errors.privacy?.message)}

        {submitMessage && (
          <div className={submitMessage.type === "success" ? styles.success : styles.generalError} role={submitMessage.type === "error" ? "alert" : "status"} aria-live="polite">
            <strong>{submitMessage.type === "success" ? t("messages.successTitle") : t("messages.errorTitle")}</strong>
            <span>{submitMessage.text}</span>
          </div>
        )}

        <div className={styles.submitRow}>
          <p>{t("submitReassurance")}</p>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? t("buttons.sending") : t("buttons.submit")} <span aria-hidden="true">→</span>
          </button>
        </div>
      </form>
    </div>
  );
};
