import React, { useState, useEffect } from "react";
import "./comp.styles/brandCoverage.scss";
import { backlocale } from "constants/constindex";
import ReactApexChart from "react-apexcharts";

function BrandCoverage(props) {
    console.log(props.formValues);
    const [formValues, setFormValues] = useState(props.formValues);

    // Update formValues when the initialValues prop changes
    useEffect(() => {
        setFormValues(props.formValues);
    }, [props]);
    const [firstOpen, setFirstOpen] = useState(true);
    const [brandName, setBrandName] = useState([]);
    const [rate, setRate] = useState([]);
    if (firstOpen) {
        let loc = backlocale + "period/brandChart";
        fetch(loc, {
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
                setFirstOpen(false);
                if (!data) return;
                setBrandName(data.brandName);
                setRate(data.coverageRate);
                console.log(data.coverageRate);
            });
    }

    useEffect(() => {
        // Update the series in the chartData whenever rate state changes
        setChartData((prevChartData) => ({
            ...prevChartData,
            series: [{ data: rate }],
        }));
    }, [rate]);
    useEffect(() => {
        // Update the x-axis categories whenever brandName state changes
        setChartData((prevChartData) => ({
            ...prevChartData,
            options: {
                ...prevChartData.options,
                xaxis: {
                    ...prevChartData.options.xaxis,
                    categories: brandName,
                },
            },
        }));
    }, [brandName]);

    const [chartData, setChartData] = useState({
        series: [
            {
                data: rate,
            },
        ],
        options: {
            chart: {
                type: "bar",
                height: 350,
                background: "#ffffff",
                toolbar: {
                    show: false, // Set to true to show the default chart toolbar
                },
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true,
                    dataLabels: {
                        position: "top",
                    },
                    colors: {
                        ranges: [
                            {
                                from: 0,
                                to: 50,
                                color: "#FF0000", // Set the color for values less than 500 (red)
                            },
                            {
                                from: 50,
                                to: 90,
                                color: "#FFFF00", // Set the color for values greater than or equal to 500 (blue)
                            },
                            {
                                from: 90,
                                to: 100,
                                color: "#008000", // Set the color for values greater than or equal to 500 (blue)
                            },
                        ],
                    },
                },
            },
            dataLabels: {
                enabled: true,
                offsetX: 15,
                offsetY: 10,
                style: {
                    fontSize: "0.7em",
                    colors: ["#000000"],
                },
            },

            xaxis: {
                categories: brandName,
                labels: {
                    style: {
                        fontSize: "0.7em", // Set the desired font size for x-axis labels
                        colors: ["#000000"],
                    },
                },
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: "0.7em", // Set the desired font size for x-axis labels
                        colors: ["#000000"],
                    },
                },
                min: 0,
                max: 100,
            },
            title: {
                text: "Product Coverage by % Brand", // Set the main title of the chart
                align: "center", // Set the alignment of the title (left, center, or right)
                style: {
                    fontSize: "15px", // Set the font size for the title
                    marginTop: "10px",
                },
            },
        },
    });

    return (
        <>
            <div className="summary-label">
                <p>AISIN Total Coverage Summary</p>
            </div>
            <div id="chart">
                <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="bar"
                    height={350}
                />
            </div>
        </>
    );
}

export { BrandCoverage };
