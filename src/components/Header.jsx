import { Link } from "react-router-dom";
import { Changer } from "./Languages/LanguageChange";
import { MultiLangHome } from "./Languages/Multi_Lang";
import Profile from "./Profile";
import "./comp.styles/Header.scss";

function AdminHeader() {
    const handlePSBtn = (e) => {
        e.preventDefault();
        window.location.assign("/homepage");
    };

    function handleBlank() {
        window.location.assign("/blankpage");
    }

    return (
        <>
            <div className="aheader">
                <div className="item header-item head-AISIN">
                    <link
                        href="//db.onlinewebfonts.com/c/11cd399ec653d4e156ce034b85c19cb7?family=VLNL+Decks"
                        rel="stylesheet"
                        type="text/css"
                    />
                    <div className="front-AISIN">
                        <p className="logo">AISIN</p>
                    </div>
                    <div className="behi-AISIN">
                        <p className="col logotext" style={{marginTop: "5px",}}>We Touch The Future</p>
                    </div>
                </div>
                <div className="lbtngroup item header-item">
                    <button className="bttn item rep-btn" onClick={handlePSBtn}>
                        <span>
                            <Changer inp="Vehicle Part Search" />
                        </span>
                    </button>
                    <Link className="item" to="/report">
                        <button className="bttn leftalgn ">
                            <span>
                                <Changer inp="Report" />
                            </span>
                        </button>
                    </Link>
                </div>
                <div className="hlabel item header-item">
                    <p className="hlabel-content">
                        <Changer inp="Vehicle Part Search" />
                    </p>
                </div>
                <div className="rbtngroup item header-item">
                    <button className="bttn item" onClick={handleBlank}>
                        <span>
                            <Changer inp="Vehicle Management" />
                        </span>
                    </button>
                    <button
                        className="bttn leftalgn item"
                        onClick={handleBlank}
                    >
                        <span>
                            <Changer inp="Vehicle Part Management" />
                        </span>
                    </button>
                    <button
                        className="bttn leftalgn item"
                        onClick={handlePSBtn}
                    >
                        <span>
                            <Changer inp="Home" />
                        </span>
                    </button>
                </div>
                <div className="item header-item btn-profile">
                    <MultiLangHome />
                    <Profile />
                </div>
            </div>
        </>
    );
}

function StaffHeader() {
    const handlePSBtn = (e) => {
        e.preventDefault();
        window.location.assign("/homepage");
    };

    return (
        <>
            <div className="aheader">
                <div className="col-2">
                    <link
                        href="//db.onlinewebfonts.com/c/11cd399ec653d4e156ce034b85c19cb7?family=VLNL+Decks"
                        rel="stylesheet"
                        type="text/css"
                    />
                    <div className="AISIN">
                        <p className="logo">AISIN</p>
                    </div>
                    <div className="behi-AISIN">
                        <p className="col logotext" style={{marginTop:"5px",}}>We Touch The Future</p>
                    </div>
                </div>
                <div className="lbtngroup col-2">
                    <button className="bttn col" onClick={handlePSBtn}>
                        <span>
                            <Changer inp="Vehicle Part Search" />
                        </span>
                    </button>
                    <button className="bttn leftalgn col">
                        <span>
                            <Changer inp="Report" />
                        </span>
                    </button>
                </div>
                <div className="label col">
                    <p className="label">
                        <Changer inp="Vehicle Part Search" />
                    </p>
                </div>
                <div className="srbtngroup col-3">
                    <button className="bttn" onClick={handlePSBtn}>
                        <span>
                            <Changer inp="Home" />
                        </span>
                    </button>
                </div>
                <div className="col-1 btn-profile">
                    <MultiLangHome />
                    <Profile />
                </div>
            </div>
        </>
    );
}

function ReportHeader() {
    const handlePSBtn = (e) => {
        e.preventDefault();
        window.location.assign("/homepage");
    };

    return (
        <>
            <div className="raheader ">
                <div className="item header-item head-AISIN">
                    <link
                        href="//db.onlinewebfonts.com/c/11cd399ec653d4e156ce034b85c19cb7?family=VLNL+Decks"
                        rel="stylesheet"
                        type="text/css"
                    />
                    <div className="rfront-AISIN">
                        <p className="logo">AISIN</p>
                    </div>
                    <div className="rbehi-AISIN">
                        <p className="col logotext">We Touch The Future</p>
                    </div>
                </div>
                <div className="lbtngroup header-item item">
                    <button className="rbttn col" onClick={handlePSBtn}>
                        <span>
                            <Changer inp="Vehicle Part Search" />
                        </span>
                    </button>
                    <Link to="/report">
                        <button className="rbttn leftalgn col rep-btn">
                            <span>
                                <Changer inp="Report" />
                            </span>
                        </button>
                    </Link>
                </div>
                <div className="hlabel-report item header-item">
                    <p className="hlabel-content">
                        <Changer inp="Product Coverage by Period" />
                    </p>
                </div>
                <div className="rrbtngroup header-item item">
                    <button className="rbttn leftalgn col-lg">
                        <span>
                            <Changer inp="Vehicle Part Management" />
                        </span>
                    </button>
                    <button
                        className="rbttn leftalgn col-lg"
                        onClick={handlePSBtn}
                    >
                        <span>
                            <Changer inp="Home" />
                        </span>
                    </button>
                </div>
                <div className="item header-item btn-profile">
                    <MultiLangHome />
                    <Profile />
                </div>
            </div>
        </>
    );
}

export { AdminHeader, StaffHeader, ReportHeader };
