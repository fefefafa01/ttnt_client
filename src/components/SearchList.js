import React, { useEffect, useState } from "react";
import "./comp.styles/SearchList.css";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Prev from "../img/prev_btn.png";
import Next from "../img/next_btn.png";
function ResultList() {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        setItemOffset(0); // Reset the item offset when the items per page changes
    }, [itemsPerPage]);

    function Items({ currentItems }) {
        return (
            <>
                {currentItems &&
                    currentItems.map((item) => (
                        <div>
                            <h3>Item #{item}</h3>
                        </div>
                    ))}
            </>
        );
    }

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage;
        setItemOffset(newOffset);
    };

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(parseInt(event.target.value, 10));
    };

    return (
        <div class="wrappers">
            <div class="tabs">
                <div class="tab">
                    <input
                        type="radio"
                        name="css-tabs"
                        checked
                        className="tab-switch"
                    />
                    <label for="tab-1" className="tab-label">
                        Search Result
                    </label>
                    <div className="tabcontent">
                        <div className="subtitle">
                            <div className="col-2">
                                {/* <h3> Welcome! </h3> */}
                                <h3>Result found : {items.length}</h3>
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
                        </div>
                        <div className="Scroll" id="scroll-style">
                            <div className="contents">
                                <Items currentItems={currentItems} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { ResultList };
