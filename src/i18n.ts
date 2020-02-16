import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './app/locales/en.json';
import translationPT from './app/locales/pt.json';

const resources = {
    en: {
        translation: translationEN
    },
    pt: {
        translation: translationPT
    }
};

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en', // use en if detected lng is not available

        // keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
