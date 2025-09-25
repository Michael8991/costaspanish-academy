import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, topic, textMessage } = body;

        const data = await resend.emails.send({
            from: "CostaSpanish Academy WebForm <onboarding@costaspanishclass.com>",
            to: "info@costaSpanishClass.com",
            subject: `Nuevo mensaje de ${firstName} ${lastName}`,
            text: `De: ${email}: ${topic}\n\n${textMessage}`,
        });

        return NextResponse.json({ success: true, data });

    } catch (error) {
        return NextResponse.json({ success: false, error: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
}