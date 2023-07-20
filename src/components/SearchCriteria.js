import React, { useState, useRef, useEffect } from "react";
import "./comp.styles/SearchCriteria.css";
import right from "../img/Right.png";
import left from "../img/Left.png";
import down from "../img/Down.png";
import up from "../img/Up.png";
import glass from "../img/Glass.png";
import arrow from "../img/arrow.png";
import { ResultList } from "./ResultList/ResultList";

let reset = 0;

const initialValues = {
    country_name: "",
    manufacturer_name: "",
    car_model_name: "",
    model_code: "",
    drivers_position: "",
    engine_model: "",
    displacement_code: "",
    fuel_type: "",
    transmission_type: "",
    drivetrain: "",
    aisin_part_name: "",
    part_code: "",
    aisin_premium_code: "",
    competiter_part_code: "",
    speed: "",
    year: "",
};

function SelectSpeed() {
    const [selectedValue, setSelectedValue] = useState("");
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOptions, setSelectedOptions] = useState([]);
    const options = ["3", "4", "5", "6", "7", "8", "9", "10", "-"];

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
            const updatedSelectedOptions = [...options];
            setSelectedOptions(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            setSelectedValue(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.speed = selectedValueOptions;
            console.log(initialValues.speed);
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
            initialValues.speed = selectedValueOptions;
            console.log(initialValues.speed);
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
            initialValues.speed = selectedValueOptions;
            console.log(initialValues.speed);
            return;
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filtered = options.filter(
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
    };

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

    return (
        <div className="selectDropdown" ref={selectDropdownRef}>
            <div className="select-btn" onClick={toggleDropdown}>
                <span
                    style={{
                        color: selectedValue === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {selectedValue || "5"}
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
            <div className="content">
                <div className="search">
                    <i>
                        <img src={glass} id="Glass" alt="search icon" />
                    </i>
                    <input
                        className="select-css"
                        type="text"
                        placeholder=""
                        autoComplete="off"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <ul className="options">
                    <li key="*" onClick={handleSelection}>
                        Select All
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

function SelectYear() {
    const [selectedValue, setSelectedValue] = useState("");
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOptions, setSelectedOptions] = useState([]);
    const options = [];
    const thisYear = new Date().getFullYear();
    const defaultValue = 1980;

    for (let i = 0; i <= thisYear - defaultValue; i++) {
        const years = defaultValue + i;
        options.push("" + years);
    }

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
            const updatedSelectedOptions = [...options];
            setSelectedOptions(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            setSelectedValue(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.year = selectedValueOptions;
            console.log(initialValues.year);
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
            initialValues.year = selectedValueOptions;
            console.log(initialValues.year);
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
            initialValues.year = selectedValueOptions;
            console.log(initialValues.year);
            return;
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filtered = options.filter(
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
    };

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

    return (
        <div className="selectDropdown" ref={selectDropdownRef}>
            <div className="select-btn" onClick={toggleDropdown}>
                <span
                    style={{
                        color: selectedValue === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {selectedValue || "2008"}
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
            <div className="content">
                <div className="search">
                    <i>
                        <img src={glass} id="Glass" alt="search icon" />
                    </i>
                    <input
                        className="select-css"
                        type="text"
                        placeholder=""
                        autoComplete="off"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <ul className="options">
                    <li key="*" onClick={handleSelection}>
                        Select All
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
            fetch("http://localhost:5000/sch/countries", {
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
            setSelectedOptions(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            setSelectedValue(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.country_name = selectedValueOptions;
            console.log(initialValues.country_name);
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
            initialValues.country_name = selectedValueOptions;
            console.log(initialValues.country_name);
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
        setSelectedValue(selectedValueOptions.join(", "));
        console.log(selectedValue);
    };
    return (
        <div className="selectDropdown" ref={selectDropdownRef}>
            <div className="select-btn" onClick={toggleDropdown}>
                <span
                    style={{
                        color: selectedValue === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {selectedValue || "Thailand"}
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
            <div className="content">
                <div className="search">
                    <i>
                        <img src={glass} id="Glass" alt="search icon" />
                    </i>
                    <input
                        className="select-css"
                        type="text"
                        list="countries"
                        placeholder=""
                        autoComplete="off"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <ul className="options">
                    <li key="*" onClick={handleSelection}>
                        Select All
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
            fetch("http://localhost:5000/sch/maker", {
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
            setSelectedOptions(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            setSelectedValue(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.manufacturer_name = selectedValueOptions;
            console.log(initialValues.manufacturer_name);
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
            initialValues.manufacturer_name = selectedValueOptions;
            console.log(initialValues.manufacturer_name);
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
        setSelectedValue(selectedValueOptions.join(", "));
        console.log(selectedValue);
    };

    return (
        <div className="selectDropdown" ref={selectDropdownRef}>
            <div className="select-btn" onClick={toggleDropdown}>
                <span
                    style={{
                        color: selectedValue === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {selectedValue || "Toyota"}
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
            <div className="content">
                <div className="search">
                    <i>
                        <img src={glass} id="Glass" alt="search icon" />
                    </i>
                    <input
                        className="select-css"
                        type="text"
                        list="countries"
                        placeholder=""
                        autoComplete="off"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <ul className="options">
                    <li key="*" onClick={handleSelection}>
                        Select All
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

function SelectModelName() {
    const [model_name, setModelName] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const isFirstRender = useRef(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            fetch("http://localhost:5000/sch/modelcar", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(""),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data && data.car_model_name) {
                        setModelName(Object.values(data.car_model_name));
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
            const updatedSelectedOptions = [...model_name];
            setSelectedOptions(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            setSelectedValue(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.car_model_name = selectedValueOptions;
            console.log(initialValues.car_model_name);
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
            initialValues.car_model_name = selectedValueOptions;
            console.log(initialValues.car_model_name);
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
            initialValues.car_model_name = selectedValueOptions;
            console.log(initialValues.car_model_name);
            return;
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filtered = model_name.filter(
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
        <div className="selectDropdown" ref={selectDropdownRef}>
            <div className="select-btn" onClick={toggleDropdown}>
                <span
                    style={{
                        color: selectedValue === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {selectedValue || "Hilux"}
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
            <div className="content">
                <div className="search">
                    <i>
                        <img src={glass} id="Glass" alt="search icon" />
                    </i>
                    <input
                        className="select-css"
                        type="text"
                        list="countries"
                        placeholder=""
                        autoComplete="off"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <ul className="options">
                    <li key="*" onClick={handleSelection}>
                        Select All
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

function SelectModelCode() {
    const [modelcode, setModelCode] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const isFirstRender = useRef(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            fetch("http://localhost:5000/sch/modelcode", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(""),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data && data.model_code) {
                        setModelCode(Object.values(data.model_code));
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
            const updatedSelectedOptions = [...modelcode];
            setSelectedOptions(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            setSelectedValue(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.model_code = selectedValueOptions;
            console.log(initialValues.model_code);
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
            initialValues.model_code = selectedValueOptions;
            console.log(initialValues.model_code);
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
            initialValues.model_code = selectedValueOptions;
            console.log(initialValues.model_code);
            return;
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filtered = modelcode.filter(
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
        <div className="selectDropdown" ref={selectDropdownRef}>
            <div className="select-btn" onClick={toggleDropdown}>
                <span
                    style={{
                        color: selectedValue === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {selectedValue || "KUN15"}
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
            <div className="content">
                <div className="search">
                    <i>
                        <img src={glass} id="Glass" alt="search icon" />
                    </i>
                    <input
                        className="select-css"
                        type="text"
                        list="countries"
                        placeholder=""
                        autoComplete="off"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <ul className="options">
                    <li key="*" onClick={handleSelection}>
                        Select All
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

function SelectPosition() {
    const [driversposition, setPosition] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const isFirstRender = useRef(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            fetch("http://localhost:5000/sch/position", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(""),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data && data.drivers_position) {
                        setPosition(Object.values(data.drivers_position));
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
            const updatedSelectedOptions = [...driversposition];
            setSelectedOptions(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            setSelectedValue(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.drivers_position = selectedValueOptions;
            console.log(initialValues.drivers_position);
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
            initialValues.drivers_position = selectedValueOptions;
            console.log(initialValues.drivers_position);
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
            initialValues.drivers_position = selectedValueOptions;
            console.log(initialValues.drivers_position);
            return;
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filtered = driversposition.filter(
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
        <div className="selectDropdown" ref={selectDropdownRef}>
            <div className="select-btn" onClick={toggleDropdown}>
                <span
                    style={{
                        color: selectedValue === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {selectedValue || "RHD"}
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
            <div className="content">
                <div className="search">
                    <i>
                        <img src={glass} id="Glass" alt="search icon" />
                    </i>
                    <input
                        className="select-css"
                        type="text"
                        list="countries"
                        placeholder=""
                        autoComplete="off"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <ul className="options">
                    <li key="*" onClick={handleSelection}>
                        Select All
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

function SelectEngineCode() {
    const [enginemodel, setEngineCode] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const isFirstRender = useRef(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            fetch("http://localhost:5000/sch/enginecode", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(""),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data && data.engine_model) {
                        setEngineCode(Object.values(data.engine_model));
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
            const updatedSelectedOptions = [...enginemodel];
            setSelectedOptions(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            setSelectedValue(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.engine_model = selectedValueOptions;
            console.log(initialValues.engine_model);
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
            initialValues.engine_model = selectedValueOptions;
            console.log(initialValues.engine_model);
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
            initialValues.engine_model = selectedValueOptions;
            console.log(initialValues.engine_model);
            return;
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filtered = enginemodel.filter(
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
        <div className="selectDropdown" ref={selectDropdownRef}>
            <div className="select-btn" onClick={toggleDropdown}>
                <span
                    style={{
                        color: selectedValue === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {selectedValue || "1GRFE"}
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
            <div className="content">
                <div className="search">
                    <i>
                        <img src={glass} id="Glass" alt="search icon" />
                    </i>
                    <input
                        className="select-css"
                        type="text"
                        list="countries"
                        placeholder=""
                        autoComplete="off"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <ul className="options">
                    <li key="*" onClick={handleSelection}>
                        Select All
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

function SelectDisplacement() {
    const [displacementcode, setDisplacement] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const isFirstRender = useRef(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            fetch("http://localhost:5000/sch/displacement", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(""),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data && data.displacement_code) {
                        setDisplacement(Object.values(data.displacement_code));
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
            const updatedSelectedOptions = [...displacementcode];
            setSelectedOptions(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            setSelectedValue(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.displacement_code = selectedValueOptions;
            console.log(initialValues.displacement_code);
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
            initialValues.displacement_code = selectedValueOptions;
            console.log(initialValues.displacement_code);
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
            initialValues.displacement_code = selectedValueOptions;
            console.log(initialValues.displacement_code);
            return;
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filtered = displacementcode.filter(
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
        <div className="selectDropdown" ref={selectDropdownRef}>
            <div className="select-btn" onClick={toggleDropdown}>
                <span
                    style={{
                        color: selectedValue === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {selectedValue || "4.0L"}
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
            <div className="content">
                <div className="search">
                    <i>
                        <img src={glass} id="Glass" alt="search icon" />
                    </i>
                    <input
                        className="select-css"
                        type="text"
                        list="countries"
                        placeholder=""
                        autoComplete="off"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <ul className="options">
                    <li key="*" onClick={handleSelection}>
                        Select All
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

function SelectFuel() {
    const [fueltype, setFuel] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const isFirstRender = useRef(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            fetch("http://localhost:5000/sch/fuel", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(""),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data && data.fuel_type) {
                        setFuel(Object.values(data.fuel_type));
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
            const updatedSelectedOptions = [...fueltype];
            setSelectedOptions(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            setSelectedValue(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.fuel_type = selectedValueOptions;
            console.log(initialValues.fuel_type);
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
            initialValues.fuel_type = selectedValueOptions;
            console.log(initialValues.fuel_type);
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
            initialValues.fuel_type = selectedValueOptions;
            console.log(initialValues.fuel_type);
            return;
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filtered = fueltype.filter(
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
        <div className="selectDropdown" ref={selectDropdownRef}>
            <div className="select-btn" onClick={toggleDropdown}>
                <span
                    style={{
                        color: selectedValue === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {selectedValue || "Gasoline"}
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
            <div className="content">
                <div className="search">
                    <i>
                        <img src={glass} id="Glass" alt="search icon" />
                    </i>
                    <input
                        className="select-css"
                        type="text"
                        list="countries"
                        placeholder=""
                        autoComplete="off"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <ul className="options">
                    <li key="*" onClick={handleSelection}>
                        Select All
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
            fetch("http://localhost:5000/sch/transmission", {
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
            setSelectedOptions(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            setSelectedValue(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.transmission_type = selectedValueOptions;
            console.log(initialValues.transmission_type);
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
            initialValues.transmission_type = selectedValueOptions;
            console.log(initialValues.transmission_type);
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
        setSelectedValue(selectedValueOptions.join(", "));
        console.log(selectedValue);
    };
    return (
        <div className="selectDropdown" ref={selectDropdownRef}>
            <div className="select-btn" onClick={toggleDropdown}>
                <span
                    style={{
                        color: selectedValue === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {selectedValue || "MT"}
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
            <div className="content">
                <div className="search">
                    <i>
                        <img src={glass} id="Glass" alt="search icon" />
                    </i>
                    <input
                        className="select-css"
                        type="text"
                        list="countries"
                        placeholder=""
                        autoComplete="off"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <ul className="options">
                    <li key="*" onClick={handleSelection}>
                        Select All
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

function SelectDrivertrain() {
    const [drivetrainNames, setDrivertrain] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const isFirstRender = useRef(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            fetch("http://localhost:5000/sch/drivetrain", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(""),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data && data.drivetrain) {
                        setDrivertrain(Object.values(data.drivetrain));
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
            const updatedSelectedOptions = [...drivetrainNames];
            setSelectedOptions(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            setSelectedValue(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.drivetrain = selectedValueOptions;
            console.log(initialValues.drivetrain);
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
            initialValues.drivetrain = selectedValueOptions;
            console.log(initialValues.drivetrain);
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
            initialValues.drivetrain = selectedValueOptions;
            console.log(initialValues.drivetrain);
            return;
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filtered = drivetrainNames.filter(
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
        <div className="selectDropdown" ref={selectDropdownRef}>
            <div className="select-btn" onClick={toggleDropdown}>
                <span
                    style={{
                        color: selectedValue === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {selectedValue || "RWD"}
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
            <div className="content">
                <div className="search">
                    <i>
                        <img src={glass} id="Glass" alt="search icon" />
                    </i>
                    <input
                        className="select-css"
                        type="text"
                        list="countries"
                        placeholder=""
                        autoComplete="off"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <ul className="options">
                    <li key="*" onClick={handleSelection}>
                        Select All
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
            fetch("http://localhost:5000/sch/partname", {
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
            setSelectedOptions(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            setSelectedValue(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.aisin_part_name = selectedValueOptions;
            console.log(initialValues.aisin_part_name);
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
            initialValues.aisin_part_name = selectedValueOptions;
            console.log(initialValues.aisin_part_name);
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
            initialValues.aisin_part_name = selectedValueOptions;
            console.log(initialValues.aisin_part_name);
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
        <div className="selectDropdown" ref={selectDropdownRef}>
            <div className="select-btn" onClick={toggleDropdown}>
                <span
                    style={{
                        color: selectedValue === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {selectedValue || "Clutch Cover"}
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
            <div className="content">
                <div className="search">
                    <i>
                        <img src={glass} id="Glass" alt="search icon" />
                    </i>
                    <input
                        className="select-css"
                        type="text"
                        list="countries"
                        placeholder=""
                        autoComplete="off"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <ul className="options">
                    <li key="*" onClick={handleSelection}>
                        Select All
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

function SelectOE() {
    const [partcode, setOE] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const isFirstRender = useRef(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            fetch("http://localhost:5000/sch/oe", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(""),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data && data.part_code) {
                        setOE(Object.values(data.part_code));
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
            const updatedSelectedOptions = [...partcode];
            setSelectedOptions(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            setSelectedValue(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.part_code = selectedValueOptions;
            console.log(initialValues.part_code);
        } else if (selectedOption === "clear") {
            const updatedSelectedOptions = selectedOptions.filter(
                (name) => name !== optionToRemove
            );
            setSelectedOptions(updatedSelectedOptions);
            const selectedValueOptions = updatedSelectedOptions.filter(
                (name) => name !== "Select All"
            );
            setSelectedValue(selectedValueOptions.join(", "));
            initialValues.part_code = selectedValueOptions;
            console.log(initialValues.part_code);
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
            initialValues.part_code = selectedValueOptions;
            console.log(initialValues.part_code);
            return;
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filtered = partcode.filter(
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
        <div className="selectDropdown" ref={selectDropdownRef}>
            <div className="select-btn" onClick={toggleDropdown}>
                <span
                    style={{
                        color: selectedValue === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {selectedValue || "4882033010"}
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
            <div className="content">
                <div className="search">
                    <i>
                        <img src={glass} id="Glass" alt="search icon" />
                    </i>
                    <input
                        className="select-css"
                        type="text"
                        list="countries"
                        placeholder=""
                        autoComplete="off"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <ul className="options">
                    <li key="*" onClick={handleSelection}>
                        Select All
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

function SelectAISIN() {
    const [aisinpremiumcode, setAISIN] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const isFirstRender = useRef(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            fetch("http://localhost:5000/sch/aisin", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(""),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data && data.aisin_premium_code) {
                        setAISIN(Object.values(data.aisin_premium_code));
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
            const updatedSelectedOptions = [...aisinpremiumcode];
            setSelectedOptions(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            setSelectedValue(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.aisin_premium_code = selectedValueOptions;
            console.log(initialValues.aisin_premium_code);
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
            initialValues.aisin_premium_code = selectedValueOptions;
            console.log(initialValues.aisin_premium_code);
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
            initialValues.aisin_premium_code = selectedValueOptions;
            console.log(initialValues.aisin_premium_code);
            return;
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filtered = aisinpremiumcode.filter(
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
        <div className="selectDropdown" ref={selectDropdownRef}>
            <div className="select-btn" onClick={toggleDropdown}>
                <span
                    style={{
                        color: selectedValue === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {selectedValue || "AAT001"}
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
            <div className="content">
                <div className="search">
                    <i>
                        <img src={glass} id="Glass" alt="search icon" />
                    </i>
                    <input
                        className="select-css"
                        type="text"
                        list="countries"
                        placeholder=""
                        autoComplete="off"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <ul className="options">
                    <li key="*" onClick={handleSelection}>
                        Select All
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

function SelectCompetitor() {
    const [competiterpartcode, setCompetitor] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const isFirstRender = useRef(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            fetch("http://localhost:5000/sch/competitor", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(""),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data && data.competiter_part_code) {
                        setCompetitor(Object.values(data.competiter_part_code));
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
            const updatedSelectedOptions = [...competiterpartcode];
            setSelectedOptions(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            setSelectedValue(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.competiter_part_code = selectedValueOptions;
            console.log(initialValues.competiter_part_code);
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
            initialValues.competiter_part_code = selectedValueOptions;
            console.log(initialValues.competiter_part_code);
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
            initialValues.competiter_part_code = selectedValueOptions;
            console.log(initialValues.competiter_part_code);
            return;
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filtered = competiterpartcode.filter(
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
    };
    return (
        <div className="selectDropdown" ref={selectDropdownRef}>
            <div className="select-btn" onClick={toggleDropdown}>
                <span
                    style={{
                        color: selectedValue === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {selectedValue || "123456789"}
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
            <div className="content">
                <div className="search">
                    <i>
                        <img src={glass} id="Glass" alt="search icon" />
                    </i>
                    <input
                        className="select-css"
                        type="text"
                        list="countries"
                        placeholder=""
                        autoComplete="off"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <ul className="options">
                    <li key="*" onClick={handleSelection}>
                        Select All
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

const SearchCriteria = (props) => {
    const sidebarClass = props.isOpen ? "sidebar open" : "sidebar";

    const [openBasic, setOpenBasic] = useState(true);
    const handleOpenBasic = () => {
        setOpenBasic(!openBasic);
        setOpenArrow1(!arrow1);
    };
    const [openDetailed, setOpenDetailed] = useState(true);
    const handleOpenDetailed = () => {
        setOpenDetailed(!openDetailed);
        setOpenArrow2(!arrow2);
    };
    const [openPart, setOpenPart] = useState(true);
    const handleOpenPart = () => {
        setOpenPart(!openPart);
        setOpenArrow3(!arrow3);
    };
    const [show, showSidebar] = useState(false);
    const handleSidebar = () => {
        props.toggleSidebar();
        showSidebar(!show);
    };
    const [arrow1, setOpenArrow1] = useState(false);
    const [arrow2, setOpenArrow2] = useState(false);
    const [arrow3, setOpenArrow3] = useState(false);

    const [formValues, setFormvalues] = useState(initialValues);
    const handleSubmit = (e) => {
        e.preventDefault();
        let count = 1;
        if (
            !initialValues.aisin_part_name &&
            !initialValues.part_code &&
            !initialValues.aisin_premium_code &&
            !initialValues.competiter_part_code
        )
            count = 0;
        console.log(count);
        fetch("http://localhost:5000/table/result", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                    "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            },
            body: JSON.stringify(formValues),
        })
            .catch((err) => {
                return;
            })
            .then((res) => {
                if (!res || !res.ok || res.status >= 400) {
                    return;
                }
                return res.json();
            })
            .then((data) => {
                if (!data) return;
                if (data.status === "There is no car matched your search") {
                    props.onAdd(data.status, count);
                    return;
                } else {
                    console.log(data.table);
                    props.onAdd(data.table, count);
                    console.log(formValues);
                    return;
                }
            });
    };

    return (
        <div className={sidebarClass}>
            <div className="searchTitle">
                <a>Search by Vehicle Info and/or Part Info</a>
                <button onClick={handleSidebar}>
                    <img src={right} alt="Right" />
                </button>
            </div>
            <div className="searchScroll" id="scroll-style">
                <div>
                    <div className="boxcontent">
                        <div className="searchBox">
                            <a> Sales Country </a>
                            <span>
                                <SelectCountries />
                            </span>
                        </div>
                        <br></br>
                        <div className="subSearch">
                            <button
                                className="subSearchbtn"
                                onClick={handleOpenBasic}
                            >
                                Basic Info
                                {arrow1 && <img src={down} alt="Down"></img>}
                                {openBasic && <img src={up} alt="Up"></img>}
                            </button>
                            {openBasic && (
                                <>
                                    <div className="searchBox">
                                        <a> Car Maker </a>
                                        <span>
                                            <SelectCarMaker />{" "}
                                        </span>
                                    </div>
                                    <div className="searchBox">
                                        <a> Model Name </a>
                                        <span>
                                            <SelectModelName />
                                        </span>
                                    </div>
                                    <div className="searchBox">
                                        <a> Model Code </a>
                                        <span>
                                            <SelectModelCode />
                                        </span>
                                    </div>
                                    <div className="searchBox">
                                        <a> Year </a>
                                        <span>
                                            <SelectYear />
                                        </span>
                                    </div>
                                    <div className="searchBox">
                                        <a> Driver's Position </a>
                                        <span>
                                            <SelectPosition />
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                        <br></br>
                        <div className="subSearch">
                            <button
                                className="subSearchbtn"
                                onClick={handleOpenDetailed}
                            >
                                Detailed Info
                                {arrow2 && <img src={down} alt="Down"></img>}
                                {openDetailed && <img src={up} alt="Up"></img>}
                            </button>
                            {openDetailed && (
                                <>
                                    <div className="searchBox">
                                        <a> Engine Code </a>
                                        <span>
                                            <SelectEngineCode />
                                        </span>
                                    </div>
                                    <div className="searchBox">
                                        <a> Displacement </a>
                                        <span>
                                            <SelectDisplacement />
                                        </span>
                                    </div>
                                    <div className="searchBox">
                                        <a> Fuel Type </a>
                                        <span>
                                            <SelectFuel />
                                        </span>
                                    </div>
                                    <div className="searchBox">
                                        <a> Transmission Type </a>
                                        <span>
                                            <SelectTransmission />
                                        </span>
                                    </div>
                                    <div className="searchBox">
                                        <a> Speed </a>
                                        <span>
                                            <SelectSpeed />
                                        </span>
                                    </div>
                                    <div className="searchBox">
                                        <a> Drivetrain </a>
                                        <span>
                                            <SelectDrivertrain />
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                        <br></br>
                        <div className="subSearch">
                            <button
                                className="subSearchbtn"
                                onClick={handleOpenPart}
                            >
                                Part Info
                                {arrow3 && <img src={down} alt="Down"></img>}
                                {openPart && <img src={up} alt="Up"></img>}
                            </button>
                            {openPart && (
                                <>
                                    <div className="searchBox">
                                        <a> Part Name </a>
                                        <span>
                                            <SelectPartName />
                                        </span>
                                    </div>
                                    <div className="searchBox">
                                        <a> OE number </a>
                                        <span>
                                            <SelectOE />
                                        </span>
                                    </div>
                                    <div className="searchBox">
                                        <a> AISIN number </a>
                                        <span>
                                            <SelectAISIN />
                                        </span>
                                    </div>
                                    <div className="searchBox">
                                        <a> Competitor number </a>
                                        <span>
                                            <SelectCompetitor />
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="submitbtn">
                        <button
                            type="submit"
                            value="Submit"
                            id="Submit"
                            onClick={handleSubmit}
                        >
                            Go
                        </button>
                        <button type="reset" value="Reset" id="Reset">
                            Clear
                        </button>
                    </div>
                    {show && (
                        <button
                            onClick={handleSidebar}
                            className="sidebar-toggle"
                        >
                            <img src={left} alt="Left" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export { SearchCriteria };
