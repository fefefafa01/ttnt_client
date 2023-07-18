*Run and Build Source - Client*
- In terminal, **"git pull" (or "git pull origin/develop")** to get latest runable update
`( If device hasn't installed yarn yet, please do install it with "npm i --global yarn")`
- Then **"yarn install"** to get all dependencies before running
- Then **"yarn start"** to start running

*FAQs:*
- After clicking/submitting, nothing happened.
    -> Inspect the page, choose Console. Check whether server responsed or not.
        Probably the server crashed or server hasn't started yet.
        If there's no response then the code must be unfinished

- It's not showing any values.
    -> There are 2 cases: Either the connection to server is wrong or server crashed/hasn't started.
        + If the server is already started but the client gets no value, then check if **constindex.js** in constants folder with the link and port to server-side is correct. Please do the same with Server (Guide is in Server README) 

        + For the other case, either because server hasn't started or it crashed. For example, opening user profile while not logging in will cause it to crash for tempting to send null data to server. Therefore no data is queried. Simply start the server again.





```For Coding:```
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



