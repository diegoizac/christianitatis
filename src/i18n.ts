import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Traduções de exemplo
const resources = {
  en: {
    translation: {
      welcome: "Welcome to Christianitatis",
      events: "Events",
      support: "Support the Movement",
      contact: "Contact",
      login: "Login",
      language: "Language",
    },
  },
  pt: {
    translation: {
      welcome: "Bem-vindo ao Christianitatis",
      events: "Eventos",
      support: "Apoie o Movimento",
      contact: "Contato",
      login: "Login",
      language: "Idioma",
    },
  },
};

i18n
  .use(initReactI18next) // Passar i18n para react-i18next.
  .init({
    resources,
    lng: "pt", // Idioma padrão
    interpolation: {
      escapeValue: false, // React já faz a proteção contra XSS
    },
  });

export default i18n;
