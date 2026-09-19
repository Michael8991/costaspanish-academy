import type { TestimonialSource } from "./TestimonialCard";
import { COSTASPANISH_SOCIAL_LINKS } from "@/lib/constants/socialLinks";

export type TestimonialId = "claire" | "liz" | "jeff" | "pierre" | "ali" | "caus" | "mansor" | "hans" | "natalia" | "josephine" | "ali_new";

export type TestimonialDefinition = {
  id: TestimonialId;
  name: string;
  rating?: number;
  date?: string;
  contextKey?: "reviews.pierre.context";
  source?: TestimonialSource;
  sourceLabel?: string;
  sourceUrl?: string;
  avatarUrl?: string;
  originalText?: string;
  originalLanguage: "es" | "en" | "fr" | "sv";
  country?: string;
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
  {
    id: "mansor",
    name: "Mansor",
    originalText: "I highly recommend Maria if you want to learn Spanish and become fluent with someone who is can teach to a high level and knows how to make you understand difficult concepts which then become easy. With Maria I was able to develop my level and become fluent by understanding and applying grammatical rules which I previously found hard to understand. The lessons are engaging and fun as she is a very pleasant and patient teacher.",
    originalLanguage: "en",
  },
  {
    id: "hans",
    name: "Hans",
    country: "Sweden",
    originalText: "En fantastisk spansklärare! Pedagogisk, engagerad och alltid positiv. Lektionerna är både lärorika och roliga, och det känns enkelt att våga prata och utvecklas i sin egen takt. Jag kan varmt rekommendera María!",
    originalLanguage: "sv",
  },
  {
    id: "natalia",
    name: "Natalia",
    country: "Slovakia",
    originalText: `I absolutely adore this woman. She is the best lecturer of Spanish I have ever had. She listens very carefully to what I say. We genuinely have conversations. So I actually got a lot, a lot better at conversation in Spanish because of her, thanks to her.

Because she actually makes me so comfortable with sharing and with speaking and with not correcting every minor mistake and telling me it's wrong. No. If it is wrong, she will wait until the end of the sentence or the end of the paragraph, and then she will correct the mistakes.

But she also has this very positive attitude. She has a lot of energy. She actually listens when I say we need to go through this or that in the materials. She's very patient as well. Her materials are actually fun. Like genuinely, they are fun. It's not like you're sitting there for two hours writing some shit-ass essay. It's actually fucking funny. We have a lot of fun with each other.

Also, I feel much more comfortable with Spanish now. I got a lot, a lot better. And it's coming from someone who studied for two years at university, and I didn't feel comfortable in Spanish. I didn't really like talking in Spanish. I couldn't really hold a conversation in Spanish.

But a year with Maria as a lecturer not only helped me get better, but I actually got better marks as well. My conversation skills are much better. My confidence is much higher in the language. I actually got to know Spanish on another level because she helps me understand the culture and the people as well.

It's not only the language we are studying. We are literally studying Spanish as a language of culture, which is absolutely beautiful. She also helps me understand Latin America. We have conversations about politics, about art. It just never feels like a lesson. It actually feels like talking to a friend in Spanish who helps you get better.`,
    originalLanguage: "en",
  },
  {
    id: "josephine",
    name: "Josephine",
    originalText: "J'ai travaillé avec Maria afin de perfectionner mon espagnol pour mon BTS, et Maria a été une professeur géniale. A l'écoute et disponible. Merci pour tout.",
    originalLanguage: "fr",
  },
  {
    id: "ali_new",
    name: "Ali",
    originalText: "¡Maria es una profesora maravillosa! Explica todo con claridad, corrige mis errores de una manera muy útil y hace que cada lección sea agradable. ¡Altamente recomendada!",
    originalLanguage: "es",
  },
] as const;

export const HOME_TESTIMONIAL_IDS: readonly TestimonialId[] = ["claire", "liz", "jeff", "pierre", "caus", "ali", "mansor", "hans", "natalia", "josephine", "ali_new"];
