import { CourseCard } from "@/components";
import { mockCourses } from '@/lib/mockcourses/mockCourses';
import { ChevronDown } from "lucide-react";
import Link from "next/link";


export const CoursesSection = () => {

  const spanishCourses = mockCourses.filter(course => course.topCourses && course.languageToLearn === 'Spanish')
  const englishCourses = mockCourses.filter(course => course.topCourses && course.languageToLearn === 'English')

  return (
    <section id="courses" style={{ background: "white" }}>
      <div className="@container py-5 max-w-7xl mx-auto">
        <p className="text-4xl font-extrabold mb-0">Classes</p>
        <p className="text-lg font-light">Spanish for foreign (ELE)</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5">
          {spanishCourses.map(course => (
            <div key={course._id} className="flex justify-center">
              <CourseCard
                typeCard={course.modality === 'Clases Privadas' ? 'secondType' : 'firstType'}
                titleCard={course.title}
                maxPers={course.maxPeople + ' max.'}
                time={course.hoursPerWeek}
                desc={course.longDesc}
                img={course.imageUrl || '/assets/intensiveGroup.png'}
                moreInfo=""
              />
            </div>
          ))}
        </div>
        <div className="max-w-7xl flex align-middle justify-center mb-2">
          <Link href="/spanish" className="flex rounded-lg hover:bg-rose-400 py-2 px-3 hover:scale-105 transition-all duration-100 hover:shadow-xl  focus:outline-none hover:text-white">
            <ChevronDown size={24} className="mr-1" />
            See all courses of Spanish
          </Link>
        </div>
        <p className="text-lg font-light">English for Spanish</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5">
          {englishCourses.map(course => (
            <div key={course._id} className="flex justify-center">
              <CourseCard
                typeCard={course.modality === 'Clases Privadas' ? 'secondType' : 'firstType'}
                titleCard={course.title}
                maxPers={course.maxPeople + ' max.'}
                time={course.hoursPerWeek}
                desc={course.longDesc}
                img={course.imageUrl || '/assets/intensiveGroup.png'}
                moreInfo=""
              />
            </div>
          ))}
        </div>
        <div className="max-w-7xl flex align-middle justify-center mb-2">
          <Link href="/english" className="flex rounded-lg hover:bg-rose-400 py-2 px-3 hover:scale-105 transition-all duration-100 hover:shadow-xl focus:outline-none hover:text-white">
            <ChevronDown size={24} className="mr-1" />
            See all courses of English
          </Link>
        </div>
      </div>
    </section>
  );
};
