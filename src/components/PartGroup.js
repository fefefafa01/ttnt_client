import React, { useState, Fragment } from "react";
import "./PartList/partList.css";
import "./comp.styles/subGroup.css";
import { PartList } from "./PartList/PartList";
import { border } from "@mui/system";

function PartGroup() {
    return 1;
}

function PartSubgroup({ carid, onAdd }) {
    const handleAdd = (buttonName) => {
        onAdd(buttonName);
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
    var [subGroup, setSubGroup] = useState([]);

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
        fetch("http://localhost:5000/exp/subGroup", {
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
                    <table>
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
