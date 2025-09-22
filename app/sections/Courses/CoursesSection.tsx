import { CourseCard } from "@/components";

// type CardProps = {
//   titleCard: string;
//   maxPers: string;
//   time: string;
//   desc: string;
//   moreInfo: string; // ruta a la página de info
//   typeCard: string;
//   img: string;
// };
// export const CoursesSection = (props: CardProps) => {
export const CoursesSection = () => {
  //   const { titleCard, maxPers, time, desc, moreInfo, typeCard, img } = props;
  return (
    <div id="courses" style={{ background: "white" }}>
      <div className="@container py-5 max-w-7xl mx-auto">
        <p className="text-4xl font-extrabold mb-0">Classes</p>
        <p className="text-lg font-light">Spanish for foreign (ELE)</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5">
          <div className="flex justify-center">
            <CourseCard
              typeCard="firstType"
              titleCard="Intensive Course"
              maxPers="8 pers. max."
              time="8h/week"
              desc="Lorem Ipsuns simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
              img={"/assets/intensiveGroup.png"}
              moreInfo=""
            />
          </div>
          <div className="flex justify-center">
            <CourseCard
              typeCard="secondType"
              titleCard="One to One"
              maxPers="1 per. (3 max.)"
              time="1h"
              desc="Lorem Ipsuns simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
              img={"/assets/onetoone.png"}
              moreInfo=""
            />
          </div>
          <div className="flex justify-center">
            <CourseCard
              typeCard="firstType"
              titleCard="Semi-intensive Course"
              maxPers="8 pers. max."
              time="4.5h/week"
              desc="Lorem Ipsuns simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
              img={"/assets/intensiveGroup.png"}
              moreInfo=""
            />
          </div>
        </div>
        <p className="text-lg font-light">English for Spanish</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex justify-center">
            <CourseCard
              typeCard="firstType"
              titleCard="Intensive Course"
              maxPers="8 pers. max."
              time="8h/week"
              desc="Lorem Ipsuns simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
              img={"/assets/intensiveGroup.png"}
              moreInfo=""
            />
          </div>
          <div className="flex justify-center">
            <CourseCard
              typeCard="secondType"
              titleCard="One to One"
              maxPers="1 per. (3 max.)"
              time="1h"
              desc="Lorem Ipsuns simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
              img={"/assets/onetoone.png"}
              moreInfo=""
            />
          </div>
          <div className="flex justify-center">
            <CourseCard
              typeCard="firstType"
              titleCard="Semi-intensive Course"
              maxPers="8 pers. max."
              time="4.5h/week"
              desc="Lorem Ipsuns simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
              img={"/assets/intensiveGroup.png"}
              moreInfo=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};
