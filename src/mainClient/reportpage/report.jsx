import React, { useState, useRef, useEffect } from "react";
import "./report.css";
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

const { TabPane } = Tabs;

function SelectCountries() {
    const [countryNames, setCountryNames] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const isFirstRender = useRef(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            let loc = backlocale + "sch/countries";
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
            setSelectedOptions([...countryNames]);
            setSelectedValue([...countryNames].join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            return;
        } else if (selectedOption === "clear") {
            const updatedSelectedOptions = selectedOptions.filter(
                (name) => name !== optionToRemove
            );
            setSelectedOptions(updatedSelectedOptions);
            const selectedValueOptions = updatedSelectedOptions.filter(
                (name) => name !== "Select All"
            );
            setSelectedValue(selectedValueOptions.join(", "));
            return;
        } else if (selectedOption.slice(-5) !== "clear") {
            const updatedSelectedOptions = [...selectedOptions];
            const index = updatedSelectedOptions.indexOf(selectedOption);
            if (index > -1) {
                updatedSelectedOptions.splice(index, 1);
            } else {
                updatedSelectedOptions.push(selectedOption);
            }
            setSelectedOptions(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            setSelectedValue(selectedValueOptions.join(", "));
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
        setSelectedValue(selectedValueOptions.join(", "));
        console.log(selectedValue);
    };
    return (
        <div className="selectDropdown-report" ref={selectDropdownRef}>
            <div className="select-btn-report" onClick={toggleDropdown}>
                <span
                    style={{
                        color: selectedValue === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        fontSize: "1.2em",
                        fontWeight: "500",
                    }}
                >
                    {selectedValue || "Country"}
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
                                    className="remove-btn-report"
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
function SelectCarMaker() {
    const [manufacturer_name, setManufacturer] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const isFirstRender = useRef(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            let loc = backlocale+"sch/maker";
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
            setSelectedOptions([...manufacturer_name]);
            setSelectedValue([...manufacturer_name].join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            return;
        } else if (selectedOption === "clear") {
            const updatedSelectedOptions = selectedOptions.filter(
                (name) => name !== optionToRemove
            );
            setSelectedOptions(updatedSelectedOptions);
            const selectedValueOptions = updatedSelectedOptions.filter(
                (name) => name !== "Select All"
            );
            setSelectedValue(selectedValueOptions.join(", "));
            return;
        } else if (selectedOption.slice(-5) !== "clear") {
            const updatedSelectedOptions = [...selectedOptions];
            const index = updatedSelectedOptions.indexOf(selectedOption);
            if (index > -1) {
                updatedSelectedOptions.splice(index, 1);
            } else {
                updatedSelectedOptions.push(selectedOption);
            }
            setSelectedOptions(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            setSelectedValue(selectedValueOptions.join(", "));
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
        setSelectedValue(selectedValueOptions.join(", "));
        console.log(selectedValue);
    };

    return (
        <div className="selectDropdown-report" ref={selectDropdownRef}>
            <div className="select-btn-report" onClick={toggleDropdown}>
                <span
                    style={{
                        color: selectedValue === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        fontSize: "1.2em",
                        fontWeight: "500",
                    }}
                >
                    {selectedValue || "Toyota"}
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

function SelectTransmission() {
    const [transmissiontype, setTransmission] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const isFirstRender = useRef(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            let loc = backlocale+"sch/transmission";
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
            setSelectedOptions([...transmissiontype]);
            setSelectedValue([...transmissiontype].join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            return;
        } else if (selectedOption === "clear") {
            const updatedSelectedOptions = selectedOptions.filter(
                (name) => name !== optionToRemove
            );
            setSelectedOptions(updatedSelectedOptions);
            const selectedValueOptions = updatedSelectedOptions.filter(
                (name) => name !== "Select All"
            );
            setSelectedValue(selectedValueOptions.join(", "));
            return;
        } else if (selectedOption.slice(-5) !== "clear") {
            const updatedSelectedOptions = [...selectedOptions];
            const index = updatedSelectedOptions.indexOf(selectedOption);
            if (index > -1) {
                updatedSelectedOptions.splice(index, 1);
            } else {
                updatedSelectedOptions.push(selectedOption);
            }
            setSelectedOptions(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            setSelectedValue(selectedValueOptions.join(", "));
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
        setSelectedValue(selectedValueOptions.join(", "));
        console.log(selectedValue);
    };
    return (
        <div className="selectDropdown-report" ref={selectDropdownRef}>
            <div className="select-btn-report" onClick={toggleDropdown}>
                <span
                    style={{
                        color: selectedValue === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        fontSize: "1.2em",
                        fontWeight: "500",
                    }}
                >
                    {selectedValue || "MT"}
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

function SelectPartGroup() {
    const [partGroupName, setPartGroupName] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const isFirstRender = useRef(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            let loc = backlocale + "sch/partgroup"
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
            setSelectedOptions([...partGroupName]);
            setSelectedValue([...partGroupName].join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            return;
        } else if (selectedOption === "clear") {
            const updatedSelectedOptions = selectedOptions.filter(
                (name) => name !== optionToRemove
            );
            setSelectedOptions(updatedSelectedOptions);
            const selectedValueOptions = updatedSelectedOptions.filter(
                (name) => name !== "Select All"
            );
            setSelectedValue(selectedValueOptions.join(", "));
            return;
        } else if (selectedOption.slice(-5) !== "clear") {
            const updatedSelectedOptions = [...selectedOptions];
            const index = updatedSelectedOptions.indexOf(selectedOption);
            if (index > -1) {
                updatedSelectedOptions.splice(index, 1);
            } else {
                updatedSelectedOptions.push(selectedOption);
            }
            setSelectedOptions(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            setSelectedValue(selectedValueOptions.join(", "));
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
        setSelectedValue(selectedValueOptions.join(", "));
        console.log(selectedValue);
    };
    return (
        <div className="selectDropdown-report" ref={selectDropdownRef}>
            <div className="select-btn-report" onClick={toggleDropdown}>
                <span
                    style={{
                        color: selectedValue === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        fontSize: "1.2em",
                        fontWeight: "500",
                    }}
                >
                    {selectedValue || "Electrical"}
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

function SelectPartName() {
    const [aisinpartname, setPartname] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const isFirstRender = useRef(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            let loc = backlocale + "sch/partname"
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
            setSelectedOptions([...aisinpartname]);
            setSelectedValue([...aisinpartname].join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            return;
        } else if (selectedOption === "clear") {
            const updatedSelectedOptions = selectedOptions.filter(
                (name) => name !== optionToRemove
            );
            setSelectedOptions(updatedSelectedOptions);
            const selectedValueOptions = updatedSelectedOptions.filter(
                (name) => name !== "Select All"
            );
            setSelectedValue(selectedValueOptions.join(", "));
            return;
        } else if (selectedOption.slice(-5) !== "clear") {
            const updatedSelectedOptions = [...selectedOptions];
            const index = updatedSelectedOptions.indexOf(selectedOption);
            if (index > -1) {
                updatedSelectedOptions.splice(index, 1);
            } else {
                updatedSelectedOptions.push(selectedOption);
            }
            setSelectedOptions(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            setSelectedValue(selectedValueOptions.join(", "));
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
        setSelectedValue(selectedValueOptions.join(", "));
        console.log(selectedValue);
    };
    return (
        <div className="selectDropdown-report" ref={selectDropdownRef}>
            <div className="select-btn-report" onClick={toggleDropdown}>
                <span
                    style={{
                        color: selectedValue === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        fontSize: "1.2em",
                        fontWeight: "500",
                    }}
                >
                    {selectedValue || "Clutch Cover"}
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

function ReportPage(/*{ type }*/) {
    const [activeKey, setActiveKey] = useState("1");
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
            content: <ProductPeriod />,
            closable: false,
        },
    ];

    const onChange = (activeKey) => {
        setActiveKey(activeKey);
    };

    const [value, setValue] = useState([30, 75]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const valueText = (value) => `${value}%`;
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
                                    <SelectCountries />
                                </div>
                                <p className="re-item">Car Maker</p>
                                <div>
                                    <SelectCarMaker />
                                </div>
                                <p className="re-item">Tranmission Type</p>
                                <div>
                                    <SelectTransmission />
                                </div>
                                <p className="re-item">Part Group</p>
                                <div>
                                    <SelectPartGroup />
                                </div>
                                <p className="re-item">Part Name</p>
                                <div>
                                    <SelectPartName />
                                </div>
                                <div className="from-to">
                                    <div className="from-input col">
                                        From
                                        <input
                                            type="year"
                                            className="from-year"
                                        />
                                    </div>
                                    <div className="to-input col">
                                        To
                                        <input
                                            type="year"
                                            className="to-year"
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
                                <button className="export">Export Data</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ReportPage;
