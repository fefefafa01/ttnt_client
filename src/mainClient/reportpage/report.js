import React, { useState } from "react";
import "./report.css";
import { ReportHeader } from "components/Header";
import "components/ProductOverview";
import "components/ProductPeriod";

//Link with ReportHandler.js in ./server
function ReportPage(/*{ type }*/) {
    // if (type === 1) {
    //     return reportOverview();
    // } else {
    //     return reportPeriod();
    // }
    return (
        <>
            <ReportHeader />
            <div className="hbody">
                <div class="wrappers-report">
                    <div className="report-content">
                        <div className="rtabs">
                            <button>AAAAA</button>
                            <button>BBBBB</button>
                        </div>
                        <div className="Scroll-report">
                            <div className="tab-panel " id="rscroll-style">
                                abcdcda
                            </div>

                            <div className="sidebar-right">
                                <div className="sidebar-title">
                                    <p>Filter by part (High level)</p>
                                </div>
                                <div className="boxcontent">
                                    <p>Country</p>
                                    <div className="searchBox">
                                        <span>Country</span>
                                    </div>
                                    <p>Car Maker</p>
                                    <div className="searchBox">
                                        <span>Car Maker</span>
                                    </div>
                                    <p>Car Maker</p>
                                    <div className="searchBox">
                                        <span>Car Maker</span>
                                    </div>
                                    <p>Car Maker</p>
                                    <div className="searchBox">
                                        <span>Car Maker</span>
                                    </div>
                                    <p>Car Maker</p>
                                    <div className="searchBox">
                                        <span>Car Maker</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function reportOverview() {
    return (
        //Product Cover Overview
        1
    );
}

function reportPeriod() {
    return (
        //Product Cover by Period
        1
    );
}
export default ReportPage;
export { reportOverview, reportPeriod };
