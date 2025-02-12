import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3', // <--- add this line
  resources: {
    en: {
      translation: require("./en.json"),
    },
    kn: {
      translation: require("./ar.json"),
    },
  },
  lng: "en", // initial language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
