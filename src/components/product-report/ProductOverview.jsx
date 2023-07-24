import { useState } from "react";
import "../Epic1Filter";
import "./productOverview.scss";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { fontWeight } from "@mui/system";

function ProductOverview() {
    const [maker, setMaker] = useState([]);
    const [carOverallMT, setCarOverallMT] = useState([]);
    const [carOverallMTAT, setCarOverallMTAT] = useState([]);
    const [sumMaker, setSumMaker] = useState(0);
    const [firstOpen, setFirstOpen] = useState(true);
    const [openOverall, setOpenOverall] = useState(true);
    if (firstOpen) {
        fetch("http://localhost:5000/overall/maker", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Acess-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                    "GET, PUT, POST, DELETE, PATCH, OPTIONS",
            },
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
                setFirstOpen(false);
                for (let i = 0; i <= data.MakerName.length - 1; i++) {
                    setSumMaker(sumMaker + Number(data.MakerName[i].sum));
                    //console.log(data.MakerName[i].sum);
                    // console.log(sumMaker);
                }
                setMaker(data.MakerName);
                // console.log(data.MakerName.length);
                // console.log(maker);
            });
    }
    if (openOverall) {
        fetch("http://localhost:5000/overall/overallTable", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Acess-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                    "GET, PUT, POST, DELETE, PATCH, OPTIONS",
            },
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
                setOpenOverall(false);
                setCarOverallMT(data.overallValMT);
                setCarOverallMTAT(data.overallValMTAT);

                console.log(data.overallValMT[1].sum);
                //console.log(data.overallValMTAT);

                console.log(data.overallValMT.length);
            });
    }
    return (
        <div>
            <div className="coverage-report">
                <p>Product Coverage report</p>
            </div>
            <div className="dashboard">
                <div className="col-2 overall-vehicle">
                    <table className="overall-table">
                        <thead>
                            <th>Maker</th>
                            <th>Total</th>
                        </thead>
                        <tbody>
                            {maker.map((el, index) => (
                                <tr key={index}>
                                    <td>{el.maker}</td>
                                    <td>{el.count}</td>
                                </tr>
                            ))}
                            <tr style={{ fontWeight: "bold" }}>
                                <td>Grand Total</td>
                                <td>{sumMaker}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="coverage-table">
                        <thead>
                            <tr>
                                <th>Coverage %</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="low">0%-50%</td>
                            </tr>
                            <tr>
                                <td className="medium">{">"}50%-30%</td>
                            </tr>
                            <tr>
                                <td className="high">90%-100%</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="coverage-table">
                        <thead>
                            <tr>
                                <th>Model Year Coverage</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="year">Y2000-Y2013</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col overall-part">
                    <table className="part-overall-table">
                        <thead>
                            <tr>
                                <td colSpan={3} style={{ textAlign: "left" }}>
                                    MT = manual transmission
                                </td>
                                <th></th>
                                <th></th>
                            </tr>
                            <tr>
                                <td colSpan={3} style={{ textAlign: "left" }}>
                                    AT = Auto transmission
                                </td>
                                <th
                                    colSpan={2}
                                    style={{ border: "3px solid black" }}
                                >
                                    MT
                                </th>
                                <th
                                    colSpan={8}
                                    style={{ border: "3px solid black" }}
                                >
                                    MT&AT
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>VehicleType</th>
                                <th>Maker</th>
                                <th>&nbsp;</th>
                                {carOverallMT.map((el, index) => (
                                    <th key={index}>{el[index].partName}</th>
                                ))}

                                {carOverallMTAT.map((el, index) => (
                                    <th key={index}>
                                        {el[index].partNameMTAT}
                                    </th>
                                ))}
                            </tr>
                            {carOverallMTAT.map((val, key) => (
                                <>
                                    <tr key={key}>
                                        {key === 0 ? (
                                            <td
                                                rowSpan={6}
                                                style={{
                                                    border: "solid 1px black",
                                                }}
                                            >
                                                &nbsp;
                                            </td>
                                        ) : key === 2 ? (
                                            <td
                                                rowSpan={6}
                                                style={{
                                                    border: "solid 1px black",
                                                }}
                                            >
                                                &nbsp;
                                            </td>
                                        ) : null}
                                        <td rowSpan={3}>{val[key].carName}</td>
                                        <td>Total</td>
                                        {carOverallMT.map((el, index) => (
                                            <td
                                                key={index}
                                                style={{ color: "lightgrey" }}
                                            >
                                                {key >= carOverallMT.length
                                                    ? 0
                                                    : el[key].sum}
                                            </td>
                                        ))}
                                        {carOverallMTAT.map((el, index) => (
                                            <td
                                                key={index}
                                                style={{ color: "lightgrey" }}
                                            >
                                                {el[key].sumMTAT}
                                            </td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Coverage</td>
                                        {carOverallMT.map((el, index) => (
                                            <td
                                                key={index}
                                                style={{ color: "lightgrey" }}
                                            >
                                                {key >= carOverallMT.length
                                                    ? 0
                                                    : el[key].coverage}
                                            </td>
                                        ))}
                                        {carOverallMTAT.map((el, index) => (
                                            <td
                                                key={index}
                                                style={{ color: "lightgrey" }}
                                            >
                                                {el[key].coverageMTAT}
                                            </td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>%</td>
                                        {carOverallMT.map((el, index) => {
                                            const percentage = parseInt(
                                                (Number(
                                                    key >= carOverallMT.length
                                                        ? 0
                                                        : el[key].coverage
                                                ) *
                                                    100) /
                                                    Number(
                                                        key >=
                                                            carOverallMT.length
                                                            ? 0
                                                            : el[key].sum
                                                    )
                                            );
                                            return (
                                                <td
                                                    key={index}
                                                    style={{
                                                        backgroundColor: `${
                                                            isNaN(percentage) ||
                                                            key >=
                                                                carOverallMT.length
                                                                ? 0
                                                                : el[key]
                                                                      .sum === 0
                                                                ? "transparent"
                                                                : percentage <=
                                                                  50
                                                                ? "lightcoral"
                                                                : percentage <
                                                                  90
                                                                ? "yellow"
                                                                : "green"
                                                        }`,
                                                        color:
                                                            percentage <= 50
                                                                ? "red"
                                                                : "black",
                                                    }}
                                                >
                                                    {isNaN(percentage)
                                                        ? ""
                                                        : `${percentage}%`}
                                                </td>
                                            );
                                        })}
                                        {carOverallMTAT.map((el, index) => {
                                            const percentage = parseInt(
                                                (Number(el[key].coverageMTAT) *
                                                    100) /
                                                    Number(el[key].sumMTAT)
                                            );
                                            return (
                                                <td
                                                    key={index}
                                                    style={{
                                                        backgroundColor: `${
                                                            isNaN(percentage) ||
                                                            el[key].sum === 0
                                                                ? "transparent"
                                                                : percentage <=
                                                                  50
                                                                ? "lightcoral"
                                                                : percentage <
                                                                  90
                                                                ? "yellow"
                                                                : "green"
                                                        }`,
                                                        color:
                                                            percentage <= 50
                                                                ? "red"
                                                                : "black",
                                                    }}
                                                >
                                                    {isNaN(percentage)
                                                        ? ""
                                                        : `${percentage}%`}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export { ProductOverview };
