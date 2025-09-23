"use client";

import {
  ChevronDownIcon,
  CircleAlert,
  Mail,
  Phone,
  Weight,
} from "lucide-react";
import { FormEvent } from "react";

export const ContactForm = () => {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/submit", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
  }

  return (
    <div className="@container max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 min-h-[calc(100vh-150px)] items-center">
      <div>
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
        <form onSubmit={onSubmit}>
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
                  id="first-name"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rose-200 sm:text-sm/6"
                />
              </div>
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
                  id="last-name"
                  name="last-name"
                  type="text"
                  autoComplete="family-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rose-200 sm:text-sm/6"
                />
              </div>
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
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rose-200 sm:text-sm/6"
              />
            </div>
          </div>

          <div className="sm:col-span-3 mb-3">
            <label
              htmlFor="Topic"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Topic
            </label>
            <div className="mt-2 grid grid-cols-1">
              <select
                id="topic"
                name="topic"
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
          </div>

          <div className="col-span-full mb-3">
            <label
              htmlFor="about"
              className="block text-sm/6 font-medium text-gray-900"
            >
              About
            </label>
            <div className="mt-2">
              <textarea
                id="about"
                name="about"
                rows={3}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rose-200 sm:text-sm/6"
                defaultValue={""}
              />
            </div>
            <p className="mt-3 text-sm/6 text-gray-600">
              Write a few sentences about yourself.
            </p>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
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
