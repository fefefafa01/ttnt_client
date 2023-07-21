import "./comp.styles/SpecPDF.scss";
import { Changer } from "./Languages/LanguageChange";
import spec from "../img/car.png";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useState } from "react";
import $ from "jquery";
import { backlocale } from "constants/constindex";

function Specpdf(input) {
    //Variables
    const OE = "OE#: "
    const [firstOpenModel, setFirstOpenModel] = useState(true);
    const [firstOpenPreP, setFirstOpenPreP] = useState(false);
    const [firstOpenSPreP, setFirstOpenSPreP] = useState(false);
    const [firstOpenComp, setFirstOpenComp] = useState(false);

    //Scrollbar Synchronization
    $(function() {
        $(".spec_tbl").on("scroll", function() {
            $(".scrollpdf")
                .scrollLeft($(".spec_tbl").scrollLeft());
        });
        $(".scrollpdf").on("scroll", function() {
            $(".spec_tbl")
                .scrollLeft($(".scrollpdf").scrollLeft())
        });
    });

    //Variables for Car Model
    var [maker, setMaker] = useState("");
    var [model, setModel] = useState("");
    var [vcode, setVcode] = useState("");
    var [start, setStart] = useState("");
    var [end, setEnd] = useState("");
    var [dpos, setDpos] = useState("");
    var [ecode, setEcode] = useState("");
    var [displace, setDisplace] = useState("");
    var [ptype, setPtype] = useState("");
    var [ftype, setFtype] = useState("");
    var [transc, setTransc] = useState("");
    var [spd, setSpd] = useState("");
    var [trans, setTrans] = useState("");
    var [dt, setDt] = useState("");

    //Array for Parts Table and Manufacturer
    var [premiumData, setPremiumData] = useState([]);
    var [spremiumData, setSPremiumData] = useState([]);
    var [competitor, setCompetitor] = useState([]);

    //Handle On/Off
    const handleDisable = () => {
        input.open(input.partcode);
    };

    //Backend Call
    //Querying Model Name
    var loc;
    if (firstOpenModel) {
        loc = backlocale + "exp/model";
        fetch(loc, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Acess-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                    "GET, PUT, POST, DELETE, PATCH, OPTIONS",
            },
            body: JSON.stringify(input.carid),
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
            });
    }

    //Querying Premium Parts Array
    if (firstOpenPreP) {
        loc = backlocale + "exp/premium";
        fetch(loc, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Acess-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                    "GET, PUT, POST, DELETE, PATCH, OPTIONS",
            },
            body: JSON.stringify(input.partcode.slice(0, input.partcode.length-8)),
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
                setFirstOpenPreP(false);
                setFirstOpenSPreP(true);
                setPremiumData(data.Premium.TotalPre);
            });
    }

    //Querying SubPremium Parts Data
    if (firstOpenSPreP) {
        loc = backlocale + "exp/subpremium";
        fetch(loc, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Acess-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                    "GET, PUT, POST, DELETE, PATCH, OPTIONS",
            },
            body: JSON.stringify(input.partcode.slice(0, input.partcode.length-8)),
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
                setFirstOpenSPreP(false);
                setFirstOpenComp(true);
                setSPremiumData(data.SPremium.TotalSPre);
            });
    }

    //Querying Competitor
    if (firstOpenComp) {
        loc = backlocale + "exp/comp";
        fetch(loc, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Acess-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                    "GET, PUT, POST, DELETE, PATCH, OPTIONS",
            },
            body: JSON.stringify(input.partcode.slice(0, input.partcode.length-8)),
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
                setFirstOpenComp(false);
                setCompetitor(data.Comp);
            });
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
                (item.name === premiumData[key - 1].name &&
                    result[key - 1] === 0)
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
                (item.name === spremiumData[key - 1].name &&
                    result[key - 1] === 0)
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
            <div className="specpop pdfpop">
                <div className="specheader">
                    <p className="specmodel">
                        {maker}, {model}, {vcode} {"(" + start} - {end + ")"},{" "}
                        {dpos}, {ecode}, {displace}, {ptype}, {ftype},
                        {" " + transc}, {spd}
                        {trans}, {dt}
                    </p>
                    <button className="closingicon" onClick={handleDisable}>
                        X
                    </button>
                </div>
                <div className="specbody">
                    <div className="sbcontent">
                        <div className="partimg">
                        <TransformWrapper initialScale={1}>
                            <TransformComponent
                                wrapperStyle={{ width: "100%", height: "100%" }}
                                contentStyle={{ width: "100%", height: "100%" }}
                            >
                                <img
                                    className="pdfpartimg"
                                    src={spec}
                                    alt="spec"
                                />
                            </TransformComponent>
                        </TransformWrapper>
                        </div>
                        <p className="speclabel">
                            <span className="labelOE">
                                {OE}
                            </span>
                            <span>
                                {input.partcode}
                            </span>
                        </p>
                        <div className="spec_tbl">
                            <div className="atablea">
                                <table className="specpart-table" id="sbt">
                                    <thead>
                                        <tr>
                                            <th
                                                rowSpan="2"
                                                colSpan="2"
                                                className="spectitle"
                                            >
                                                <Changer inp="AISIN Part" />
                                            </th>
                                            <th colSpan="11" className="spectitle">
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
                                                Major D. <br />
                                                (mm)
                                            </th>
                                            <th className="subspectitle">Spline</th>
                                            <th className="subspectitle">
                                                PCD (mm)
                                            </th>
                                            <th className="subspectitle">
                                                Width OD
                                                <br />
                                                (mm)
                                            </th>
                                            <th className="subspectitle">
                                                Width ID
                                                <br />
                                                (mm)
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
                                                        {rowSpan[key] > 0 && (
                                                            <td
                                                                rowSpan={
                                                                    premiumData.length
                                                                }
                                                                className="infoHeader"
                                                            >
                                                                Premium
                                                            </td>
                                                        )}
                                                        <td className="speccode">
                                                            {val.PremiumCode}
                                                        </td>
                                                        <td>{val.ODmm}</td>
                                                        <td>{val.ODinch}</td>
                                                        <td>{val.IDmm}</td>
                                                        <td>{val.Major}</td>
                                                        <td>{val.Spline}</td>
                                                        <td>{val.PCDmm}</td>
                                                        <td>{val.WidthOD}</td>
                                                        <td>{val.WidthID}</td>
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
                                                        {srowSpan[key] > 0 && (
                                                            <td
                                                                rowSpan={
                                                                    spremiumData.length
                                                                }
                                                                className="infoHeader"
                                                            >
                                                                Sub-Premium/AM
                                                            </td>
                                                        )}
                                                        <td className="speccode">
                                                            {val.SPremiumCode}
                                                        </td>
                                                        <td>{val.ODmm}</td>
                                                        <td>{val.ODinch}</td>
                                                        <td>{val.IDmm}</td>
                                                        <td>{val.Major}</td>
                                                        <td>{val.Spline}</td>
                                                        <td>{val.PCDmm}</td>
                                                        <td>{val.WidthOD}</td>
                                                        <td>{val.WidthID}</td>
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
                        </div>
                        <div className="comp_tbl">
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
                        <div className="scrollpdf"><html className="emptyscrollpdf">&nbsp;</html></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export { Specpdf };
