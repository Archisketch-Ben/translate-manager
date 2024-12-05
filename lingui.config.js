/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: ["en", "ko", "ja", "vi"],
  fallbackLocales: {
    default: "en",
  },
  catalogs: [
    {
      path: "<rootDir>/src/shared/locale/locales/{locale}/messages",
      include: ["<rootDir>/**/*.tsx"],
      exclude: ["**/node_modules/**"],
    },
  ],
  format: "po",
};
