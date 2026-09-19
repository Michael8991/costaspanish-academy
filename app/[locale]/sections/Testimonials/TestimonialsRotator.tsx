"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TestimonialCard, type Testimonial } from "./TestimonialCard";
import styles from "./testimonialsSection.module.css";

type Props = {
  testimonials: Testimonial[];
  labels: { previous: string; next: string; readMore: string; showLess: string; rating: string };
};

const variants = ["featured", "local", "featured", "local"] as const;
const EXIT_MS = 200;
const ENTER_MS = 500;

export function TestimonialsRotator({ testimonials, labels }: Props) {
  const [visibleCount, setVisibleCount] = useState(4);
  const [slots, setSlots] = useState([0, 1, 2, 3]);
  const [cursor, setCursor] = useState(4);
  const [slotCursor, setSlotCursor] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [manualPause, setManualPause] = useState(false);
  const [transition, setTransition] = useState<{ slot: number; index: number; direction: 1 | -1; phase: "exiting" | "entering" } | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const transitionLocked = useRef(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const update = () => {
      const count = window.innerWidth <= 680 ? 1 : window.innerWidth <= 800 ? 2 : 4;
      setVisibleCount(count);
      setSlots((current) => {
        const used = new Set<number>();
        let changed = false;
        const next = current.map((value, position) => {
          if (position >= count || !used.has(value)) {
            if (position < count) used.add(value);
            return value;
          }
          const replacement = testimonials.findIndex((_, index) => !used.has(index));
          used.add(replacement);
          changed = true;
          return replacement;
        });
        return changed ? next : current;
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [testimonials]);

  useEffect(() => {
    const update = () => setHidden(document.visibilityState !== "visible");
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  const advance = useCallback((direction: 1 | -1) => {
    if (transitionLocked.current) return;
    const slot = slotCursor % visibleCount;
    const visible = new Set(slots.slice(0, visibleCount));
    let candidate = direction === 1 ? cursor : cursor - 2;
    for (let i = 0; i < testimonials.length; i++) {
      const index = (candidate + testimonials.length * 2) % testimonials.length;
      if (!visible.has(index)) {
        transitionLocked.current = true;
        if (reducedMotion) {
          setSlots((current) => current.map((value, position) => position === slot ? index : value));
          setCursor((index + (direction === 1 ? 1 : 0) + testimonials.length) % testimonials.length);
          setSlotCursor((slot + 1) % visibleCount);
          transitionLocked.current = false;
        } else {
          setTransition({ slot, index, direction, phase: "exiting" });
        }
        return;
      }
      candidate += direction;
    }
  }, [cursor, slotCursor, slots, visibleCount, testimonials.length, reducedMotion]);

  useEffect(() => {
    if (!transition) return;
    const timer = window.setTimeout(() => {
      if (transition.phase === "exiting") {
        setSlots((current) => current.map((value, position) => position === transition.slot ? transition.index : value));
        setCursor((transition.index + (transition.direction === 1 ? 1 : 0) + testimonials.length) % testimonials.length);
        setSlotCursor((transition.slot + 1) % visibleCount);
        setTransition({ ...transition, phase: "entering" });
      } else {
        setTransition(null);
        transitionLocked.current = false;
      }
    }, transition.phase === "exiting" ? EXIT_MS : ENTER_MS);
    return () => window.clearTimeout(timer);
  }, [transition, testimonials.length, visibleCount]);

  useEffect(() => {
    if (hovered || focused || hidden || expanded || manualPause || transition || testimonials.length <= visibleCount) return;
    const timer = window.setInterval(() => advance(1), 7000);
    return () => window.clearInterval(timer);
  }, [advance, hovered, focused, hidden, expanded, manualPause, transition, testimonials.length, visibleCount]);

  useEffect(() => {
    if (!manualPause) return;
    const timer = window.setTimeout(() => setManualPause(false), 7000);
    return () => window.clearTimeout(timer);
  }, [manualPause, cursor]);

  const navigate = (direction: 1 | -1) => {
    advance(direction);
    setManualPause(true);
  };

  return <div className={styles.rotator} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setFocused(false); }}>
    <div className={styles.reviewGrid}>
      {slots.slice(0, visibleCount).map((index, position) => {
        const testimonial = testimonials[index];
        const phase = transition?.slot === position ? transition.phase : null;
        return <div key={position} className={`${styles.reviewSlot} ${phase === "exiting" ? styles.exiting : phase === "entering" ? styles.entering : ""}`}>
          <TestimonialCard testimonial={testimonial} variant={variants[position]} ratingLabel={testimonial.rating ? labels.rating.replace("{rating}", String(testimonial.rating)) : undefined} expanded={expanded === testimonial.id} onToggle={() => setExpanded(expanded === testimonial.id ? null : testimonial.id)} readMoreLabel={labels.readMore} showLessLabel={labels.showLess} />
        </div>;
      })}
    </div>
    <div className={styles.controls}>
      <button type="button" onClick={() => navigate(-1)} aria-label={labels.previous}>←</button>
      <span aria-hidden="true">{`${visibleCount === 1 ? slots[0] + 1 : slotCursor + 1} / ${testimonials.length}`}</span>
      <button type="button" onClick={() => navigate(1)} aria-label={labels.next}>→</button>
    </div>
  </div>;
}
