import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {

    try {
        const body = await req.json();
        const { name, email, phone, country, course, level, goals, notes, privacy } = body;

        const safe = (v?: string) => v?.trim() || "—";

        const adminHtml = `
  <div style="font-family: Arial, Helvetica, sans-serif; max-width: 650px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 24px;">
    <h2 style="color: #c2410c; text-align: center; margin-bottom: 10px;">New Course Pre-Registration</h2>
    <p style="text-align: center; color: #6b7280; font-size: 14px; margin-bottom: 24px;">
      A new student has completed the pre-registration form on <strong>Costa Spanish Academy</strong>.
    </p>

    <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
      <tbody>
        <tr><td style="padding: 8px; font-weight: bold;">Full Name</td><td style="padding: 8px;">${safe(name)}</td></tr>
        <tr style="background-color:#f9fafb;"><td style="padding: 8px; font-weight: bold;">Email</td><td style="padding: 8px;">${safe(email)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Phone</td><td style="padding: 8px;">${safe(phone)}</td></tr>
        <tr style="background-color:#f9fafb;"><td style="padding: 8px; font-weight: bold;">Country</td><td style="padding: 8px;">${safe(country)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Course</td><td style="padding: 8px;">${safe(course)}</td></tr>
        <tr style="background-color:#f9fafb;"><td style="padding: 8px; font-weight: bold;">Level</td><td style="padding: 8px;">${safe(level)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Goals</td><td style="padding: 8px;">${safe(goals)}</td></tr>
        <tr style="background-color:#f9fafb;"><td style="padding: 8px; font-weight: bold;">Notes</td><td style="padding: 8px;">${safe(notes)}</td></tr>
      </tbody>
    </table>

    <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">

    <p style="font-size: 13px; color: #6b7280;">
      <strong>Privacy consent:</strong> ${privacy ? "✔️ Accepted" : "❌ Not accepted"}
    </p>
    <p style="font-size: 13px; color: #6b7280;">
      <strong>Submitted on:</strong> ${new Date().toLocaleString("es-ES", { dateStyle: "medium", timeStyle: "short" })}
    </p>

    <p style="font-size: 12px; text-align: center; color: #9ca3af; margin-top: 20px;">
      Email generated automatically by Costa Spanish Academy pre-registration system.
    </p>
  </div>
`;

        const studentHtml = `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width:600px; margin:auto; background:#fff; border:1px solid #e5e7eb; border-radius:8px; padding:24px;">
        <h2 style="color:#c2410c;">Thank you, ${name}!</h2>
        <p>We’ve received your pre-registration for <strong>${course}</strong>.</p>
        <p>Our academic team will contact you within 24 hours to confirm availability, start dates, and next steps.</p>
        <p style="margin-top:16px;">If you have any questions, you can reply directly to this email.</p>
        <p style="font-size:13px;color:#6b7280;margin-top:24px;">
          Costa Spanish Academy · info@costaspanishclass.com
        </p>
      </div>
    `;
        await Promise.all([
            await resend.emails.send({
                from: "CostaSpanish Academy Preinscription <onboarding@costaspanishclass.com>",
                to: "info@costaspanishclass.com",
                subject: `New preinscription from ${name} to ${course}`,
                html: adminHtml,
            }),

            await resend.emails.send({
                from: "Costa Spanish Academy <info@costaspanishclass.com>",
                to: email,
                subject: "We've received your preinscription!",
                html: studentHtml,
            }),
        ]);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: error instanceof Error ? error.message : String(error) }, { status: 500 })
    }
};