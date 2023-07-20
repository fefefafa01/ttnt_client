import "./ResultList.css";
import React, { useState, useEffect } from "react";
import $ from "jquery";
import { Changer } from "components/LanguageChange";
import ReactPaginate from "react-paginate";
import vehiclePart from "./vehiclePart.png";
import Download from "../../img/download.png";
import Prev from "../../img/prev_btn.png";
import Next from "../../img/next_btn.png";

function ResultList(props) {
    const { formValues, count } = props;
    console.log(formValues);
    //Synchronizing Scroll:
    $(function () {
        $(".Scrollthebar").on("scroll", function () {
            $(".contents-results").scrollLeft($(".Scrollthebar").scrollLeft());
        });
        $(".contents-results").on("scroll", function () {
            $(".Scrollthebar").scrollLeft($(".contents-results").scrollLeft());
        });
    });

    let no = 1;

    const [downdrop, setDowndrop] = useState(false);
    const handleDropdown = () => {
        setDowndrop(!downdrop);
    };
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        setItemOffset(0); // Reset the item offset when the items per page changes
    }, [itemsPerPage]);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;

    const pageCount = Math.ceil(formValues.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage;
        setItemOffset(newOffset);
    };

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(parseInt(event.target.value, 10));
    };

    const currentItems = formValues.slice(itemOffset, endOffset);

    var add = [];
    let a = 0;
    add[a] = formValues[0];
    for (let i = 1; i < formValues.length; i++) {
        if (formValues[i - 1].car_info_id !== formValues[i].car_info_id) {
            add[a++] = formValues[i];
        }
    }
    const currentItemss = add.slice(itemOffset, endOffset);
    console.log(add);

    const pageCounts = Math.ceil(add.length / itemsPerPage);

    if (formValues === "There is no car matched your search") {
        return (
            <div className="tabcontent">
                <h3> Welcome! </h3>
                <div className="Scroll" id="scroll-style">
                    <div className="contents">
                        <h1>There is no car matched your search</h1>
                    </div>
                </div>
            </div>
        );
    } else {
        if (count !== 0) {
            return (
                <div className="tabcontent">
                    <div className="titlecontent">
                        <h3>Model Found: {formValues.length} records</h3>
                        <div className="col-3">
                            <ReactPaginate
                                previousLabel={
                                    <img
                                        className="prev-next-btn"
                                        src={Prev}
                                        alt="Previous"
                                    />
                                }
                                nextLabel={
                                    <img
                                        className="prev-next-btn"
                                        src={Next}
                                        alt="Next"
                                    />
                                }
                                breakLabel={"..."}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3} // Number of visible page numbers around the current page
                                onPageChange={handlePageClick}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"}
                                //forcePage={currentPage}
                                breakClassName={"break-me"}
                                breakLinkClassName={"break-link"}
                                pageClassName={"page-item"}
                                pageLinkClassName={"page-link"}
                                previousClassName={"previous-page"}
                                nextClassName={"next-page"}
                                previousLinkClassName={"previous-link"}
                                nextLinkClassName={"next-link"}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="itemsPerPage">
                                Records per Page:
                            </label>
                            <select
                                id="itemsPerPage"
                                value={itemsPerPage}
                                onChange={handleItemsPerPageChange}
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </div>
                        <div className="col">
                            <button
                                className="col download"
                                onClick={handleDropdown}
                            >
                                <img
                                    className="downloadbutton"
                                    src={Download}
                                    alt="download"
                                />
                                <span className="download-text">
                                    <Changer inp="Download to file" />
                                </span>
                            </button>
                            {/* {downdrop && (
                        <DropDown
                            data={premiumData}
                            dropping={handleDropdown}
                        />
                    )} */}
                        </div>
                    </div>
                    <div className="Scroll" id="scroll-style">
                        <div className="contents-results">
                            <div className="resulttabling">
                                <table>
                                    <thead>
                                        <tr>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                No
                                            </th>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                <Changer inp="Car Maker" />
                                            </th>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                <Changer inp="Model Name" />
                                            </th>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                <Changer inp="Model Code" />
                                            </th>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                <Changer inp="From" />
                                            </th>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                <Changer inp="To" />
                                            </th>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                <Changer inp="Driver's Position" />
                                            </th>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                <Changer inp="Engine Code" />
                                            </th>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                <Changer inp="Displacement" />
                                            </th>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                <Changer inp="Powered Type" />
                                            </th>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                <Changer inp="Fuel Type" />
                                            </th>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                <Changer inp="Transmission Code" />
                                            </th>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                <Changer inp="Transmission Type" />
                                            </th>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                <Changer inp="Speed" />
                                            </th>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                <Changer inp="Drivetrain" />
                                            </th>
                                            <th
                                                colSpan="4"
                                                className="titleResult"
                                            >
                                                STABILIZER LINK (F) (L):
                                                ลูกหมากกันโคลงหน้าซ้าย
                                            </th>
                                            <th
                                                colSpan="4"
                                                className="titleResult"
                                            >
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
                                        {currentItems.map((el, index) => (
                                            <tr key={index}>
                                                <td>{no++}</td>
                                                <td>{el.car_maker}</td>
                                                <td>{el.car_model_name}</td>
                                                <td>{el.model_code}</td>
                                                <td>
                                                    {el.start_of_production}
                                                </td>
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
                                                <td>
                                                    {el.aisin_sub_premium_code}
                                                </td>

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
                                                <td>
                                                    {el.aisin_sub_premium_code}
                                                </td>

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
        } else {
            return (
                <div className="tabcontent">
                    <div className="titlecontent">
                        <div className="col-2">
                            <h3>Model Found: {add.length} records</h3>
                        </div>
                        <div className="col-3">
                            <ReactPaginate
                                previousLabel={
                                    <img
                                        className="prev-next-btn"
                                        src={Prev}
                                        alt="Previous"
                                    />
                                }
                                nextLabel={
                                    <img
                                        className="prev-next-btn"
                                        src={Next}
                                        alt="Next"
                                    />
                                }
                                breakLabel={"..."}
                                pageCount={pageCounts}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3} // Number of visible page numbers around the current page
                                onPageChange={handlePageClick}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"}
                                //forcePage={currentPage}
                                breakClassName={"break-me"}
                                breakLinkClassName={"break-link"}
                                pageClassName={"page-item"}
                                pageLinkClassName={"page-link"}
                                previousClassName={"previous-page"}
                                nextClassName={"next-page"}
                                previousLinkClassName={"previous-link"}
                                nextLinkClassName={"next-link"}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="itemsPerPage">
                                Records per Page:
                            </label>
                            <select
                                id="itemsPerPage"
                                value={itemsPerPage}
                                onChange={handleItemsPerPageChange}
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </div>
                        <div className="col">
                            <button
                                className="col download"
                                onClick={handleDropdown}
                            >
                                <img
                                    className="downloadbutton"
                                    src={Download}
                                    alt="download"
                                />
                                <span className="download-text">
                                    <Changer inp="Download to file" />
                                </span>
                            </button>
                            {/* {downdrop && (
                        <DropDown
                            data={premiumData}
                            dropping={handleDropdown}
                        />
                    )} */}
                        </div>
                    </div>
                    <div className="Scroll" id="scroll-style">
                        <div className="contents-results">
                            <div className="resulttabling">
                                <table>
                                    <thead>
                                        <tr>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                No
                                            </th>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                All Part List
                                            </th>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                <Changer inp="Car Maker" />
                                            </th>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                <Changer inp="Model Name" />
                                            </th>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                <Changer inp="Model Code" />
                                            </th>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                <Changer inp="From" />
                                            </th>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                <Changer inp="To" />
                                            </th>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                <Changer inp="Driver's Position" />
                                            </th>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                <Changer inp="Engine Code" />
                                            </th>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                <Changer inp="Displacement" />
                                            </th>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                <Changer inp="Powered Type" />
                                            </th>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                <Changer inp="Fuel Type" />
                                            </th>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                <Changer inp="Transmission Code" />
                                            </th>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                <Changer inp="Transmission Type" />
                                            </th>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                <Changer inp="Speed" />
                                            </th>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                <Changer inp="Drivetrain" />
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItemss.map((el, index) => (
                                            <tr key={index}>
                                                <td>{no++}</td>
                                                <td>
                                                    {" "}
                                                    <img
                                                        src={vehiclePart}
                                                        id="VehiclePart"
                                                        alt="vehiclePart"
                                                    />
                                                </td>
                                                <td>{el.car_maker}</td>
                                                <td>{el.car_model_name}</td>
                                                <td>{el.model_code}</td>
                                                <td>
                                                    {el.start_of_production}
                                                </td>
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
    }
}

export { ResultList };
