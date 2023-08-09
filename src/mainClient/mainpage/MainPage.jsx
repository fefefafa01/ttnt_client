import { Login } from "../../components/Loginpages/Login";
import { Register } from "components/Loginpages/Register";
import { ResetPwd } from "components/Loginpages/ResetPwd";
import { Changer } from "../../components/Languages/LanguageChange";
import { MultiLang } from "components/Languages/Multi_Lang";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import "./MainPage.scss";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

function MainPage(input) {
    const [once, setOnce] = useState(true)
    const [routing, setRouting] = useState(true)
    if (once) {
        if (input.input === "normal") {
            setRouting(true);
        } else if (input.input === "reset") {
            setRouting(false);
        }
        setOnce(false);
    }

    return (
        <div>
            <div className="header">
                <div className="col-2">
                    <link
                        href="//db.onlinewebfonts.com/c/11cd399ec653d4e156ce034b85c19cb7?family=VLNL+Decks"
                        rel="stylesheet"
                        type="text/css"
                    />
                    <p className="logo">AISIN</p>
                    <br></br>
                    <p className="col logotext">We Touch The Future</p>
                </div>
                <div className="label col">
                    <p className="label">
                        <Changer inp="Welcome to AISIN Parts Support" />
                    </p>
                </div>
                <div className="col-lg-2 col-sm-1 btn-lng">
                    <MultiLang />
                </div>
            </div>
            <div className="body">
                {routing &&
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/resetpwd" element={<ResetPwd />} />
                        <Route path="*" element={<Login />} />
                    </Routes>
                }
                {!routing &&
                    <ResetPwd />
                }
                <div className="bigcontent">
                    <div className="col-sm-12 col-md maincontent">
                        <p className="logo">AISIN</p>
                        <br></br>
                        <p className="contenttext">
                            AIMING FOR A BETTER FUTURE
                        </p>
                    </div>
                    <div className="col body-img" />
                </div>
            </div>
        </div>
    );
}

export default MainPage;
