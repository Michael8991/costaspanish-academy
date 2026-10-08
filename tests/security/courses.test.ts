import { describe, expect, it } from "vitest";

import {
  buildPublicCourseFilter,
  isPublicCourseStatus,
  toPublicCourseDto,
} from "@/lib/courses/publicCourses";
import { PUBLIC_SPANISH_OFFERINGS } from "@/lib/courses/publicOfferings";
import { revalidate as courseCatalogRevalidate } from "@/app/[locale]/(courses)/(languages)/layout";

describe("public course policy", () => {
  it("revalidates the database-backed catalog instead of caching it indefinitely", () => {
    expect(courseCatalogRevalidate).toBe(300);
  });

  it("keeps the public private offering eligible without assigning a level", () => {
    const privateOffering = PUBLIC_SPANISH_OFFERINGS.find(
      ({ slug }) => slug === "clases-privadas-espanol",
    );

    expect(privateOffering).toMatchObject({
      presentationRole: "private",
      slug: "clases-privadas-espanol",
    });
    expect(privateOffering).not.toHaveProperty("level");
    expect(isPublicCourseStatus("inProgress")).toBe(true);
  });

  it("does not consider private courses public", () => {
    expect(isPublicCourseStatus("private")).toBe(false);
  });

  it("considers each explicitly allowed status public", () => {
    expect(isPublicCourseStatus("inProgress")).toBe(true);
    expect(isPublicCourseStatus("soon")).toBe(true);
    expect(isPublicCourseStatus("pending")).toBe(true);
  });

  it("adds the allowlist to every public database filter", () => {
    expect(buildPublicCourseFilter({ topCourses: true })).toEqual({
      $and: [
        { topCourses: true },
        { status: { $in: ["inProgress", "soon", "pending"] } },
      ],
    });
  });

  it("removes internal fields from public DTOs", () => {
    const dto = toPublicCourseDto({
      _id: "internal-id",
      __v: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
      title: "Public course",
      slug: "public-course",
      status: "soon",
      adminNotes: "not public",
    });

    expect(dto).toEqual({ title: "Public course", slug: "public-course", status: "soon" });
    expect(dto).not.toHaveProperty("_id");
    expect(dto).not.toHaveProperty("__v");
    expect(dto).not.toHaveProperty("createdAt");
    expect(dto).not.toHaveProperty("updatedAt");
    expect(dto).not.toHaveProperty("adminNotes");
  });
});
