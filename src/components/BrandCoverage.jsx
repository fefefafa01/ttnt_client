import React, { useState, useEffect } from "react";
import "./comp.styles/brandCoverage.scss";
import { backlocale } from "constants/constindex";
import ReactApexChart from "react-apexcharts";

function BrandCoverage(props) {
    const [brandName, setBrandName] = useState(props.Brand);
    const [rate, setRate] = useState(props.Rate);

    // Update formValues when the initialValues prop changes
    useEffect(() => {
        setBrandName(props.Brand);
        setRate(props.Rate);
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

    const [chartHeight, setChartHeight] = useState("90%");

    useEffect(() => {
        const handleResize = () => {
            setChartHeight("100%");
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial height calculation

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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
                animations: {
                    enabled: false, // Disable animations to prevent glitches with CSS transformations
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
                categories: brandName,
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
            grid: {
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                yaxis: {
                    lines: {
                        show: false,
                    },
                },
                padding: {
                    right: 25,
                    left: 15,
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
                    height={chartHeight}
                />
            </div>
        </>
    );
}

export { BrandCoverage };
