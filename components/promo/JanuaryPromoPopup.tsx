"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Clock3, Target, Sparkles, PartyPopper } from "lucide-react";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function getEndOfJanuary() {
  const now = new Date();
  return new Date(now.getFullYear(), 1, 1, 0, 0, 0); // Feb 1, 00:00
}

function getMsLeft(endDate: Date) {
  return endDate.getTime() - Date.now();
}

function GrapesRow() {
  return (
    <div className="mt-3 flex flex-wrap justify-center gap-1.5">
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="h-2.5 w-2.5 rounded-full bg-emerald-400/80 ring-1 ring-emerald-600/30"
          title={`Uva ${i + 1}`}
        />
      ))}
    </div>
  );
}

function CountdownLine({
  msLeft,
  endsInLabel,
}: {
  msLeft: number;
  endsInLabel: string;
}) {
  const totalSeconds = Math.max(0, Math.floor(msLeft / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <span>
      {endsInLabel}: {days}d {pad(hours)}h {pad(minutes)}m {pad(seconds)}s
    </span>
  );
}

const LS_MINIMIZED = "promo_newyear_minimized";
const LS_NEXT_SHOW = "promo_newyear_next_show_at"; // ms timestamp
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function shouldAutoOpenNow() {
  if (typeof window === "undefined") return false;

  const raw = localStorage.getItem(LS_NEXT_SHOW);
  if (!raw) return true; // primera visita => abrir

  const next = Number(raw);
  if (!Number.isFinite(next)) return true; // corrupto => abrir

  return Date.now() >= next;
}

function setNextAutoOpenInOneWeek() {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS_NEXT_SHOW, String(Date.now() + ONE_WEEK_MS));
}

function wasMinimized() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(LS_MINIMIZED) === "1";
}

function setMinimized(value: boolean) {
  if (typeof window === "undefined") return;
  if (value) localStorage.setItem(LS_MINIMIZED, "1");
  else localStorage.removeItem(LS_MINIMIZED);
}

export default function JanuaryPromoPopup() {
  const t = useTranslations("promoPopup");
  const locale = useLocale();

  const endDate = getEndOfJanuary();

  const [msLeft, setMsLeft] = useState<number>(() => getMsLeft(endDate));
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // contador global (para modal y pill)
  useEffect(() => {
    const id = setInterval(() => {
      setMsLeft(getMsLeft(endDate));
    }, 1000);

    return () => clearInterval(id);
  }, [endDate]);

  // auto-open solo si toca (1 vez/semana) y la promo sigue activa
  useEffect(() => {
  const left = getMsLeft(endDate);
  setMsLeft(left);

  if (left <= 0) return;

  // ✅ si el usuario lo minimizó, mostramos pill siempre
  if (wasMinimized()) {
    setIsOpen(false);
    setIsMinimized(true);
    return;
  }

  // ✅ si toca auto-open (1 vez/semana), abrimos modal
  if (shouldAutoOpenNow()) {
    setIsOpen(true);
    setIsMinimized(false);
    setNextAutoOpenInOneWeek();
  }
}, []);

  // si termina la promo, ocultar todo
  useEffect(() => {
    if (msLeft <= 0) {
      setIsOpen(false);
        setIsMinimized(false);
        setMinimized(false);          
    localStorage.removeItem(LS_NEXT_SHOW); 
    }
  }, [msLeft]);

  function closeToPill() {
      // cuando el usuario cierra, NO reabrimos automáticamente hasta dentro de 1 semana
    setNextAutoOpenInOneWeek();
    setMinimized(true);  
    setIsOpen(false);
    setIsMinimized(true);
  }

  function openFromPill() {
    setMinimized(false);
    setIsOpen(true);
    setIsMinimized(false);
  }

  if (msLeft <= 0) return null;

  return (
    <>
      {isMinimized && !isOpen && (
        <button
          type="button"
          onClick={openFromPill}
          className="fixed bottom-5 right-5 z-59 rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-xl hover:shadow-2xl active:scale-[0.99] hover:cursor-pointer"
          aria-label={t("openPromo")}
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-rose-500 text-white">
              <PartyPopper size={18} />
            </span>

            <div className="text-left">
              <p className="text-xs font-semibold text-rose-600">
                {t("badge")}
              </p>
              <p className="text-xs text-neutral-700">
                <CountdownLine msLeft={msLeft} endsInLabel={t("endsIn")} />
              </p>
            </div>
          </div>
        </button>
      )}

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center px-4">
          {/* overlay */}
          <button
            aria-label={t("close")}
            onClick={closeToPill}
            className="absolute inset-0 bg-black/45"
          />

          {/* modal */}
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl">
            {/* header deco */}
            <div className="relative bg-linear-to-r from-rose-600 to-orange-400 p-5 text-white">
              <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-white/15 blur-xl" />
              <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-white/10 blur-2xl" />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                    <PartyPopper size={14} />
                    {t("badge")}
                  </div>

                  <h3 className="mt-2 text-xl font-semibold leading-tight">
                    {t("title")}
                  </h3>

                  <p className="mt-1 text-sm text-white/90">{t("subtitle")}</p>

                  <GrapesRow />

                  <div className="mt-3 flex items-center justify-center gap-3 text-xs text-white/90">
                    <span className="inline-flex items-center gap-1">
                      🥂 {t("chips.champagne")}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      🍇 {t("chips.grapes")}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      ⏰ {t("chips.clock")}
                    </span>
                  </div>
                </div>

                
              </div>
            </div>

            <div className="p-5">
              {/* countdown */}
              <div className="rounded-xl border border-rose-100 bg-rose-50 p-3 text-center">
                <p className="text-xs text-rose-700 inline-flex items-center justify-center gap-2">
                  <Clock3 size={14} />
                  {t("available")}
                </p>
                <p className="mt-1 text-sm font-semibold text-rose-800">
                  <CountdownLine msLeft={msLeft} endsInLabel={t("endsIn")} />
                </p>
              </div>

              {/* goals */}
              <div className="mt-4 rounded-xl border border-neutral-200 bg-white p-4">
                <p className="text-sm font-semibold text-neutral-900 inline-flex items-center gap-2">
                  <Target size={16} className="text-rose-500" />
                  {t("goals.title")}
                </p>

                <ul className="mt-2 space-y-2 text-sm text-neutral-700">
                  <li className="flex gap-2">
                    <Sparkles size={16} className="mt-0.5 text-rose-500" />
                    <span>{t("goals.g1")}</span>
                  </li>
                  <li className="flex gap-2">
                    <Sparkles size={16} className="mt-0.5 text-rose-500" />
                    <span>{t("goals.g2")}</span>
                  </li>
                  <li className="flex gap-2">
                    <Sparkles size={16} className="mt-0.5 text-rose-500" />
                    <span>{t("goals.g3")}</span>
                  </li>
                </ul>
              </div>

              {/* actions */}
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <Link
                  href={`/${locale}/spanish`}
                  className="inline-flex w-full items-center justify-center rounded-md bg-rose-500 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-600"
                  onClick={closeToPill}
                >
                  {t("cta")}
                </Link>

                <button
                  onClick={closeToPill}
                  className="inline-flex w-full items-center justify-center rounded-md border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 hover:cursor-pointer"
                >
                  {t("dismiss")}
                </button>
              </div>

              <p className="mt-3 text-xs text-neutral-400">{t("note")}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
