"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useMediaQuery } from "react-responsive";

import { ContactForm } from "./ContactForm";
import styles from "./contactPage.module.css";

export default function ContactPage() {
  //Scroll navbar:
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-300px 0px -300px 0px",
  });

  const isRegularScreen = useMediaQuery({ maxWidth: 1150 });

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 1);
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`@container max-w-6xl mx-auto flex flex-col justify-center ${
        scrolled ? `${styles.headerspacerfixedbigscreen}` : ``
      }`}
      style={{
        minHeight: "calc( 100vh - 120px )",
      }}
    >
      <div
        className={`${
          scrolled ? `${styles.headerspacerfixed}` : ``
        } header-spacer`}
      ></div>
      <ContactForm />
    </div>
  );
}
