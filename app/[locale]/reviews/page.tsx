import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import landingTheme from "@/styles/landing/landingTheme.module.css";
import { TestimonialCard, type Testimonial } from "../sections/Testimonials/TestimonialCard";
import { TestimonialsTrustBlock } from "../sections/Testimonials/TestimonialsTrustBlock";
import { TESTIMONIALS } from "../sections/Testimonials/testimonials.data";
import styles from "./reviewsPage.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.ReviewsPage" });
  const title = t("metadata.title");
  const description = t("metadata.description");
  const url = `https://www.costaspanishclass.com/${locale}/reviews`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: "https://www.costaspanishclass.com/en/reviews",
        es: "https://www.costaspanishclass.com/es/reviews",
      },
    },
    openGraph: { title, description, url, siteName: "Costa Spanish Academy", locale, type: "website" },
  };
}

export default async function ReviewsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.ReviewsPage" });
  const home = await getTranslations({ locale, namespace: "home.TestimonialsSection" });
  const dateFormatter = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
  const testimonials: Testimonial[] = TESTIMONIALS.map((definition) => ({
    ...definition,
    text: definition.originalText ?? home(`reviews.${definition.id}.text`),
    date: definition.date ? dateFormatter.format(new Date(`${definition.date}T00:00:00Z`)) : undefined,
    context: definition.contextKey ? home(definition.contextKey) : undefined,
    sourceCta: definition.source === "preply" ? home("links.preply") : definition.source === "facebook" ? home("links.facebook") : undefined,
  }));

  return <div className={`${styles.page} ${landingTheme.theme}`}>
    <div className={styles.inner}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>{t("eyebrow")}</p>
        <h1>{t("titleLineOne")}<br /><span>{t("titleLineTwo")}</span></h1>
        <p className={styles.intro}>{t("intro")}</p>
        <p className={styles.count}>{t("count", { count: testimonials.length })}</p>
      </header>

      <section className={styles.reviews} aria-label={t("listLabel")}>
        {testimonials.map((testimonial, index) => <div className={styles.reviewItem} key={testimonial.id}>
          <TestimonialCard testimonial={testimonial} variant={index % 3 === 1 ? "local" : "featured"} full ratingLabel={testimonial.rating ? home("rating", { rating: testimonial.rating }) : undefined} />
        </div>)}
      </section>

      <TestimonialsTrustBlock locale={locale} />

      <aside className={styles.cta}>
        <p className={styles.eyebrow}>{t("ctaEyebrow")}</p>
        <h2>{t("ctaLineOne")}<br /><span>{t("ctaLineTwo")}</span></h2>
        <Link href={`/${locale}/spanish`}>{t("ctaLink")} <span aria-hidden="true">→</span></Link>
      </aside>
    </div>
  </div>;
}
