import { Changer } from "./LanguageChange";
import Multi_Lang from "./Multi_Lang";
import Profile from "./Profile";
import "./comp.styles/Header.css";

//Link with UserHandler.js in ./server for Profile

function AdminHeader() {
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
                <div className="rbtngroup col-3">
                    <button className="bttn col">
                        <span>
                            <Changer inp="Vehicle Management" />
                        </span>
                    </button>
                    <button className="bttn leftalgn col">
                        <span>
                            <Changer inp="Vehicle Part Management" />
                        </span>
                    </button>
                    <button className="bttn leftalgn col" onClick={handlePSBtn}>
                        <span>
                            <Changer inp="Home" />
                        </span>
                    </button>
                </div>
                <div className="col-1 btn-profile">
                    <Multi_Lang />
                    <Profile />
                </div>
            </div>
            <div className="hbody"></div>
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
                <Multi_Lang />
                <Profile />
            </div>
            <div className="col-1 btn-profile">
                <Multi_Lang />
                <Profile />
            </div>
            <div className="hbody"></div>
        </>
    );
}

export { AdminHeader, StaffHeader };
