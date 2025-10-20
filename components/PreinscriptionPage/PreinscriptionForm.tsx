import { ICourseData } from "@/lib/mockcourses/CourseMock";

import { AnimatePresence, motion } from "framer-motion";
import { CircleAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type CourseProp = {
  course: ICourseData;
};

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

export const PreinscriptionForm = ({ course }: CourseProp) => {
  //Validaciones y envio de formulario
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormFields>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
    const sanitizedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        typeof value === "string" ? value.trim() : value,
      ])
    );

    try {
      const res = await fetch("/api/preinscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedData),
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);

      const result = await res.json();
      if (!result.success)
        throw new Error(result.error || "Error sending form.");

      if (result.success) {
        setSubmitMessage({
          type: "success",
          text: "Your pre-registration has been sent successfully! You will receive an email confirming your pre-registration.",
        });
        reset();
      }
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: "There was an error sending your pre-registration. Please try again later.",
      });
    } finally {
      setTimeout(() => setSubmitMessage(null), 10000);
    }
  };

  return (
    <div className="col-span-2 mx-3 m-3 xl:m-1">
      <AnimatePresence>
        {submitMessage && (
          <motion.div
            key={submitMessage.text}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`w-[90%] max-w-md mx-auto rounded-2xl p-8 shadow-xl text-center ${
                submitMessage.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-300"
                  : "bg-red-50 text-red-800 border border-red-300"
              }`}
            >
              {/* Logo */}
              <Image
                src="/assets/LogoCostaSpanishRojoCoralFuerte.png"
                alt="Costa Spanish Academy"
                width={96}
                height={96}
                priority
                className="mx-auto mb-4"
              />

              {/* Icon */}
              {submitMessage.type === "success" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-14 h-14 mx-auto mb-4 text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-14 h-14 mx-auto mb-4 text-red-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m0 3.75h.008v.008H12v-.008zm0-12a9 9 0 100 18 9 9 0 000-18z"
                  />
                </svg>
              )}

              {/* Mensaje */}
              <h3 className="text-lg font-semibold mb-2">
                {submitMessage.type === "success"
                  ? "Pre-registration sent successfully!"
                  : "Something went wrong"}
              </h3>
              <p className="text-sm mb-6">{submitMessage.text}</p>

              {/* Botón */}
              <Link
                className={`w-full py-2 px-4 rounded-md font-medium transition ${
                  submitMessage.type === "success"
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
                href="/"
              >
                Back to homepage
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white p-6 rounded-md shadow-md text-gray-800"
      >
        {/* 1. Personal information */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Personal information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full name *
              </label>
              <input
                {...register("name", {
                  required: "Please enter your name",
                })}
                id="name"
                type="text"
                name="name"
                required
                className="w-full border p-2 rounded-md"
              />
              <AnimatePresence>
                {errors.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className=" text-sm bg-red-100 rounded-md border border-red-400 color px-2 py-2 mt-2 flex items-center"
                    style={{ color: "red" }}
                  >
                    <CircleAlert
                      style={{ color: "red" }}
                      strokeWidth={1.5}
                      size={16}
                      className="me-2"
                    />
                    {errors.name.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                {...register("email", {
                  required: "Please enter your email",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: "Please enter a valid email address.",
                  },
                })}
                id="email"
                type="email"
                name="email"
                required
                className="w-full border p-2 rounded-md"
              />
              <AnimatePresence>
                {errors.email && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className=" text-sm bg-red-100 rounded-md border border-red-400 color px-2 py-2 mt-2 flex items-center"
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
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone (with country code)
              </label>
              <input
                {...register("phone")}
                id="phone"
                type="tel"
                name="phone"
                className="w-full border p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Country of residence
              </label>
              <input
                {...register("country")}
                id="country"
                type="text"
                name="country"
                className="w-full border p-2 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* 2. Course & level info */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Course preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Selected course
              </label>
              <input
                {...register("course")}
                type="text"
                name="course"
                value={course.title}
                readOnly
                className="w-full border p-2 rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm required font-medium mb-1">
                Spanish level *
              </label>
              <select
                {...register("level", {
                  required: "Please select your Spanish level",
                  setValueAs: (v) => (v === "" ? undefined : v),
                })}
                id="level"
                name="level"
                className="w-full border p-2 rounded-md"
              >
                <option value="">Select your level</option>
                <option value="A1">A1 - Beginner</option>
                <option value="A2">A2 - Elementary</option>
                <option value="B1">B1 - Intermediate</option>
                <option value="B2">B2 - Upper Intermediate</option>
                <option value="C1">C1 - Advanced</option>
                <option value="C2">C2 - Proficient</option>
              </select>
              <AnimatePresence>
                {errors.level && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className=" text-sm bg-red-100 rounded-md border border-red-400 color px-2 py-2 mt-2 flex items-center"
                    style={{ color: "#cc0000" }}
                  >
                    <CircleAlert
                      style={{ color: "#ff0000" }}
                      strokeWidth={1.5}
                      size={16}
                      className="me-2"
                    />
                    {errors.level.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Native language
              </label>
              <input
                {...register("nativeLanguage", {
                  required: "Please enter your native language",
                })}
                id="nativeLanguage"
                type="text"
                name="nativeLanguage"
                className="w-full border p-2 rounded-md"
              />
              <AnimatePresence>
                {errors.nativeLanguage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className=" text-sm bg-red-100 rounded-md border border-red-400 color px-2 py-2 mt-2 flex items-center"
                    style={{ color: "#cc0000" }}
                  >
                    <CircleAlert
                      style={{ color: "#ff0000" }}
                      strokeWidth={1.5}
                      size={16}
                      className="me-2"
                    />
                    {errors.nativeLanguage.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div>
              <label className="block text-sm required font-medium mb-1">
                Availability *
              </label>
              <select
                {...register("availability", {
                  required: "Please select your availability",
                  setValueAs: (v) => (v === "" ? undefined : v),
                })}
                id="availability"
                name="availability"
                className="w-full border p-2 rounded-md"
              >
                <option value="">Select your availability</option>
                <option value="morning">Morning (9:00-12:00)</option>
                <option value="afternoon">Afternoon (12:00-17:00)</option>
                <option value="evening">Evening (17:00-21:00)</option>
                <option value="flexible">Flexible schedule</option>
              </select>
              <AnimatePresence>
                {errors.availability && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className=" text-sm bg-red-100 rounded-md border border-red-400 color px-2 py-2 mt-2 flex items-center"
                    style={{ color: "#cc0000" }}
                  >
                    <CircleAlert
                      style={{ color: "#ff0000" }}
                      strokeWidth={1.5}
                      size={16}
                      className="me-2"
                    />
                    {errors.availability.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* 3. Background & goals */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Learning background</h2>
          <div className="space-y-3">
            <div>
              <label className="required block text-sm font-medium mb-1">
                How long have you studied Spanish? *
              </label>
              <select
                {...register("experience", {
                  required: "Please select your experience level",
                  setValueAs: (v) => (v === "" ? undefined : v),
                })}
                id="experience"
                name="experience"
                className="w-full border p-2 rounded-md"
              >
                <option value="">Select one</option>
                <option value="none">I'm a complete beginner</option>
                <option value="lessThan1">Less than 1 year</option>
                <option value="1to3">1-3 years</option>
                <option value="moreThan3">More than 3 years</option>
              </select>
              <AnimatePresence>
                {errors.experience && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className=" text-sm bg-red-100 rounded-md border border-red-400 color px-2 py-2 mt-2 flex items-center"
                    style={{ color: "#cc0000" }}
                  >
                    <CircleAlert
                      style={{ color: "#ff0000" }}
                      strokeWidth={1.5}
                      size={16}
                      className="me-2"
                    />
                    {errors.experience.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div>
              <label className="required block text-sm font-medium mb-1">
                Have you studied Spanish in a classroom before? *
              </label>
              <select
                {...register("previousCourses", {
                  required: "Please select an option",
                  setValueAs: (v) => (v === "" ? undefined : v),
                })}
                id="previousCourses"
                name="previousCourses"
                className="w-full border p-2 rounded-md"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
              <AnimatePresence>
                {errors.previousCourses && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className=" text-sm bg-red-100 rounded-md border border-red-400 color px-2 py-2 mt-2 flex items-center"
                    style={{ color: "#cc0000" }}
                  >
                    <CircleAlert
                      style={{ color: "#ff0000" }}
                      strokeWidth={1.5}
                      size={16}
                      className="me-2"
                    />
                    {errors.previousCourses.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div>
              <label className="required block text-sm font-medium mb-1">
                What are your main goals for learning Spanish? *
              </label>
              <textarea
                {...register("goals", {
                  required: "Please enter your learning goals",
                })}
                id="goals"
                name="goals"
                placeholder="E.g. travel, work, study abroad, conversation, DELE exam..."
                className="w-full border p-2 rounded-md h-24"
              />
              <AnimatePresence>
                {errors.goals && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className=" text-sm bg-red-100 rounded-md border border-red-400 color px-2 py-2 mt-2 flex items-center"
                    style={{ color: "#cc0000" }}
                  >
                    <CircleAlert
                      style={{ color: "#ff0000" }}
                      strokeWidth={1.5}
                      size={16}
                      className="me-2"
                    />
                    {errors.goals.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* 4. Additional info */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Additional information</h2>
          <textarea
            {...register("notes")}
            name="notes"
            placeholder="Tell us anything that could help us adapt the course to you (learning style, specific needs, schedule restrictions...)"
            className="w-full border p-2 rounded-md h-24"
          />
        </div>

        {/* Consent */}
        <div className="flex gap-2 text-sm text-gray-600 items-center">
          <input
            {...register("privacy", {
              required: "You must accept the privacy policy to proceed.",
            })}
            id="privacy"
            type="checkbox"
            name="privacy"
            required
            className=""
          />
          <label>
            I agree to the processing of my data in accordance with the
            academy’s privacy policy and understand that this form does not
            imply any payment or financial commitment.
          </label>
        </div>
        <AnimatePresence>
          {errors.privacy && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className=" text-sm bg-red-100 rounded-md border border-red-400 color px-2 py-2 mt-2 flex items-center"
              style={{ color: "#cc0000" }}
            >
              <CircleAlert
                style={{ color: "#ff0000" }}
                strokeWidth={1.5}
                size={16}
                className="me-2"
              />
              {errors.privacy.message}
            </motion.div>
          )}
        </AnimatePresence>
        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white font-medium py-2 rounded-md hover:bg-primary/90 transition"
        >
          Send pre-registration
        </button>
      </form>
    </div>
  );
};
