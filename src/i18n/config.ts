import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import es from './locales/es.json';
import km from './locales/km.json';
import fr from './locales/fr.json';

const STORAGE_KEY = 'language';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      km: { translation: km },
      fr: { translation: fr },
    },
    fallbackLng: 'en',
    // Every page starts (and hydrates) in English to match the prerendered
    // HTML; restoreSavedLanguage() switches to the visitor's choice afterwards.
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// Keep <html lang> in sync (screen readers, font fallback, search engines).
i18n.on('languageChanged', (lng) => {
  if (typeof document !== 'undefined') document.documentElement.lang = lng;
});

// localStorage can throw (privacy modes, disabled storage); treat that as
// "nothing saved" rather than breaking the page.
const readSaved = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

/** Switch language because the visitor picked one, and remember it. */
export const setLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
  try {
    window.localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    // Not persisted; the choice still applies for this visit.
  }
};

/**
 * Apply the visitor's saved language. Call from an effect (browser only,
 * after hydration). Waits for init: i18next sets `lng: 'en'` asynchronously,
 * which would otherwise override a switch made before it finishes.
 */
export const restoreSavedLanguage = () => {
  const apply = () => {
    const saved = readSaved();
    if (saved && saved !== i18n.language && i18n.hasResourceBundle(saved, 'translation')) {
      i18n.changeLanguage(saved);
    }
  };
  if (i18n.isInitialized) {
    apply();
    return () => {};
  }
  i18n.on('initialized', apply);
  return () => i18n.off('initialized', apply);
};

export default i18n;
