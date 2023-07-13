*#Main Coding in "./src/components"*

*#Main Pages for 3 Epics:*
Login Page (Epic 4): mainClient/mainpage
Main Searching Page (Epic 2): mainClient/homepage
Report Page (Epic 1): mainClient/reportpage

*#Components are in ./components, ./compstyles are for specific component styles*
- Language Components: Multi_Lang, LanguageChange, ./translation, i18n
- Mainpage Components: Login, Register, ResetPwd
- Homepage Components: SearchList, Header, PartGroup, SearchCriteria, DownloadFile, Profile, SpecPDF, ./PartList
- Reportpage Components: ProductOverview,  ProductPeriod, Epic1Filter
**All MUST include LanguageChange as ['import { Changer } from 'path/Languagechange'] to translate or ['import { useTranslation } from 'react-i18next' then const t = useTranslation()]**

- Empty/Half pre-coded files are just templates, they HAVE NOT been called respectedly yet, neither are they correctly importing/functioning files

- Installations Requires:
npm install or yarn install

*#URL : 192.168.11.212:3005*
- (LE TRAN KHANH)



