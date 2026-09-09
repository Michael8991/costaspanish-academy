import Image from "next/image";
import styles from "./testimonialCard.module.css";

export type TestimonialSource = "preply" | "facebook" | "professeurparticulier";

export type Testimonial = {
  id: string;
  name: string;
  text: string;
  rating?: number;
  date?: string;
  context?: string;
  source: TestimonialSource;
  sourceLabel: string;
  sourceUrl?: string;
  avatarUrl?: string;
  sourceCta?: string;
  originalText?: string;
  originalLanguage?: "es" | "en" | "fr";
};

type TestimonialCardProps = {
  testimonial: Testimonial;
  variant: "featured" | "local" | "wide";
  ratingLabel?: string;
};

const sourceIcons: Partial<Record<TestimonialSource, string>> = {
  preply: "/assets/Preply_idxfA4aZwE_0.svg",
  facebook: "/assets/facebook.svg",
};

export function TestimonialCard({ testimonial, variant, ratingLabel }: TestimonialCardProps) {
  const icon = sourceIcons[testimonial.source];

  return (
    <article className={`${styles.card} ${styles[variant]}`}>
      <span className={styles.quoteMark} aria-hidden="true">“</span>
      <header className={styles.source}>
        {icon && <Image src={icon} alt="" width={testimonial.source === "preply" ? 76 : 20} height={20} className={testimonial.source === "preply" ? styles.preply : styles.facebook} />}
        <span>{testimonial.sourceLabel}</span>
      </header>
      {testimonial.rating && (
        <div className={styles.stars} aria-label={ratingLabel}>
          <span aria-hidden="true">★★★★★</span>
        </div>
      )}
      <blockquote>“{testimonial.text}”</blockquote>
      <footer>
        <div>
          <strong>{testimonial.name}</strong>
          {testimonial.date && <span>{testimonial.date}</span>}
          {testimonial.context && <span>{testimonial.context}</span>}
        </div>
        {testimonial.sourceUrl && testimonial.sourceCta && (
          <a href={testimonial.sourceUrl} target="_blank" rel="noopener noreferrer">
            {testimonial.sourceCta}<span aria-hidden="true">↗</span>
          </a>
        )}
      </footer>
    </article>
  );
}
