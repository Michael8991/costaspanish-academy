"use client";
import { useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import styles from "./languageSwitcher.module.css";

const languages = [{ code: "es", label: "ES" }, { code: "en", label: "EN" }];

const LanguageSwitcher = () => {
  const [open, setOpen] = useState(false);
  const { locale } = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const changeLanguage = (code: string) => {
    if (code !== locale) { const segments = pathname.split("/"); segments[1] = code; router.push(segments.join("/") || "/"); }
    setOpen(false);
  };
  return <div className={styles.switcher}>
    <button type="button" onClick={() => setOpen(!open)} className={styles.trigger} aria-haspopup="menu" aria-expanded={open} aria-label="Change language"><span>{String(locale).toUpperCase()}</span><span className={styles.chevron} aria-hidden="true" /></button>
    {open && <div className={styles.menu} role="menu">{languages.map((language) => <button type="button" role="menuitem" key={language.code} onClick={() => changeLanguage(language.code)} className={locale === language.code ? styles.current : ""}>{language.label}</button>)}</div>}
  </div>;
};
export default LanguageSwitcher;
