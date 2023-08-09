import React from "react";
import { useState, useEffect, useRef } from "react";
import Globe from "../../img/globe.png";
import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Box,
    Typography,
} from "@mui/material";
import VI from "../../../src/img/vietnamese.png";
import EN from "../../../src/img/english.png";
import ".././comp.styles/LangOption.scss";
import { changeLanguage } from "i18next";

function MultiLang() {
    var [lang, setLang] = useState(localStorage.lng);
    const handleLang = (lng) => {
        if (lng === "en") {
            setLang("EN");
            changeLanguage("en");
            localStorage.lng = "EN";
        } else {
            setLang("VI");
            changeLanguage("vi");
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
                            style = {{margin: "10px 0px 0px 0px"}}
                            value="vi"
                            label={
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        margin: "-10px 0px 0px 0px",
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
                            style={{margin: "-10px 10px 0px 0px",}}
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
                                        margin: "-10px 0px 0px 0px",
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

function MultiLangHome() {
    var [lang, setLang] = useState(localStorage.lng);
    const handleLang = (lng) => {
        if (lng === "en") {
            setLang("EN");
            changeLanguage("en");
            localStorage.lng = "EN";
        } else {
            setLang("VI");
            changeLanguage("vi");
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
                                        margin: "10px 0px 0px 0px",
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
                            style={{margin: "-25px 10px 0px -11px",}}
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
                                        margin: "10px 0px 0px 0px",
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

export { MultiLang, MultiLangHome };