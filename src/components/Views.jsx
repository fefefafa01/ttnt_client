import { Routes, Route } from "react-router-dom";
import MainPage from "mainClient/mainpage/MainPage";
import HomePage from "mainClient/homepage/Homepage";
import { useEffect } from "react";
import { Specpdf } from "./SpecPDF";

const Views = () => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    console.log(loggedIn, "login");

    return (
        <div>
            <Routes>
                <Route
                    path="/"
                    element={loggedIn ? <HomePage /> : <MainPage />}
                />
                <Route path="*" element={<MainPage />} />
                <Route
                    path="/homepage"
                    element={loggedIn ? <HomePage /> : <MainPage />}
                />
                {/* <Route path='/homepage/a' element={<HomePage />}/>
                <Route path='/homepage/u' element={<HomePage />}/> */}
            </Routes>
        </div>
    );
};

export { Views };
