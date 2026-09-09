import type { TestimonialSource } from "./TestimonialCard";
import { COSTASPANISH_SOCIAL_LINKS } from "@/lib/constants/socialLinks";

export type TestimonialId = "claire" | "liz" | "jeff" | "pierre" | "ali" | "caus";

export type TestimonialDefinition = {
  id: TestimonialId;
  name: string;
  rating?: number;
  date?: string;
  contextKey?: "reviews.pierre.context";
  source: TestimonialSource;
  sourceLabel: string;
  sourceUrl?: string;
  avatarUrl?: string;
  originalText?: string;
  originalLanguage: "es" | "en" | "fr";
};

export const PREPLY_URL = COSTASPANISH_SOCIAL_LINKS.preply;

export const TESTIMONIALS: readonly TestimonialDefinition[] = [
  {
    id: "claire",
    name: "Claire",
    rating: 5,
    date: "2026-08-11",
    source: "preply",
    sourceLabel: "Preply",
    sourceUrl: PREPLY_URL,
    avatarUrl: "https://avatars.preply.com/i/logos/c456c322-16d8-4834-94e2-8c1347b19990.jpg",
    originalLanguage: "es",
  },
  {
    id: "liz",
    name: "Liz Begley",
    source: "facebook",
    sourceLabel: "Facebook · Torrox Friends",
    sourceUrl: "https://www.facebook.com/share/p/1SFhfKF1U3/?mibextid=wwXIfr",
    originalText: "I can thoroughly recommend Maria. Her lessons are well planned and professionally taught.",
    originalLanguage: "en",
  },
  {
    id: "jeff",
    name: "Jeff",
    rating: 5,
    date: "2026-02-13",
    source: "preply",
    sourceLabel: "Preply",
    sourceUrl: PREPLY_URL,
    avatarUrl: "https://avatars.preply.com/i/logos/i/logos/1115578.4c6daf67a3.jpg",
    originalLanguage: "es",
  },
  {
    id: "pierre",
    name: "Pierre",
    rating: 5,
    contextKey: "reviews.pierre.context",
    source: "professeurparticulier",
    sourceLabel: "ProfesseurParticulier",
    originalText: "Professeure très pédagogue qui prend le temps de comprendre ses élèves et d'adapter en permanence ses contenus.",
    originalLanguage: "fr",
  },
  {
    id: "ali",
    name: "Ali Osman",
    rating: 5,
    date: "2026-09-08",
    source: "preply",
    sourceLabel: "Preply",
    sourceUrl: PREPLY_URL,
    avatarUrl: "https://avatars.preply.com/i/logos/25ebdc5c-d376-4c74-839e-cd08810c83f8.jpg",
    originalLanguage: "es",
  },
  {
    id: "caus",
    name: "Caus",
    rating: 5,
    date: "2026-02-20",
    source: "preply",
    sourceLabel: "Preply",
    sourceUrl: PREPLY_URL,
    avatarUrl: "https://static.preply.com/images/avatar-placeholder.png",
    originalLanguage: "es",
  },
] as const;

export const HOME_TESTIMONIAL_IDS: readonly TestimonialId[] = ["claire", "liz", "jeff", "pierre", "caus"];
