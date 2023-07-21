import "../Epic1Filter";
import React, { useState } from "react";
import "./productPeriod.css";
import GaugeChart from "react-gauge-chart";

function ProductPeriod() {
    const [totalMarket, setTotalMarket] = useState(10000);
    const [totalCoverage, setTotalCoverage] = useState(7500);
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
                        <p>{totalMarket}</p>
                    </div>
                    <div className="col ">
                        <p>Total Coverage</p>
                        <p>{totalCoverage}</p>
                    </div>
                    <div className="col ">
                        <p>Total % Coverage</p>
                        <GaugeChart
                            id="gauge-chart1"
                            nrOfLevels={420}
                            arcsLength={[totalPecent, 0.5]}
                            colors={["#ffff00", "#FFF"]}
                            percent={totalPecent}
                            arcPadding={0.02}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export { ProductPeriod };
