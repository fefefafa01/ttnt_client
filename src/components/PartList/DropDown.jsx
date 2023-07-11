import { DownloadFile } from "../DownloadFile.jsx";
import { Changer } from "components/LanguageChange";
import React, { useState} from "react";
import "./partList.css";

function DropDown (input) {

    const handleDownload = (type) => {
        input.dropping()
        if (type==="csv") {
            DownloadFile(input.data, "Part List", "Parts", "csv")
        } else if (type==="xls") {
            DownloadFile(input.data, "Part List", "Parts", "xls")
        }
    }

    return (
        <div className="droplist">
            <span className="dropdldtxt"><Changer inp="File Format" /></span>
            <br />
            <button className="dropdldbtn" onClick={e=>handleDownload("csv")}>.csv</button>
            <br />
            <button className="dropdldbtn" onClick={e=>handleDownload("xls")}>.xls</button>
        </div>
    )
}

export {DropDown}