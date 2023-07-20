import { Link } from "react-router-dom";
import { Changer } from "./LanguageChange";
import { Multi_Lang_Home } from "./Multi_Lang";
import Profile from "./Profile";
import "./comp.styles/Header.css";

//Link with UserHandler.js in ./server for Profile

function AdminHeader(props) {
    const handlePSBtn = (e) => {
        e.preventDefault();
        window.location.assign("/homepage");
    };

    return (
        <>
            <div className="aheader">
                <div className="col-lg-2 col-sm-1">
                    <link
                        href="//db.onlinewebfonts.com/c/11cd399ec653d4e156ce034b85c19cb7?family=VLNL+Decks"
                        rel="stylesheet"
                        type="text/css"
                    />
                    <p className="logo">AISIN</p>
                    <br></br>
                    <p className="col-lg logotext">We Touch The Future</p>
                </div>
                <div className="lbtngroup col-lg-2 col-sm-4">
                    <button className="bttn col-2 rep-btn" onClick={handlePSBtn}>
                        <span>
                            <Changer inp="Vehicle Part Search" />
                        </span>
                    </button>
                    <Link to="/report">
                        <button className="bttn leftalgn col">
                            <span>
                                <Changer inp="Report" />
                            </span>
                        </button>
                    </Link>
                </div>
                <div className="hlabel col-lg ">
                    <p className="hlabel-content">
                        <Changer inp="Vehicle Part Search" />
                    </p>
                </div>
                <div className="rbtngroup col-lg-3 col-sm-6">
                    <button className="bttn col-lg">
                        <span>
                            <Changer inp="Vehicle Management" />
                        </span>
                    </button>
                    <button className="bttn leftalgn col-lg">
                        <span>
                            <Changer inp="Vehicle Part Management" />
                        </span>
                    </button>
                    <button
                        className="bttn leftalgn col-lg"
                        onClick={handlePSBtn}
                    >
                        <span>
                            <Changer inp="Home" />
                        </span>
                    </button>
                </div>
                <div className="col-lg-1 col-sm-1 btn-profile">
                    <Multi_Lang_Home proper={props} />
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
                    <p className="logo">AISIN</p>
                    <br></br>
                    <p className="col logotext">We Touch The Future</p>
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
                    <Multi_Lang_Home />
                    <Profile />
                </div>
            </div>
        </>
    );
}

function ReportHeader(props) {
    const handlePSBtn = (e) => {
        e.preventDefault();
        window.location.assign("/homepage");
    };

    return (
        <>
            <div className="aheader">
                <div className="col-lg-2 col-sm-1">
                    <link
                        href="//db.onlinewebfonts.com/c/11cd399ec653d4e156ce034b85c19cb7?family=VLNL+Decks"
                        rel="stylesheet"
                        type="text/css"
                    />
                    <p className="logo">AISIN</p>
                    <br></br>
                    <p className="col-lg logotext">We Touch The Future</p>
                </div>
                <div className="lbtngroup col-lg-2 col-sm-4">
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
                <div className="hlabel col-lg ">
                    <p className="hlabel-content">
                        <Changer inp="Product Coverage by Period" />
                    </p>
                </div>
                <div className="rbtngroup col-lg-2 col-sm-6">
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
                <div className="col-lg-1 col-sm-1 btn-profile">
                    <Multi_Lang_Home proper={props} />
                    <Profile />
                </div>
            </div>
        </>
    );
}

export { AdminHeader, StaffHeader, ReportHeader };
