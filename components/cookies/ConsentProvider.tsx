"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  createConsentState,
  DEFAULT_CONSENT_STATE,
  readConsentClient,
  writeConsentClient,
  type ConsentPreferences,
  type ConsentState,
} from "@/lib/cookies/consent";

type ConsentContextValue = {
  consent: ConsentState;
  initialized: boolean;
  hasStoredConsent: boolean;
  preferencesOpen: boolean;
  analyticsActivated: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  updatePreferences: (preferences: ConsentPreferences) => void;
  openPreferences: () => void;
  closePreferences: () => void;
  isAnalyticsAllowed: () => boolean;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

type ConsentProviderProps = {
  children: React.ReactNode;
};

export function ConsentProvider({ children }: ConsentProviderProps) {
  const [consent, setConsent] = useState<ConsentState>(DEFAULT_CONSENT_STATE);
  const [initialized, setInitialized] = useState(false);
  const [hasStoredConsent, setHasStoredConsent] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  // Once injected, Vercel's script remains in the page. Keep its React bridge
  // mounted and let AnalyticsLoader's beforeSend gate enforce later revocation.
  const [analyticsActivated, setAnalyticsActivated] = useState(false);
  const consentRef = useRef<ConsentState>(DEFAULT_CONSENT_STATE);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readConsentClient();

      if (stored) {
        consentRef.current = stored;
        setConsent(stored);
        setHasStoredConsent(true);
        setAnalyticsActivated(stored.analytics);
        writeConsentClient(stored);
      }

      setInitialized(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const persist = useCallback((preferences: ConsentPreferences) => {
    const nextConsent = createConsentState(preferences);
    consentRef.current = nextConsent;
    writeConsentClient(nextConsent);
    setConsent(nextConsent);
    setHasStoredConsent(true);
    setPreferencesOpen(false);

    if (nextConsent.analytics) {
      setAnalyticsActivated(true);
    }
  }, []);

  const acceptAll = useCallback(() => {
    persist({ analytics: true, marketing: true });
  }, [persist]);

  const rejectAll = useCallback(() => {
    persist({ analytics: false, marketing: false });
  }, [persist]);

  const updatePreferences = useCallback((preferences: ConsentPreferences) => {
    persist(preferences);
  }, [persist]);

  const openPreferences = useCallback(() => {
    setPreferencesOpen(true);
  }, []);

  const closePreferences = useCallback(() => {
    setPreferencesOpen(false);
  }, []);

  const isAnalyticsAllowed = useCallback(() => consentRef.current.analytics, []);

  const value = useMemo<ConsentContextValue>(() => ({
    consent,
    initialized,
    hasStoredConsent,
    preferencesOpen,
    analyticsActivated,
    acceptAll,
    rejectAll,
    updatePreferences,
    openPreferences,
    closePreferences,
    isAnalyticsAllowed,
  }), [
    acceptAll,
    analyticsActivated,
    closePreferences,
    consent,
    hasStoredConsent,
    initialized,
    isAnalyticsAllowed,
    openPreferences,
    preferencesOpen,
    rejectAll,
    updatePreferences,
  ]);

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const context = useContext(ConsentContext);

  if (!context) {
    throw new Error("useConsent must be used within ConsentProvider");
  }

  return context;
}
