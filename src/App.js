import MainPage from "./mainClient/mainpage/MainPage";
import Homepage from "mainClient/homepage/Homepage";
import React, { Component } from "react";
import "./i18n";
import "./App.css";
import { Views } from "components/Views";
import HomePage from "mainClient/homepage/Homepage";
import { changeLanguage } from "i18next";

class App extends Component {
    render() {
        if (!localStorage.lng || localStorage.lng === "EN") {
            localStorage.lng = "EN";
            changeLanguage("en");
        } else if (localStorage.lng === "VI") {
            changeLanguage("vi");
        }
        return (
            <div className="App">
                <Views />
            </div>
        );
    }
}

export default App;
