import React, { useState } from "react";
import "./comp.styles/SearchCriteria.css";
import right from "../img/Right.png";
import left from "../img/Left.png";
import down from "../img/Down.png";
import up from "../img/Up.png";

function SelectSpeed() {
  const [selectedValue, setSelectedValue] = useState("5");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <input
        className="select-css"
        type="text"
        list="speed"
        placeholder="5"
        multiple
      />
      <datalist value={selectedValue} onChange={handleSelectChange} id="speed">
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="-">-</option>
      </datalist>
    </div>
  );
}

function SelectYear() {
  const defaultValue = 1980;
  const [selectedYear, SetselectedYear] = useState();
  const thisYear = new Date().getFullYear();

  const onHandleChange = (e) => {
    localStorage.setItem("currentYear", e.target.value);
    SetselectedYear(e.target.value);
  };

  const options = [];

  for (let i = 0; i <= thisYear - defaultValue; i++) {
    const year = defaultValue + i;
    options.push(
      <option key={year} value={year}>
        {year}
      </option>
    );
  }

  return (
    <div>
      <select
        className="select-css"
        value={selectedYear}
        onChange={onHandleChange}
        defaultValue={2008}
      >
        {options}
      </select>
    </div>
  );
}

function SelectCountries() {
  var [country_name, setCountry] = useState({});
  var [first, setFirst] = useState(true);
  if (first) {
    fetch("http://localhost:5000/sch/countries", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, PUT, POST, DELETE, PATCH, OPTIONS",
      },
      body: JSON.stringify(""),
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
        setCountry(data.country_name.country_name);
      });
    setFirst(false);
  }
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
        <option value="Thailand" selected hidden>
          Thailand
        </option>
        {Object.values(country_name).map((values) => (
          <option value={country_name[values]}>{values}</option>
        ))}
      </select>
    </div>
  );
}

function SelectCarMaker() {
  var [manufacturer_name, setMaker] = useState({});
  var [first, setFirst] = useState(true);
  if (first) {
    fetch("http://localhost:5000/sch/maker", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, PUT, POST, DELETE, PATCH, OPTIONS",
      },
      body: JSON.stringify(""),
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
        setMaker(data.manufacturer_name.manufacturer_name);
      });
    setFirst(false);
  }
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
        <option value="Toyota" selected hidden>
          Toyota
        </option>
        {Object.values(manufacturer_name).map((values) => (
          <option value={manufacturer_name[values]}>{values}</option>
        ))}
      </select>
    </div>
  );
}

function SelectModelName() {
  var [car_model_name, setModelName] = useState({});
  var [first, setFirst] = useState(true);
  if (first) {
    fetch("http://localhost:5000/sch/modelcar", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, PUT, POST, DELETE, PATCH, OPTIONS",
      },
      body: JSON.stringify(""),
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
        setModelName(data.car_model_name.car_model_name);
      });
    setFirst(false);
  }
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
        <option value="Hilux" selected hidden>
          Hilux
        </option>
        {Object.values(car_model_name).map((values) => (
          <option value={car_model_name[values]}>{values}</option>
        ))}
      </select>
    </div>
  );
}

function SelectModelCode() {
  var [model_code, setModelCode] = useState({});
  var [first, setFirst] = useState(true);
  if (first) {
    fetch("http://localhost:5000/sch/modelcode", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, PUT, POST, DELETE, PATCH, OPTIONS",
      },
      body: JSON.stringify(""),
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
        setModelCode(data.model_code.model_code);
      });
    setFirst(false);
  }
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
        <option value="KUN15" selected hidden>
          KUN15
        </option>
        {Object.values(model_code).map((values) => (
          <option value={model_code[values]}>{values}</option>
        ))}
      </select>
    </div>
  );
}

function SelectPosition() {
  var [drivers_position, setPosition] = useState({});
  var [first, setFirst] = useState(true);
  if (first) {
    fetch("http://localhost:5000/sch/position", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, PUT, POST, DELETE, PATCH, OPTIONS",
      },
      body: JSON.stringify(""),
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
        setPosition(data.drivers_position.drivers_position);
      });
    setFirst(false);
  }
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
        <option value="RHD" selected hidden>
          RHD
        </option>
        {Object.values(drivers_position).map((values) => (
          <option value={drivers_position[values]}>{values}</option>
        ))}
      </select>
    </div>
  );
}

function SelectEngineCode() {
  var [engine_model, setEngineCode] = useState({});
  var [first, setFirst] = useState(true);
  if (first) {
    fetch("http://localhost:5000/sch/enginecode", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, PUT, POST, DELETE, PATCH, OPTIONS",
      },
      body: JSON.stringify(""),
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
        setEngineCode(data.engine_model.engine_model);
      });
    setFirst(false);
  }
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
        <option value="1GRFE" selected hidden>
          1GRFE
        </option>
        {Object.values(engine_model).map((values) => (
          <option value={engine_model[values]}>{values}</option>
        ))}
      </select>
    </div>
  );
}

function SelectDisplacement() {
  var [displacement_code, setDisplacement] = useState({});
  var [first, setFirst] = useState(true);
  if (first) {
    fetch("http://localhost:5000/sch/displacement", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, PUT, POST, DELETE, PATCH, OPTIONS",
      },
      body: JSON.stringify(""),
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
        setDisplacement(data.displacement_code.displacement_code);
      });
    setFirst(false);
  }
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
        <option value="4.0L" selected hidden>
          4.0L
        </option>
        {Object.values(displacement_code).map((values) => (
          <option value={displacement_code[values]}>{values}</option>
        ))}
      </select>
    </div>
  );
}

function SelectFuel() {
  var [fuel_type, setFuel] = useState({});
  var [first, setFirst] = useState(true);
  if (first) {
    fetch("http://localhost:5000/sch/fuel", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, PUT, POST, DELETE, PATCH, OPTIONS",
      },
      body: JSON.stringify(""),
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
        setFuel(data.fuel_type.fuel_type);
      });
    setFirst(false);
  }
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
        <option value="Gasoline" selected hidden>
          Gasoline
        </option>
        {Object.values(fuel_type).map((values) => (
          <option value={fuel_type[values]}>{values}</option>
        ))}
      </select>
    </div>
  );
}

function SelectTransmission() {
  var [transmission_type, setTransmission] = useState({});
  var [first, setFirst] = useState(true);
  if (first) {
    fetch("http://localhost:5000/sch/transmission", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, PUT, POST, DELETE, PATCH, OPTIONS",
      },
      body: JSON.stringify(""),
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
        setTransmission(data.transmission_type.transmission_type);
      });
    setFirst(false);
  }
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
        <option value="MT" selected hidden>
          MT
        </option>
        {Object.values(transmission_type).map((values) => (
          <option value={transmission_type[values]}>{values}</option>
        ))}
      </select>
    </div>
  );
}

function SelectDrivertrain() {
  var [drivetrain, setDrivertrain] = useState({});
  var [first, setFirst] = useState(true);
  if (first) {
    fetch("http://localhost:5000/sch/drivetrain", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, PUT, POST, DELETE, PATCH, OPTIONS",
      },
      body: JSON.stringify(""),
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
        setDrivertrain(data.drivetrain.drivetrain);
      });
    setFirst(false);
  }
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
        <option value="RWD" selected hidden>
          RWD
        </option>
        {Object.values(drivetrain).map((values) => (
          <option value={drivetrain[values]}>{values}</option>
        ))}
      </select>
    </div>
  );
}

function SelectPartName() {
  var [aisin_part_name, setPartname] = useState({});
  var [first, setFirst] = useState(true);
  if (first) {
    fetch("http://localhost:5000/sch/partname", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, PUT, POST, DELETE, PATCH, OPTIONS",
      },
      body: JSON.stringify(""),
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
        setPartname(data.aisin_part_name.aisin_part_name);
      });
    setFirst(false);
  }
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
        <option value="Clutch Cover" selected hidden>
          Clutch Cover
        </option>
        {Object.values(aisin_part_name).map((values) => (
          <option value={aisin_part_name[values]}>{values}</option>
        ))}
      </select>
    </div>
  );
}

function SelectOE() {
  var [part_code, setOE] = useState({});
  var [first, setFirst] = useState(true);
  if (first) {
    fetch("http://localhost:5000/sch/oe", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, PUT, POST, DELETE, PATCH, OPTIONS",
      },
      body: JSON.stringify(""),
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
        setOE(data.part_code.part_code);
      });
    setFirst(false);
  }
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
        <option value="4882033010" selected hidden>
          4882033010
        </option>
        {Object.values(part_code).map((values) => (
          <option value={part_code[values]}>{values}</option>
        ))}
      </select>
    </div>
  );
}

function SelectAISIN() {
  var [aisin_premium_code, setAISIN] = useState({});
  var [aisin_sub_premium_code, setAISINsub] = useState({});
  var [first, setFirst] = useState(true);
  if (first) {
    fetch("http://localhost:5000/sch/aisin", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, PUT, POST, DELETE, PATCH, OPTIONS",
      },
      body: JSON.stringify(""),
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
        setAISIN(data.aisin_premium_code.aisin_premium_code);
      });
    setFirst(false);
  }
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
        <option value="AAT001" selected hidden>
          AAT001
        </option>
        {Object.values(aisin_premium_code).map((values) => (
          <option value={aisin_premium_code[values]}>{values}</option>
        ))}
      </select>
    </div>
  );
}

function SelectCompetitor() {
  var [competiter_part_code, setCompetitor] = useState({});
  var [first, setFirst] = useState(true);
  if (first) {
    fetch("http://localhost:5000/sch/competitor", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, PUT, POST, DELETE, PATCH, OPTIONS",
      },
      body: JSON.stringify(""),
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
        setCompetitor(data.competiter_part_code.competiter_part_code);
      });
    setFirst(false);
  }
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
        <option value="123456789" selected hidden>
          123456789
        </option>
        {Object.values(competiter_part_code).map((values) => (
          <option value={competiter_part_code[values]}>{values}</option>
        ))}
      </select>
    </div>
  );
}

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
  const [arrow, setOpenArrow] = useState(false);
  const OpenArrow = () => {
    setOpenArrow(!arrow);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={sidebarClass}>
      <div className="searchTitle">
        <a>Search by Vehicle Info and/or Part Info</a>
        <button onClick={handleSidebar}>
          <img src={right} alt="Right" onClick={props.toggleSidebar} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="searchScroll" id="scroll-style">
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
              <button className="subSearchbtn" onClick={handleOpenBasic}>
                <button className="subSearchbtn" onClick={OpenArrow}>
                  Basic Info
                  {arrow && <img src={down} alt="Down"></img>}
                  {openBasic && <img src={up} alt="Up"></img>}
                </button>
              </button>
              {openBasic && (
                <>
                  <div className="searchBox">
                    <a> Car Maker </a>
                    <span>
                      <SelectCarMaker />
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
              <button className="subSearchbtn" onClick={handleOpenDetailed}>
                <button className="subSearchbtn" onClick={OpenArrow}>
                  Detailed Info
                  {arrow && <img src={down} alt="Down"></img>}
                  {openBasic && <img src={up} alt="Up"></img>}
                </button>
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
              <button className="subSearchbtn" onClick={handleOpenPart}>
                <button className="subSearchbtn" onClick={OpenArrow}>
                  Part Info
                  {arrow && <img src={down} alt="Down"></img>}
                  {openBasic && <img src={up} alt="Up"></img>}
                </button>
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
                      <SelectAISIN />{" "}
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
        </div>
        <div className="submitbtn">
          <button type="submit" value="Submit" id="Submit">
            Go
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
      </form>
    </div>
  );
};

export { SearchCriteria };
