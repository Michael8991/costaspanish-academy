"use client";

import {
  ChevronDownIcon,
  CircleAlert,
  CircleCheck,
  Mail,
  Phone,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";

type FormFields = {
  firstName: string;
  lastName: string;
  email: string;
  topic: string;
  textMessage: string;
};

export const ContactForm = () => {
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormFields>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || "Error sending form.");
      }

      if (result.success) {
        setSubmitMessage({
          type: "success",
          text: "Your message has been sent!",
        });
        reset();
      }
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: "Failed to send message. Please try again.",
      });
    } finally {
      setTimeout(() => setSubmitMessage(null), 5000);
    }
  };

  return (
    <div className="@container max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 min-h-[calc(100vh-150px)] items-center">
      <div className="bg-white p-6 rounded-2xl shadow-sm relative">
        <div
          className="absolute z-10 right-3 top-0 opacity-50"
          style={{ color: "#C62B0C", fontSize: 32, fontWeight: 800 }}
        >
          ¿?
        </div>
        <h2 className="font-bold text-6xl mb-8">
          have a <br /> question?
        </h2>
        <p className="mb-2">
          We’re here to help. Fill out the form or contact us by email, WhatsApp
          or phone. Our Customer Care Team will guide you and make sure you get
          the best experience.
        </p>
        <p className="mb-2">
          What you can ask: course prices, availability, schedules, trial
          lessons, group or private classes, corporate training, or any other
          question.
        </p>
        <p className="mb-2">
          Response time: everyone gets a personalized reply. Please allow up to
          24 hours during business hours. Our business hours are Monday–Friday,
          9:00–20:00.
        </p>
        <div className="w-full flex flex-col justify-center mt-4 mb-4">
          <p className="flex mb-2">
            <Phone strokeWidth={1} size={22} className="me-2" />
            +34 604 80 92 08
          </p>
          <p className="flex">
            <Mail strokeWidth={1} size={22} className="me-2" />
            info@costaSpanishClass.com
          </p>
        </div>
        <p className="mb-2 text-sm font-extralight flex">
          <CircleAlert className="me-2" />
          Privacy: your details are used only to reply to your request. We do
          not share your information.
        </p>
      </div>
      <div className="col-span-2 px-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mb-3">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  {...register("firstName", {
                    required: "Please enter your name.",
                  })}
                  id="firstName"
                  type="text"
                  autoComplete="off"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rose-200 sm:text-sm/6"
                />
              </div>
              <AnimatePresence>
                {errors.firstName && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className=" text-sm bg-red-300 rounded-md border border-red-400 color px-2 py-4 mt-2 flex items-center"
                    style={{ color: "#cc0000" }}
                  >
                    <CircleAlert
                      style={{ color: "#ff0000" }}
                      strokeWidth={1.5}
                      size={16}
                      className="me-2"
                    />
                    {errors.firstName.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  {...register("lastName", {
                    required: "Please enter your last name.",
                  })}
                  id="lastName"
                  type="text"
                  autoComplete="off"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rose-200 sm:text-sm/6"
                />
              </div>
              <AnimatePresence>
                {errors.lastName && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className=" text-sm bg-red-300 rounded-md border border-red-400 color px-2 py-4 mt-2 flex items-center"
                    style={{ color: "#cc0000" }}
                  >
                    <CircleAlert
                      style={{ color: "#ff0000" }}
                      strokeWidth={1.5}
                      size={16}
                      className="me-2"
                    />
                    {errors.lastName.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="sm:col-span-4 mb-3">
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                {...register("email", {
                  required: "Please enter your email.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: "Please enter a valid email address.",
                  },
                })}
                id="email"
                type="email"
                autoComplete="off"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rose-200 sm:text-sm/6"
              />
            </div>
            <AnimatePresence>
              {errors.email && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className=" text-sm bg-red-300 rounded-md border border-red-400 color px-2 py-4 mt-2 flex items-center"
                  style={{ color: "#cc0000" }}
                >
                  <CircleAlert
                    style={{ color: "#ff0000" }}
                    strokeWidth={1.5}
                    size={16}
                    className="me-2"
                  />
                  {errors.email.message}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="sm:col-span-3 mb-3">
            <label
              htmlFor="topic"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Topic
            </label>
            <div className="mt-2 grid grid-cols-1">
              <select
                {...register("topic", {
                  required: "Please enter your topic.",
                })}
                id="topic"
                autoComplete="topic"
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-rose-200 sm:text-sm/6"
              >
                <option value="">-- Please choose a topic --</option>
                <option value="prices">Course prices</option>
                <option value="availability">Availability</option>
                <option value="schedule">Schedules and calendar</option>
                <option value="level">Levels and placement test</option>
                <option value="trial">Trial lessons</option>
                <option value="private-group">Private or group classes</option>
                <option value="intensive">Intensive courses</option>
                <option value="exams">
                  Official exam preparation (DELE, SIELE, etc.)
                </option>
                <option value="companies">Corporate training</option>
                <option value="modality">Online or in-person</option>
                <option value="materials">Study materials included</option>
                <option value="payment">Payment methods and invoices</option>
                <option value="refunds">Cancellation and refunds</option>
                <option value="activities">Cultural activities</option>
                <option value="general">General information</option>
              </select>
              <ChevronDownIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              />
            </div>
            <AnimatePresence>
              {errors.topic && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className=" text-sm bg-red-300 rounded-md border border-red-400 color px-2 py-4 mt-2 flex items-center"
                  style={{ color: "#cc0000" }}
                >
                  <CircleAlert
                    style={{ color: "#ff0000" }}
                    strokeWidth={1.5}
                    size={16}
                    className="me-2"
                  />
                  {errors.topic.message}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="col-span-full mb-3">
            <label
              htmlFor="textMessage"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Message
            </label>
            <div className="mt-2">
              <textarea
                {...register("textMessage", {
                  required: "Please enter your message.",
                })}
                id="textMessage"
                rows={3}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rose-200 sm:text-sm/6"
                defaultValue={""}
              />
            </div>
            <p className="mt-3 text-sm/6 text-gray-600">
              Let us know your request or suggestion in detail.
            </p>
          </div>
          <AnimatePresence>
            {errors.textMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className=" text-sm bg-red-300 rounded-md border border-red-400 color px-2 py-4 mt-2 flex items-center"
                style={{ color: "#cc0000" }}
              >
                <CircleAlert
                  style={{ color: "#ff0000" }}
                  strokeWidth={1.5}
                  size={16}
                  className="me-2"
                />
                {errors.textMessage.message}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <AnimatePresence>
              {isSubmitting && (
                <motion.div
                  role="status"
                  aria-live="polite"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="flex items-center p-2  bg-white rounded-xl shadow-xs"
                >
                  <p
                    className="me-1"
                    style={{ fontSize: 16, color: "#cc0000" }}
                  >
                    Sending
                  </p>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-red-400"></div>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {submitMessage && (
                <motion.div
                  key={submitMessage.text}
                  initial={{ opacity: 0, x: 100 }}
                  animate={
                    submitMessage.type === "error"
                      ? { opacity: 1, x: [100, -10, 10, -5, 0] }
                      : { opacity: 1, x: 0 }
                  }
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className={`p-2 rounded-xl shadow-xs flex items-center ${
                    submitMessage.type === "success"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {submitMessage.type === "success" ? (
                    <CircleCheck size={16} className="w-5 h-5" />
                  ) : (
                    <CircleAlert className="w-5 h-5" />
                  )}
                  <span className="me-1" style={{ fontSize: 16 }}>
                    {submitMessage.text}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
