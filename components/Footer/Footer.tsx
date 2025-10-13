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
      setScrollTarget(id); // recordamos a qué sección queremos ir
      router.push("/"); // vamos a home
    } else {
      scrollWithOffset(id); // scroll con offset
    }
  };
  return (
    <div className="py-5" style={{ backgroundColor: "#FFCCDD" }}>
      <div className="@container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1">
          <div className="grid-rows-3">
            <div>
              <div
                style={{
                  width: 150,
                  height: 150,
                  position: "relative",
                  marginRight: "5px",
                }}
              >
                <Image
                  src={"/assets/LogoCostaSpanishRojoCoralFuerte.png"}
                  alt="Spanish Academy Logo"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            </div>
            <div className="my-2">
              <p className="text-sm font-light">
                Copyright © 2025 Costa Spanish Class.
                <br /> All rights reserved.
              </p>
            </div>
            <div className="flex">
              <Instagram
                aria-label="instagram costaSpanish"
                className={`${styles.socialMediaIcon} mx-1 w-8 h-8`}
                strokeWidth={1}
              />
              <Linkedin
                aria-label="Linkedin costaSpanish"
                className={`${styles.socialMediaIcon} mx-1 w-8 h-8`}
                strokeWidth={1}
              />
              <Facebook
                aria-label="facebook costaSpanish"
                className={`${styles.socialMediaIcon} mx-1 w-8 h-8`}
                strokeWidth={1}
              />
            </div>
          </div>
          <div className="grid-rows-3">
            <div
              className={`flex align-middle items-center justify-center row-span-2`}
            >
              <ul
                className={`${styles.navContainer} flex align-middle items-center`}
              >
                <li className="mx-2 whitespace-nowrap">
                  <button
                    onClick={() => scrollToSection("aboutUs")}
                    className={`${styles.navLinks} cursor-pointer`}
                  >
                    About us
                  </button>
                </li>
                <li className="mx-2 whitespace-nowrap">
                  <button
                    onClick={() => scrollToSection("courses")}
                    className={`${styles.navLinks}  cursor-pointer`}
                  >
                    Our courses
                  </button>
                </li>
                <li className="mx-2 whitespace-nowrap">
                  <button
                    onClick={() => scrollToSection("home")}
                    className={`${styles.navLinks}  cursor-pointer`}
                  >
                    Home
                  </button>
                </li>
                <li className="mx-2 whitespace-nowrap">
                  <button
                    onClick={() => scrollToSection("testimonials")}
                    className={`${styles.navLinks} cursor-pointer`}
                  >
                    Testimonials
                  </button>
                </li>
                <li className="mx-2 whitespace-nowrap">
                  <Link
                    className={`${styles.navLinks}`}
                    href="/contactUs"
                  >
                    Contact us
                  </Link>
                </li>
                <li className="mx-2 whitespace-nowrap">
                  <Link
                    className={`${styles.navLinks} `}
                    href="/blog"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className=" lg:flex lg:justify-end lg:h-full">
              <a
                href=""
                className={`${styles.designLink} font-light lg:mt-auto lg:mb-5`}
              >
                Design by Michael Rodriguez
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
