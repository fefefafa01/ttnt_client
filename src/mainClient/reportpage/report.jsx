import React, { useState, useRef, useEffect } from "react";
import "./report.scss";
import { ReportHeader } from "components/Header";
import { Changer } from "components/Languages/LanguageChange";
import { ProductOverview } from "../../components/product-report/ProductOverview";
import { ProductPeriod } from "components/product-report/ProductPeriod";
import "components/product-report/ProductPeriod";
import { Slider } from "@mui/material";
import arrow from "../../img/arrow.png";
import glass from "../../img/Glass.png";
import { Tabs } from "antd";
import $ from "jquery";
import { backlocale } from "constants/constindex";
import XLSX from "sheetjs-style";
import * as FileSaver from "file-saver";

const { TabPane } = Tabs;

const currentYear = new Date().getFullYear();
const initialValues = {
    country_name: "",
    manufacturer_name: "",
    transmission_type: "",
    part_name: "",
    part_group: "",
    end_year: currentYear,
    start_year: currentYear,
    start_cover: 25,
    end_cover: 75,
};

var loc;

function SelectCountries(input) {
    const [countryNames, setCountryNames] = useState([]);
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const isFirstRender = useRef(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            loc = backlocale + "sch/countries";
            fetch(loc, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(""),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data && data.country_name) {
                        setCountryNames(Object.values(data.country_name));
                    }
                })
                .catch((err) => console.error(err));
        }
    }, []);

    const selectDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                selectDropdownRef.current &&
                !selectDropdownRef.current.contains(event.target)
            ) {
                selectDropdownRef.current.classList.remove("active");
                setShowArrow(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [selectDropdownRef]);

    const toggleDropdown = () => {
        if (selectDropdownRef.current) {
            selectDropdownRef.current.classList.toggle("active");
            setShowArrow(!showArrow);
        }
    };

    const handleSelection = (event, optionToRemove) => {
        var selectedOption = event.target.textContent;

        if (selectedOption === "Xóa") {
            selectedOption = "clear";
        } else if (selectedOption.slice(-3) === "Xóa") {
            selectedOption =
                selectedOption - selectedOption.slice(-3) + "clear";
        }
        if (
            selectedOption === "Select All" ||
            selectedOption === "Chọn tất cả"
        ) {
            const updatedSelectedOptions = [...countryNames];
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            input.setCountry(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.country_name = selectedValueOptions;
            console.log(initialValues.country_name);
            return;
        } else if (selectedOption === "clear") {
            const updatedSelectedOptions = input.update.filter(
                (name) => name !== optionToRemove
            );
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = updatedSelectedOptions.filter(
                (name) => name !== "Select All"
            );
            input.setCountry(selectedValueOptions.join(", "));
            initialValues.country_name = selectedValueOptions;
            console.log(initialValues.country_name);
            return;
        } else if (selectedOption.slice(-5) !== "clear") {
            const index = input.update.indexOf(selectedOption);
            if (index > -1) {
                input.update.splice(index, 1);
            } else {
                input.update.push(selectedOption);
            }
            const selectedValueOptions = [...input.update];
            input.setCountry(selectedValueOptions.join(", "));
            initialValues.country_name = selectedValueOptions;
            console.log(initialValues.country_name);
            return;
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filtered = countryNames.filter(
        (name) =>
            typeof name === "string" &&
            name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRemoveSelected = (optionToRemove) => {
        const updatedSelectedOptions = selectedOptions.filter(
            (name) => name !== optionToRemove
        );
        setSelectedOptions(updatedSelectedOptions);
        const selectedValueOptions = updatedSelectedOptions.filter(
            (name) => name !== "Select All"
        );
        input.setCountry(selectedValueOptions.join(", "));
    };
    return (
        <div className="selectDropdown-report" ref={selectDropdownRef}>
            <div className="select-btn-report" onClick={toggleDropdown}>
                <span
                    style={{
                        color: input.country === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        fontSize: "1.2em",
                        fontWeight: "500",
                    }}
                >
                    {input.country || "Country"}
                </span>
                <img
                    src={arrow}
                    id="arrow"
                    alt="arrow"
                    style={{
                        transform: showArrow ? "rotate(180deg)" : "none",
                    }}
                />
            </div>
            <div className="content-report">
                <div className="search-report">
                    <i>
                        <img src={glass} id="Glass" alt="search icon" />
                    </i>
                    <input
                        className="select-css-report"
                        type="text"
                        list="countries"
                        placeholder=""
                        autoComplete="off"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <ul className="options-report">
                    <li key="*" onClick={handleSelection}>
                        <Changer inp="Select All" />
                    </li>
                    {filtered.map((name) => (
                        <li
                            key={name}
                            onClick={(event) => handleSelection(event, name)}
                        >
                            {name}
                            {input.country.includes(name) && (
                                <button
                                    className="remove-btn"
                                    onClick={() => handleRemoveSelected(name)}
                                >
                                    <Changer inp="clear" />
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function SelectCarMaker(input) {
    const [manufacturer_name, setManufacturer] = useState([]);
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const isFirstRender = useRef(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            loc = backlocale + "sch/maker";
            fetch(loc, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(""),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data && data.manufacturer_name) {
                        setManufacturer(Object.values(data.manufacturer_name));
                    }
                })
                .catch((err) => console.error(err));
        }
    }, []);

    const selectDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                selectDropdownRef.current &&
                !selectDropdownRef.current.contains(event.target)
            ) {
                selectDropdownRef.current.classList.remove("active");
                setShowArrow(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [selectDropdownRef]);

    const toggleDropdown = () => {
        if (selectDropdownRef.current) {
            selectDropdownRef.current.classList.toggle("active");
            setShowArrow(!showArrow);
        }
    };

    const handleSelection = (event, optionToRemove) => {
        var selectedOption = event.target.textContent;
        if (selectedOption === "Xóa") {
            selectedOption = "clear";
        } else if (selectedOption.slice(-3) === "Xóa") {
            selectedOption =
                selectedOption - selectedOption.slice(-3) + "clear";
        }
        if (
            selectedOption === "Select All" ||
            selectedOption === "Chọn tất cả"
        ) {
            const updatedSelectedOptions = [...manufacturer_name];
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            input.setMaker(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.manufacturer_name = selectedValueOptions;
            console.log(initialValues.manufacturer_name);
            return;
        } else if (selectedOption === "clear") {
            const updatedSelectedOptions = input.update.filter(
                (name) => name !== optionToRemove
            );
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = updatedSelectedOptions.filter(
                (name) => name !== "Select All"
            );
            input.setMaker(selectedValueOptions.join(", "));
            initialValues.manufacturer_name = selectedValueOptions;
            console.log(initialValues.manufacturer_name);
            return;
        } else if (selectedOption.slice(-5) !== "clear") {
            const index = input.update.indexOf(selectedOption);
            if (index > -1) {
                input.update.splice(index, 1);
            } else {
                input.update.push(selectedOption);
            }
            const selectedValueOptions = [...input.update];
            input.setMaker(selectedValueOptions.join(", "));
            initialValues.manufacturer_name = selectedValueOptions;
            console.log(initialValues.manufacturer_name);
            return;
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filtered = manufacturer_name.filter(
        (name) =>
            typeof name === "string" &&
            name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRemoveSelected = (optionToRemove) => {
        const updatedSelectedOptions = selectedOptions.filter(
            (name) => name !== optionToRemove
        );
        setSelectedOptions(updatedSelectedOptions);
        const selectedValueOptions = updatedSelectedOptions.filter(
            (name) => name !== "Select All"
        );
        input.setMaker(selectedValueOptions.join(", "));
    };

    return (
        <div className="selectDropdown-report" ref={selectDropdownRef}>
            <div className="select-btn-report" onClick={toggleDropdown}>
                <span
                    style={{
                        color: input.maker === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        fontSize: "1.2em",
                        fontWeight: "500",
                    }}
                >
                    {input.maker || "Toyota"}
                </span>
                <img
                    src={arrow}
                    id="arrow"
                    alt="arrow"
                    style={{
                        transform: showArrow ? "rotate(180deg)" : "none",
                    }}
                />
            </div>
            <div className="content-report">
                <div className="search-report">
                    <i>
                        <img src={glass} id="Glass" alt="search icon" />
                    </i>
                    <input
                        className="select-css-report"
                        type="text"
                        list="countries"
                        placeholder=""
                        autoComplete="off"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <ul className="options-report">
                    <li key="*" onClick={handleSelection}>
                        <Changer inp="Select All" />
                    </li>
                    {filtered.map((name) => (
                        <li
                            key={name}
                            onClick={(event) => handleSelection(event, name)}
                        >
                            {name}
                            {input.maker.includes(name) && (
                                <button
                                    className="remove-btn"
                                    onClick={() => handleRemoveSelected(name)}
                                >
                                    <Changer inp="clear" />
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function SelectTransmission(input) {
    const [transmissiontype, setTransmission] = useState([]);
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const isFirstRender = useRef(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            loc = backlocale + "sch/transmission";
            fetch(loc, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(""),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data && data.transmission_type) {
                        setTransmission(Object.values(data.transmission_type));
                    }
                })
                .catch((err) => console.error(err));
        }
    }, []);

    const selectDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                selectDropdownRef.current &&
                !selectDropdownRef.current.contains(event.target)
            ) {
                selectDropdownRef.current.classList.remove("active");
                setShowArrow(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [selectDropdownRef]);

    const toggleDropdown = () => {
        if (selectDropdownRef.current) {
            selectDropdownRef.current.classList.toggle("active");
            setShowArrow(!showArrow);
        }
    };

    const handleSelection = (event, optionToRemove) => {
        var selectedOption = event.target.textContent;
        if (selectedOption === "Xóa") {
            selectedOption = "clear";
        } else if (selectedOption.slice(-3) === "Xóa") {
            selectedOption =
                selectedOption - selectedOption.slice(-3) + "clear";
        }
        if (
            selectedOption === "Select All" ||
            selectedOption === "Chọn tất cả"
        ) {
            const updatedSelectedOptions = [...transmissiontype];
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            input.setTrans(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.transmission_type = selectedValueOptions;
            console.log(initialValues.transmission_type);
            return;
        } else if (selectedOption === "clear") {
            const updatedSelectedOptions = input.update.filter(
                (name) => name !== optionToRemove
            );
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = updatedSelectedOptions.filter(
                (name) => name !== "Select All"
            );
            input.setTrans(selectedValueOptions.join(", "));
            initialValues.transmission_type = selectedValueOptions;
            console.log(initialValues.transmission_type);
            return;
        } else if (selectedOption.slice(-5) !== "clear") {
            const index = input.update.indexOf(selectedOption);
            if (index > -1) {
                input.update.splice(index, 1);
            } else {
                input.update.push(selectedOption);
            }
            const selectedValueOptions = [...input.update];
            input.setTrans(selectedValueOptions.join(", "));
            initialValues.transmission_type = selectedValueOptions;
            console.log(initialValues.transmission_type);
            return;
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filtered = transmissiontype.filter(
        (name) =>
            typeof name === "string" &&
            name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRemoveSelected = (optionToRemove) => {
        const updatedSelectedOptions = selectedOptions.filter(
            (name) => name !== optionToRemove
        );
        setSelectedOptions(updatedSelectedOptions);
        const selectedValueOptions = updatedSelectedOptions.filter(
            (name) => name !== "Select All"
        );
        input.setTrans(selectedValueOptions.join(", "));
    };
    return (
        <div className="selectDropdown-report" ref={selectDropdownRef}>
            <div className="select-btn-report" onClick={toggleDropdown}>
                <span
                    style={{
                        color: input.trans === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        fontSize: "1.2em",
                        fontWeight: "500",
                    }}
                >
                    {input.trans || "MT"}
                </span>
                <img
                    src={arrow}
                    id="arrow"
                    alt="arrow"
                    style={{
                        transform: showArrow ? "rotate(180deg)" : "none",
                    }}
                />
            </div>
            <div className="content-report">
                <div className="search-report">
                    <i>
                        <img src={glass} id="Glass" alt="search icon" />
                    </i>
                    <input
                        className="select-css-report"
                        type="text"
                        list="countries"
                        placeholder=""
                        autoComplete="off"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <ul className="options-report">
                    <li key="*" onClick={handleSelection}>
                        <Changer inp="Select All" />
                    </li>
                    {filtered.map((name) => (
                        <li
                            key={name}
                            onClick={(event) => handleSelection(event, name)}
                        >
                            {name}
                            {input.trans.includes(name) && (
                                <button
                                    className="remove-btn"
                                    onClick={() => handleRemoveSelected(name)}
                                >
                                    <Changer inp="clear" />
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function SelectPartGroup(input) {
    const [partGroupName, setPartGroupName] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const isFirstRender = useRef(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            let loc = backlocale + "sch/partgroup";
            fetch(loc, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data && data.part_group_name) {
                        setPartGroupName(Object.values(data.part_group_name));
                    }
                })
                .catch((err) => console.error(err));
        }
    }, []);

    const selectDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                selectDropdownRef.current &&
                !selectDropdownRef.current.contains(event.target)
            ) {
                selectDropdownRef.current.classList.remove("active");
                setShowArrow(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [selectDropdownRef]);

    const toggleDropdown = () => {
        if (selectDropdownRef.current) {
            selectDropdownRef.current.classList.toggle("active");
            setShowArrow(!showArrow);
        }
    };

    const handleSelection = (event, optionToRemove) => {
        var selectedOption = event.target.textContent;
        if (selectedOption === "Xóa") {
            selectedOption = "clear";
        } else if (selectedOption.slice(-3) === "Xóa") {
            selectedOption =
                selectedOption - selectedOption.slice(-3) + "clear";
        }
        if (
            selectedOption === "Select All" ||
            selectedOption === "Chọn tất cả"
        ) {
            const updatedSelectedOptions = [...partGroupName];
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            input.setPartGroup(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.part_group = selectedValueOptions;
            console.log(initialValues.part_group);
            return;
        } else if (selectedOption === "clear") {
            const updatedSelectedOptions = input.update.filter(
                (name) => name !== optionToRemove
            );
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = updatedSelectedOptions.filter(
                (name) => name !== "Select All"
            );
            input.setPartGroup(selectedValueOptions.join(", "));
            initialValues.part_group = selectedValueOptions;
            console.log(initialValues.part_group);
            return;
        } else if (selectedOption.slice(-5) !== "clear") {
            const index = input.update.indexOf(selectedOption);
            if (index > -1) {
                input.update.splice(index, 1);
            } else {
                input.update.push(selectedOption);
            }
            const selectedValueOptions = [...input.update];
            input.setPartGroup(selectedValueOptions.join(", "));
            initialValues.part_group = selectedValueOptions;
            console.log(initialValues.part_group);
            return;
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filtered = partGroupName.filter(
        (name) =>
            typeof name === "string" &&
            name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRemoveSelected = (optionToRemove) => {
        const updatedSelectedOptions = selectedOptions.filter(
            (name) => name !== optionToRemove
        );
        setSelectedOptions(updatedSelectedOptions);
        const selectedValueOptions = updatedSelectedOptions.filter(
            (name) => name !== "Select All"
        );
        input.setPartGroup(selectedValueOptions.join(", "));
    };
    return (
        <div className="selectDropdown-report" ref={selectDropdownRef}>
            <div className="select-btn-report" onClick={toggleDropdown}>
                <span
                    style={{
                        color: input.partGroup === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        fontSize: "1.2em",
                        fontWeight: "500",
                    }}
                >
                    {input.partGroup || "Electrical"}
                </span>
                <img
                    src={arrow}
                    id="arrow"
                    alt="arrow"
                    style={{ transform: showArrow ? "rotate(180deg)" : "none" }}
                />
            </div>
            <div className="content-report">
                <div className="search-report">
                    <i>
                        <img src={glass} id="Glass" alt="search icon" />
                    </i>
                    <input
                        className="select-css-report"
                        type="text"
                        list="countries"
                        placeholder=""
                        autoComplete="off"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <ul className="options-report">
                    <li key="*" onClick={handleSelection}>
                        <Changer inp="Select All" />
                    </li>
                    {filtered.map((name) => (
                        <li
                            key={name}
                            onClick={(event) => handleSelection(event, name)}
                        >
                            {name}
                            {selectedValue.includes(name) && (
                                <button
                                    className="remove-btn"
                                    onClick={() => handleRemoveSelected(name)}
                                >
                                    <Changer inp="clear" />
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function SelectPartName(input) {
    const [aisinpartname, setPartname] = useState([]);
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const isFirstRender = useRef(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            loc = backlocale + "overall/partname";
            fetch(loc, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(""),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data && data.aisin_part_name) {
                        setPartname(Object.values(data.aisin_part_name));
                    }
                })
                .catch((err) => console.error(err));
        }
    }, []);

    const selectDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                selectDropdownRef.current &&
                !selectDropdownRef.current.contains(event.target)
            ) {
                selectDropdownRef.current.classList.remove("active");
                setShowArrow(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [selectDropdownRef]);

    const toggleDropdown = () => {
        if (selectDropdownRef.current) {
            selectDropdownRef.current.classList.toggle("active");
            setShowArrow(!showArrow);
        }
    };

    const handleSelection = (event, optionToRemove) => {
        var selectedOption = event.target.textContent;
        if (selectedOption === "Xóa") {
            selectedOption = "clear";
        } else if (selectedOption.slice(-3) === "Xóa") {
            selectedOption =
                selectedOption - selectedOption.slice(-3) + "clear";
        }
        if (
            selectedOption === "Select All" ||
            selectedOption === "Chọn tất cả"
        ) {
            const updatedSelectedOptions = [...aisinpartname];
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            input.setPart(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.part_name = selectedValueOptions;
            console.log(initialValues.part_name);
            return;
        } else if (selectedOption === "clear") {
            const updatedSelectedOptions = input.update.filter(
                (name) => name !== optionToRemove
            );
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = updatedSelectedOptions.filter(
                (name) => name !== "Select All"
            );
            input.setPart(selectedValueOptions.join(", "));
            initialValues.part_name = selectedValueOptions;
            console.log(initialValues.part_name);
            return;
        } else if (selectedOption.slice(-5) !== "clear") {
            const index = input.update.indexOf(selectedOption);
            if (index > -1) {
                input.update.splice(index, 1);
            } else {
                input.update.push(selectedOption);
            }
            const selectedValueOptions = [...input.update];
            input.setPart(selectedValueOptions.join(", "));
            initialValues.part_name = selectedValueOptions;
            console.log(initialValues.part_name);
            return;
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filtered = aisinpartname.filter(
        (name) =>
            typeof name === "string" &&
            name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRemoveSelected = (optionToRemove) => {
        const updatedSelectedOptions = selectedOptions.filter(
            (name) => name !== optionToRemove
        );
        setSelectedOptions(updatedSelectedOptions);
        const selectedValueOptions = updatedSelectedOptions.filter(
            (name) => name !== "Select All"
        );
        input.setPart(selectedValueOptions.join(", "));
    };
    return (
        <div className="selectDropdown-report" ref={selectDropdownRef}>
            <div className="select-btn-report" onClick={toggleDropdown}>
                <span
                    style={{
                        color: input.part === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        fontSize: "1.2em",
                        fontWeight: "500",
                    }}
                >
                    {input.part || "Clutch Cover"}
                </span>
                <img
                    src={arrow}
                    id="arrow"
                    alt="arrow"
                    style={{
                        transform: showArrow ? "rotate(180deg)" : "none",
                    }}
                />
            </div>
            <div className="content-report">
                <div className="search-report">
                    <i>
                        <img src={glass} id="Glass" alt="search icon" />
                    </i>
                    <input
                        className="select-css-report"
                        type="text"
                        list="countries"
                        placeholder=""
                        autoComplete="off"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <ul className="options-report">
                    <li key="*" onClick={handleSelection}>
                        Select All
                    </li>
                    {filtered.map((name) => (
                        <li
                            key={name}
                            onClick={(event) => handleSelection(event, name)}
                        >
                            {name}
                            {input.part.includes(name) && (
                                <button
                                    className="remove-btn"
                                    onClick={() => handleRemoveSelected(name)}
                                >
                                    clear
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function ReportPage(props) {
    const [activeKey, setActiveKey] = useState("1");
    const [formValues, setFormValues] = useState(initialValues);
    const panes = [
        {
            title: "Product Coverage Overview",
            content: <ProductOverview />,
            key: "1",
            closable: false,
        },
        {
            title: "Product Coverage by Period",
            key: "2",
            content: (
                <ProductPeriod
                    country_name={initialValues.country_name}
                    manufacturer_name={initialValues.manufacturer_name}
                    transmission_type={initialValues.transmission_type}
                    part_name={initialValues.part_name}
                    part_group={initialValues.part_group}
                    start_year={initialValues.start_year}
                    end_year={initialValues.end_year}
                    start_cover={initialValues.start_cover}
                    end_cover={initialValues.end_cover}
                />
            ),
            closable: false,
        },
    ];

    const onChange = (activeKey) => {
        setActiveKey(activeKey);
    };

    const [value, setValue] = useState([25, 75]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        initialValues.start_cover = newValue[0];
        initialValues.end_cover = newValue[1];
    };
    const handleChangeStYear = (e) => {
        initialValues.start_year = e.target.value;
    };
    const handleChangeEnYear = (e) => {
        initialValues.end_year = e.target.value;
    };

    function handleDownload() {
        if (
            (formValues.start_year !== "" &&
                formValues.end_year !== "" &&
                parseInt(formValues.start_year) <=
                    parseInt(formValues.end_year)) ||
            formValues.start_year === "" ||
            formValues.end_year === ""
        ) {
            const curr = new Date();
            var month, day;
            if (curr.getMonth() + 1 < 10) {
                month = "0" + (curr.getMonth() + 1);
            } else {
                month = curr.getMonth() + 1;
            }
            if (curr.getDate() < 10) {
                day = "0" + curr.getDate();
            } else {
                day = curr.getDate();
            }
            const fileName = `GMP Data_${curr.getFullYear()}-${month}-${day}`;
            // console.log(fileName)
            let loc = backlocale + "overall/downoverall";
            fetch(loc, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Acess-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods":
                        "GET, PUT, POST, DELETE, PATCH, OPTIONS",
                },
                body: JSON.stringify(formValues),
            })
                .catch((err) => {
                    return;
                })
                .then((res) => {
                    return res.blob();
                })
                .then((data) => {
                    if (!data) return;
                    const url = URL.createObjectURL(data);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = fileName + ".xlsx";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                });
        } else {
            return;
        }
    }

    const valueText = (value) => `${value}%`;

    const [country, setCountry] = useState("");
    const [maker, setMaker] = useState("");
    const [trans, setTrans] = useState("");
    const [part, setPart] = useState("");
    const [partGroup, setPartGroup] = useState("");

    var [update1, setUpdate1] = useState([]);
    var [update2, setUpdate2] = useState([]);
    var [update3, setUpdate3] = useState([]);
    var [update4, setUpdate4] = useState([]);
    var [update5, setUpdate5] = useState([]);
    //scroll
    $(document).ready(function () {
        // Create a scroll bar element
        var scrollBar = $('<div className="scrollpanel" ></div>');

        // Append the scroll bar to the outer container
        $(".scroll-panel").append(scrollBar);

        // Add scroll event handler to the inner container
        $(".tab-panel").on("scroll", function () {
            // Update the scroll bar position based on the scroll percentage
            var scrollPercentage =
                $(this).scrollTop /
                ($(this).prop("scrollHeight") - $(this).outerHeight());
            var trackHeight = $(".scrollpanel").parent().outerHeight();
            var thumbHeight =
                trackHeight *
                ($(this).outerHeight() / $(this).prop("scrollHeight"));
            var maxScrollTop = trackHeight - thumbHeight;
            var scrollTop = -scrollPercentage * maxScrollTop;

            $(".scrollpanel").css({
                top: scrollTop,
                height: thumbHeight,
            });
        });

        $(".scrollpanel").on("scroll", function () {
            // Update the scroll position of the inner container
            var thumbHeight = $(this).outerHeight();
            var trackHeight = $(".scrollpanel").parent().outerHeight();
            var scrollPercentage =
                -$(this).scrollTop() / (trackHeight - thumbHeight);
            var maxScrollTop =
                $(".tab-panel").prop("scrollHeight") -
                $(".tab-panel").outerHeight();
            var scrollTop = scrollPercentage * maxScrollTop;

            $(".tab-panel").scrollTop(scrollTop);
        });
    });
    return (
        <div>
            <ReportHeader />
            <div className="hbody">
                <div className="wrappers-report">
                    <div className="report-content">
                        <Tabs
                            hideAdd
                            className="rtabs"
                            onChange={onChange}
                            activeKey={activeKey}
                            type="editable-card"
                            id="report"
                        >
                            {panes.map((pane) => (
                                <TabPane
                                    className="tab-panel"
                                    tab={pane.title}
                                    key={pane.key}
                                    closable={pane.closable}
                                >
                                    {pane.content}
                                </TabPane>
                            ))}
                        </Tabs>

                        <div className="scrollpanel">
                            <html className="scrollempty">&nbsp;</html>
                        </div>
                    </div>
                    <div className="scroll-form-report" id="rscroll-export">
                        <div className="sidebar-right ">
                            <div className="sidebar-title">
                                <p>Filter by part (High level)</p>
                            </div>
                            <div className="boxcontent">
                                <p className="first-item re-item">Country</p>
                                <div>
                                    <SelectCountries
                                        country={country}
                                        setCountry={setCountry}
                                        update={update1}
                                        setUpdate={setUpdate1}
                                    />
                                </div>
                                <p className="re-item">Car Maker</p>
                                <div>
                                    <SelectCarMaker
                                        maker={maker}
                                        setMaker={setMaker}
                                        update={update2}
                                        setUpdate={setUpdate2}
                                    />
                                </div>
                                <p className="re-item">Tranmission Type</p>
                                <div>
                                    <SelectTransmission
                                        trans={trans}
                                        setTrans={setTrans}
                                        update={update3}
                                        setUpdate={setUpdate3}
                                    />
                                </div>
                                <p className="re-item">Part Group</p>
                                <div>
                                    <SelectPartGroup
                                        partGroup={partGroup}
                                        setPartGroup={setPartGroup}
                                        update={update4}
                                        setUpdate={setUpdate4}
                                    />
                                </div>
                                <p className="re-item">Part Name</p>
                                <div>
                                    <SelectPartName
                                        part={part}
                                        setPart={setPart}
                                        update={update5}
                                        setUpdate={setUpdate5}
                                    />
                                </div>
                                <div className="from-to">
                                    <div className="from-input col">
                                        <span>From</span>
                                        <input
                                            type="year"
                                            className="from-year"
                                            onInput={handleChangeStYear}
                                        />
                                    </div>
                                    <div className="to-input col">
                                        <span>To</span>
                                        <input
                                            type="year"
                                            className="to-year"
                                            onInput={handleChangeEnYear}
                                        />
                                    </div>
                                </div>
                                <div className="coverage">
                                    Filter by Coverage % Range
                                    <Slider
                                        getAriaLabel={() => "Coverage range"}
                                        value={value}
                                        onChange={handleChange}
                                        valueLabelDisplay="on"
                                        getAriaValueText={valueText}
                                        disableSwap
                                    />
                                </div>
                            </div>
                            <div className="export-btn">
                                <button
                                    className="export"
                                    onClick={handleDownload}
                                >
                                    Export Data
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ReportPage;
