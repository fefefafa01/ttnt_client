import "./ResultList.scss";
import React, { useState, useEffect } from "react";
import $ from "jquery";
import { Changer } from "../Languages/LanguageChange";
import ReactPaginate from "react-paginate";
import vehiclePart from "./vehiclePart.png";
import Download from "../../img/download.png";
import Prev from "../../img/prev_btn.png";
import Next from "../../img/next_btn.png";
import {DropDown, DropingDown } from "./ResDown";
import { Specpdf } from "components/SpecPDF";

function ResultList(props) {
    
    const { formValues, count, Add, onAdd} = props;
    //Synchronizing Scroll:

    $(function() {
        $(".plistscroll").on("scroll", function() {
            $(".scrollsynch")
                .scrollLeft($(".plistscroll").scrollLeft());
        });
        $(".scrollsynch").on("scroll", function() {
            $(".plistscroll")
                .scrollLeft($(".scrollsynch").scrollLeft())
        });
    });
    let no = 1;

    //Downloader
    const [downdrop, setDowndrop] = useState(false);
    const handleDropdown = () => {
        setDowndrop(!downdrop);
    };
    //--------
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
            add[a+1] = formValues[i];
            a++;
        }
    }
    const currentItemss = add.slice(itemOffset, endOffset);
    console.log(add);

    const pageCounts = Math.ceil(add.length / itemsPerPage);

    const openPart = (id, formValues) => {
        Add(id, formValues);
    }

    const openSubGroup = (id, buttonName) => {
        onAdd(id, buttonName);
    }

    function checkrecord (length) {
        if (length===1) {
            return "record";
        } else {
            return "records";
        }
    }

    var [pcode, setPcode] = useState("");
    var [pdfcarid, setPdfcarid] = useState("");
    var [opening, setOpening] = useState(false);
    const openPDF = (code, id) => {
        setPcode(code);
        setPdfcarid(id);
        setOpening(!opening);
        console.log(pcode, pdfcarid)
    }

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
                    {opening && <Specpdf carid={""+pdfcarid} partcode={""+pcode} open={openPDF} />}
                    <div className="titleresultcontent">
                        <h3><Changer inp="Model Found:" /> {formValues.length} <Changer inp={checkrecord(formValues.length)} /></h3>
                        <div className="paginatingpage">
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
                        <div className="splittingrecordpages">
                            <label htmlFor="itemsPerPage">
                                <Changer inp="Records per Page:" />
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
                        <div className="downloadingbuttondrop">
                            <button
                                className="download"
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
                            {downdrop && (
                                <DropingDown
                                    data={currentItems}
                                    dropping={handleDropdown}
                                />
                            )}
                        </div>
                    </div>
                    <div className="plistscroll" id="pscrolling-style">
                        <div className="contents-p-list">
                            <table className="p-table">
                                <thead>
                                    <tr>
                                        <th
                                            rowSpan="2"
                                            className="titleResult"
                                        >
                                            <Changer inp="No" />
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
                                            <td>{el.oe} {"(" + el.part_start_time}-{el.part_end_time + ")"}</td>
                                            <td>{el.aisin_premium_code}</td>
                                            <td>{el.aisin_sub_premium_code}</td>
                                            <td>
                                                <button
                                                    className="details"
                                                    onClick={() => openPDF(el.oe+" ("+el.part_start_time+"-"+el.part_end_time+")", el.car_info_id)}
                                                >
                                                    <Changer inp="Details" />
                                                </button>
                                            </td>
                                            <td>{el.oe} {"(" + el.part_start_time}-{el.part_end_time + ")"}</td>
                                            <td>{el.aisin_premium_code}</td>
                                            <td>{el.aisin_sub_premium_code}</td>
                                            <td>
                                                <button
                                                    className="details"
                                                    onClick={() => openPDF(el.oe+" ("+el.part_start_time+"-"+el.part_end_time+")", el.car_info_id)}
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
                    <div className="scrollsynch"><html className="emptyscroll">&nbsp;</html></div>
                </div>
            );
        } else {
            return (
                <div className="tabcontent">
                    <div className="titleresultcontent">
                        <h3><Changer inp="Model Found:" /> {add.length} <Changer inp={checkrecord(add.length)} /></h3>
                        <div className="paginatingpage">
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
                        <div className="splittingrecordpages">
                            <label htmlFor="itemsPerPage">
                                <Changer inp="Records per Page:" />
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
                        <div className="downloadingbuttondrop">
                            <button
                                className="download"
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
                            {downdrop && (
                                <DropDown
                                    data={currentItemss}
                                    dropping={handleDropdown}
                                />
                            )}
                        </div>
                    </div>
                    <div className="partlistscroll" id="pscroll-style">
                <div className="contents-part-list">
                    <table className="part-table">
                                    <thead>
                                        <tr>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                <Changer inp="No" />
                                            </th>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                <Changer inp="All Part List" />
                                            </th>
                                            <th
                                                rowSpan="2"
                                                className="titleResult"
                                            >
                                                <Changer inp="Vehicle Maker" />
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
                                                <td onClick={() => openSubGroup(el.car_info_id, el.model_code)}>{no++}</td>
                                                <td>
                                                    <img
                                                        src={vehiclePart}
                                                        id="VehiclePart"
                                                        alt="vehiclePart"
                                                        onClick={() => openPart(el.car_info_id, formValues)}
                                                    />
                                                </td>
                                                <td onClick={() => openSubGroup(el.car_info_id, el.model_code)}>{el.car_maker}</td>
                                                <td onClick={() => openSubGroup(el.car_info_id, el.model_code)}>{el.car_model_name}</td>
                                                <td onClick={() => openSubGroup(el.car_info_id, el.model_code)}>{el.model_code}</td>
                                                <td onClick={() => openSubGroup(el.car_info_id, el.model_code)}>{el.start_of_production}</td>
                                                <td onClick={() => openSubGroup(el.car_info_id, el.model_code)}>{el.end_of_production}</td>
                                                <td onClick={() => openSubGroup(el.car_info_id, el.model_code)}>{el.engine_code}</td>
                                                <td onClick={() => openSubGroup(el.car_info_id, el.model_code)}>{el.displacement_code}</td>
                                                <td onClick={() => openSubGroup(el.car_info_id, el.model_code)}>{el.powered_type}</td>
                                                <td onClick={() => openSubGroup(el.car_info_id, el.model_code)}>{el.fuel_type}</td>
                                                <td onClick={() => openSubGroup(el.car_info_id, el.model_code)}>{el.transmission_code}</td>
                                                <td onClick={() => openSubGroup(el.car_info_id, el.model_code)}>{el.transmission_type}</td>
                                                <td onClick={() => openSubGroup(el.car_info_id, el.model_code)}>{el.speed}</td>
                                                <td onClick={() => openSubGroup(el.car_info_id, el.model_code)}>{el.drivetrain}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                </div>
            );
        }
    }
}

export { ResultList };
