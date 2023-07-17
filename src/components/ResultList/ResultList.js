import "./ResultList.css";
import Download from "../../img/download.png";
import React, { useState, Fragment } from "react";
import { Specpdf } from "components/SpecPDF";
import { Changer } from "components/LanguageChange";

function ResultList({ carid }) {
    carid = "29"; //Test ID
    const [firstOpenModel, setFirstOpenModel] = useState(true);
    const [firstOpenPreP, setFirstOpenPreP] = useState(false);
    const [firstOpenSPreP, setFirstOpenSPreP] = useState(false);
    const [firstOpenComp, setFirstOpenComp] = useState(false);

    var [opening, setOpening] = useState(false);
    var [ecode, setEcode] = useState("");

    //Array for Parts Table and Manufacturer
    var [partList, setPartList] = useState([]);
    var [premiumData, setPremiumData] = useState([]);
    var [spremiumData, setSPremiumData] = useState([]);
    var [competitor, setCompetitor] = useState([]);

    //Open Detail Button
    const openPDF = (code) => {
        setEcode(code);
        setOpening(!opening);
    };

    //Download Button
    const [downdrop, setDowndrop] = useState(false);
    const handleDropdown = () => {
        setDowndrop(!downdrop);
    };

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
            });
    }

    if (firstOpenPreP) {
        fetch("http://localhost:5000/table/result", {
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
            <h3> Result found </h3>
            <div className="Scroll" id="scroll-style">
                <div className="contents-results">
                    <table>
                        <theader>
                            <tr>
                                <th rowSpan="2" className="titleResult">
                                    No
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    Car Maker
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    Model Name
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    Model Code
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    From
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    To
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    Driver's Position
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    Engine Code
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    Displacement
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    Powered Type
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    Fuel Type
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    Transmission Code
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    Transmission Type
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    Speed
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    Drivetrain
                                </th>
                                <th colSpan="4" className="titleResult">
                                    STABILIZER LINK (F) (L):
                                    ลูกหมากกันโคลงหน้าซ้าย
                                </th>
                                <th colSpan="4" className="titleResult">
                                    STABILIZER LINK (F) (R):
                                    ลูกหมากกันโคลงหน้าขวา
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
                        </theader>
                        <tbody>
                            {premiumData.map((el, index) => (
                                <tr key={index}>
                                    {rowSpan[index] > 0 && (
                                        <td rowSpan={rowSpan[index]}>
                                            <Changer inp={el.partGroup} />
                                        </td>
                                    )}
                                    <td>
                                        <Changer inp={el.partName} />
                                    </td>
                                    <td>{el.OE}</td>
                                    <td>{el.aisinPrem}</td>
                                    <td>{el.aisinSubPrem}</td>
                                    <td>
                                        <button
                                            className="details"
                                            onClick={(e) => openPDF(el.OE)}
                                        >
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

export { ResultList };
