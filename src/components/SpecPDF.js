import './comp.styles/SpecPDF.css'
import { Changer } from "./LanguageChange"
import spec from '../img/car.png'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

function Specpdf() {
    //Variables
    var numOfPremium = 0, numOfSubPre = 0;
    //Backend Call
    const handleOpen = (e) => { //Cant Access now to Const as to control
        fetch("http://localhost:5000/exp/details", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Acess-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH, OPTIONS"
            },
            body: JSON.stringify(/* Car Model which parts are needed to be showed */)
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
            //data.value for each value needed to be used/called
        })
    }
    //Fake Part Data
    const data = [
        {
            PremiumCode: "DTX-209A",
            ODmm: "190",
            ODinch: "7.5",
            IDmm: "132",
            Major: "22.1",
            Spline: "20"
        },
        {
            PremiumCode: "DTX-209A",
            ODmm: "190",
            ODinch: "7.5",
            IDmm: "132",
            Major: "22.1",
            Spline: "20"
        },
        {
            PremiumCode: "DTX-209A",
            ODmm: "190",
            ODinch: "7.5",
            IDmm: "132",
            Major: "22.1",
            Spline: "20"
        },
        {
            PremiumCode: "DTX-209A",
            ODmm: "190",
            ODinch: "7.5",
            IDmm: "132",
            Major: "22.1",
            Spline: "20"
        },
        {
            PremiumCode: "DTX-209B",
            ODmm: "200",
            ODinch: "8.5",
            IDmm: "132",
            Major: "22.1",
            Spline: "20"
        },
        {
            SubPremiumCode: "DT-610U",
            ODmm: "170",
            ODinch: "7.5",
            IDmm: "132",
            Major: "22.1",
            Spline: "20"
        },
        {
            SubPremiumCode: "DT-611U",
            ODmm: "175",
            ODinch: "7.5",
            IDmm: "132",
            Major: "22.1",
            Spline: "20"
        },
        {
            SubPremiumCode: "DT-611U",
            ODmm: "175",
            ODinch: "7.5",
            IDmm: "132",
            Major: "22.1",
            Spline: "20"
        },
        {
            SubPremiumCode: "DT-611U",
            ODmm: "175",
            ODinch: "7.5",
            IDmm: "132",
            Major: "22.1",
            Spline: "20"
        },
    ];
    //Fake Competitor
    const competitor = [
        {
            Name: "555",
            Number: "555-xx"
        },
        {
            Name: "ABC",
            Number: "ABC-xx"
        },
        {
            Name: "SYG",
            Number: "SYG-xx"
        }
    ];
    //Controlling Data Table
    var preData = [{}], subPreData = [{}]
    var cp=0, scp=0;
    for (let i=0; i<data.length; i++) {
        if (data[i].PremiumCode!==undefined) {
            numOfPremium++;
            preData[cp]=data[i];
            cp++;
        }
        if (data[i].SubPremiumCode!==undefined) {
            numOfSubPre++;
            subPreData[scp]=data[i];
            scp++;
        }
    }
    //Reducing First Header
    let namesArr = {};
    var rowSpan = data.reduce((result, item, key) => {
    if (namesArr[item.name] === undefined) {
        namesArr[item.name] = key;
        result[key] = 1;
    } else {
        const firstIndex = namesArr[item.name];
        if (
            firstIndex === key - 1 ||
            (item.name === data[key - 1].name && result[key - 1] === 0)
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
    // console.log(rowSpan)
    //Exports
    return (
        <div className="specpop">
            <div className="specheader">
                <p className="specmodel">Totoya, Influx, KUN25 (2008-2011), RHD, 25DFTV, 2.5L, ICE, Diesel, -, SMT, FWD</p>
                <button className='closingicon'>
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
                    <p className="speclabel">OE#: 31250-0K210(07-12)</p>
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
                        <table className="specpart-table">
                            <thead>
                                <tr>
                                    <th rowSpan="2" colSpan="2" className="spectitle">
                                        AISIN Part
                                    </th>
                                    <th colSpan="5" className="spectitle">
                                        Dimension
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
                                </tr>
                            </thead>
                            <tbody>
                                {preData.map((val, key) => {
                                    return (
                                    <>
                                        <tr key={key}>
                                            {rowSpan[key]>0 && <td rowSpan={numOfPremium} className="infoHeader">Premium</td>}
                                            <td className="speccode">{val.PremiumCode}</td>
                                            <td>{val.ODmm}</td>
                                            <td>{val.ODinch}</td>
                                            <td>{val.IDmm}</td>
                                            <td>{val.Major}</td>
                                            <td>{val.Spline}</td>
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
    )
}

export {Specpdf}