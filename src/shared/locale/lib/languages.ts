const appLanguage = {
  en: "en",
  ko: "ko",
  ja: "ja",
  vi: "vi",
} as const;
export type Locale = (typeof appLanguage)[keyof typeof appLanguage];

export type LanguageConfig = {
  locales: Array<Locale>;
  fallbackLocales: Locale;
};

export const languageConfig: LanguageConfig = {
  locales: Object.values(appLanguage),
  fallbackLocales: "en",
};
