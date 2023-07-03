//Link with SearchingHandler.js in ./server
import { PartsDetail } from "../PartDetail";
import { DownloadFile } from "../DownloadFile";
import "./partList.css";
import React, { useState, Fragment } from "react";

function PartList() {
    const data = [
        {
            partGroup: "Powertrain/Chassis",
            partName: "Clutch Disc",
            OE: "Clutch Cover",
            AISIN_Premium: "DTX-209A",
            AISIN_sub_Premium: "DT-602U",
        },
        {
            partGroup: "Powertrain/Chassis",
            partName: "Clutch Disc",
            OE: "Clutch Cover",
            AISIN_Premium: "DTX-209A",
            AISIN_sub_Premium: "DT-602U",
        },
        {
            partGroup: "Powertrain/Chassis",
            partName: "Clutch Disc",
            OE: "Clutch Cover",
            AISIN_Premium: "DTX-209A",
            AISIN_sub_Premium: "DT-602U",
        },
        {
            partGroup: "Powertrain/Chassis",
            partName: "Clutch Disc",
            OE: "Clutch Cover",
            AISIN_Premium: "DTX-209A",
            AISIN_sub_Premium: "DT-602U",
        },

        {
            partGroup: "Engine/Fuel",
            partName: "Oil pump",
            OE: "11320-0L030",
            AISIN_Premium: "TGTS-001",
            AISIN_sub_Premium: "WPT-166VAT",
        },
        {
            partGroup: "Engine/Fuel",
            partName: "Oil pump",
            OE: "11320-0L030",
            AISIN_Premium: "TGTS-001",
            AISIN_sub_Premium: "WPT-166VAT",
        },
        {
            partGroup: "Engine/Fuel",
            partName: "Oil pump",
            OE: "11320-0L030",
            AISIN_Premium: "TGTS-001",
            AISIN_sub_Premium: "WPT-166VAT",
        },
        {
            partGroup: "Engine/Fuel",
            partName: "Oil pump",
            OE: "11320-0L030",
            AISIN_Premium: "TGTS-001",
            AISIN_sub_Premium: "WPT-166VAT",
        },
        {
            partGroup: "Engine/Fuel",
            partName: "Oil pump",
            OE: "11320-0L030",
            AISIN_Premium: "TGTS-001",
            AISIN_sub_Premium: "WPT-166VAT",
        },
        {
            partGroup: "Electrical",
            partName: "Cabin air filter",
            OE: "871390-06080",
            AISIN_Premium: "",
            AISIN_sub_Premium: "CBF-4003",
        },
    ];

    let namesArr = {};
    const rowSpan = data.reduce((result, item, key) => {
        if (namesArr[item.partGroup] === undefined) {
            namesArr[item.partGroup] = key;
            result[key] = 1;
        } else {
            const firstIndex = namesArr[item.partGroup];
            if (
                firstIndex === key - 1 ||
                (item.partGroup === data[key - 1].partGroup &&
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
            <h3>
                {" "}
                Toyota, Hilux, KUN25(2008 - 2011), RHD, 2SDFTV, 2.5L, ICE,
                Diesel, -, 5MT, Engine/Fuel, Engine - Parts list{" "}
            </h3>
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
                            {data.map((el, index) => (
                                <tr key={index}>
                                    {rowSpan[index] > 0 && (
                                        <td rowSpan={rowSpan[index]}>
                                            {el.partGroup}
                                        </td>
                                    )}
                                    <td>{el.partName}</td>
                                    <td>{el.OE}</td>
                                    <td>{el.AISIN_Premium}</td>
                                    <td>{el.AISIN_sub_Premium}</td>
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
