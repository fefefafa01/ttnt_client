*#Main Coding in "./src"*

*#Main Pages for 3 Epics:*
Login Page: mainClient/mainpage
Main Searching Page (Epic 2): mainClient/homepage
Report Page (Epic 1): mainClient/reportpage

*#Components are in ./components, ./compstyles are for specific component styles*
- Mainpage's Components: Validation, MainInput
- Homepage's Components: Epic2Filter, Header, PartGroup, SearchCriteria, DownloadFile, Profile
- Reportpage's Components: ProductOverview,  ProductPeriod, Epic1Filter
**All MUST include LanguageChange to translate, LanguageOption is for Language Selection**

- Empty/Half pre-coded files are just templates, they HAVE NOT been called into App.js yet, neither are they correctly importing/functioning files

- Installations Requires:
npm i react create-react-app (ReactJS)
npm bootstrap (Bootstrap)
npm i i18next i18next-http-backend (i18next - Translation)
npm i i18next-browser-languagedetector react-i18next (i18next - Processing + ReactJS API)
npm i react-router-dom (Routing and Linking in ReactJS)
npm i @mui/material @emotion/react @emotion/styled

*#URL : 192.168.11.143:3005*
- (LE TRAN KHANH)



