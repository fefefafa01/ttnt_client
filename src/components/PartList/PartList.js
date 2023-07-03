//Link with SearchingHandler.js in ./server
import { PartsDetail } from "../PartDetail";
import { DownloadFile } from "../DownloadFile";
import "./partList.css";
import React, { useState, Fragment } from "react";

function PartList({ carid }) {
    carid = "29";
    const [firstOpenModel, setFirstOpenModel] = useState(true);
    const [firstOpenPreP, setFirstOpenPreP] = useState(false);
    const [firstOpenSPreP, setFirstOpenSPreP] = useState(false);
    const [firstOpenComp, setFirstOpenComp] = useState(false);
    // value from /exp/partList
    const [maker, setMaker] = useState("");
    const [modelname, setModelName] = useState("");
    const [model, setModel] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [dpos, setDpos] = useState("");
    const [engmod, setEngmod] = useState("");
    const [displace, setDisplace] = useState("");
    const [power, setPower] = useState("");
    const [fuel, setFuel] = useState("");
    const [transcode, setTranscode] = useState("");
    const [speed, setSpeed] = useState("");
    const [trans, setTrans] = useState("");
    const [drivetrain, setDrivetrain] = useState("");

    //backEndCall
    if (firstOpenModel) {
        fetch("http://localhost:5000/exp/partList", {
            method: "POST",
            credentials: "include",
            headers: {
                "Acess-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                    "GET, PUT, POST, DELETE, PATCH, OPTIONS",
            },
            body: JSON.stringify(carid),
        })
            .catch((err) => {
                return;
            })
            .then((data) => {
                if (!data) return;
                setFirstOpenModel(false);
                //set value
                setMaker(data.maker);
                setModelName(data.modelname);
                setModel(data.model);
                setStartTime(data.startTime);
                setEndTime(data.endTime);
                setDpos(data.dpos);
                setEngmod(data.engmod);
                setDisplace(data.displace);
                setPower(data.power);
                setFuel(data.fuel);
                setTranscode(data.transcode);
                setSpeed(data.speed);
                setTrans(data.trans);
                setDrivetrain(data.drivetrain);
            });
    }

    console.log(
        maker,
        modelname,
        model,
        startTime,
        endTime,
        dpos,
        engmod,
        displace,
        power,
        fuel,
        transcode,
        speed,
        trans,
        drivetrain
    );

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
                {maker},{modelname},{model} ({startTime} - {endTime}), {dpos},{" "}
                {engmod}, {displace}, {power}, {fuel}, {transcode}, {speed}
                {trans}, {drivetrain}
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
