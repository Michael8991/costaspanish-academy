import { Clock, UsersRound } from "lucide-react";
import styles from "./courseCard.module.css";

interface CourseCardProps {
  titleCard: string;
  maxPers: string;
  time: string;
  desc: string;
  moreInfo: string;
  typeCard: string;
  img: string;
}

export const CourseCard = ({
  titleCard,
  maxPers,
  time,
  desc,
  moreInfo,
  typeCard,
  img,
}: CourseCardProps) => {
  return (
    <div className={`${styles[typeCard]} ${styles.courseCard} my-2`}>
      <img src={img} alt="intensive group" className={`${styles.imgCard}`} />
      <p className="w-full text-center text-lg font-bold mb-1">{titleCard}</p>
      <div className="flex w-full justify-center">
        <div
          className={`${styles.courseOption} flex align-middle justify-center items-center text-sm`}
        >
          <UsersRound className="w-4 h-4 mr-1" />
          {maxPers}
        </div>
        <div
          className={`${styles.courseOption} flex align-middle justify-center items-center text-sm`}
        >
          <Clock className="w-4 h-4 mr-1" />
          {time}
        </div>
      </div>
      <p className="w-full text-center text-sm font-light mt-2">{desc}</p>
      <div className="w-full text-end">
        <a
          href={moreInfo}
          className={`${styles.links} text-sm font-extralight`}
        >
          see more...
        </a>
      </div>
    </div>
  );
};
