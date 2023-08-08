import React, { useState, useEffect } from "react";
import "./comp.styles/dashboard.scss";
import { backlocale } from "constants/constindex";
import ReactApexChart from "react-apexcharts";

function Dashboard(props) {
    const [formValues, setFormValues] = useState(props.formValues);

    // Update formValues when the initialValues prop changes
    useEffect(() => {
        setFormValues(props.formValues);
    }, [props]);

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
            });
    }, [props]);

    return (
        <>
            <div className="dashboard-period">
                <div className="dashboard-header">
                    <div className="aisin-header">
                        <p>AISIN</p>
                    </div>
                    <div className="monitor-header">
                        <p>Monitoring Dashboard</p>
                    </div>
                </div>
                <div className="dashboard-criteria">
                    <div className="dashboard-left">
                        <p
                            style={{
                                color: "darkblue",
                                fontWeight: "bold",
                                fontSize: "1.2em",
                            }}
                        >
                            Dashboard Criteria
                        </p>
                        <p>- Country = Thailand</p>
                        <p>- Car Maker = All Brand</p>
                        <p>- Transmission Type = All Transmission Type</p>
                    </div>
                    <div className="dashboard-right">
                        <p>Dashboard Criteria</p>
                        <p>- Country = Thailand</p>
                        <p>- Car Maker = All Brand</p>
                        <p>- Transmission Type = All Transmission Type</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export { Dashboard };
