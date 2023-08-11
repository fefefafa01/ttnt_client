import { Routes, Route } from "react-router-dom";
import MainPage from "mainClient/mainpage/MainPage";
import HomePage from "mainClient/homepage/Homepage";
import ReportPage from "mainClient/reportpage/report";
import { BlankPage } from "constants/blankpage";

const Views = () => {
    const loggedIn = localStorage.getItem("isLoggedIn");

    return (
        <div>
            <Routes>
                <Route
                    path="/"
                    element={
                        loggedIn === "true" ? (
                            <HomePage />
                        ) : (
                            <MainPage input="normal" />
                        )
                    }
                />
                <Route
                    path="*"
                    element={
                        loggedIn === "true" ? (
                            <HomePage />
                        ) : (
                            <MainPage input="normal" />
                        )
                    }
                />
                <Route
                    path="/homepage"
                    element={
                        loggedIn === "true" ? (
                            <HomePage />
                        ) : (
                            <MainPage input="normal" />
                        )
                    }
                />
                <Route
                    path="/resetpwdhome"
                    element={<MainPage input="reset" />}
                />
                <Route
                    path="/report"
                    element={
                        loggedIn === "true" ? (
                            <ReportPage />
                        ) : (
                            <MainPage input="normal" />
                        )
                    }
                />
                <Route
                    path="/blankpage"
                    element={
                        loggedIn === "true" ? (
                            <BlankPage />
                        ) : (
                            <MainPage input="normal" />
                        )
                    }
                />
            </Routes>
        </div>
    );
};

export { Views };
