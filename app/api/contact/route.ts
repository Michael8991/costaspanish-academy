import { Resend } from "resend";

import {
  errorResponse,
  getClientIp,
  InvalidRequestError,
  logServerError,
  readJsonBody,
  successResponse,
} from "@/lib/security/http";
import { sanitizeEmailHeader } from "@/lib/security/html";
import { verifyTurnstile } from "@/lib/security/turnstile";
import { contactSchema } from "@/lib/security/validation";

const INTERNAL_MAILBOX = "info@costaSpanishClass.com";

export async function POST(req: Request) {
  try {
    const body = await readJsonBody(req);
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) return errorResponse(400, "INVALID_REQUEST");

    const { firstName, lastName, email, topic, textMessage, turnstileToken } = parsed.data;
    const captchaIsValid = await verifyTurnstile(turnstileToken, getClientIp(req));
    if (!captchaIsValid) return errorResponse(400, "INVALID_REQUEST");

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "CostaSpanish Academy WebForm <onboarding@costaspanishclass.com>",
      to: INTERNAL_MAILBOX,
      subject: `Nuevo mensaje de ${sanitizeEmailHeader(firstName)} ${sanitizeEmailHeader(lastName)}`,
      text: [
        `De: ${firstName} ${lastName}`,
        `Email: ${email}`,
        `Tema: ${topic}`,
        "",
        textMessage,
      ].join("\n"),
    });

    return successResponse();
  } catch (error) {
    if (error instanceof InvalidRequestError) {
      return errorResponse(400, "INVALID_REQUEST");
    }

    logServerError("contact-email-failed", error);
    return errorResponse(500, "INTERNAL_ERROR");
  }
}
