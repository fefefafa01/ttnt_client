import React, { useState, useEffect } from "react";
import "./productPeriod.scss";
import { BrandCoverage } from "components/BrandCoverage";
import { PartCoverage } from "components/PartCoverage";
import { ProductCoverage } from "components/ProductCoverage";
import { Dashboard } from "components/Dashboard";
import { backlocale } from "constants/constindex";
import ReactApexChart from "react-apexcharts";

function ProductPeriod(props) {
    const [summary, setSummary] = useState({});
    const [brandName, setBrandName] = useState([]);
    const [rate, setRate] = useState([]);
    const [partName, setPartName] = useState([]);
    const [ratePart, setRatePart] = useState([]);
    const [temp, setTemp] = useState([]);
    const [dashboard, setDashboard] = useState({});
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
        let loc = backlocale + "period/periodData";
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

                setSummary(data.data);
                setBrandName(data.brandName);
                setRate(data.coverageRate);
                setPartName(data.partName);
                setRatePart(data.coveragePart);
                setTemp(data.temp);
            });

        let loc1 = backlocale + "period/dashboard";
        fetch(loc1, {
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

                setDashboard({
                    country: data.country,
                    brand: data.brand,
                    Ttype: data.Ttype,
                    PGroup: data.PGroup,
                    PName: data.PName,
                    StY: data.StY,
                    EnY: data.EnY,
                    StC: data.StC,
                    EnC: data.EnC,
                });
                console.log(data);
            });
    }, [formValues]);

    // gauge chart

    const [series, setSeries] = useState([90]);

    useEffect(() => {
        setSeries([Number(summary.coverage_rate)]);
    }, [summary.coverage_rate]);

    const [chartHeight, setChartHeight] = useState("90%");

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1100) {
                setChartHeight("60px");
            } else if (window.innerWidth <= 1180) {
                setChartHeight("70px");
            } else {
                setChartHeight("80px");
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial height calculation

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const [options, setOptions] = useState({
        chart: {
            type: "radialBar",
            sparkline: {
                enabled: true,
            },
        },
        plotOptions: {
            radialBar: {
                offsetY: 5,
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
                        offsetY: 2,
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
            series < 50 ? ["#FF0000"] : series < 90 ? ["#FFFB00"] : ["#00FF04"],
    });

    useEffect(() => {
        setOptions({
            ...options,
            colors:
                series < 50
                    ? ["#FF0000"]
                    : series < 90
                    ? ["#FFFB00"]
                    : ["#00FF04"],
        });
    }, [series]);

    return (
        <div className="tab2">
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "50% 1fr",
                }}
            >
                <div style={{ padding: "10px" }} className="item ">
                    <BrandCoverage Brand={brandName} Rate={rate} />
                </div>
                <div className="monitor-column">
                    <div className="item" style={{ paddingBottom: "10px" }}>
                        <Dashboard
                            formValues={formValues}
                            Dashboard={dashboard}
                        />
                    </div>
                    <div className="item coverage-summary">
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
                                            : series < 90
                                            ? "gauge-chart2"
                                            : "gauge-chart3"
                                    }
                                    options={options}
                                    series={series}
                                    height={chartHeight}
                                    type="radialBar"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="porduct-cov">
                <div
                    className="item"
                    style={{ padding: "10px", height: "100%" }}
                >
                    <PartCoverage Part={partName} Rate={ratePart} />
                </div>
                <div
                    className="item"
                    style={{
                        padding: "10px",
                        width: "fit-content",
                        height: "100%",
                        overflowY: "hidden",
                    }}
                >
                    <ProductCoverage Temp={temp} />
                </div>
            </div>
        </div>
    );
}

export { ProductPeriod };
