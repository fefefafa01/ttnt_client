import React from "react";
import { useState, useEffect, useRef } from "react";
import Globe from "../img/globe.png";
import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Box,
    Typography,
} from "@mui/material";
import VI from "../../src/img/vietnamese.png";
import EN from "../../src/img/english.png";
import { Changer } from "./LanguageChange";
import "./comp.styles/LangOption.css";
import { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";

import VI_TRANSLATE from "./translation/vi/default.json";

function Multi_Lang() {
    //let loc = window.location.pathname;
    // const check = Changer({inp:'Login'});
    // console.log(check);
    var [lang, setLang] = useState(localStorage.lng);
    // if (check==='Login') {
    //     lang = 'EN';
    // } else {
    //     lang = 'VI';
    // }
    const { t } = useTranslation();
    const handleLang = (lng) => {
        if (lng === "en") {
            setLang("EN");
            changeLanguage("en");
            localStorage.lng = "EN";
            //window.location.replace(loc + "?lng=en");
        } else {
            setLang("VI");
            //window.location.replace(loc + "?lng=vi");
            changeLanguage("vi");
            console.log(t("Login"));
            localStorage.lng = "VI";
        }
    };

    const selectDropdownRef = useRef(null);

    const toggleDropdown = () => {
        if (selectDropdownRef.current) {
            selectDropdownRef.current.classList.toggle("active");
        }
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                selectDropdownRef.current &&
                !selectDropdownRef.current.contains(event.target)
            ) {
                selectDropdownRef.current.classList.remove("active");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [selectDropdownRef]);

    return (
        <div className="lang dropdown" ref={selectDropdownRef}>
            <button
                className="multi-lang"
                onClick={toggleDropdown}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <img className="globe" src={Globe} alt="Globe" />
            </button>
            <span className="langbtn">{lang}</span>
            <Box component="div" className="box">
                <FormControl>
                    <FormLabel id="radio-buttons-group-label"></FormLabel>
                    <RadioGroup
                        aria-labelledby="radio-buttons-group-label"
                        defaultValue={lang}
                        name="radio-buttons-group"
                    >
                        <FormControlLabel
                            control={
                                <Radio
                                    checked={lang === "VI"}
                                    onChange={() => handleLang("vi")}
                                />
                            }
                            value="vi"
                            label={
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <img
                                        src={VI}
                                        alt="Vietnamese"
                                        style={{
                                            maxWidth: "25px",
                                            marginLeft: "-6px",
                                        }}
                                    />
                                    <Typography
                                        className="lang-name"
                                        level="body3"
                                        style={{
                                            marginLeft: "5px",
                                            fontSize: "1.2em",
                                        }}
                                    >
                                        VI
                                    </Typography>
                                </div>
                            }
                        />
                        <FormControlLabel
                            value="en"
                            control={
                                <Radio
                                    checked={lang === "EN"}
                                    onChange={() => handleLang("en")}
                                />
                            }
                            label={
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <img
                                        src={EN}
                                        alt="English"
                                        style={{
                                            maxWidth: "25px",
                                            marginLeft: "-6px",
                                        }}
                                    />
                                    <Typography
                                        className="lang-name"
                                        level="body3"
                                        style={{
                                            marginLeft: "5px",
                                            fontSize: "1.2em",
                                        }}
                                    >
                                        EN
                                    </Typography>
                                </div>
                            }
                        />
                    </RadioGroup>
                </FormControl>
            </Box>
        </div>
    );
}

function Multi_Lang_Home() {
    //let loc = window.location.pathname;
    // const check = Changer({inp:'Login'});
    // console.log(check);
    var [lang, setLang] = useState(localStorage.lng);
    // if (check==='Login') {
    //     lang = 'EN';
    // } else {
    //     lang = 'VI';
    // }
    const { t } = useTranslation();
    const handleLang = (lng) => {
        if (lng === "en") {
            setLang("EN");
            changeLanguage("en");
            localStorage.lng = "EN";
            //window.location.replace(loc + "?lng=en");
        } else {
            setLang("VI");
            //window.location.replace(loc + "?lng=vi");
            changeLanguage("vi");
            console.log(t("Login"));
            localStorage.lng = "VI";
        }
    };

    const selectDropdownRef = useRef(null);

    const toggleDropdown = () => {
        if (selectDropdownRef.current) {
            selectDropdownRef.current.classList.toggle("active");
        }
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                selectDropdownRef.current &&
                !selectDropdownRef.current.contains(event.target)
            ) {
                selectDropdownRef.current.classList.remove("active");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [selectDropdownRef]);

    return (
        <div className="hlang dropdown" ref={selectDropdownRef}>
            <button
                className="hmulti-lang"
                onClick={toggleDropdown}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <img className="hglobe" src={Globe} alt="Globe" />
            </button>
            <span className="hlangbtn">{lang}</span>
            <Box component="div" className="hbox">
                <FormControl>
                    <FormLabel id="radio-buttons-group-label"></FormLabel>
                    <RadioGroup
                        aria-labelledby="radio-buttons-group-label"
                        defaultValue={lang}
                        name="radio-buttons-group"
                    >
                        <FormControlLabel
                            control={
                                <Radio
                                    checked={lang === "VI"}
                                    onChange={() => handleLang("vi")}
                                />
                            }
                            value="vi"
                            label={
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <img
                                        src={VI}
                                        alt="Vietnamese"
                                        style={{
                                            maxWidth: "25px",
                                            marginLeft: "-6px",
                                        }}
                                    />
                                    <Typography
                                        className="hlang-name"
                                        level="body3"
                                        style={{
                                            marginLeft: "5px",
                                            fontSize: "1.2em",
                                        }}
                                    >
                                        VI
                                    </Typography>
                                </div>
                            }
                        />
                        <FormControlLabel
                            value="en"
                            control={
                                <Radio
                                    checked={lang === "EN"}
                                    onChange={() => handleLang("en")}
                                />
                            }
                            label={
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <img
                                        src={EN}
                                        alt="English"
                                        style={{
                                            maxWidth: "25px",
                                            marginLeft: "-6px",
                                        }}
                                    />
                                    <Typography
                                        className="hlang-name"
                                        level="body3"
                                        style={{
                                            marginLeft: "5px",
                                            fontSize: "1.2em",
                                        }}
                                    >
                                        EN
                                    </Typography>
                                </div>
                            }
                        />
                    </RadioGroup>
                </FormControl>
            </Box>
        </div>
    );
}

export { Multi_Lang, Multi_Lang_Home };
