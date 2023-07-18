import "../Epic1Filter";
import React, { useState } from "react";
import "./productPeriod.css";
import GaugeChart from "react-gauge-chart";

function ProductPeriod() {
    const [totalMarket, setTotalMarket] = useState(10000);
    const [totalCoverage, setTotalCoverage] = useState(9000);
    const totalPecent = Number(totalCoverage) / Number(totalMarket);
    console.log(totalPecent);
    return (
        <div>
            <div className="coverage-summary">
                <div className="summary-label">
                    <p>AISIN Total Coverage Summary</p>
                </div>
                <div className="summary-item">
                    <div className="col ">
                        <p>Total Market</p>
                        <p className="item">{totalMarket}</p>
                    </div>
                    <div className="col ">
                        <p>Total Coverage</p>
                        <p className="item">{totalCoverage}</p>
                    </div>
                    <div className="col ">
                        <p>Total % Coverage</p>
                        {totalPecent <= 0.5 ? (
                            <GaugeChart
                                id="gauge-chart1"
                                nrOfLevels={420}
                                arcsLength={[totalPecent, 1 - totalPecent]}
                                colors={["red", "#FFF"]}
                                percent={totalPecent}
                                arcPadding={0.02}
                            />
                        ) : totalPecent < 0.9 ? (
                            <GaugeChart
                                id="gauge-chart2"
                                nrOfLevels={420}
                                arcsLength={[totalPecent, 1 - totalPecent]}
                                colors={["yellow", "#FFF"]}
                                percent={totalPecent}
                                arcPadding={0.02}
                            />
                        ) : (
                            <GaugeChart
                                id="gauge-chart3"
                                nrOfLevels={420}
                                arcsLength={[totalPecent, 1 - totalPecent]}
                                colors={["green", "#FFF"]}
                                percent={totalPecent}
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
