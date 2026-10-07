import { Resend } from "resend";

import dbConnect from "@/lib/mongo";
import { getPublicCourseBySlug } from "@/lib/courses/publicCourses";
import { escapeHtml, escapeHtmlWithLineBreaks, sanitizeEmailHeader } from "@/lib/security/html";
import {
  errorResponse,
  getClientIp,
  InvalidRequestError,
  logServerError,
  readJsonBody,
  successResponse,
} from "@/lib/security/http";
import { verifyTurnstile } from "@/lib/security/turnstile";
import { preinscriptionSchema } from "@/lib/security/validation";

const resend = new Resend(process.env.RESEND_API_KEY);
const INTERNAL_MAILBOX = "info@costaSpanishClass.com";

type ResolvedCourse = {
  title: string;
  slug: string;
};

function valueOrDash(value: string | undefined) {
  return value ? escapeHtmlWithLineBreaks(value) : "—";
}

export async function POST(req: Request) {
  try {
    const body = await readJsonBody(req);
    const parsed = preinscriptionSchema.safeParse(body);
    if (!parsed.success) return errorResponse(400, "INVALID_REQUEST");

    const input = parsed.data;
    const captchaIsValid = await verifyTurnstile(input.turnstileToken, getClientIp(req));
    if (!captchaIsValid) return errorResponse(400, "INVALID_REQUEST");

    await dbConnect();
    const course = await getPublicCourseBySlug<ResolvedCourse>(input.courseSlug, {
      _id: 0,
      title: 1,
      slug: 1,
    });
    if (!course) return errorResponse(400, "INVALID_REQUEST");

    const safeName = escapeHtml(input.name);
    const safeCourse = escapeHtml(course.title);
    const adminHtml = `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 650px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 24px;">
        <h2 style="color: #c2410c; text-align: center; margin-bottom: 10px;">New Course Pre-Registration</h2>
        <p style="text-align: center; color: #6b7280; font-size: 14px; margin-bottom: 24px;">A new student has completed the pre-registration form on <strong>Costa Spanish Academy</strong>.</p>
        <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
          <tbody>
            <tr><td style="padding: 8px; font-weight: bold;">Full Name</td><td style="padding: 8px;">${safeName}</td></tr>
            <tr style="background-color:#f9fafb;"><td style="padding: 8px; font-weight: bold;">Email</td><td style="padding: 8px;">${escapeHtml(input.email)}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Phone</td><td style="padding: 8px;">${valueOrDash(input.phone)}</td></tr>
            <tr style="background-color:#f9fafb;"><td style="padding: 8px; font-weight: bold;">Country</td><td style="padding: 8px;">${valueOrDash(input.country)}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Course</td><td style="padding: 8px;">${safeCourse}</td></tr>
            <tr style="background-color:#f9fafb;"><td style="padding: 8px; font-weight: bold;">Level</td><td style="padding: 8px;">${escapeHtml(input.level)}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Native language</td><td style="padding: 8px;">${escapeHtml(input.nativeLanguage)}</td></tr>
            <tr style="background-color:#f9fafb;"><td style="padding: 8px; font-weight: bold;">Availability</td><td style="padding: 8px;">${escapeHtml(input.availability)}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Experience</td><td style="padding: 8px;">${escapeHtml(input.experience)}</td></tr>
            <tr style="background-color:#f9fafb;"><td style="padding: 8px; font-weight: bold;">Previous courses</td><td style="padding: 8px;">${escapeHtml(input.previousCourses)}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Goals</td><td style="padding: 8px;">${escapeHtmlWithLineBreaks(input.goals)}</td></tr>
            <tr style="background-color:#f9fafb;"><td style="padding: 8px; font-weight: bold;">Notes</td><td style="padding: 8px;">${valueOrDash(input.notes)}</td></tr>
          </tbody>
        </table>
        <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="font-size: 13px; color: #6b7280;"><strong>Privacy consent:</strong> Accepted</p>
        <p style="font-size: 12px; text-align: center; color: #9ca3af; margin-top: 20px;">Email generated automatically by Costa Spanish Academy pre-registration system.</p>
      </div>
    `;

    const studentHtml = `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width:600px; margin:auto; background:#fff; border:1px solid #e5e7eb; border-radius:8px; padding:24px;">
        <h2 style="color:#c2410c;">Thank you, ${safeName}!</h2>
        <p>We’ve received your pre-registration for <strong>${safeCourse}</strong>.</p>
        <p>Our academic team will contact you within 24 hours to confirm availability, start dates, and next steps.</p>
        <p style="margin-top:16px;">If you have any questions, you can reply directly to this email.</p>
        <p style="font-size:13px;color:#6b7280;margin-top:24px;">Costa Spanish Academy · info@costaSpanishClass.com</p>
      </div>
    `;

    await Promise.all([
      resend.emails.send({
        from: "CostaSpanish Academy Preinscription <onboarding@costaspanishclass.com>",
        to: INTERNAL_MAILBOX,
        subject: `New preinscription from ${sanitizeEmailHeader(input.name)} to ${sanitizeEmailHeader(course.title)}`,
        html: adminHtml,
      }),
      resend.emails.send({
        from: "Costa Spanish Academy <info@costaSpanishClass.com>",
        to: input.email,
        subject: "We've received your preinscription!",
        html: studentHtml,
      }),
    ]);

    return successResponse();
  } catch (error) {
    if (error instanceof InvalidRequestError) {
      return errorResponse(400, "INVALID_REQUEST");
    }

    logServerError("preinscription-email-failed", error);
    return errorResponse(500, "INTERNAL_ERROR");
  }
}
