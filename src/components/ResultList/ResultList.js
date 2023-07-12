import "./ResultList.css";
import React from "react";

function ResultList() {
    return (
        <div className="tabcontent">
            <h3> Result found </h3>
            <div className="Scroll" id="scroll-style">
                <div className="contents-results">
                    <table>
                        <theader>
                            <tr>
                                <th rowSpan="2" className="titleResult">
                                    {" "}
                                    No{" "}
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    {" "}
                                    Car Maker{" "}
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    {" "}
                                    Model Code{" "}
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    {" "}
                                    From{" "}
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    {" "}
                                    To{" "}
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    {" "}
                                    Driver's Position{" "}
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    {" "}
                                    Engine Code{" "}
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    {" "}
                                    Displacement{" "}
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    {" "}
                                    Powered Type{" "}
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    {" "}
                                    Fuel Type{" "}
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    {" "}
                                    Transmission Code{" "}
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    {" "}
                                    Transmission Type{" "}
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    {" "}
                                    Speed{" "}
                                </th>
                                <th rowSpan="2" className="titleResult">
                                    {" "}
                                    Drivetrain{" "}
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
                                    ASIN Premium
                                </th>
                                <th className="subtitle AISIN">
                                    ASIN Sub-Premium/AN
                                </th>
                                <th className="subtitle AISIN">
                                    Specification
                                </th>
                                <th className="subtitle OE">OE#</th>
                                <th className="subtitle AISIN ">
                                    ASIN Premium
                                </th>
                                <th className="subtitle AISIN">
                                    ASIN Sub-Premium/AN
                                </th>
                                <th className="subtitle AISIN">
                                    Specification
                                </th>
                            </tr>
                        </theader>
                    </table>
                </div>
            </div>
        </div>
    );
}

export { ResultList };
