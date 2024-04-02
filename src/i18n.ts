import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import configEn from "./locales/en/config.json";
import desktopEn from "./locales/en/desktop.json";
import configJa from "./locales/ja/config.json";
import desktopJa from "./locales/ja/desktop.json";

export const defaultNS = "config";

export const resources = {
  ja: {
    config: configJa,
    desktop: desktopJa,
  },
  en: {
    config: configEn,
    desktop: desktopEn,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: "ja",
  ns: ["config", "desktop"],
  defaultNS,
  resources,
});

export default i18n;
