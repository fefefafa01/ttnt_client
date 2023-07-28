import "../Epic1Filter";
import React, { useState } from "react";
import "./productPeriod.scss";
import GaugeChart from "react-gauge-chart";

function ProductPeriod(GaugeNum) {
    const [openSummary, setOpenSummary] = useState(true);
    const [summary, setSummary] = useState({});

    if (openSummary) {
        fetch("http://localhost:5000/period/summary", {
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
                setOpenSummary(false);
                setSummary(data.summary);
                console.log(data.summary);
            });
    }

    return (
        <div>
            <div className="coverage-summary">
                <div className="summary-label">
                    <p>AISIN Total Coverage Summary</p>
                </div>
                <div className="summary-item">
                    <div className="col ">
                        <p>Total Market</p>
                        <p className="item">{summary.maker}</p>
                    </div>
                    <div className="col ">
                        <p>Total Coverage</p>
                        <p className="item">{summary.coverage}</p>
                    </div>
                    <div className="col ">
                        <p>Total % Coverage</p>
                        {GaugeNum <= 0.5 ? (
                            <GaugeChart
                                id="gauge-chart1"
                                nrOfLevels={420}
                                arcsLength={[GaugeNum, 1 - GaugeNum]}
                                colors={["red", "#FFF"]}
                                percent={GaugeNum}
                                arcPadding={0.02}
                            />
                        ) : summary.coverage_rate < 0.9 ? (
                            <GaugeChart
                                id="gauge-chart2"
                                nrOfLevels={420}
                                arcsLength={[
                                    summary.coverage_rate,
                                    1 - summary.coverage_rate,
                                ]}
                                colors={["yellow", "#FFF"]}
                                percent={summary.coverage_rate}
                                arcPadding={0.02}
                            />
                        ) : (
                            <GaugeChart
                                id="gauge-chart3"
                                nrOfLevels={420}
                                arcsLength={[
                                    summary.coverage_rate,
                                    1 - summary.coverage_rate,
                                ]}
                                colors={["green", "#FFF"]}
                                percent={summary.coverage_rate}
                                arcPadding={0.02}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export { ProductPeriod };
