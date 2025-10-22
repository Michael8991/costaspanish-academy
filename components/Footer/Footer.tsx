"use client";

import { Facebook, Instagram, Linkedin } from "lucide-react";
import styles from "./Footer.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export const Footer = () => {
  const t = useTranslations("Footer");
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);

  const locale = params?.locale as string;

  const scrollToSection = (id: string) => {
    const scrollWithOffset = (targetId: string) => {
      const el = document.getElementById(targetId);
      if (!el) return;
      const yOffset = -120;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    };

    if (!pathname.startsWith(`/${locale}`)) {
      router.push(`/${locale}`);
      setScrollTarget(id);
    } else {
      scrollWithOffset(id);
    }
  };

  return (
    <footer className="py-5 bg-[#FFCCDD]">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-1">
          {/* Logo + redes */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <div className="relative w-36 h-36">
              <Image
                src="/assets/LogoCostaSpanishRojoCoralFuerte.png"
                alt={t("alt")}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>

            <p className="text-sm font-light text-center md:text-left">
              {t("rights")}
            </p>

            <div className="flex space-x-2">
              <Instagram
                aria-label="Instagram costaSpanish"
                className={`${styles.socialMediaIcon} w-8 h-8`}
                strokeWidth={1}
              />
              <Linkedin
                aria-label="Linkedin costaSpanish"
                className={`${styles.socialMediaIcon} w-8 h-8`}
                strokeWidth={1}
              />
              <Facebook
                aria-label="Facebook costaSpanish"
                className={`${styles.socialMediaIcon} w-8 h-8`}
                strokeWidth={1}
              />
            </div>
          </div>

          {/* Navegación + crédito diseño */}
          <div className="flex flex-col justify-between items-center md:items-end space-y-4 md:space-y-2">
            <ul className="flex flex-wrap justify-center md:justify-end gap-3">
              <li>
                <button onClick={() => scrollToSection("aboutUs")} className={`${styles.navLinks} cursor-pointer`}>
                  {t("nav.about")}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("courses")} className={`${styles.navLinks} cursor-pointer`}>
                  {t("nav.courses")}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("home")} className={`${styles.navLinks} cursor-pointer`}>
                  {t("nav.home")}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("testimonials")} className={`${styles.navLinks} cursor-pointer`}>
                  {t("nav.testimonials")}
                </button>
              </li>
              <li>
                <Link href={`/${locale}/contactUs`} className={styles.navLinks}>
                  {t("nav.contact")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className={styles.navLinks}>
                  {t("nav.blog")}
                </Link>
              </li>
            </ul>

            <a href="#" className={`${styles.designLink} font-light text-center md:text-right`}>
              {t("design")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
