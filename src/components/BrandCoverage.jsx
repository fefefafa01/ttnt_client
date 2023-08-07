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

    const [brandName, setBrandName] = useState([]);
    const [rate, setRate] = useState([]);

    useEffect(() => {
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
                setBrandName(data.brandName);
                setRate(data.coverageRate);
            });
    }, [props]);

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
                name: brandName,
                data: rate,
            },
        ],
        options: {
            chart: {
                type: "bar",
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
                    fontSize: "0.5em",
                    colors: ["#000000"],
                    fontWeight: "normal",
                },
            },

            xaxis: {
                categories: brandName,
                labels: {
                    style: {
                        fontSize: "0.5em", // Set the desired font size for x-axis labels
                        colors: ["#000000"],
                    },
                },
                title: {
                    text: "Total Percent Coverage", // Set the x-axis label
                    style: {
                        fontSize: "16px", // Set the font size for the x-axis label
                        fontWeight: "bold", // Set the font weight for the x-axis label
                    },
                    offsetY: 20,
                },
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: "0.5em", // Set the desired font size for x-axis labels
                        colors: ["#000000"],
                    },
                },
                min: 0,
                max: 100,
                title: {
                    text: "Maker", // Set the y-axis label
                    style: {
                        fontSize: "16px", // Set the font size for the y-axis label
                        fontWeight: "bold", // Set the font weight for the y-axis label
                    },
                },
            },
            title: {
                text: "Product Coverage by % Brand", // Set the main title of the chart
                align: "center", // Set the alignment of the title (left, center, or right)
                style: {
                    fontSize: "15px", // Set the font size for the title
                    offsetY: 10,
                },
            },
            tooltip: {
                enabled: false, // Set to false to hide the tooltip box on hover
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
                    height={"100%"}
                />
            </div>
        </>
    );
}

export { BrandCoverage };
