'use client';

import { useState } from 'react';
import { Globe } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const LanguageSwitcher = () => {
  const [open, setOpen] = useState(false);
  const { locale } = useParams(); // idioma actual
  const pathname = usePathname();
  const router = useRouter();

  const languages = [
    { code: 'es', label: 'ES' },
    { code: 'en', label: 'EN' },
    // { code: 'fr', label: 'FR' },
    // { code: 'de', label: 'DE' },
  ];

  // Cambia el idioma manteniendo la ruta actual
  const changeLanguage = (code: string) => {
    if (code === locale) {
      setOpen(false);
      return;
    }
    const segments = pathname.split('/');
    segments[1] = code; // reemplaza el primer segmento del locale
    const newPath = segments.join('/') || '/';
    router.push(newPath);
    setOpen(false);
  };

  return (
    <div className="relative me-10" >
      <button onClick={() => setOpen(!open)} className="flex items-center cursor-pointer">
        <span className="font-medium" style={{ color: '#FB6F92' }}>
          {String(locale).toUpperCase()}
        </span>
        <Globe className="ms-1" color="#FB6F92" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-24 rounded-xl bg-white shadow-md border border-gray-200 z-10">
          {languages.map((lng) => (
            <button
              key={lng.code}
              onClick={() => changeLanguage(lng.code)}
              className="cursor-pointer w-full text-left px-3 py-2 text-sm font-medium hover:bg-pink-50 transition rounded-xl"
              style={{
                color: locale === lng.code ? '#FB6F92' : '#444',
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
