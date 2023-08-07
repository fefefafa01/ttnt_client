import { DownloadPListFile } from "../DownloadFile.jsx";
import { Changer } from "components/Languages/LanguageChange.jsx";
import React, { useState } from "react";
import { useTranslation } from 'react-i18next'
import "./partList.scss";
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

    //Concate new Array for Translation
    var transdata= []
    const {t} = useTranslation();

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
            body: JSON.stringify(input.data),
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
                newob.OE = input.data[i].OE;
                newob.AisinPremium = input.data[i].aisinPrem;
                newob.AisinSubpremium = input.data[i].aisinSubPrem;
                newob.PartGroup = t(input.data[i].partGroup); 
                newob.PartName = t(input.data[i].partName);
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
            DownloadPListFile(transdata, "Parts_List_"+date, "Parts", "csv")
        } else if (type==="xlsx") {
            DownloadPListFile(transdata, "Parts_List_"+date, "Parts", "xlsx")
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