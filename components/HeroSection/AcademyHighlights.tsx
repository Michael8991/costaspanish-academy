import styles from "./academyHighlights.module.css";
import { motion } from "framer-motion";
import Image from "next/image";
export const AcademyHighlights = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
      className={`${styles.highLightsContainer} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 align-middle z-2 px-9 py-4 max-w-6xl xl:mx-auto mx-3`}
    >
      <div className={`flex flex-col justify-center`}>
        <p className="font-extrabold text-4xl mb-2">Why choose us?</p>
        <p className="italic font-light m-0">
          The difference is in the details, and how much we care.
        </p>
      </div>
      <div className={`flex flex-col items-center justify-center`}>
        <h5 className={`flex text-center items-center font-normal`}>
          <div
            style={{
              width: 50,
              height: 50,
              position: "relative",
              marginRight: "5px",
            }}
          >
            <Image
              src={"/assets/CheckIcon.png"}
              alt="qualified icon"
              fill
              style={{ objectFit: "contain", marginRight: "5px" }}
            />
          </div>
          Native & Qualified
        </h5>
        <p className={`text-center font-normal text-base`}>
          Learn with experienced native speakers who make learning fun and real.
        </p>
      </div>
      <div className={`flex flex-col items-center justify-center`}>
        <h5 className={`flex text-center items-center font-normal`}>
          <div
            style={{
              width: 50,
              height: 50,
              position: "relative",
              marginRight: "5px",
            }}
          >
            <Image
              src={"/assets/BooksIcon.png"}
              alt="qualified icon"
              fill
              style={{ objectFit: "contain", marginRight: "5px" }}
            />
          </div>
          Proven Methodology
        </h5>
        <p className={`text-center font-normal text-base`}>
          A mix of immersion, repetition, and real conversation.
        </p>
      </div>
      <div className={`flex flex-col items-center justify-center`}>
        <h5 className={`flex text-center items-center font-normal`}>
          <div
            style={{
              width: 50,
              height: 50,
              position: "relative",
              marginRight: "5px",
            }}
          >
            <Image
              src={"/assets/WeCareIcon.png"}
              alt="qualified icon"
              fill
              style={{ objectFit: "contain", marginRight: "5px" }}
            />
          </div>
          We Care
        </h5>
        <p className={`text-center font-normal text-base`}>
          You are not just another student. We guide and support you personally.
        </p>
      </div>
    </motion.div>
  );
};
