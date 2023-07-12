//Link with SearchingHandler.js in ./server
import { PartsDetail } from "../PartDetail";
import { DownloadFile } from "../DownloadFile";
import "./partList.css";
import Download from "../../img/download.png";
import React, { useState, Fragment } from "react";

function PartList({ carid, SubGroupName }) {
    //Variables
    const [firstOpenModel, setFirstOpenModel] = useState(true);
    const [firstOpenPreP, setFirstOpenPreP] = useState(false);
    const [firstOpenSPreP, setFirstOpenSPreP] = useState(false);
    const [firstOpenComp, setFirstOpenComp] = useState(false);

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
    const part = { id: carid, partSubGroup: SubGroupName };
    var [premiumData, setPremiumData] = useState([]);

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
    console.log(
        maker,
        model,
        vcode,
        start,
        end,
        dpos,
        ecode,
        displace,
        ptype,
        ftype,
        transc,
        spd,
        trans,
        dt
    );
    if (firstOpenPreP) {
        fetch("http://localhost:5000/exp/partList", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Acess-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                    "GET, PUT, POST, DELETE, PATCH, OPTIONS",
            },
            body: JSON.stringify(part),
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
                setPremiumData(data.partList);
                console.log(premiumData);
            });
    }

    let namesArr = {};
    const rowSpan = premiumData.reduce((result, item, key) => {
        if (namesArr[item.partGroup] === undefined) {
            namesArr[item.partGroup] = key;
            result[key] = 1;
        } else {
            const firstIndex = namesArr[item.partGroup];
            if (
                firstIndex === key - 1 ||
                (item.partGroup === premiumData[key - 1].partGroup &&
                    result[key - 1] === 0)
            ) {
                result[firstIndex]++;
                result[key] = 0;
                console.log(result);
            } else {
                result[key] = 1;
                namesArr[item.partGroup] = key;
            }
        }
        console.log(result);
        return result;
    }, []);

    return (
        <div className="tabcontent">
            <div className="titlecontent">
                <div className="col-9">
                    <h3>
                        {maker}, {model}, {vcode} {"(" + start} - {end + ")"},{" "}
                        {dpos}, {ecode}, {displace}, {ptype}, {ftype},
                        {" " + transc}, {spd}
                        {trans}, {dt} - Part list
                    </h3>
                </div>
                <div className="col download">
                    <img
                        className="downloadbutton"
                        src={Download}
                        alt="download"
                    />
                    <span className="download-text">Download to file</span>
                </div>
            </div>
            <div className="Scroll" id="scroll-style">
                <div className="contents-part-list">
                    <table className="part-table">
                        <thead>
                            <tr>
                                <th rowSpan="2" className="title">
                                    Part Group
                                </th>
                                <th rowSpan="2" className="title">
                                    Part Name
                                </th>
                                <th colSpan="4" className="title">
                                    Information
                                </th>
                            </tr>

                            <tr>
                                <th className="subtitle OE">OE#</th>
                                <th className="subtitle AISIN ">
                                    ASIN Premium
                                </th>
                                <th className="subtitle AISIN">
                                    ASIN Sub-Premium/AN
                                </th>
                                <th className="subtitle AISIN">
                                    Specification
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {premiumData.map((el, index) => (
                                <tr key={index}>
                                    {rowSpan[index] > 0 && (
                                        <td rowSpan={rowSpan[index]}>
                                            {el.partGroup}
                                        </td>
                                    )}
                                    <td>{el.partName}</td>
                                    <td>{el.OE}</td>
                                    <td>{el.aisinPrem}</td>
                                    <td>{el.aisinSubPrem}</td>
                                    <td>
                                        <button className="details">
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export { PartList };
