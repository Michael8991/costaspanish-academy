"use client";

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
    <div className="@container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 min-h-screen">
      <div>
        <h2 className="font-bold text-6xl mb-5">
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
        <p className="mb-2"></p>
        <p className="mb-2">
          Privacy: your details are used only to reply to your request. We do
          not share your information.
        </p>
      </div>
      <div className="col-span-2 px-5">
        <form onSubmit={onSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="surname">Surname:</label>
            <input type="text" name="surname" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email:</label>
            <input type="text" name="email" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="subject">Subject:</label>
            <input type="text" name="subject" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="message">Message:</label>
            <textarea name="message" rows={5} cols={100} />
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};
