import {
  AboutUsSection,
  CoursesSection,
  HeroSection,
  TestimonialsSection,
} from "./sections";
// import styles from "./LandingPage.module.css";

export default function Home() {
  return (
    <section>
      <HeroSection />
      <AboutUsSection />
      {/* <div className={`${styles.gradientBordeSection}`}></div> */}
      <CoursesSection />
      {/* <div className={`${styles.gradientBordeSectionPink}`}></div> */}
      <TestimonialsSection />
    </section>
  );
}
