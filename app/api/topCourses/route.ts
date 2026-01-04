import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongo";
import { Course } from "@/models/Course";

export async function GET() {
  try {
    await dbConnect();
    const courses = await Course.find({
      topCourses: true,
      status: { $ne: "private" },
    })
      .sort({ updatedAt: -1 })
      .select(
        "title subTitle slug imageUrl maxPeople hoursPerWeek level modality status languageToLearn topCourses"
      )
      .lean();
    return NextResponse.json(courses);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
