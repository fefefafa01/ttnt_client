import { Login } from "../../components/Login";
import { Register } from "components/Register";
import { ResetPwd } from "components/ResetPwd";
import { Changer } from "../../components/LanguageChange.js";
import { Multi_Lang } from "components/Multi_Lang";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import "./MainPage.css";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

function MainPage() {
    const [langopen, setLangopen] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [gofirst, setGofirst] = useState(true);
    function handleOpenlang() {
        // if (!clicked) {
            if(gofirst && langopen) {
                setGofirst(false);
            } else if (!gofirst && langopen) {
                setLangopen(false);
            }
        // } else {
            // setClicked(false)
        }
    // }
    return (
        <div onClick={handleOpenlang}>
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
                    <Multi_Lang 
                    langopen={langopen} setLangopen={setLangopen} 
                    clicked = {clicked} setClicked = {setClicked}
                    />
                </div>
            </div>
            <div className="body">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/resetpwd" element={<ResetPwd />} />
                    <Route path="*" element={<Login />} />
                </Routes>
                <div className="bigcontent">
                    <div className="col-sm-12 col-md content">
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
