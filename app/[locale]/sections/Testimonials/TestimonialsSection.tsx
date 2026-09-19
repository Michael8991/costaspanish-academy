import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import landingTheme from "@/styles/landing/landingTheme.module.css";
import { type Testimonial } from "./TestimonialCard";
import { TestimonialsRotator } from "./TestimonialsRotator";
import { TestimonialsTrustBlock } from "./TestimonialsTrustBlock";
import {
  HOME_TESTIMONIAL_IDS,
  TESTIMONIALS,
} from "./testimonials.data";
import styles from "./testimonialsSection.module.css";

export const TestimonialsSection = async () => {
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: "home.TestimonialsSection",
  });
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  const testimonials: Testimonial[] = TESTIMONIALS.map((definition) => ({
    ...definition,
    text: definition.originalText ?? t(`reviews.${definition.id}.text`),
    date: definition.date
      ? dateFormatter.format(new Date(`${definition.date}T00:00:00Z`))
      : undefined,
    context: definition.contextKey ? t(definition.contextKey) : undefined,
    sourceCta:
      definition.source === "preply"
        ? t("links.preply")
        : definition.source === "facebook"
          ? t("links.facebook")
          : undefined,
  }));
  const byId = new Map(
    testimonials.map((testimonial) => [testimonial.id, testimonial]),
  );
  const homeTestimonials = HOME_TESTIMONIAL_IDS.map((id) =>
    byId.get(id),
  ).filter((testimonial): testimonial is Testimonial => Boolean(testimonial));

  return (
    <section
      id="testimonials"
      className={`${styles.testimonials} ${landingTheme.theme}`}
    >
      <div className={styles.inner}>
        <header className={styles.sectionHeader}>
          <p className={styles.eyebrow}>{t("eyebrow")}</p>
          <h2>{t("title")}</h2>
          <p className={styles.supporting}>{t("supporting")}</p>
        </header>

        <TestimonialsRotator testimonials={homeTestimonials} labels={{ previous: t("controls.previous"), next: t("controls.next"), readMore: t("controls.readMore"), showLess: t("controls.showLess"), rating: t.raw("rating") as string }} />
        <div className={styles.allReviews}><Link href={`/${locale}/reviews`}>{t("links.allReviews")} <span aria-hidden="true">→</span></Link></div>
        <TestimonialsTrustBlock locale={locale} />
      </div>
    </section>
  );
};
