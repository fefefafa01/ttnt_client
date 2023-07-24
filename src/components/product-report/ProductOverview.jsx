import { useState } from "react";
import "../Epic1Filter";
import "./productOverview.scss";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { fontWeight } from "@mui/system";

function ProductOverview() {
    const [maker, setMaker] = useState([]);
    const [sumMaker, setSumMaker] = useState(0);
    const [firstOpen, setFirstOpen] = useState(true);
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
                    console.log(data.MakerName[i].sum);
                    console.log(sumMaker);
                }
                setMaker(data.MakerName);
                console.log(data.MakerName.length);
                console.log(sumMaker);
            });
    }
    return (
        <div>
            <div className="dashboard">
                .
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
                <div className="col"></div>
            </div>
            <div className="col"></div>
        </div>
    );
}

export { ProductOverview };
