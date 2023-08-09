import React, { useState, useEffect } from "react";
import "./comp.styles/productCoverage.scss";
import { backlocale } from "constants/constindex";
import ReactApexChart from "react-apexcharts";

function ProductCoverage(props) {
    const header = [
        "Car Maker",
        "Part Group",
        "Part Name",
        "Total Market",
        "Total Coverage",
        "Coverage (%)",
    ];
    const [formValues, setFormValues] = useState(props.formValues);

    // Update formValues when the initialValues prop changes
    useEffect(() => {
        setFormValues(props.formValues);
    }, [props]);

    const [temp, setTemp] = useState([]);

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
                setTemp(data.temp);
                console.log(data.temp);
            });
    }, [props]);

    return (
        <>
            <div className="summary-label">
                <p>Product Coverage Summary</p>
            </div>
            <div id="product">
                <table
                    style={{
                        backgroundColor: "white",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <thead>
                        <tr
                            style={{
                                fontSize: "0.5em",
                                color: "white",
                            }}
                        >
                            {header.map((el, index) => (
                                <th
                                    style={{
                                        border: "solid 1px black",
                                        backgroundColor: "grey",
                                    }}
                                    key={index}
                                >
                                    {el}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {temp.map((el, index) => (
                            <tr
                                key={index}
                                style={{
                                    fontSize: "0.5em",
                                    color: "black",
                                }}
                            >
                                <th
                                    className="product-table"
                                    style={{ textAlign: "left" }}
                                >
                                    {el.car_brand_name}
                                </th>
                                <th
                                    className="product-table"
                                    style={{ textAlign: "left" }}
                                >
                                    {el.part_group_name}
                                </th>
                                <th
                                    className="product-table"
                                    style={{ textAlign: "left" }}
                                >
                                    {el.original_part_name}
                                </th>
                                <th className="product-table">{el.total}</th>
                                <th className="product-table">{el.coverage}</th>
                                <th
                                    className="product-table"
                                    style={
                                        Number(el.coverage_rate) < 50
                                            ? { backgroundColor: "red" }
                                            : Number(el.coverage_rate) < 90
                                            ? { backgroundColor: "yellow" }
                                            : { backgroundColor: "green" }
                                    }
                                >
                                    {el.coverage_rate}
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export { ProductCoverage };
