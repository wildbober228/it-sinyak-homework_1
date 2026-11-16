import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { DEFAULT_LANGUAGE, LANGUAGE_PARAM, LANGUAGES } from "~/constants";
import enGenres from "~/locales/en/genres.json";
import enTranslation from "~/locales/en/translation.json";
import ruGenres from "~/locales/ru/genres.json";
import ruTranslation from "~/locales/ru/translation.json";
import type { Language } from "~/types";

function readUrlLanguage(): Language {
  const params = new URLSearchParams(window.location.search);
  const value = params.get(LANGUAGE_PARAM)?.toLowerCase();

  return LANGUAGES.find((language) => language === value) ?? DEFAULT_LANGUAGE;
}

function syncDocument(language: string) {
  const url = new URL(window.location.href);

  url.searchParams.set(LANGUAGE_PARAM, language);
  window.history.replaceState(window.history.state, "", url);
  document.documentElement.lang = language;
  document.title = i18n.t("app.title");
}

i18n.on("languageChanged", syncDocument);

i18n.use(initReactI18next).init({
  lng: readUrlLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: LANGUAGES,
  resources: {
    ru: { translation: ruTranslation, genres: ruGenres },
    en: { translation: enTranslation, genres: enGenres },
  },
  initAsync: false,
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
