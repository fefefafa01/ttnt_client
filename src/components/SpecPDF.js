import './comp.styles/SpecPDF.css'
import { Changer } from "./LanguageChange"
import spec from '../img/car.png'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useState } from 'react';

function Specpdf(input) {
    //Variables
    if (input.carid===null || input.carid===undefined) {
        input.carid="29"
    } //Test ID
    const [firstOpenModel, setFirstOpenModel] = useState(true);
    const [firstOpenPreP, setFirstOpenPreP] = useState(false);
    const [firstOpenSPreP, setFirstOpenSPreP] = useState(false);
    const [firstOpenComp, setFirstOpenComp] = useState(false);

        //Variables for Car Model
    var [maker, setMaker] = useState("")
    var [model, setModel] = useState("")
    var [vcode, setVcode] = useState("")
    var [start, setStart] = useState("")
    var [end, setEnd] = useState("")
    var [dpos, setDpos] = useState("")
    var [ecode, setEcode] = useState("")
    var [displace, setDisplace] = useState("")
    var [ptype, setPtype] = useState("")
    var [ftype, setFtype] = useState("")
    var [transc, setTransc] = useState("")
    var [spd, setSpd] = useState("")
    var [trans, setTrans] = useState("")
    var [dt, setDt] = useState("")

        //Array for Parts Table and Manufacturer
    var [premiumData, setPremiumData] = useState([])
    var [spremiumData, setSPremiumData] = useState([])
    var [competitor, setCompetitor] = useState([])

    //Handle On/Off
    const handleDisable = () => {
        input.open(input.partcode)
    }

    //Backend Call
        //Querying Model Name
    if (firstOpenModel) { 
        fetch("http://localhost:5000/exp/model", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Acess-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH, OPTIONS"
            },
            body: JSON.stringify(input.carid)
        })
        .catch(err => {
            return;
        })
        .then(res => {
            if (!res || !res.ok || res.status>=400) {
                return;
            }
            return res.json();
        })
        .then(data => {
            if (!data) return;
            setFirstOpenModel(false);
            setFirstOpenPreP(true);
            //Set Values
            setMaker(data.maker);
            setModel(data.model);
            setVcode(data.vcode);
            setStart(data.start);
            setEnd(data.end);
            setDpos(data.dripos);
            setEcode(data.engcode);
            setDisplace(data.disp);
            setPtype(data.powered);
            setFtype(data.fuel);
            setTransc(data.transc);
            setSpd(data.spd);
            setTrans(data.trans);
            setDt(data.dtrain);
        })
    }
        
        //Querying Premium Parts Array
    if (firstOpenPreP) { 
        fetch("http://localhost:5000/exp/premium", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Acess-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH, OPTIONS"
            },
            body: JSON.stringify(input.partcode)
        })
        .catch(err => {
            return;
        })
        .then(res => {
            if (!res || !res.ok || res.status>=400) {
                return;
            }
            return res.json();
        })
        .then(data => {
            if (!data) return;
            setFirstOpenPreP(false);
            setFirstOpenSPreP(true);
            setPremiumData(data.Premium.TotalPre);
        })
    }

        //Querying SubPremium Parts Data
    if (firstOpenSPreP) { 
        fetch("http://localhost:5000/exp/subpremium", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Acess-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH, OPTIONS"
            },
            body: JSON.stringify(input.partcode)
        })
        .catch(err => {
            return;
        })
        .then(res => {
            if (!res || !res.ok || res.status>=400) {
                return;
            }
            return res.json();
        })
        .then(data => {
            if (!data) return;
            setFirstOpenSPreP(false);
            setFirstOpenComp(true);
            setSPremiumData(data.SPremium.TotalSPre);
        })
    }

        //Querying Competitor
    if (firstOpenComp) { 
        fetch("http://localhost:5000/exp/comp", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Acess-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH, OPTIONS"
            },
            body: JSON.stringify(input.partcode)
        })
        .catch(err => {
            return;
        })
        .then(res => {
            if (!res || !res.ok || res.status>=400) {
                return;
            }
            return res.json();
        })
        .then(data => {
            if (!data) return;
            setFirstOpenComp(false);
            setCompetitor(data.Comp)
        })
    }

    //Reducing First Header
    let namesArr = {};
    var rowSpan = premiumData.reduce((result, item, key) => {
    if (namesArr[item.name] === undefined) {
        namesArr[item.name] = key;
        result[key] = 1;
    } else {
        const firstIndex = namesArr[item.name];
        if (
            firstIndex === key - 1 ||
            (item.name === premiumData[key - 1].name && result[key - 1] === 0)
        ) {
            result[firstIndex]++;
            result[key] = 0;
        } else {
            result[key] = 1;
            namesArr[item.name] = key;
        }
    }
    return result;
    }, []);

    let snamesArr = {};
    var srowSpan = spremiumData.reduce((result, item, key) => {
    if (snamesArr[item.name] === undefined) {
        snamesArr[item.name] = key;
        result[key] = 1;
    } else {
        const firstIndex = snamesArr[item.name];
        if (
            firstIndex === key - 1 ||
            (item.name === spremiumData[key - 1].name && result[key - 1] === 0)
        ) {
            result[firstIndex]++;
            result[key] = 0;
        } else {
            result[key] = 1;
            snamesArr[item.name] = key;
        }
    }
    return result;
    }, []);
    
    //Exports
    return (
    <>
        <div className="specpop">
            <div className="specheader">
                <p className="specmodel">{maker}, {model}, {vcode} {"("+start} - {end+")"}, {dpos}, {ecode}, {displace}, {ptype}, {ftype},
                    {" "+transc}, {spd}{trans}, {dt}</p>
                <button className='closingicon' onClick={handleDisable}>
                    X
                </button>
            </div>
            <div className="specbody"> {/*Thêm scroll bar bên phải (nếu table dài) */}
                <div className='sbcontent'>
                    <TransformWrapper initialScale={1}>
                        <TransformComponent wrapperStyle={{width: "100%", height: "100%",}}
                            contentStyle={{ width: "100%", height: "100%" }}>
                            <img className='partimg' src={spec} alt='spec' />
                        </TransformComponent>
                    </TransformWrapper>
                    <p className="speclabel">OE#: {input.partcode}</p>
                    <div className="spec_tbl">
                        {/* Table: Premium Header/SubHeader has 1 Column, then comes the Part.No, then comes their respective Dimension Values 
                            AISIN Part     = Merge 2 Rows, 2 Columns                - Dimension = Merge Columns Num of Dimensions.
                                                                                    Dimensions = 1 Column for each dimension
                            Premium Header = Merge Rows Num of Premium Code Parts   - Premium = 1 Row for each with Parts.No -> Dimension Values
                            Sub Premium HDR = ^^^^^ of Sub-Premium Code Parts       - Sub-Premium = ^^^
                                        ( IF THERE IS NO DATA FOR PREMIUM/SUB PREMIUM FOR THAT PART -> DIMENSIONS ARE NULL)
                            Example:
                            ___________________________________________________________________________
                            |     AISIN PARTS    |_____________________DIMENSION______________________|                 
                            |____________________|_OD_(mm)_|_OD_(inch)_|_ID (mm)_|_ID_(inch)_|_Spline_|
                            |           |_Part_A_|___150___|____40_____|___145___|____66_____|___20___|
                            |  PREMIUM  |_Part_B_|_________|___________|_________|___________|________|
                            |___________|_Part_C_|_________|___________|_________|___________|________|
                            |           |_Part_X_|___300___|____90_____|___413___|____64_____|___72___|
                            |  SUBPREM  |_Part_Y_|_________|___________|_________|___________|________|
                            |___________|_Part_Z_|_________|___________|_________|___________|________|
                        */}
                        <table className="specpart-table" id="sbt">
                            <thead>
                                <tr>
                                    <th rowSpan="2" colSpan="2" className="spectitle">
                                        <Changer inp="AISIN Part" />
                                    </th>
                                    <th colSpan="10" className="spectitle">
                                        <Changer inp="Dimension" />
                                    </th>
                                </tr>
                                <tr>
                                    <th className="subspectitle">
                                        OD (mm)
                                    </th>
                                    <th className="subspectitle">
                                        OD (inch)
                                    </th>
                                    <th className="subspectitle">
                                        ID (mm)
                                    </th>
                                    <th className="subspectitle">
                                        Major D. <br />(mm)
                                    </th>
                                    <th className="subspectitle">
                                        Spline
                                    </th>
                                    <th className="subspectitle">
                                        PCD (mm)
                                    </th>
                                    <th className="subspectitle">
                                        Width OD<br />(mm)
                                    </th>
                                    <th className="subspectitle">
                                        Length (inch)
                                    </th>
                                    <th className="subspectitle">
                                        Length (mm)
                                    </th>
                                    <th className="subspectitle">
                                        Height (mm)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {premiumData.map((val, key) => {
                                    return (
                                    <>
                                        <tr key={key}>
                                            {rowSpan[key]>0 && <td rowSpan={premiumData.length} className="infoHeader">Premium</td>}
                                            <td className="speccode">{val.PremiumCode}</td>
                                            <td>{val.ODmm}</td>
                                            <td>{val.ODinch}</td>
                                            <td>{val.IDmm}</td>
                                            <td>{val.Major}</td>
                                            <td>{val.Spline}</td>
                                            <td>{val.PCDmm}</td>
                                            <td>{val.WidthOD}</td>
                                            <td>{val.Lengthinch}</td>
                                            <td>{val.Lengthmm}</td>
                                            <td>{val.Heightmm}</td>
                                        </tr>
                                    </>
                                    );
                                })}
                                {spremiumData.map((val, key) => {
                                    return (
                                    <>
                                        <tr key={key}>
                                            {srowSpan[key]>0 && <td rowSpan={spremiumData.length} className="infoHeader">Sub-Premium/AM</td>}
                                            <td className="speccode">{val.SPremiumCode}</td>
                                            <td>{val.ODmm}</td>
                                            <td>{val.ODinch}</td>
                                            <td>{val.IDmm}</td>
                                            <td>{val.Major}</td>
                                            <td>{val.Spline}</td>
                                            <td>{val.PCDmm}</td>
                                            <td>{val.WidthOD}</td>
                                            <td>{val.Lengthinch}</td>
                                            <td>{val.Lengthmm}</td>
                                            <td>{val.Heightmm}</td>
                                        </tr>
                                    </>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className='comp_tbl'>
                        {/* Table: 2 Columns
                            ____________________________________________________________________________
                            |__________Competitor Name__________|___________Competitor Number__________| 
                            |________________555________________|________________555-xx________________|
                            |________________ABC________________|________________ABC_xx________________|
                                    Manufacturer Name                       Competitor's Part Code
                                    (IF THE THERE ARE NO COMPETITOR NUMBER FOR THAT PART CODE, LEAVE TABLE 1 ROW WITH EVERYTHING AS NULL)
                        */}
                        <table className="speccomp-table">
                            <thead>
                                <tr>
                                    <th className="comptitle">
                                        Competitor Name
                                    </th>
                                    <th className="comptitle">
                                        Competitor Number
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {competitor.map((val, key) => {
                                    return (
                                    <>
                                        <tr key={key}>
                                            <td>{val.Name}</td>
                                            <td>{val.Number}</td>
                                        </tr>
                                    </>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export {Specpdf}