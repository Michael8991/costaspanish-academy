"use client";

import { mockCourses } from "@/lib/mockcourses/mockCourses";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function Course() {
  const params = useParams();
  const slug = params.slug;

  const course = mockCourses.find((c) => c._id === slug);

  if (!course) {
    return (
      <div>
        Curso no disponible
        <Link href="/"></Link>
      </div>
    );
  }

  return (
    <section>
      <h1>Hola!</h1>
    </section>
  );
}
