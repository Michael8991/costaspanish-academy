import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongo";
import {
  getPublicCourses,
  PUBLIC_TOP_COURSE_PROJECTION,
  toPublicCourseDto,
} from "@/lib/courses/publicCourses";

export async function GET() {
  try {
    await dbConnect();
    const courses = await getPublicCourses<Record<string, unknown>>({
      topCourses: true,
    }, {
      projection: PUBLIC_TOP_COURSE_PROJECTION,
      sort: { updatedAt: -1 },
      limit: 12,
    });
    return NextResponse.json(courses.map(toPublicCourseDto));
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
