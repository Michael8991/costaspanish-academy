import type { FilterQuery } from "mongoose";

import { Course, type ICourse } from "@/models/Course";
import type { CourseStatus, ICourseData } from "@/types/courses";

export const PUBLIC_COURSE_STATUSES = ["inProgress", "soon", "pending"] as const;

export const PUBLIC_COURSE_DETAIL_PROJECTION = {
  _id: 0,
  languageToLearn: 1,
  topCourses: 1,
  title: 1,
  subTitle: 1,
  price: 1,
  hoursPerWeek: 1,
  longDesc: 1,
  maxPeople: 1,
  duration: 1,
  format: 1,
  level: 1,
  requirements: 1,
  learningObjetives: 1,
  modules: 1,
  technicalRequirements: 1,
  modality: 1,
  startDate: 1,
  access: 1,
  support: 1,
  gains: 1,
  certificate: 1,
  imageUrl: 1,
  status: 1,
  slug: 1,
} as const;

export const PUBLIC_COURSE_CARD_PROJECTION = {
  _id: 0,
  slug: 1,
  title: 1,
  longDesc: 1,
  imageUrl: 1,
  level: 1,
  format: 1,
  modality: 1,
  status: 1,
  languageToLearn: 1,
} as const;

export const PUBLIC_TOP_COURSE_PROJECTION = {
  _id: 0,
  title: 1,
  subTitle: 1,
  slug: 1,
  imageUrl: 1,
  maxPeople: 1,
  hoursPerWeek: 1,
  level: 1,
  modality: 1,
  status: 1,
  languageToLearn: 1,
  topCourses: 1,
} as const;

type Projection = Record<string, 0 | 1>;
type Sort = Record<string, 1 | -1>;

export function isPublicCourseStatus(status: CourseStatus | undefined): boolean {
  return status !== undefined && PUBLIC_COURSE_STATUSES.includes(
    status as (typeof PUBLIC_COURSE_STATUSES)[number],
  );
}

export function buildPublicCourseFilter(
  filter: FilterQuery<ICourse> = {},
): FilterQuery<ICourse> {
  return {
    $and: [
      filter,
      { status: { $in: [...PUBLIC_COURSE_STATUSES] } },
    ],
  };
}

export async function getPublicCourseBySlug<T = ICourseData>(
  slug: string,
  projection: Projection = PUBLIC_COURSE_DETAIL_PROJECTION,
): Promise<T | null> {
  return Course.findOne(buildPublicCourseFilter({ slug }))
    .select(projection)
    .lean<T>()
    .exec();
}

export async function getPublicCourses<T = ICourseData>(
  filter: FilterQuery<ICourse> = {},
  options: { projection?: Projection; sort?: Sort; limit?: number } = {},
): Promise<T[]> {
  const query = Course.find(buildPublicCourseFilter(filter)).select(
    options.projection ?? PUBLIC_COURSE_DETAIL_PROJECTION,
  );

  if (options.sort) query.sort(options.sort);
  if (options.limit) query.limit(options.limit);

  return query.lean<T[]>().exec();
}

export function toPublicCourseDto(course: Record<string, unknown>) {
  const allowedFields = Object.entries(PUBLIC_COURSE_DETAIL_PROJECTION)
    .filter(([, included]) => included === 1)
    .map(([field]) => field);

  return Object.fromEntries(
    allowedFields
      .filter((field) => course[field] !== undefined)
      .map((field) => [field, course[field]]),
  );
}
