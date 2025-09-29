import dbConnect from "@/lib/mongo";
import { Course } from "@/models/Course";
// import { NextResponse } from "next/server";


export async function GET() {
    await dbConnect();

    const courses = await Course.find({}).lean();
    return new Response(JSON.stringify(courses), {
        headers: { "Content-Type": "application/json" },
    });
}