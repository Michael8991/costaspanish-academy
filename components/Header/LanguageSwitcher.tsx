import { useState } from "react";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const languages = [
    { code: "es", label: "ES" },
    { code: "en", label: "EN" },
    { code: "fr", label: "FR" },
    { code: "de", label: "DE" },
  ];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };
  console.log("Render LanguageSwitcher, open:", open);
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className={`flex items-center`}>
        <span className="font-medium" style={{ color: "#FB6F92" }}>
          {i18n.language.toUpperCase()}
        </span>
        <Globe className="ms-1" color="#FB6F92" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-24 rounded-xl bg-white shadow-md border border-gray-200 z-10">
          {languages.map((lng) => (
            <button
              key={lng.code}
              onClick={() => changeLanguage(lng.code)}
              className="w-full text-left px-3 py-2 text-sm font-medium hover:bg-pink-50 transition"
              style={{
                color: i18n.language === lng.code ? "#FB6F92" : "#444",
              }}
            >
              {lng.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
