import { z } from "zod";

const noControlCharacters = /^[^\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]*$/;
const noLineBreaks = /^[^\r\n]*$/;
const phoneCharacters = /^[0-9+().\s-]*$/;
const courseSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function singleLineText(min: number, max: number) {
  return z
    .string()
    .trim()
    .min(min)
    .max(max)
    .regex(noControlCharacters)
    .regex(noLineBreaks);
}

function multilineText(min: number, max: number) {
  return z.string().trim().min(min).max(max).regex(noControlCharacters);
}

function optionalSingleLineText(max: number) {
  return z
    .string()
    .trim()
    .max(max)
    .regex(noControlCharacters)
    .regex(noLineBreaks)
    .transform((value) => value || undefined)
    .optional();
}

function optionalMultilineText(max: number) {
  return z
    .string()
    .trim()
    .max(max)
    .regex(noControlCharacters)
    .transform((value) => value || undefined)
    .optional();
}

const turnstileToken = z.string().trim().min(1).max(2048).optional();

export const contactSchema = z
  .object({
    firstName: singleLineText(1, 80),
    lastName: singleLineText(1, 80),
    email: z.string().trim().email().max(254).toLowerCase(),
    topic: z.enum([
      "prices",
      "availability",
      "schedule",
      "level",
      "trial",
      "private-group",
      "intensive",
      "exams",
      "companies",
      "modality",
      "materials",
      "payment",
      "refunds",
      "activities",
      "general",
    ]),
    textMessage: multilineText(1, 2000),
    turnstileToken,
  })
  .strict();

export const preinscriptionSchema = z
  .object({
    name: singleLineText(1, 100),
    email: z.string().trim().email().max(254).toLowerCase(),
    phone: optionalSingleLineText(30).refine(
      (value) => value === undefined || phoneCharacters.test(value),
      "Invalid phone number",
    ),
    country: optionalSingleLineText(80),
    courseSlug: z.string().trim().min(1).max(120).regex(courseSlug),
    level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]),
    nativeLanguage: singleLineText(1, 80),
    availability: z.enum(["morning", "afternoon", "evening", "flexible"]),
    experience: z.enum(["none", "lessThan1", "1to3", "moreThan3"]),
    previousCourses: z.enum(["no", "yes"]),
    goals: multilineText(1, 1000),
    notes: optionalMultilineText(1500),
    privacy: z.literal(true),
    turnstileToken,
  })
  .strict();

export type ContactInput = z.infer<typeof contactSchema>;
export type PreinscriptionInput = z.infer<typeof preinscriptionSchema>;
