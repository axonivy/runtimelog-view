import { deMessages, enMessages } from '@axonivy/log-view';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

export const initTranslation = () => {
  if (i18n.isInitializing || i18n.isInitialized) return;
  i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      debug: false,
      supportedLngs: ['en', 'de'],
      fallbackLng: 'en',
      ns: ['runtime-log-view'],
      defaultNS: 'runtime-log-view',
      resources: {
        en: { 'runtime-log-view': enMessages },
        de: { 'runtime-log-view': deMessages }
      },
      detection: {
        order: ['querystring']
      }
    });
};
