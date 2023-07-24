import React, { useState, useRef, useEffect } from "react";
import "./comp.styles/SearchCriteria.scss";
import right from "../img/Right.png";
import left from "../img/Left.png";
import down from "../img/Down.png";
import up from "../img/Up.png";
import glass from "../img/Glass.png";
import arrow from "../img/arrow.png";
import { backlocale } from "constants/constindex";

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

var loc;

function SelectSpeed(input) {
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
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            input.setSpd(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.speed = selectedValueOptions;
            console.log(initialValues.speed);
            return;
        } else if (selectedOption === "clear") {
            const updatedSelectedOptions = input.update.filter(
                (name) => name !== optionToRemove
            );
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = updatedSelectedOptions.filter(
                (name) => name !== "Select All"
            );
            input.setSpd(selectedValueOptions.join(", "));
            initialValues.speed = selectedValueOptions;
            console.log(initialValues.speed);
            return;
        } else if (selectedOption.slice(-5) !== "clear") {
            const index = input.update.indexOf(selectedOption);
            if (index > -1) {
                input.update.splice(index, 1);
            } else {
                input.update.push(selectedOption);
            }
            const selectedValueOptions = [...input.update];
            input.setSpd(selectedValueOptions.join(", "));
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
        input.setSpd(selectedValueOptions.join(", "));
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
                        color: input.spd === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {input.spd || "5"}
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
                            {input.spd.includes(name) && (
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

function SelectYear(input) {
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
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            input.setYear(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.year = selectedValueOptions;
            console.log(initialValues.year);
            return;
        } else if (selectedOption === "clear") {
            const updatedSelectedOptions = input.update.filter(
                (name) => name !== optionToRemove
            );
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = updatedSelectedOptions.filter(
                (name) => name !== "Select All"
            );
            input.setYear(selectedValueOptions.join(", "));
            initialValues.year = selectedValueOptions;
            console.log(initialValues.year);
            return;
        } else if (selectedOption.slice(-5) !== "clear") {
            const index = input.update.indexOf(selectedOption);
            if (index > -1) {
                input.update.splice(index, 1);
            } else {
                input.update.push(selectedOption);
            }
            const selectedValueOptions = [...input.update];
            input.setYear(selectedValueOptions.join(", "));
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
        input.setYear(selectedValueOptions.join(", "));
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
                        color: input.year === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {input.year || "2008"}
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
                            {input.year.includes(name) && (
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
        <div className="selectDropdown" ref={selectDropdownRef}>
            <div className="select-btn" onClick={toggleDropdown}>
                <span
                    style={{
                        color: input.country === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {input.country || "Thailand"}
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
                            {input.country.includes(name) && (
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
        <div className="selectDropdown" ref={selectDropdownRef}>
            <div className="select-btn" onClick={toggleDropdown}>
                <span
                    style={{
                        color: input.maker === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
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
                            {input.maker.includes(name) && (
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

function SelectModelName(input) {
    const [model_name, setModelName] = useState([]);
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const isFirstRender = useRef(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            loc = backlocale + "sch/modelcar";
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
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            input.setName(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.car_model_name = selectedValueOptions;
            console.log(initialValues.car_model_name);
            return;
        } else if (selectedOption === "clear") {
            const updatedSelectedOptions = input.update.filter(
                (name) => name !== optionToRemove
            );
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = updatedSelectedOptions.filter(
                (name) => name !== "Select All"
            );
            input.setName(selectedValueOptions.join(", "));
            initialValues.car_model_name = selectedValueOptions;
            console.log(initialValues.car_model_name);
            return;
        } else if (selectedOption.slice(-5) !== "clear") {
            const index = input.update.indexOf(selectedOption);
            if (index > -1) {
                input.update.splice(index, 1);
            } else {
                input.update.push(selectedOption);
            }
            const selectedValueOptions = [...input.update];
            input.setName(selectedValueOptions.join(", "));
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
        input.setName(selectedValueOptions.join(", "));
    };
    return (
        <div className="selectDropdown" ref={selectDropdownRef}>
            <div className="select-btn" onClick={toggleDropdown}>
                <span
                    style={{
                        color: input.name === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {input.name || "Hilux"}
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
                            {input.name.includes(name) && (
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

function SelectModelCode(input) {
    const [modelcode, setModelCode] = useState([]);
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const isFirstRender = useRef(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            loc = backlocale + "sch/modelcode";
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
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            input.setCode(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.model_code = selectedValueOptions;
            console.log(initialValues.model_code);
            return;
        } else if (selectedOption === "clear") {
            const updatedSelectedOptions = input.update.filter(
                (name) => name !== optionToRemove
            );
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = updatedSelectedOptions.filter(
                (name) => name !== "Select All"
            );
            input.setCode(selectedValueOptions.join(", "));
            initialValues.model_code = selectedValueOptions;
            console.log(initialValues.model_code);
            return;
        } else if (selectedOption.slice(-5) !== "clear") {
            const index = input.update.indexOf(selectedOption);
            if (index > -1) {
                input.update.splice(index, 1);
            } else {
                input.update.push(selectedOption);
            }
            const selectedValueOptions = [...input.update];
            input.setCode(selectedValueOptions.join(", "));
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
        input.setCode(selectedValueOptions.join(", "));
    };
    return (
        <div className="selectDropdown" ref={selectDropdownRef}>
            <div className="select-btn" onClick={toggleDropdown}>
                <span
                    style={{
                        color: input.code === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {input.code || "KUN15"}
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
                            {input.code.includes(name) && (
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

function SelectPosition(input) {
    const [driversposition, setPosition] = useState([]);
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const isFirstRender = useRef(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            loc = backlocale + "sch/position";
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
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            input.setPosition(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.drivers_position = selectedValueOptions;
            console.log(initialValues.drivers_position);
            return;
        } else if (selectedOption === "clear") {
            const updatedSelectedOptions = input.update.filter(
                (name) => name !== optionToRemove
            );
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = updatedSelectedOptions.filter(
                (name) => name !== "Select All"
            );
            input.setPosition(selectedValueOptions.join(", "));
            initialValues.drivers_position = selectedValueOptions;
            console.log(initialValues.drivers_position);
            return;
        } else if (selectedOption.slice(-5) !== "clear") {
            const index = input.update.indexOf(selectedOption);
            if (index > -1) {
                input.update.splice(index, 1);
            } else {
                input.update.push(selectedOption);
            }
            const selectedValueOptions = [...input.update];
            input.setPosition(selectedValueOptions.join(", "));
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
        input.setPosition(selectedValueOptions.join(", "));
    };
    return (
        <div className="selectDropdown" ref={selectDropdownRef}>
            <div className="select-btn" onClick={toggleDropdown}>
                <span
                    style={{
                        color: input.position === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {input.position || "RHD"}
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
                            {input.position.includes(name) && (
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

function SelectEngineCode(input) {
    const [enginemodel, setEngineCode] = useState([]);
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const isFirstRender = useRef(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            loc = backlocale + "sch/enginecode";
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
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            input.setEngine(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.engine_model = selectedValueOptions;
            console.log(initialValues.engine_model);
            return;
        } else if (selectedOption === "clear") {
            const updatedSelectedOptions = input.update.filter(
                (name) => name !== optionToRemove
            );
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = updatedSelectedOptions.filter(
                (name) => name !== "Select All"
            );
            input.setEngine(selectedValueOptions.join(", "));
            initialValues.engine_model = selectedValueOptions;
            console.log(initialValues.engine_model);
            return;
        } else if (selectedOption.slice(-5) !== "clear") {
            const index = input.update.indexOf(selectedOption);
            if (index > -1) {
                input.update.splice(index, 1);
            } else {
                input.update.push(selectedOption);
            }
            const selectedValueOptions = [...input.update];
            input.setEngine(selectedValueOptions.join(", "));
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
        input.setEngine(selectedValueOptions.join(", "));
    };
    return (
        <div className="selectDropdown" ref={selectDropdownRef}>
            <div className="select-btn" onClick={toggleDropdown}>
                <span
                    style={{
                        color: input.engine === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {input.engine || "1GRFE"}
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
                            {input.engine.includes(name) && (
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

function SelectDisplacement(input) {
    const [displacementcode, setDisplacement] = useState([]);
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const isFirstRender = useRef(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            loc = backlocale + "sch/displacement";
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
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            input.setDisplacement(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.displacement_code = selectedValueOptions;
            console.log(initialValues.displacement_code);
            return;
        } else if (selectedOption === "clear") {
            const updatedSelectedOptions = input.update.filter(
                (name) => name !== optionToRemove
            );
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = updatedSelectedOptions.filter(
                (name) => name !== "Select All"
            );
            input.setDisplacement(selectedValueOptions.join(", "));
            initialValues.displacement_code = selectedValueOptions;
            console.log(initialValues.displacement_code);
            return;
        } else if (selectedOption.slice(-5) !== "clear") {
            const index = input.update.indexOf(selectedOption);
            if (index > -1) {
                input.update.splice(index, 1);
            } else {
                input.update.push(selectedOption);
            }
            const selectedValueOptions = [...input.update];
            input.setDisplacement(selectedValueOptions.join(", "));
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
        input.setDisplacement(selectedValueOptions.join(", "));
    };
    return (
        <div className="selectDropdown" ref={selectDropdownRef}>
            <div className="select-btn" onClick={toggleDropdown}>
                <span
                    style={{
                        color: input.displacement === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {input.displacement || "4.0L"}
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
                            {input.displacement.includes(name) && (
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

function SelectFuel(input) {
    const [fueltype, setFuel] = useState([]);
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const isFirstRender = useRef(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            loc = backlocale + "sch/fuel";
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
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            input.setFuel(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.fuel_type = selectedValueOptions;
            console.log(initialValues.fuel_type);
            return;
        } else if (selectedOption === "clear") {
            const updatedSelectedOptions = input.update.filter(
                (name) => name !== optionToRemove
            );
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = updatedSelectedOptions.filter(
                (name) => name !== "Select All"
            );
            input.setFuel(selectedValueOptions.join(", "));
            initialValues.fuel_type = selectedValueOptions;
            console.log(initialValues.fuel_type);
            return;
        } else if (selectedOption.slice(-5) !== "clear") {
            const index = input.update.indexOf(selectedOption);
            if (index > -1) {
                input.update.splice(index, 1);
            } else {
                input.update.push(selectedOption);
            }
            const selectedValueOptions = [...input.update];
            input.setFuel(selectedValueOptions.join(", "));
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
        input.setFuel(selectedValueOptions.join(", "));
    };
    return (
        <div className="selectDropdown" ref={selectDropdownRef}>
            <div className="select-btn" onClick={toggleDropdown}>
                <span
                    style={{
                        color: input.fuel === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {input.fuel || "Gasoline"}
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
                            {input.fuel.includes(name) && (
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
        <div className="selectDropdown" ref={selectDropdownRef}>
            <div className="select-btn" onClick={toggleDropdown}>
                <span
                    style={{
                        color: input.trans === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
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
                            {input.trans.includes(name) && (
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

function SelectDrivertrain(input) {
    const [drivetrainNames, setDrivertrain] = useState([]);
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const isFirstRender = useRef(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            loc = backlocale + "sch/drivetrain"
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
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            input.setTrain(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.drivetrain = selectedValueOptions;
            console.log(initialValues.drivetrain);
            return;
        } else if (selectedOption === "clear") {
            const updatedSelectedOptions = input.update.filter(
                (name) => name !== optionToRemove
            );
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = updatedSelectedOptions.filter(
                (name) => name !== "Select All"
            );
            input.setTrain(selectedValueOptions.join(", "));
            initialValues.drivetrain = selectedValueOptions;
            console.log(initialValues.drivetrain);
            return;
        } else if (selectedOption.slice(-5) !== "clear") {
            const index = input.update.indexOf(selectedOption);
            if (index > -1) {
                input.update.splice(index, 1);
            } else {
                input.update.push(selectedOption);
            }
            const selectedValueOptions = [...input.update];
            input.setTrain(selectedValueOptions.join(", "));
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
        input.setTrain(selectedValueOptions.join(", "));
    };
    return (
        <div className="selectDropdown" ref={selectDropdownRef}>
            <div className="select-btn" onClick={toggleDropdown}>
                <span
                    style={{
                        color: input.train === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {input.train || "RWD"}
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
                            {input.train.includes(name) && (
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

function SelectPartName(input) {
    const [aisinpartname, setPartname] = useState([]);
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const isFirstRender = useRef(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            loc = backlocale + "sch/partname";
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
            initialValues.aisin_part_name = selectedValueOptions;
            console.log(initialValues.aisin_part_name);
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
            initialValues.aisin_part_name = selectedValueOptions;
            console.log(initialValues.aisin_part_name);
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
        input.setPart(selectedValueOptions.join(", "));
    };
    return (
        <div className="selectDropdown" ref={selectDropdownRef}>
            <div className="select-btn" onClick={toggleDropdown}>
                <span
                    style={{
                        color: input.part === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
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

function SelectOE(input) {
    const [partcode, setOE] = useState([]);
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const isFirstRender = useRef(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            loc = backlocale + "sch/oe"
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
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            input.setOe(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.part_code = selectedValueOptions;
            console.log(initialValues.part_code);
        } else if (selectedOption === "clear") {
            const updatedSelectedOptions = input.update.filter(
                (name) => name !== optionToRemove
            );
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = updatedSelectedOptions.filter(
                (name) => name !== "Select All"
            );
            input.setOe(selectedValueOptions.join(", "));
            initialValues.part_code = selectedValueOptions;
            console.log(initialValues.part_code);
            return;
        } else if (selectedOption.slice(-5) !== "clear") {
            const index = input.update.indexOf(selectedOption);
            if (index > -1) {
                input.update.splice(index, 1);
            } else {
                input.update.push(selectedOption);
            }
            const selectedValueOptions = [...input.update];
            input.setOe(selectedValueOptions.join(", "));
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
        input.setOe(selectedValueOptions.join(", "));
    };

    return (
        <div className="selectDropdown" ref={selectDropdownRef}>
            <div className="select-btn" onClick={toggleDropdown}>
                <span
                    style={{
                        color: input.oe === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {input.oe || "4882033010"}
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
                            {input.oe.includes(name) && (
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

function SelectAISIN(input) {
    const [aisinpremiumcode, setAISIN] = useState([]);
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const isFirstRender = useRef(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            loc = backlocale + "sch/aisin";
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
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            input.setAisin(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.aisin_premium_code = selectedValueOptions;
            console.log(initialValues.aisin_premium_code);
            return;
        } else if (selectedOption === "clear") {
            const updatedSelectedOptions = input.update.filter(
                (name) => name !== optionToRemove
            );
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = updatedSelectedOptions.filter(
                (name) => name !== "Select All"
            );
            input.setAisin(selectedValueOptions.join(", "));
            initialValues.aisin_premium_code = selectedValueOptions;
            console.log(initialValues.aisin_premium_code);
            return;
        } else if (selectedOption.slice(-5) !== "clear") {
            const index = input.update.indexOf(selectedOption);
            if (index > -1) {
                input.update.splice(index, 1);
            } else {
                input.update.push(selectedOption);
            }
            const selectedValueOptions = [...input.update];
            input.setAisin(selectedValueOptions.join(", "));
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
        input.setAisin(selectedValueOptions.join(", "));
    };
    return (
        <div className="selectDropdown" ref={selectDropdownRef}>
            <div className="select-btn" onClick={toggleDropdown}>
                <span
                    style={{
                        color: input.aisin === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {input.aisin || "AAT001"}
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
                            {input.aisin.includes(name) && (
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

function SelectCompetitor(input) {
    const [competiterpartcode, setCompetitor] = useState([]);
    const [showArrow, setShowArrow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const isFirstRender = useRef(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            loc = backlocale + "sch/competitor";
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
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = [...updatedSelectedOptions];
            input.setComp(selectedValueOptions.join(", "));
            const selectedOptionElements =
                document.querySelectorAll(".options li");
            selectedOptionElements.forEach((optionElement) =>
                optionElement.classList.add("selected")
            );
            initialValues.competiter_part_code = selectedValueOptions;
            console.log(initialValues.competiter_part_code);
            return;
        } else if (selectedOption === "clear") {
            const updatedSelectedOptions = input.update.filter(
                (name) => name !== optionToRemove
            );
            input.setUpdate(updatedSelectedOptions);
            const selectedValueOptions = updatedSelectedOptions.filter(
                (name) => name !== "Select All"
            );
            input.setComp(selectedValueOptions.join(", "));
            initialValues.competiter_part_code = selectedValueOptions;
            console.log(initialValues.competiter_part_code);
            return;
        } else if (selectedOption.slice(-5) !== "clear") {
            const index = input.update.indexOf(selectedOption);
            if (index > -1) {
                input.update.splice(index, 1);
            } else {
                input.update.push(selectedOption);
            }
            const selectedValueOptions = [...input.update];
            input.setComp(selectedValueOptions.join(", "));
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
        input.setComp(selectedValueOptions.join(", "));
    };
    return (
        <div className="selectDropdown" ref={selectDropdownRef}>
            <div className="select-btn" onClick={toggleDropdown}>
                <span
                    style={{
                        color: input.comp === "" ? "" : "black",
                        textOverflow: "clip",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {input.comp || "123456789"}
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
                            {input.comp.includes(name) && (
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
        let loc = backlocale + "table/result";
        fetch(loc, {
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
    const [spd, setSpd] = useState("");
    const [year, setYear] = useState("");
    const [country, setCountry] = useState("");
    const [maker, setMaker] = useState("");
    const [name, setName] = useState("");
    const [code, setCode] = useState("");

    const [position, setPosition] = useState("");
    const [engine, setEngine] = useState("");
    const [displacement, setDisplacement] = useState("");
    const [fuel, setFuel] = useState("");
    const [trans, setTrans] = useState("");

    const [train, setTrain] = useState("");
    const [part, setPart] = useState("");
    const [oe, setOe] = useState("");
    const [aisin, setAisin] = useState("");
    const [comp, setComp] = useState("");

    var [update1, setUpdate1] = useState([])
    var [update2, setUpdate2] = useState([])
    var [update3, setUpdate3] = useState([])
    var [update4, setUpdate4] = useState([])
    var [update5, setUpdate5] = useState([])
    var [update6, setUpdate6] = useState([])
    var [update7, setUpdate7] = useState([])
    var [update8, setUpdate8] = useState([])
    var [update9, setUpdate9] = useState([])
    var [update10, setUpdate10] = useState([])
    var [update11, setUpdate11] = useState([])
    var [update12, setUpdate12] = useState([])
    var [update13, setUpdate13] = useState([])
    var [update14, setUpdate14] = useState([])
    var [update15, setUpdate15] = useState([])
    var [update16, setUpdate16] = useState([])

    const handleReset = () => {
        setSpd("");
        setYear("");
        setCountry("");
        setMaker("");
        setName("");
        setCode("");
        setPosition("");
        setEngine("");
        setDisplacement("");
        setFuel("");
        setTrans(""); 
        setTrain("");
        setPart("");
        setOe("");
        setAisin("");
        setComp("");

        setUpdate1([]);
        setUpdate2([]);
        setUpdate3([]);
        setUpdate4([]);
        setUpdate5([]);
        setUpdate6([]);
        setUpdate7([]);
        setUpdate8([]);
        setUpdate9([]);
        setUpdate10([]);
        setUpdate11([]);
        setUpdate12([]);
        setUpdate13([]);
        setUpdate14([]);
        setUpdate15([]);
        setUpdate16([]);
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
                    <div className="boxcontent1">
                        <div className="searchBox">
                            <a> Sales Country </a>
                            <span>
                                <SelectCountries
                                    country={country}
                                    setCountry={setCountry}
                                    update = {update1}
                                    setUpdate = {setUpdate1}
                                />
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
                                            <SelectCarMaker
                                                maker={maker}
                                                setMaker={setMaker}
                                                update = {update2}
                                    setUpdate = {setUpdate2}
                                            />
                                        </span>
                                    </div>
                                    <div className="searchBox">
                                        <a> Model Name </a>
                                        <span>
                                            <SelectModelName
                                                name={name}
                                                setName={setName}
                                                update = {update3}
                                    setUpdate = {setUpdate3}
                                            />
                                        </span>
                                    </div>
                                    <div className="searchBox">
                                        <a> Model Code </a>
                                        <span>
                                            <SelectModelCode
                                                code={code}
                                                setCode={setCode}
                                                update = {update4}
                                    setUpdate = {setUpdate4}
                                            />
                                        </span>
                                    </div>
                                    <div className="searchBox">
                                        <a> Year </a>
                                        <span>
                                            <SelectYear
                                                year={year}
                                                setYear={setYear}
                                                update = {update5}
                                    setUpdate = {setUpdate5}
                                            />
                                        </span>
                                    </div>
                                    <div className="searchBox">
                                        <a> Driver's Position </a>
                                        <span>
                                            <SelectPosition
                                                position={position}
                                                setPosition={setPosition}
                                                update = {update6}
                                    setUpdate = {setUpdate6}
                                            />
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
                                            <SelectEngineCode
                                                engine={engine}
                                                setEngine={setEngine}
                                                update = {update7}
                                    setUpdate = {setUpdate7}
                                            />
                                        </span>
                                    </div>
                                    <div className="searchBox">
                                        <a> Displacement </a>
                                        <span>
                                            <SelectDisplacement
                                                displacement={displacement}
                                                setDisplacement={
                                                    setDisplacement
                                                }
                                                update = {update8}
                                    setUpdate = {setUpdate8}
                                            />
                                        </span>
                                    </div>
                                    <div className="searchBox">
                                        <a> Fuel Type </a>
                                        <span>
                                            <SelectFuel
                                                fuel={fuel}
                                                setFule={setFuel}
                                                update = {update9}
                                    setUpdate = {setUpdate9}
                                            />
                                        </span>
                                    </div>
                                    <div className="searchBox">
                                        <a> Transmission Type </a>
                                        <span>
                                            <SelectTransmission
                                                trans={trans}
                                                setTrans={setTrans}
                                                update = {update10}
                                    setUpdate = {setUpdate10}
                                            />
                                        </span>
                                    </div>
                                    <div className="searchBox">
                                        <a> Speed </a>
                                        <span>
                                            <SelectSpeed
                                                spd={spd}
                                                setPds={setSpd}
                                                update = {update11}
                                    setUpdate = {setUpdate11}
                                            />
                                        </span>
                                    </div>
                                    <div className="searchBox">
                                        <a> Drivetrain </a>
                                        <span>
                                            <SelectDrivertrain
                                                train={train}
                                                setTrain={setTrain}
                                                update = {update12}
                                    setUpdate = {setUpdate12}
                                            />
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
                                            <SelectPartName
                                                part={part}
                                                setPart={setPart}
                                                update = {update13}
                                    setUpdate = {setUpdate13}
                                            />
                                        </span>
                                    </div>
                                    <div className="searchBox">
                                        <a> OE number </a>
                                        <span>
                                            <SelectOE oe={oe} setOe={setOe} 
                                            update = {update14}
                                            setUpdate = {setUpdate14}/>
                                        </span>
                                    </div>
                                    <div className="searchBox">
                                        <a> AISIN number </a>
                                        <span>
                                            <SelectAISIN
                                                aisin={aisin}
                                                setAisin={setAisin}
                                                update = {update15}
                                    setUpdate = {setUpdate15}
                                            />
                                        </span>
                                    </div>
                                    <div className="searchBox">
                                        <a> Competitor number </a>
                                        <span>
                                            <SelectCompetitor
                                                comp={comp}
                                                setComp={setComp}
                                                update = {update16}
                                    setUpdate = {setUpdate16}
                                            />
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
                        <button
                            type="reset"
                            value="Reset"
                            id="Reset"
                            onClick={handleReset}
                        >
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
