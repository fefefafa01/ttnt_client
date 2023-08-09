import { DownloadPRListFile } from "../DownloadFile.jsx";
import { Changer } from "components/Languages/LanguageChange.jsx";
import React, { useState } from "react";
import "./ResultList.scss";
import { backlocale } from "constants/constindex";

//Getting Current Date and Time
var tempDate = new Date();
var month, day, hour, minute, sec
var loc;

function Reformatting(currdate) {
    if (currdate < 10) {
        return ("0" + currdate)
    } else return (currdate)
}

function DropDown (input) {
    //A few states here
    const [first , setFirst] = useState(true)
    const [queried , setQueried] = useState(false)
    const [exdata, setExdata] = useState([])

        //Month
    month = Reformatting(tempDate.getMonth()+1)
        //Day
    day = Reformatting(tempDate.getDate())
        //Hour
    hour = Reformatting(tempDate.getHours())
        //Minute
    minute = Reformatting(tempDate.getMinutes())
        //Seconds
    sec = Reformatting(tempDate.getSeconds())
        //Concate Date
    var date = tempDate.getFullYear() + month + day + "_" +
                hour + minute + sec

    //Revert Data for Part Details
    var partdata = [];
    for (let i = 0; i < input.data.length; i++) {
        var temperal = {};
        temperal.OE = input.data[i].oe + " (" + input.data[i].start_of_production.slice(0, 2) + "-" + input.data[i].end_of_production.slice(0, 2) + ")";
        if (input.data[i].aisin_premium_code !== "" && 
            input.data[i].aisin_premium_code !== undefined &&
            input.data[i].aisin_premium_code !== null
        ) {
            temperal.aisinPrem = input.data[i].aisin_premium_code;
        } else {
            temperal.aisinPrem = "";
        }
        if (input.data[i].aisin_sub_premium_code !== "" && 
            input.data[i].aisin_sub_premium_code !== undefined && 
            input.data[i].aisin_sub_premium_code !== null
        ) {
            temperal.aisinSubPrem = input.data[i].aisin_sub_premium_code;
        } else {
            temperal.aisinSubPrem = "";
        }
        partdata.push(temperal);
    }

    //Concate new Array
    var transdata= [];

    if (first) {
        loc = backlocale + "down/partlist";
        fetch(loc, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Acess-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                    "GET, PUT, POST, DELETE, PATCH, OPTIONS",
            },
            body: JSON.stringify(partdata),
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
            setFirst(false);
            setQueried(true)
            //Set Values
            setExdata(data.Export)
        });
    }

    if(queried) {
        for (let i = 0; i < input.data.length; i++) {
            var newob = {};
                newob.OE = input.data[i].oe;
                newob.AisinPremium = input.data[i].aisin_premium_code;
                newob.AisinSubpremium = input.data[i].aisin_sub_premium_code;
                newob.PartName = input.data[i].aisin_part_name;
                newob.Competitor = exdata[i].Competitor;
                newob.PremiumDimensionValue = exdata[i].PremiumData;
                newob.SubPremiumDimensionValue = exdata[i].SubPremiumData
            transdata.push(newob);
        }
    }

    //Downloading
    const handleDownload = (type) => {
        input.dropping()
        if (type==="csv") {
            DownloadPRListFile(transdata, "Parts_List_"+date, "Parts", "csv")
        } else if (type==="xlsx") {
            DownloadPRListFile(transdata, "Parts_List_"+date, "Parts", "xlsx")
        }
    }

    return (
        <div className="droplist">
            <span className="dropdldtxt"><Changer inp="File Format" /></span>
            <br />
            <button className="dropdldbtn" onClick={e=>handleDownload("csv")}>.csv</button>
            <br />
            <button className="dropdldbtn" onClick={e=>handleDownload("xlsx")}>.xls</button>
        </div>
    )
}

export {DropDown}