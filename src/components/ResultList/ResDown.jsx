import { DownloadVListFile, DownloadRListFile } from "../DownloadFile.jsx";
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

    //Concate new Array for Translation
    var transdata= []

    if(first) {
        loc = backlocale + "down/vehicledown";
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
            setExdata(data)
        });
    }
    
    if(queried) {
        console.log(input.data)
        for (let i = 0; i < input.data.length; i++) {
            var newob = {};
                newob.CarMaker = input.data[i].car_maker;
                newob.ModelName = input.data[i].car_model_name;
                newob.ModelCode = input.data[i].model_code;
                newob.From = input.data[i].start_of_production; 
                newob.To = input.data[i].end_of_production;
                newob.DriversPosition = input.data[i].drivers_position;
                newob.EngineCode = input.data[i].engine_code;
                newob.Displacement = input.data[i].displacement_code;
                newob.PoweredType = input.data[i].powered_type;
                newob.FuelType = input.data[i].fuel_type;
                newob.TransmissionCode = input.data[i].transmission_code;
                newob.TransmissionType = input.data[i].transmission_type;
                newob.Speed = input.data[i].speed;
                newob.DriveTrain = input.data[i].drivetrain;
                //Code Check
                if (
                    (input.data[i].aisin_premium_code!=="" && input.data[i].aisin_premium_code !== undefined && input.data[i].aisin_premium_code !== null)
                    &&
                    (input.data[i].aisin_sub_premium_code!=="" && input.data[i].aisin_sub_premium_code !== undefined && input.data[i].aisin_sub_premium_code !== null)
                ) {
                    newob.VehicleCode = exdata[i] + "\r\n" + input.data[i].oe + "\r\n" + input.data[i].aisin_premium_code + "\r\n" + input.data[i].aisin_sub_premium_code;
                } else if (
                    (input.data[i].aisin_premium_code==="" || input.data[i].aisin_premium_code === undefined || input.data[i].aisin_premium_code === null)
                    &&
                    (input.data[i].aisin_sub_premium_code!=="" && input.data[i].aisin_sub_premium_code !== undefined && input.data[i].aisin_sub_premium_code !== null)
                ) {
                    newob.VehicleCode = exdata[i] + "\r\n" + input.data[i].oe + "\r\nNo Premium Code\r\n" + input.data[i].aisin_sub_premium_code;
                } else if (
                    (input.data[i].aisin_premium_code!=="" && input.data[i].aisin_premium_code !== undefined && input.data[i].aisin_premium_code !== null)
                    &&
                    (input.data[i].aisin_sub_premium_code==="" || input.data[i].aisin_sub_premium_code === undefined || input.data[i].aisin_sub_premium_code === null)
                ) {
                    newob.VehicleCode = exdata[i] + "\r\n" + input.data[i].oe + "\r\n" + input.data[i].aisin_premium_code + "\r\nNo Sub-Premium Code";
                } else {
                    newob.VehicleCode = exdata[i] + "\r\n" + input.data[i].oe + "\r\nNo Premium Code\r\nNo Sub-Premium Code";
                }
                //Concate Array
            transdata.push(newob);
        }
    }

    //Downloading
    const handleDownload = (type) => {
        input.dropping()
        if (type==="csv") {
            DownloadVListFile(transdata, "Vehicle_Model_List_"+date, "Vehicle", "csv")
        } else if (type==="xlsx") {
            DownloadVListFile(transdata, "Vehicle_Model_List_"+date, "Vehicle", "xlsx")
        }
    }

    if (!queried) {
        return (
            <div className="droplist">
                <span>Data is quite big, please wait...</span>
            </div>
        )
    }
    if (queried) {
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
}

function DropingDown (input) {
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

    if(first) {
        loc = backlocale + "down/vehicledown";
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
            setExdata(data)
        });
    }
    
    if(queried) {
        console.log(input.data[1])
        for (let i = 0; i < input.data.length; i++) {
            var newob = {};
                newob.No = i+1;
                newob.CarMaker = input.data[i].car_maker;
                newob.ModelName = input.data[i].car_model_name;
                newob.ModelCode = input.data[i].model_code;
                newob.From = input.data[i].start_of_production; 
                newob.To = input.data[i].end_of_production;
                newob.DriversPosition = input.data[i].drivers_position;
                newob.EngineCode = input.data[i].engine_code;
                newob.Displacement = input.data[i].displacement_code;
                newob.PoweredType = input.data[i].powered_type;
                newob.FuelType = input.data[i].fuel_type;
                newob.TransmissionCode = input.data[i].transmission_code;
                newob.TransmissionType = input.data[i].transmission_type;
                newob.Speed = input.data[i].speed;
                newob.DriveTrain = input.data[i].drivetrain;
                newob.OEL = input.data[i].oe + " (" + input.data[i].part_start_time + "-" + input.data[i].part_end_time + ")";
                newob.AisinPremiumL = input.data[i].aisin_premium_code;
                newob.AisinSubPremiumL = input.data[i].aisin_sub_premium_code;
                newob.OER = input.data[i].oe + " (" + input.data[i].part_start_time + "-" + input.data[i].part_end_time + ")";
                newob.AisinPremiumR = input.data[i].aisin_premium_code;
                newob.AisinSubPremiumR = input.data[i].aisin_sub_premium_code;
                newob.VehicleCode = exdata[i];
                //Concate Array
            transdata.push(newob);
        }
    }

    //Downloading
    const handleDownload = (type) => {
        input.dropping()
        if (type==="csv") {
            DownloadRListFile(transdata, "Result_List_"+date, "Vehicle", "csv")
        } else if (type==="xlsx") {
            DownloadRListFile(transdata, "Result_List_"+date, "Vehicle", "xlsx")
        }
    }

    if (!queried) {
        return (
            <div className="droplist">
                <span>Data is quite big, please wait...</span>
            </div>
        )
    }
    if (queried) {
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
}

export {DropDown, DropingDown}