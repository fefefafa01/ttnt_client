import './comp.styles/SpecPDF.css'
import { Changer } from "./LanguageChange"
import spec from '../img/car.png'

function Specpdf() {
    var numOfPremium = 0, numOfSubPre = 0;
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
    //Controlling Data Tagble
    var preData = [{}], subPreData = [{}]
    for (let i=0; i<data.length; i++) {
        if (data[i].PremiumCode!==undefined) {
            numOfPremium++;
            preData[i]=data[i];
        }
        if (data[i].SubPremiumCode!==undefined) {
            numOfSubPre++;
            subPreData[i]=data[i];
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
                    <img className='partimg' src={spec} alt='spec' />
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
                                <th className="spectitle">
                                    OD (mm)
                                </th>
                                <th className="spectitle">
                                    OD (inch)
                                </th>
                                <th className="spectitle">
                                    ID (mm)
                                </th>
                                <th className="spectitle">
                                    Major D. (mm)
                                </th>
                                <th className="spectitle">
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
                                        <td>{val.PremiumCode}</td>
                                        <td>{val.ODmm}</td>
                                        <td>{val.ODinch}</td>
                                        <td>{val.IDmm}</td>
                                        <td>{val.Major}</td>
                                        <td>{val.Spline}</td>
                                    </tr>
                                </>
                                );
                            })}
                            {subPreData.map((val, key) => {
                                return (
                                <>
                                    <tr key={key}>
                                        {rowSpan[key]>0 && <td rowSpan={rowSpan[key]} className="infoHeader">Sub-Premium/AM</td>}
                                        <td>{val.SubPremiumCode}</td>
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export {Specpdf}