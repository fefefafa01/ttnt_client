import React, { useState, useEffect } from "react";
import "./productPeriod.scss";
import { backlocale } from "constants/constindex";
import ReactApexChart from "react-apexcharts";

function ProductPeriod(props) {
    const [openSummary, setOpenSummary] = useState(true);
    const [summary, setSummary] = useState({});
    const [formValues, setFormValues] = useState({
        country_name: props.country_name,
        manufacturer_name: props.manufacturer_name,
        transmission_type: props.transmission_type,
        part_name: props.part_name,
        part_group: props.part_group,
        start_year: props.start_year,
        end_year: props.end_year,
        start_cover: props.start_cover,
        end_cover: props.end_cover,
    });

    // Update formValues when the initialValues prop changes
    useEffect(() => {
        setFormValues({
            ...formValues,
            country_name: props.country_name,
            manufacturer_name: props.manufacturer_name,
            transmission_type: props.transmission_type,
            part_name: props.part_name,
            part_group: props.part_group,
            start_year: props.start_year,
            end_year: props.end_year,
            start_cover: props.start_cover,
            end_cover: props.end_cover,
        });
    }, [props]);
    useEffect(() => {
        console.log(formValues);
        let loc = backlocale + "period/downoverall";
        fetch(loc, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Acess-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                    "GET, PUT, POST, DELETE, PATCH, OPTIONS",
            },
            body: JSON.stringify(formValues),
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
    }, [formValues]);
    //let loc = backlocale + "period/summary";

    // gauge chart
    const [series, setSeries] = useState([]);
    useEffect(
        () => {
            // Calculate the new value for series based on coverage_rate
            const newSeries = [Number(summary.coverage_rate)];
            setSeries(newSeries);
        },
        [summary.coverage_rate],
        summary
    );
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
                        <p className="item">{summary.sum}</p>
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
