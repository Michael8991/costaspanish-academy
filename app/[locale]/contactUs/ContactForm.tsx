"use client";

import { motion } from "framer-motion";
import { Check, ChevronDown, Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./contactForm.module.css";

type FormFields = {
  firstName: string;
  lastName: string;
  email: string;
  topic: string;
  textMessage: string;
};

const CONTACT_PHONE = "+34 665 33 49 19";
const CONTACT_EMAIL = "info@costaSpanishClass.com";

export const ContactForm = () => {
  const t = useTranslations("contact");
  const topics = t.raw("form.topics") as Record<string, string>;
  const askAbout = t.raw("info.askAbout") as string[];
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
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error();

      setSubmitMessage({ type: "success", text: t("success") });
      reset();
    } catch {
      setSubmitMessage({ type: "error", text: t("fail") });
    } finally {
      setTimeout(() => setSubmitMessage(null), 5000);
    }
  };

  const fieldClass = (invalid: boolean) =>
    `${styles.control} ${invalid ? styles.controlInvalid : ""}`;

  return (
    <section className={styles.shell} aria-label={t("form.title")}>
      <aside className={styles.infoPanel}>
        <div className={styles.decorativeMark} aria-hidden="true">
          ¿?
        </div>
        <p className={styles.panelEyebrow}>{t("info.eyebrow")}</p>
        <h2 className={styles.infoTitle}>{t("info.title")}</h2>
        <p className={styles.infoIntro}>{t("info.intro")}</p>

        <div className={styles.askBlock}>
          <p className={styles.miniLabel}>{t("info.askLabel")}</p>
          <ul className={styles.askList}>
            {askAbout.map((item) => (
              <li key={item}>
                <Check aria-hidden="true" size={15} strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.contactMethods}>
          <a href="tel:+34665334919" className={styles.contactLink}>
            <span className={styles.iconBox} aria-hidden="true">
              <Phone size={18} strokeWidth={1.8} />
            </span>
            <span>
              <small>{t("contact.phoneLabel")}</small>
              {CONTACT_PHONE}
            </span>
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className={styles.contactLink}>
            <span className={styles.iconBox} aria-hidden="true">
              <Mail size={18} strokeWidth={1.8} />
            </span>
            <span>
              <small>{t("contact.emailLabel")}</small>
              {CONTACT_EMAIL}
            </span>
          </a>
        </div>

        <div className={styles.infoFooter}>
          <p>
            <strong>{t("info.hoursLabel")}</strong>
            <span>{t("info.hours")}</span>
          </p>
          <p>{t("info.response")}</p>
        </div>
      </aside>

      <div className={styles.formPanel}>
        <div className={styles.formHeading}>
          <p className={styles.panelEyebrow}>{t("form.eyebrow")}</p>
          <h2>{t("form.title")}</h2>
          <p>{t("form.supporting")}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={styles.twoColumns}>
            <div className={styles.field}>
              <label htmlFor="firstName">{t("form.firstName")}</label>
              <input
                {...register("firstName", { required: t("errors.firstName") })}
                id="firstName"
                type="text"
                autoComplete="given-name"
                aria-invalid={Boolean(errors.firstName)}
                aria-describedby={errors.firstName ? "firstName-error" : undefined}
                className={fieldClass(Boolean(errors.firstName))}
              />
              {errors.firstName && (
                <p id="firstName-error" className={styles.error} role="alert">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="lastName">{t("form.lastName")}</label>
              <input
                {...register("lastName", { required: t("errors.lastName") })}
                id="lastName"
                type="text"
                autoComplete="family-name"
                aria-invalid={Boolean(errors.lastName)}
                aria-describedby={errors.lastName ? "lastName-error" : undefined}
                className={fieldClass(Boolean(errors.lastName))}
              />
              {errors.lastName && (
                <p id="lastName-error" className={styles.error} role="alert">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="email">{t("form.email")}</label>
            <input
              {...register("email", {
                required: t("errors.emailRequired"),
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: t("errors.emailInvalid"),
                },
              })}
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={fieldClass(Boolean(errors.email))}
            />
            {errors.email && (
              <p id="email-error" className={styles.error} role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="topic">{t("form.topic")}</label>
            <div className={styles.selectWrap}>
              <select
                {...register("topic", {
                  validate: (value) => value !== "select" || t("errors.topic"),
                })}
                id="topic"
                defaultValue="select"
                aria-invalid={Boolean(errors.topic)}
                aria-describedby={errors.topic ? "topic-error" : undefined}
                className={fieldClass(Boolean(errors.topic))}
              >
                {Object.entries(topics).map(([key, label]) => (
                  <option key={key} value={key} disabled={key === "select"}>
                    {label}
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden="true" size={17} />
            </div>
            {errors.topic && (
              <p id="topic-error" className={styles.error} role="alert">
                {errors.topic.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="textMessage">{t("form.message")}</label>
            <textarea
              {...register("textMessage", { required: t("errors.message") })}
              id="textMessage"
              rows={5}
              placeholder={t("form.messagePlaceholder")}
              aria-invalid={Boolean(errors.textMessage)}
              aria-describedby={errors.textMessage ? "textMessage-error" : undefined}
              className={fieldClass(Boolean(errors.textMessage))}
            />
            {errors.textMessage && (
              <p id="textMessage-error" className={styles.error} role="alert">
                {errors.textMessage.message}
              </p>
            )}
          </div>

          <div className={styles.submitRow}>
            <div className={styles.submitCopy}>
              <p>{t("form.submitNote")}</p>
              {submitMessage && (
                <motion.p
                  role={submitMessage.type === "error" ? "alert" : "status"}
                  aria-live="polite"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={
                    submitMessage.type === "success"
                      ? styles.successMessage
                      : styles.errorMessage
                  }
                >
                  {submitMessage.text}
                </motion.p>
              )}
            </div>
            <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
              {isSubmitting ? t("form.sending") : t("form.send")}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
