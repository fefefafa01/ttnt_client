import { Routes, Route } from "react-router-dom";
import MainPage from "mainClient/mainpage/MainPage";
import HomePage from "mainClient/homepage/Homepage";
import ReportPage from "mainClient/reportpage/report";
import { BlankPage } from "constants/blankpage";

const Views = () => {
    const remembered = localStorage.getItem("remembered")
    const loggedIn = localStorage.getItem("isLoggedIn");

    return (
        <div>
            <Routes>
                <Route
                    path="/"
                    element={(loggedIn === "true" && remembered==="yes") ? <HomePage /> : <MainPage input="normal"/>}
                />
                <Route
                    path="*"
                    element={(loggedIn === "true" && remembered==="yes") ? <HomePage /> : <MainPage input="normal"/>}
                />
                {/* <Route path="/homepage" element={<HomePage />} /> */}
                <Route path="/resetpwdhome" element={<MainPage input="reset"/>} />
                <Route path="/report" element={<ReportPage />} />
                <Route path="/blankpage" element={<BlankPage />} />
            </Routes>
        </div>
    );
};

export { Views };
