"use client";

import {
  ChevronDownIcon,
  CircleAlert,
  CircleCheck,
  Mail,
  Phone
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

type FormFields = {
  firstName: string;
  lastName: string;
  email: string;
  topic: string;
  textMessage: string;
};

export const ContactForm = () => {
  const t = useTranslations("contact");
  const topics = t.raw("form.topics") as Record<string, string>;

  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormFields>({ mode: "onChange" });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const res = await fetch(`/api/contact`, {
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

  return (
    <div className="@container max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 min-h-[calc(100vh-150px)] items-center">
      <div className="bg-white p-6 rounded-2xl shadow-sm relative">
        <div className="absolute right-3 top-0 opacity-50" style={{ color: "#FF2E00", fontSize: 32, fontWeight: 800 }}>¿?</div>
        <h2 className="font-bold text-6xl mb-8">{t("title")}</h2>
        <p className="mb-2">{t("intro.p1")}</p>
        <p className="mb-2">{t("intro.p2")}</p>
        <p className="mb-2">{t("intro.p3")}</p>

        <div className="w-full flex flex-col justify-center mt-4 mb-4">
          <p className="flex mb-2">
            <Phone strokeWidth={1} size={22} className="me-2" />
            {t("contact.phone")}
          </p>
          <p className="flex">
            <Mail strokeWidth={1} size={22} className="me-2" />
            {t("contact.email")}
          </p>
        </div>

        <p className="mb-2 text-sm font-extralight flex">
          <CircleAlert className="me-2" />
          {t("intro.privacy")}
        </p>
      </div>

      <div className="col-span-2 px-8">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* First and Last Name */}
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mb-3">
            <div className="sm:col-span-3">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-900">
                {t("form.firstName")}
              </label>
              <input
                {...register("firstName", { required: t("errors.firstName") })}
                id="firstName"
                type="text"
                autoComplete="off"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-gray-300 focus:outline-rose-200 sm:text-sm"
              />
              {errors.firstName && <p className="text-sm text-red-600 mt-1">{errors.firstName.message}</p>}
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-900">
                {t("form.lastName")}
              </label>
              <input
                {...register("lastName", { required: t("errors.lastName") })}
                id="lastName"
                type="text"
                autoComplete="off"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-gray-300 focus:outline-rose-200 sm:text-sm"
              />
              {errors.lastName && <p className="text-sm text-red-600 mt-1">{errors.lastName.message}</p>}
            </div>
          </div>

          {/* Email */}
          <div className="sm:col-span-4 mb-3">
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              {t("form.email")}
            </label>
            <input
              {...register("email", {
                required: t("errors.emailRequired"),
                pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/, message: t("errors.emailInvalid") },
              })}
              id="email"
              type="email"
              autoComplete="off"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-gray-300 focus:outline-rose-200 sm:text-sm"
            />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
          </div>

          {/* Topic */}
          <div className="sm:col-span-3 mb-3">
            <label htmlFor="topic" className="block text-sm font-medium text-gray-900">
              {t("form.topic")}
            </label>
            <div className="relative">
              <select
                {...register("topic", { required: t("errors.topic") })}
                id="topic"
                className="w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline outline-gray-300 focus:outline-rose-200 sm:text-sm"
              >
                {Object.entries(topics).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-2 top-2.5 size-4 text-gray-500" />
            </div>
            {errors.topic && <p className="text-sm text-red-600 mt-1">{errors.topic.message}</p>}
          </div>

          {/* Message */}
          <div className="col-span-full mb-3">
            <label htmlFor="textMessage" className="block text-sm font-medium text-gray-900">
              {t("form.message")}
            </label>
            <textarea
              {...register("textMessage", { required: t("errors.message") })}
              id="textMessage"
              rows={4}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-gray-300 focus:outline-rose-200 sm:text-sm"
              placeholder={t("form.messagePlaceholder")}
            />
            {errors.textMessage && <p className="text-sm text-red-600 mt-1">{errors.textMessage.message}</p>}
          </div>

          {/* Submit */}
          <div className="mt-6 flex items-center justify-end gap-x-4">
            {submitMessage && (
              <motion.div
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`p-2 rounded-md text-sm flex items-center ${submitMessage.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
              >
                {submitMessage.type === "success" ? <CircleCheck size={16} /> : <CircleAlert size={16} />}
                <span className="ml-2">{submitMessage.text}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm transition ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-red-400 hover:bg-red-500"
                }`}
            >
              {isSubmitting ? t("form.sending") : t("form.send")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
