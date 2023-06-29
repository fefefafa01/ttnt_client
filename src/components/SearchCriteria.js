import React, { useState, useEffect } from "react";
import "./comp.styles/SearchCriteria.css";
import CountryOptions from "./CountryOptions";
import right from "../img/Right.png";
import left from "../img/Left.png";

const SelectOption = (option) => {
  const [selectedValue, setSelectedValue] = useState({});
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };
  return (
    <div>
      <select
        className="select-css"
        value={selectedValue}
        onChange={handleChange}
      >
        <option value="Thailand"> Thailand </option>
      </select>
    </div>
  );
};

const SearchCriteria = (props) => {
  const sidebarClass = props.isOpen ? "sidebar open" : "sidebar";
  const [openBasic, setOpenBasic] = useState(true);
  const handleOpenBasic = () => {
    setOpenBasic(!openBasic);
  };
  const [openDetailed, setOpenDetailed] = useState(true);
  const handleOpenDetailed = () => {
    setOpenDetailed(!openDetailed);
  };
  const [openPart, setOpenPart] = useState(true);
  const handleOpenPart = () => {
    setOpenPart(!openPart);
  };
  const [show, showSidebar] = useState(false);
  const handleSidebar = () => {
    showSidebar(!show);
  };

  const initialValues = {
    country: "",
    carMaker: "",
    modelName: "",
    modelCode: "",
    year: "",
    driverPosition: "",
    engineCode: "",
    displacement: "",
    fuelType: "",
    transmissionType: "",
    speed: "",
    drivetrain: "",
    partName: "",
    oeNumber: "",
    aisinNumber: "",
    competitorNumber: "",
  };
  const [formValues, setFormvalues] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/sch/search", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      body: JSON.stringify(formValues),
    });
  };

  return (
    <div className={sidebarClass}>
      <div className="searchTitle">
        <a>Search by Vehicle Info and/or Part Info</a>
        <button onClick={handleSidebar}>
          <img src={right} alt="Right" onClick={props.toggleSidebar} />
        </button>
      </div>
      <div className="searchScroll" id="scroll-style">
        <div className="boxcontent">
          <div className="searchBox">
            <a> Sales Country </a>
            <span> {SelectOption(CountryOptions)} </span>
          </div>
          <br></br>
          <div className="subSearch">
            <button className="subSearchbtn" onClick={handleOpenBasic}>
              Basic Info
            </button>
            {openBasic && (
              <>
                <div className="searchBox">
                  <a> Car Maker </a>
                  <span>
                    <SelectOption />
                  </span>
                </div>
                <div className="searchBox">
                  <a> Model Name </a>
                  <span>
                    <SelectOption />
                  </span>
                </div>
                <div className="searchBox">
                  <a> Model Code </a>
                  <span>
                    <SelectOption />
                  </span>
                </div>
                <div className="searchBox">
                  <a> Year </a>
                  <span>
                    <SelectOption />
                  </span>
                </div>
                <div className="searchBox">
                  <a> Driver's Position </a>
                  <span>
                    <SelectOption />
                  </span>
                </div>
              </>
            )}
          </div>
          <br></br>
          <div className="subSearch">
            <button className="subSearchbtn" onClick={handleOpenDetailed}>
              Detailed Info
            </button>
            {openDetailed && (
              <>
                <div className="searchBox">
                  <a> Engine Code </a>
                  <span>
                    <SelectOption />
                  </span>
                </div>
                <div className="searchBox">
                  <a> Displacement </a>
                  <span>
                    <SelectOption />
                  </span>
                </div>
                <div className="searchBox">
                  <a> Fuel Type </a>
                  <span>
                    <SelectOption />
                  </span>
                </div>
                <div className="searchBox">
                  <a> Transmission Type </a>
                  <span>
                    <SelectOption />
                  </span>
                </div>
                <div className="searchBox">
                  <a> Speed </a>
                  <span>
                    <SelectOption />
                  </span>
                </div>
                <div className="searchBox">
                  <a> Drivetrain </a>
                  <span>
                    <SelectOption />
                  </span>
                </div>
              </>
            )}
          </div>
          <br></br>
          <div className="subSearch">
            <button className="subSearchbtn" onClick={handleOpenPart}>
              Part Info
            </button>
            {openPart && (
              <>
                <div className="searchBox">
                  <a> Part Name </a>
                  <span>
                    <SelectOption />
                  </span>
                </div>
                <div className="searchBox">
                  <a> OE number </a>
                  <span>
                    <SelectOption />
                  </span>
                </div>
                <div className="searchBox">
                  <a> AISIN number </a>
                  <span>
                    <SelectOption />
                  </span>
                </div>
                <div className="searchBox">
                  <a> Competitor number </a>
                  <span>
                    <SelectOption />
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="submitbtn">
        <button type="submit" value="Submit" id="Submit" onClick={handleSubmit}>
          Submit
        </button>
        <button type="clear" value="Clear" id="Clear">
          Clear
        </button>
      </div>
      {show && (
        <button onClick={handleSidebar} className="sidebar-toggle">
          <img src={left} alt="Left" onClick={props.toggleSidebar} />
        </button>
      )}
    </div>
  );
};

export { SearchCriteria };
