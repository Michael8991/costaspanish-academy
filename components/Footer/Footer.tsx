"use client"
import { Facebook, Instagram, Linkedin } from "lucide-react";
import styles from "./Footer.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export const Footer = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [scrollTarget, setScrollTarget] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    const scrollWithOffset = (targetId: string) => {
      const el = document.getElementById(targetId);
      if (!el) return;
      const yOffset = -120; // altura de tu header fijo
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    };

    if (pathname !== "/") {
      setScrollTarget(id);
      router.push("/");
    } else {
      scrollWithOffset(id);
    }
  };

  return (
    <div className="py-5 bg-[#FFCCDD]">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-1">
          {/* Logo y Redes */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <div className="relative w-36 h-36">
              <Image
                src="/assets/LogoCostaSpanishRojoCoralFuerte.png"
                alt="Spanish Academy Logo"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>

            <p className="text-sm font-light text-center md:text-left">
              © 2025 Costa Spanish Class. <br /> All rights reserved.
            </p>

            <div className="flex space-x-2">
              <Instagram
                aria-label="instagram costaSpanish"
                className={`${styles.socialMediaIcon} w-8 h-8`}
                strokeWidth={1}
              />
              <Linkedin
                aria-label="Linkedin costaSpanish"
                className={`${styles.socialMediaIcon} w-8 h-8`}
                strokeWidth={1}
              />
              <Facebook
                aria-label="facebook costaSpanish"
                className={`${styles.socialMediaIcon} w-8 h-8`}
                strokeWidth={1}
              />
            </div>
          </div>

          {/* Navegación y diseño */}
          <div className="flex flex-col justify-between items-center md:items-end space-y-4 md:space-y-2">
            <ul className="flex flex-wrap justify-center md:justify-end gap-3">
              <li>
                <button
                  onClick={() => scrollToSection("aboutUs")}
                  className={`${styles.navLinks} cursor-pointer`}
                >
                  About us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("courses")}
                  className={`${styles.navLinks} cursor-pointer`}
                >
                  Our courses
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className={`${styles.navLinks} cursor-pointer`}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className={`${styles.navLinks} cursor-pointer`}
                >
                  Testimonials
                </button>
              </li>
              <li>
                <Link className={`${styles.navLinks}`} href="/contactUs">
                  Contact us
                </Link>
              </li>
              <li>
                <Link className={`${styles.navLinks}`} href="/blog">
                  Blog
                </Link>
              </li>
            </ul>

            <a
              href="#"
              className={`${styles.designLink} font-light text-center md:text-right`}
            >
              Design by Michael Rodriguez
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
