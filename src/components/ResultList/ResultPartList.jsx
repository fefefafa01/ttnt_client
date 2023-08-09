import "./ResultList.scss";
import React, { useState } from "react";
import { Changer } from "../Languages/LanguageChange";
import { Specpdf } from "components/SpecPDF";
import Download from "../../img/download.png";
import { DropDown } from "./ResPDown";

function ResultPartList(props) {
    const { formValues, id} = props;

    //Download
    const [downdrop, setDowndrop] = useState(false);
    const handleDropdown = () => {
        setDowndrop(!downdrop);
    };

    var partId = [];
    let a = 0;
    for (let i = 0; i < formValues.length; i++)
    {
        if (formValues[i].car_info_id === id) {
            partId[a] = formValues[i];
            a++;
        }
    }

    //Open Detail Button
    var [pcode, setPcode] = useState("");
    var [pdfcarid, setPdfcarid] = useState("");
    var [opening, setOpening] = useState(false);
    const openPDF = (code) => {
        if (typeof(code)==="object") {
            if (code.oe!==(undefined && null && "") && code.start_of_production!==(undefined && null && "") && code.end_of_production!==(undefined && null && "")) {
                var oecode = code.oe + " (" + code.start_of_production.slice(2, 4) + "-" + code.end_of_production.slice(2, 4) + ")";
            }
            setPcode(oecode);
            setPdfcarid(code.car_info_id);
        } else {
            setPcode(code);
        }
        setOpening(!opening);
    }

    return (
        <div className="tabcontent">
            {opening && <Specpdf carid={""+pdfcarid} partcode={""+pcode} open={openPDF} />}
            <div className="resultparttitle">
                <h3>{partId[0].car_maker}, {partId[0].model_code} {"(" + partId[0].start_of_production} - {partId[0].end_of_production + ")"} {partId[0].speed}{partId[0].transmission_type} </h3>
                <div className="resultpartdown">
                    <button
                        className="download"
                        onClick={handleDropdown}
                    >
                        <img
                            className="download-button"
                            src={Download}
                            alt="download"
                        />
                        <span className="downloadtext">
                            <Changer inp="Download to file" />
                        </span>
                    </button>
                    {downdrop && (
                        <DropDown
                            data={partId}
                            dropping={handleDropdown}
                        />
                    )}
                </div>
            </div>
            <div className="partlistscroll" id="pscroll-style">
                <div className="contents-part-list">
                    <table className="part-table">
                            <thead>
                                <tr>
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
                                {partId.map((el, index) => (
                                    <tr key = {index}>
                                        <td><Changer inp={el.aisin_part_name} /></td>
                                        <td>{el.oe} {"(" + el.part_start_time}-{el.part_end_time + ")"}</td>
                                        <td>{el.aisin_premium_code}</td>
                                        <td>
                                            {el.aisin_sub_premium_code}
                                        </td>
                                        <td>
                                            <button className="details" onClick={e=>openPDF(el)}>
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

export { ResultPartList };
