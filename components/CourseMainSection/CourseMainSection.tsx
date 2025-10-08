import { ICourseData } from "@/lib/mockcourses/CourseMock"
import { Award, Calendar, CheckCircle, Circle, Clock, Tag, Target, UsersRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";

type CourseProps = {
    course: ICourseData;
}

export default function CourseMainSection({ course }: CourseProps) {


    const statusStyles: Record<string, string> = {
        inProgress:
            "bg-green-100 shadow-lg shadow-green-500/25 text-green-800 rounded-full px-2 py-1",
        soon: "bg-yellow-100 shadow-lg shadow-yellow-500/25 text-yellow-800 rounded-lg px-2 py-1",
        pending:
            "bg-blue-100 shadow-lg shadow-blue-500/25 text-blue-800 rounded-tr-lg rounded-bl-lg px-2 py-1",
    };

    const statusIcons: Record<string, JSX.Element> = {
        inProgress: <Circle size={12} className="text-green-500 mr-1" />,
        soon: <Clock size={12} className="text-yellow-500 mr-1" />,
        pending: <CheckCircle size={12} className="text-blue-500 mr-1" />,
    };

    const statusLabel: Record<string, string> = {
        inProgress: "In progress",
        soon: "Coming soon",
        pending: "Open registrations",
    };


    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:mx-3 xl:mx-0">
                {/* Columna izquierda */}
                <div className="flex flex-col pt-5 px-4 md:px-0 items-center md:items-start text-center md:text-left">
                    <div className="flex flex-col md:flex-row gap-2 md:items-center mx-auto">
                        <h1 className="text-3xl md:text-4xl font-semibold text-center">{course.title}</h1>
                    </div>
                    <div className="w-fit mx-auto my-3">
                        {course.status && (
                            <span className={`h-fit flex items-center text-xs font-semibold ${statusStyles[course.status]}`}>
                                {statusIcons[course.status]}
                                {statusLabel[course.status]}
                            </span>
                        )}
                    </div>
                    <span className="mt-1 text-md font-light mx-auto">{course.subTitle}</span>
                    <p className="mt-3 text-center">{course.longDesc}</p>

                </div>
                {/* Columna derecha */}
                <div className="flex flex-col items-center bg-white rounded-2xl shadow-md p-5 sm:p-6 mx-4 sm:mx-6 lg:mx-0">
                    <div className="relative w-full max-w-[450px] aspect-[4/3] mx-auto">
                        <Image
                            fill
                            src={course.imageUrl}
                            alt={course.slug}
                            className="object-cover rounded-xl"
                            quality={80}
                            placeholder="blur"
                            blurDataURL="/blur.jpg"
                        />
                    </div>


                    <span className="text-2xl font-bold text-gray-900 mt-4">{course.price}</span>
                    <Link
                        className="py-3 px-10 bg-rose-400 text-white font-normal text-lg shadow-md rounded-md my-3 hover:scale-105 transition-transform"
                        href=""
                    >
                        Pre-register for the course
                    </Link>

                    <hr className="border-rose-100 rounded-2xl w-4/5 mx-auto my-4" />

                    <div className="w-full px-2 sm:px-4">
                        <h3 className="text-lg mb-4 font-semibold">Course details</h3>
                        <ul className="flex flex-col gap-1">
                            {[
                                { icon: <Clock size={18} className="text-rose-400" />, label: "Hours per week", value: course.hoursPerWeek },
                                { icon: <Calendar size={18} className="text-rose-400" />, label: "Duration of course", value: course.duration },
                                { icon: <UsersRound size={18} className="text-rose-400" />, label: "Limit of places per group", value: `${course.maxPeople} students` },
                                { icon: <Target size={18} className="text-rose-400" />, label: "Course level goal", value: course.level },
                                { icon: <Tag size={18} className="text-rose-400" />, label: "Course modality", value: course.modality },
                            ].map((item, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-center gap-3 p-2 "
                                >
                                    <div className="bg-rose-100 p-2 rounded-full flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <span className="text-gray-700 font-medium">
                                        {item.label}: <span className="text-gray-900 font-semibold">{item.value}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>

    )

}