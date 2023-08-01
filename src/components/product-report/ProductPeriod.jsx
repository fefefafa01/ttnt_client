import "../Epic1Filter";
import React, { useState, useEffect } from "react";
import "./productPeriod.scss";
import ReactApexChart from "react-apexcharts";

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

    // gauge chart
    const [series, setSeries] = useState([10]);
    useEffect(() => {
        // Calculate the new value for series based on coverage_rate
        const newSeries = [summary.coverage_rate * 100];
        setSeries(newSeries);
    }, [summary.coverage_rate]);
    const [options, setOptions] = useState({
        chart: {
            type: "radialBar",
            offsetY: -20,
            sparkline: {
                enabled: true,
            },
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: {
                    background: "#FFFFFF",
                    strokeWidth: "97%",
                    margin: 5,
                    dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        color: "#999",
                        opacity: 1,
                        blur: 2,
                    },
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        offsetY: -2,
                        fontSize: "22px",
                    },
                },
            },
        },
        grid: {
            padding: {
                top: -10,
            },
        },
        colors:
            series < 50 ? ["#FF0000"] : series < 90 ? ["#FFFF00"] : ["#008000"],

        labels: ["Average Results"],
    });

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
                        <ReactApexChart
                            id={
                                series <= 50
                                    ? "gauge-chart1"
                                    : series <= 90
                                    ? "gauge-chart2"
                                    : "gauge-chart3"
                            }
                            options={options}
                            series={series}
                            type="radialBar"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export { ProductPeriod };
