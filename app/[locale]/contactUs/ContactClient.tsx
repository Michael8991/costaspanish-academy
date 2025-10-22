"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./contactPage.module.css";
import { ContactForm } from "./ContactForm";

export default function ContactClient() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 1);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            className={`@container max-w-6xl mx-auto ${scrolled ? styles.headerspacerfixedbigscreen : ""
                }`}
            style={{ minHeight: "calc(100vh - 120px)" }}
        >
            <div
                className={`${scrolled ? styles.headerspacerfixed : ""} header-spacer`}
            ></div>
            <ContactForm />
        </motion.div>
    );
}
