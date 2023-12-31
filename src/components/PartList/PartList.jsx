import { DropDown } from "./DropDown";
import "./partList.scss";
import Download from "../../img/download.png";
import React, { useState} from "react";
import { Specpdf } from "components/SpecPDF";
import { Changer } from "components/Languages/LanguageChange";
import { backlocale } from "constants/constindex";

function PartList({ carid, SubGroupName }) {
    //Variables
    var loc;
    const [firstOpenModel, setFirstOpenModel] = useState(true);
    const [firstOpenPreP, setFirstOpenPreP] = useState(false);

    var [opening, setOpening] = useState(false);
    var [pcode, setPcode] = useState("")
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

    //Open Detail Button
    const openPDF = (code) => {
        setPcode(code)
        setOpening(!opening)
    }

    //Download Button
    const [downdrop, setDowndrop] = useState(false)
    const handleDropdown = () => {
        setDowndrop(!downdrop);
    }

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
    
    if (firstOpenPreP) {
        loc = backlocale + "exp/partList";
        fetch(loc, {
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
                setPremiumData(data.partList);
                
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
                // console.log(result);
            } else {
                result[key] = 1;
                namesArr[item.partGroup] = key;
            }
        }
        // console.log(result);
        return result;
    }, []);
    return (
        <div className="tabcontent">
            {opening && <Specpdf carid={""+carid} partcode={""+pcode} open={openPDF} />}
            <div className="titleplcontent">
                <h3>
                    {maker}, {model}, {vcode} {"(" + start} - {end + ")"},{" "}
                    {dpos}, {ecode}, {displace}, {ptype}, {ftype},
                    {" " + transc}, {spd}
                    {trans}, {dt} - Part list
                </h3>
                <div className="downloadpldrop">
                    <button className="download" onClick={handleDropdown}>
                        <img
                            className="downloadbutton"
                            src={Download}
                            alt="download"
                        />
                        <span className="download-text"><Changer inp='Download to file' /></span>
                    </button>
                    {downdrop &&
                        <DropDown data={premiumData} dropping={handleDropdown} />
                    }
                </div>
            </div>
            <div className="partlistscroll" id="pscroll-style">
                <div className="contents-part-list">
                    <table className="part-table">
                        <thead>
                            <tr>
                                <th rowSpan="2" className="title">
                                    <Changer inp="Part Group" />
                                </th>
                                <th rowSpan="2" className="title">
                                    <Changer inp="Part Name" />
                                </th>
                                <th colSpan="4" className="title">
                                    <Changer inp="Information" />
                                </th>
                            </tr>

                            <tr>
                                <th className="subtitle OE">OE#</th>
                                <th className="subtitle AISIN ">
                                    AISIN Premium
                                </th>
                                <th className="subtitle AISIN">
                                    AISIN Sub-Premium/AM
                                </th>
                                <th className="subtitle AISIN">
                                    <Changer inp="Specification" />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {premiumData.map((el, index) => (
                                <tr key={index}>
                                    {rowSpan[index] > 0 && (
                                        <td rowSpan={rowSpan[index]}>
                                            <Changer inp={el.partGroup} />
                                        </td>
                                    )}
                                    <td><Changer inp={el.partName} /></td>
                                    <td>{el.OE}</td>
                                    <td>{el.aisinPrem}</td>
                                    <td>{el.aisinSubPrem}</td>
                                    <td>
                                        <button className="details" onClick={e=>openPDF(el.OE)}>
                                            <Changer inp="Details" />
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
