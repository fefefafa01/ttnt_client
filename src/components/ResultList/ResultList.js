import "./ResultList.css";
import React, { useState } from "react";
import $ from "jquery";
import { Changer } from "components/LanguageChange";

function ResultList(formValues) {
    //Synchronizing Scroll:
    $(function () {
        $(".Scrollthebar").on("scroll", function () {
            $(".contents-results").scrollLeft($(".Scrollthebar").scrollLeft());
        });
        $(".contents-results").on("scroll", function () {
            $(".Scrollthebar").scrollLeft($(".contents-results").scrollLeft());
        });
    });

    var data = Object.values(formValues);
    console.log(data[0].length);

    return (
        <div className="tabcontent">
            <h3> Result found </h3>
            <div className="Scroll" id="scroll-style">
                <div className="contents-results">
                    <div className="resulttabling">
                        <table>
                            <thead>
                                <tr>
                                    <th rowSpan="2" className="titleResult">
                                        No
                                    </th>
                                    <th rowSpan="2" className="titleResult">
                                        <Changer inp="Car Maker" />
                                    </th>
                                    <th rowSpan="2" className="titleResult">
                                        <Changer inp="Model Name" />
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
                            </thead>
                            <tbody>
                                {data[0].map((el, index) => (
                                    <tr key={index}>
                                        <td>{el.no}</td>
                                        <td>{el.car_maker}</td>
                                        <td>{el.car_model_name}</td>
                                        <td>{el.model_code}</td>
                                        <td>{el.start_of_production}</td>
                                        <td>{el.end_of_production}</td>
                                        <td>{el.drivers_position}</td>
                                        <td>{el.engine_code}</td>
                                        <td>{el.displacement_code}</td>
                                        <td>{el.powered_type}</td>
                                        <td>{el.fuel_type}</td>
                                        <td>{el.transmission_code}</td>
                                        <td>{el.transmission_type}</td>
                                        <td>{el.speed}</td>
                                        <td>{el.drivetrain}</td>
                                        <td>{el.oe}</td>
                                        <td>{el.aisin_premium_code}</td>
                                        <td>{el.aisin_sub_premium_code}</td>

                                        <td>
                                            <button
                                                className="details"
                                                // onClick={(e) => openPDF(el.OE)}
                                            >
                                                <Changer inp="Details" />
                                            </button>
                                        </td>
                                        <td>{el.oe}</td>
                                        <td>{el.aisin_premium_code}</td>
                                        <td>{el.aisin_sub_premium_code}</td>

                                        <td>
                                            <button
                                                className="details"
                                                // onClick={(e) => openPDF(el.OE)}
                                            >
                                                <Changer inp="Details" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="Scrollthebar">
                    <html className="emptyscrolling">&nbsp;</html>
                </div>
            </div>
        </div>
    );
}

export { ResultList };
