"use client"

import EmblaCarousel from "@/components/TestimonialsCarousel/EmblaCarousel";
import { useTranslations } from "next-intl";

const testimonials = [
  { id: 1, name: "Maria", text: "Excellent experience!" },
  { id: 2, name: "John", text: "Very helpful teachers." },
  { id: 3, name: "Laura", text: "Fun classes and great atmosphere." },
  { id: 4, name: "Tom", text: "Improved my English a lot." },
  { id: 5, name: "Ana", text: "Highly recommend!" },
  { id: 6, name: "Alex", text: "Loved it!" },
  { id: 7, name: "Sara", text: "So professional!" },
  { id: 8, name: "Lucas", text: "The best academy ever!" },
  { id: 9, name: "Emma", text: "Great prices and great people." },
];

export const TestimonialsSection = () => {
  const t = useTranslations("TestimonialsSection");

  return (
    <section id="testimonials" style={{ backgroundColor: "#FFCCDD" }} className="pb-10">
      <div className="@container w-full max-w-7xl mx-auto py-5">
        <div className="flex flex-col w-full items-center lg:items-start">
          <h2 className="text-4xl font-extrabold mt-5 mb-2">{t("title")}</h2>
          <p className="text-md font-normal mb-5">{t("subtitle")}</p>
        </div>
        <EmblaCarousel slides={testimonials} options={{ loop: true }} />
      </div>
    </section>
  );
};
