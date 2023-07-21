import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import {EN_TRANSLATE} from './constants/constindex'
import {VI_TRANSLATE} from './constants/constindex'

const resources = {
    en: {
        translation: EN_TRANSLATE,
    },
    vi: {
        translation: VI_TRANSLATE,
    },
};

i18next.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    }
})