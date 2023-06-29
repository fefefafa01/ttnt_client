import i18next from "i18next";
// import HttpBackend from "i18next-http-backend";
// import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import {EN_TRANSLATE} from './constants/constindex'
import {VI_TRANSLATE} from './constants/constindex'

// const apiKey = "ozrkKpQl7Mw1sWa0X-4IrA";
// const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

const resources = {
    en: {
        translation: EN_TRANSLATE,
    },
    vi: {
        translation: VI_TRANSLATE,
    },
};

// i18next 
//     .use(HttpBackend)
//     .use(LanguageDetector)
//     .use(initReactI18next)
//     .init({
//         lng: 'en',
//         fallbackLng: "en",
//         ns: ["default"],
//         defaultNS: "default",
//         supportedLngs: ["en","vi"],
//         backend: {
//             loadPath: loadPath
//         }
//     })

i18next.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    }
})