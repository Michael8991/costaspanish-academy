import styles from "./testimonialCard.module.css";

export type TestimonialSource = "preply" | "facebook" | "professeurparticulier";

export type Testimonial = {
  id: string;
  name: string;
  text: string;
  rating?: number;
  date?: string;
  context?: string;
  country?: string;
  source?: TestimonialSource;
  sourceLabel?: string;
  sourceUrl?: string;
  avatarUrl?: string;
  sourceCta?: string;
  originalText?: string;
  originalLanguage?: "es" | "en" | "fr" | "sv";
};

type TestimonialCardProps = {
  testimonial: Testimonial;
  variant: "featured" | "local" | "wide";
  ratingLabel?: string;
  expanded?: boolean;
  onToggle?: () => void;
  readMoreLabel?: string;
  showLessLabel?: string;
  full?: boolean;
};

export function TestimonialCard({ testimonial, variant, ratingLabel, expanded = false, onToggle, readMoreLabel, showLessLabel, full = false }: TestimonialCardProps) {
  const canExpand = testimonial.text.length > 380;
  const sourceName = testimonial.source === "facebook" ? "Facebook" : testimonial.sourceLabel;

  return (
    <article className={`${styles.card} ${styles[variant]}`}>
      <span className={styles.quoteMark} aria-hidden="true">“</span>
      <blockquote className={!full && !expanded && canExpand ? styles.clamped : undefined} lang={testimonial.originalLanguage}>“{testimonial.text}”</blockquote>
      {!full && canExpand && onToggle && <button type="button" className={styles.expand} onClick={onToggle} aria-expanded={expanded}>{expanded ? showLessLabel : readMoreLabel}</button>}
      <footer>
        <div className={styles.author}>
          <strong>{testimonial.name}</strong>
          {testimonial.country && <span>{testimonial.country}</span>}
          {testimonial.date && <span>{testimonial.date}</span>}
          {testimonial.context && <span>{testimonial.context}</span>}
        </div>
        {(testimonial.rating || sourceName) && <div className={styles.provenance}>
          {testimonial.rating && <span className={styles.stars} aria-label={ratingLabel}><span aria-hidden="true">★★★★★</span></span>}
          {testimonial.rating && sourceName && <span aria-hidden="true" className={styles.separator}>·</span>}
          {sourceName && (testimonial.sourceUrl ?
            <a href={testimonial.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={testimonial.sourceCta ?? sourceName}>{sourceName}<span aria-hidden="true">↗</span></a> :
            <span className={styles.source}>{sourceName}</span>)}
        </div>}
      </footer>
    </article>
  );
}
