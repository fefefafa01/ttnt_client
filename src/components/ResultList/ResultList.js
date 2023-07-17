import "./ResultList.css";
import React from "react";
import $ from "jquery";
import { Changer } from "components/LanguageChange";

function ResultList() {
    //Synchronizing Scroll: 
    $(function() {
        $(".Scrollthebar").on("scroll", function() {
            $(".contents-results")
                .scrollLeft($(".Scrollthebar").scrollLeft());
        });
        $(".contents-results").on("scroll", function() {
            $(".Scrollthebar")
                .scrollLeft($(".contents-results").scrollLeft())
        });
    });
    return (
        <div className="tabcontent">
            <h3> Result found </h3>
            <div className="Scroll" id="scroll-style">
                <div className="contents-results">
                    <div className="resulttabling">
                    <table>
                        <theader>
                            <tr>
                                <th rowSpan="2" className="titleResult">
                                    No
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    <Changer inp="Car Maker" />
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    <Changer inp="Model Code" />
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    <Changer inp="From" />
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    <Changer inp="To" />
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    <Changer inp="Driver's Position" />
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    <Changer inp="Engine Code" />
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    <Changer inp="Displacement" />
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    <Changer inp="Powered Type" />
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    <Changer inp="Fuel Type" />
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    <Changer inp="Transmission Code" />
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    <Changer inp="Transmission Type" />
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    <Changer inp="Speed" />
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    <Changer inp="Drivetrain" />
                                </th>
                                <th colSpan="4" className="titleResult">
                                    STABILIZER LINK (F) (L):
                                    ลูกหมากกันโคลงหน้าซ้าย
                                </th>
                                <th colSpan="4" className="titleResult">
                                    STABILIZER LINK (F) (R):
                                    ลูกหมากกันโคลงหน้าขวา
                                </th>
                            </tr>
                            <tr>
                                <th className="subtitle OE">OE#</th>
                                <th className="subtitle AISIN ">
                                    AISIN Premium
                                </th>
                                <th className="subtitle AISIN">
                                    AISIN Sub-Premium/AM
                                </th>
                                <th className="subtitle AISIN">
                                    <Changer inp="Specification" />
                                </th>
                                <th className="subtitle OE">OE#</th>
                                <th className="subtitle AISIN ">
                                    AISIN Premium
                                </th>
                                <th className="subtitle AISIN">
                                    AISIN Sub-Premium/AM
                                </th>
                                <th className="subtitle AISIN">
                                    <Changer inp="Specification" />
                                </th>
                            </tr>
                        </theader>
                    </table>
                    </div>
                </div>
                <div className="Scrollthebar"><html className="emptyscrolling">&nbsp;</html></div>
            </div>
        </div>
    );
}

export { ResultList };
