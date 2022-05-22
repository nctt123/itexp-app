import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import vi from './localizations/vi.json';
import en from './localizations/en.json';
/**
 * Config i18n for app
 */
i18n.use(initReactI18next).init({
  resources: {
    en,
    vi,
  },
  lng: 'vi',
  ns: ['translation', 'common', 'auth', 'home'],
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  keySeparator: false,
});

export default i18n;
