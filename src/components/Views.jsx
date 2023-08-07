import { Routes, Route } from "react-router-dom";
import MainPage from "mainClient/mainpage/MainPage";
import HomePage from "mainClient/homepage/Homepage";
import ReportPage from "mainClient/reportpage/report";
import { BlankPage } from "constants/blankpage";

const Views = () => {
    const remembered = localStorage.getItem("remembered")
    const loggedIn = localStorage.getItem("isLoggedIn");
    console.log(loggedIn);

    return (
        <div>
            <Routes>
                <Route
                    path="/"
                    element={(loggedIn === "true" && remembered==="yes") ? <HomePage /> : <MainPage />}
                />
                <Route
                    path="*"
                    element={(loggedIn === "true" && remembered==="yes") ? <HomePage /> : <MainPage />}
                />
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/report" element={<ReportPage />} />
                <Route path="/blankpage" element={<BlankPage />} />
            </Routes>
        </div>
    );
};

export { Views };
