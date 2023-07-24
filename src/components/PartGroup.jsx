import React, { useState } from "react";
import "./PartList/partList.scss";
import "./comp.styles/subgroup.scss";
import { PartList } from "./PartList/PartList";
import { border } from "@mui/system";
import { backlocale } from "constants/constindex";

function PartGroup({ carid, onAdd }) {
    const handleAdd = (buttonSubName) => {
        onAdd(buttonSubName);
    };
    const [firstOpenModel, setFirstOpenModel] = useState(true);
    const [firstOpenPreP, setFirstOpenPreP] = useState(false);
    const [firstOpenSPreP, setFirstOpenSPreP] = useState(false);

    //Variables for Car Model
    var [maker, setMaker] = useState("");
    var [model, setModel] = useState("");
    var [vcode, setVcode] = useState("");
    var [start, setStart] = useState("");
    var [end, setEnd] = useState("");
    var [dpos, setDpos] = useState("");
    var [ecode, setEcode] = useState("");
    var [displace, setDisplace] = useState("");
    var [ptype, setPtype] = useState("");
    var [ftype, setFtype] = useState("");
    var [transc, setTransc] = useState("");
    var [spd, setSpd] = useState("");
    var [trans, setTrans] = useState("");
    var [dt, setDt] = useState("");

    //Array for Parts Table and Manufacturer
    var [partGroup, setPartGroup] = useState([]);

    //Backend Call
    //Querying Model Name
    if (firstOpenModel) {
        fetch("http://localhost:5000/exp/model", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Acess-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                    "GET, PUT, POST, DELETE, PATCH, OPTIONS",
            },
            body: JSON.stringify(carid),
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
                setFirstOpenModel(false);
                setFirstOpenPreP(true);
                //Set Values
                setMaker(data.maker);
                setModel(data.model);
                setVcode(data.vcode);
                setStart(data.start);
                setEnd(data.end);
                setDpos(data.dripos);
                setEcode(data.engcode);
                setDisplace(data.disp);
                setPtype(data.powered);
                setFtype(data.fuel);
                setTransc(data.transc);
                setSpd(data.spd);
                setTrans(data.trans);
                setDt(data.dtrain);
            });
    }
    // console.log(
    //     maker,
    //     model,
    //     vcode,
    //     start,
    //     end,
    //     dpos,
    //     ecode,
    //     displace,
    //     ptype,
    //     ftype,
    //     transc,
    //     spd,
    //     trans,
    //     dt
    // );
    if (firstOpenPreP) {
        fetch("http://localhost:5000/exp/partGroup", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Acess-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                    "GET, PUT, POST, DELETE, PATCH, OPTIONS",
            },
            body: JSON.stringify(carid),
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
                setFirstOpenPreP(false);
                setFirstOpenSPreP(true);
                setPartGroup(data.partGroupList);
                console.log(partGroup);
            });
    }

    return (
        <div className="tabcontent">
            <div className="titlecontent">
                <div className="">
                    <h3>
                        {maker}, {model}, {vcode} {"(" + start} - {end + ")"},{" "}
                        {dpos}, {ecode}, {displace}, {ptype}, {ftype},
                        {" " + transc}, {spd}
                        {trans}, {dt} - Part group found : {partGroup.length}{" "}
                        records
                    </h3>
                </div>
            </div>
            <div className="Scroll" id="scroll-style">
                <div className="contents-part-list">
                    <table>
                        {partGroup.map((el, index) => (
                            <tr style={{ border: "transparent" }} key={index}>
                                <td style={{ border: "transparent" }}>
                                    <button
                                        className="subgroup"
                                        onClick={() => handleAdd(el.partGroup)}
                                    >
                                        {index + 1}. {el.partGroup}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    );
}

function PartSubgroup({ carid, onAdd }) {
    const handleAdd = (buttonName) => {
        onAdd(buttonName);
    };
    const [firstOpenModel, setFirstOpenModel] = useState(true);
    const [firstOpenPreP, setFirstOpenPreP] = useState(false);
    var loc;

    //Variables for Car Model
    var [maker, setMaker] = useState("");
    var [model, setModel] = useState("");
    var [vcode, setVcode] = useState("");
    var [start, setStart] = useState("");
    var [end, setEnd] = useState("");
    var [dpos, setDpos] = useState("");
    var [ecode, setEcode] = useState("");
    var [displace, setDisplace] = useState("");
    var [ptype, setPtype] = useState("");
    var [ftype, setFtype] = useState("");
    var [transc, setTransc] = useState("");
    var [spd, setSpd] = useState("");
    var [trans, setTrans] = useState("");
    var [dt, setDt] = useState("");

    //Array for Parts Table and Manufacturer
    var [subGroup, setSubGroup] = useState([]);

    //Backend Call
    //Querying Model Name
    if (firstOpenModel) {
        loc = backlocale + "exp/model";
        fetch(loc, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Acess-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                    "GET, PUT, POST, DELETE, PATCH, OPTIONS",
            },
            body: JSON.stringify(carid),
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
                setFirstOpenModel(false);
                setFirstOpenPreP(true);
                //Set Values
                setMaker(data.maker);
                setModel(data.model);
                setVcode(data.vcode);
                setStart(data.start);
                setEnd(data.end);
                setDpos(data.dripos);
                setEcode(data.engcode);
                setDisplace(data.disp);
                setPtype(data.powered);
                setFtype(data.fuel);
                setTransc(data.transc);
                setSpd(data.spd);
                setTrans(data.trans);
                setDt(data.dtrain);
            });
    }
    // console.log(
    //     maker,
    //     model,
    //     vcode,
    //     start,
    //     end,
    //     dpos,
    //     ecode,
    //     displace,
    //     ptype,
    //     ftype,
    //     transc,
    //     spd,
    //     trans,
    //     dt
    // );
    if (firstOpenPreP) {
        loc = backlocale + "exp/subGroup";
        fetch(loc, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Acess-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                    "GET, PUT, POST, DELETE, PATCH, OPTIONS",
            },
            body: JSON.stringify(carid),
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
                setFirstOpenPreP(false);
                setSubGroup(data.subGroupList);
                console.log(subGroup);
            });
    }
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);

        // After a certain duration, revert the button style back to the original state
        setTimeout(() => {
            setIsClicked(false);
        }, 1000); // Change the duration as needed
    };

    return (
        <div className="tabcontent">
            <div className="titlecontent">
                <div className="">
                    <h3>
                        {maker}, {model}, {vcode} {"(" + start} - {end + ")"},{" "}
                        {dpos}, {ecode}, {displace}, {ptype}, {ftype},
                        {" " + transc}, {spd}
                        {trans}, {dt} - Part sub group : {subGroup.length}{" "}
                        records
                    </h3>
                </div>
            </div>
            <div className="Scroll" id="scroll-style">
                <div className="contents-part-list">
                    <table style={{ width: "100%" }}>
                        {subGroup.map((el, index) => (
                            <tr style={{ border: "transparent" }} key={index}>
                                <td style={{ border: "transparent" }}>
                                    <button
                                        className="subgroup"
                                        onClick={() => handleAdd(el.subGroup)}
                                    >
                                        {index + 1}. {el.subGroup}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    );
}

export { PartGroup, PartSubgroup };
