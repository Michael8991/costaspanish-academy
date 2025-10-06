"use client";

import { mockCourses } from "@/lib/mockcourses/mockCourses";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Tag, Target, UsersRound, ChevronDown } from 'lucide-react';
import Image from "next/image";

export default function Course() {
  const params = useParams();
  const slug = params.slug;

  const course = mockCourses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <div className="m-auto flex flex-col justify-center items-center max-w-7xl h-[calc(100vh-419px)]">
        <h1 className="text-2xl mb-6">Course not available</h1>
        <Link className="shadow-md hover:scale-101 transition duration-150 ease-in text-md group py-2 px-3 bg-rose-400 text-white rounded-2xl flex items-center" href="/">
          Home
          <ArrowRight size={16} className="ml-2 mr-1 group-hover:translate-x-1 transition duration-150 ease-in-out" />
        </Link>
      </div>
    );
  }

  const totalModules = course.modules.length;

  return (
    <div className="max-w-7xl m-auto min-h-[calc(100vh-419px)] @container">
      <div className="grid grid-cols-2" >
        <div className="w-full  items-center flex flex-col pt-5">
          <h1 className="text-4xl font-semibold">{course.title}</h1>
          <span className="mt-1 text-md font-light italic">{course.subTitle}</span>
          <p className="mt-3 text-center">{course.longDesc}</p>
          <div className="w-full m-auto flex flex-col mt-8">
            <h1 className="font-semibold text-lg">
              Course content
            </h1>
            {/* //Todo: Editar mock y schemas */}
            <p className="mt-1 text-sm text-gray-600">
              Total módulos: {course.modules.length} &#9679; mas estadisticas...
            </p>
            <hr className="border-1 border-gray-600 rounded-2xl w-full mx-auto my-4" />
            <div className="course-modules">
              {course.modules.map((module, i) => (
                <div key={i} className="bg-white shadow-md px-4 py-3 rounded-2xl mb-4 flex gap-1 items-center">
                  <ChevronDown />
                  <h3 className="font-semibold text-lg">{module.title}</h3>
                  <h3 className="font-light text-gray-400 text-md ml-auto">{module.type}</h3>
                  <h3 className="font-light text-gray-400 text-md ml-2">{module.duration}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-fill justify-center align-middle items-center flex flex-col mx-5 p-5 bg-white rounded-2xl shadow-md">
          <div className="relative aspect-[4/3] w-[450px]">
            <Image
              fill
              src={course.imageUrl}
              alt={course.slug}
              className="object-cover"
              quality={80}
              priority={false}
              placeholder="blur"
              blurDataURL="/blur.jpg"
            />
          </div>
          <span className="text-2xl font-bold text-gray-900">{`${course.price}`}</span>
          <Link className="py-3 px-10 bg-rose-400 text-white font-normal text-lg shadow-md rounded-2xl my-3" href="">Pre-register for the course</Link>
          <hr className="border-1 border-rose-100 rounded-2xl w-2/3 mx-auto my-4" />
          <div className="w-2/3 m-auto grid">
            <h3 className="float-start font-semibold text-lg mb-2">Course details</h3>
            <ul>
              <li className="flex gap-2 items-center my-1">
                <div className="bg-gray-400 p-1 rounded-full items-center flex justify-center">
                  <Clock size={16} color="#ffff" />
                </div>
                <span>
                  Hours per week:
                </span>
                <span>
                  {course.hoursPerWeek}
                </span>
              </li>
              <li className="flex gap-2 items-center my-1">
                <div className="bg-gray-400 p-1 rounded-full items-center flex justify-center">
                  <Calendar size={16} color="#ffff" />
                </div>
                <span>
                  Duration of course:
                </span>
                <span>
                  {course.duration}
                </span>
              </li>
              <li className="flex gap-2 items-center my-1">
                <div className="bg-gray-400 p-1 rounded-full items-center flex justify-center">
                  <UsersRound size={16} color="#ffff" />
                </div>
                <span>
                  Limit of places per group:
                </span>
                <span>
                  {course.maxPeople}
                </span>
                <span>students</span>
              </li>
              <li className="flex gap-2 items-center my-1">
                <div className="bg-gray-400 p-1 rounded-full items-center flex justify-center">
                  <Target size={16} color="#ffff" />
                </div>
                <span>
                  Course level goal:
                </span>
                <span>
                  {course.level}
                </span>
              </li>
              <li className="flex gap-2 items-center my-1">
                <div className="bg-gray-400 p-1 rounded-full items-center flex justify-center">
                  <Tag size={16} color="#ffff" />
                </div>
                <span>
                  Course modality:
                </span>
                <span>
                  {course.modality}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div >
  );
}
