import React, { useState, useEffect } from "react";
import "./comp.styles/partCoverage.scss";
import { backlocale } from "constants/constindex";
import ReactApexChart from "react-apexcharts";

function PartCoverage(props) {
    const [partName, setPartName] = useState(props.Part);
    const [rate, setRate] = useState(props.Rate);

    // Update formValues when the initialValues prop changes
    useEffect(() => {
        setPartName(props.Part);
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
                    categories: partName,
                },
            },
        }));
    }, [partName]);

    const [chartData, setChartData] = useState({
        series: [
            {
                name: partName,
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
                offsetY: 1,
            },
            plotOptions: {
                bar: {
                    borderRadius: 0,
                    horizontal: false,
                    columnWidth: "20px",
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
                offsetY: -10,
                style: {
                    fontSize: "0.5em",
                    colors: ["#000000"],
                    fontWeight: "normal",
                },
            },

            xaxis: {
                lines: {
                    show: true,
                },
                categories: partName,
                labels: {
                    offsetY: 20,
                    show: true,
                    rotate: -45,
                    rotateAlways: true,
                    trim: true,
                    style: {
                        fontSize: "0.55em", // Set the desired font size for x-axis labels
                        colors: ["#000000"],
                    },
                },
            },
            yaxis: {
                labels: {
                    show: false,
                },

                min: 0,
                max: 100,
            },
            title: {
                text: "% COVERAGE", // Set the main title of the chart
                align: "center", // Set the alignment of the title (left, center, or right)
                style: {
                    fontSize: "15px", // Set the font size for the title
                    fontWeight: "bold",
                },
            },
            subtitle: {
                text: "(DEFAULT ALL BRAND)", // Add your secondary line of text here
                align: "center", // Align the subtitle in the center
                offsetY: 20, // Adjust the vertical position of the subtitle
                style: {
                    fontSize: "15px", // Set the font size for the title
                    fontWeight: "bold",
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
            <div className="plabel">
                <p>Product Coverage by Part Name</p>
            </div>
            <div id="chartPart">
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

export { PartCoverage };
