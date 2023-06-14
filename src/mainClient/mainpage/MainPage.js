import { Login, Register, ResetPwd } from "../../components/MainInput";
import { LoginValid, PwdValid, RegValid } from "../../components/Validation";
import Multi_Lang from "../../components/Multi_Lang";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import "./MainPage.css";
import { React } from "react";
import Profile from "components/Profile";

const MainPage = () => {
  return (
    <>
      <div className="header">
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
        <div className="label col">
          <p className="label">Welcom to AISIN Parts Support</p>
        </div>
        <Profile />
      </div>
      <div className="body">
        <Login />
        <div className="col-sm-12 col-md content">
          <p className="logo">AISIN</p>
          <br></br>
          <p className="contenttext">AIMING FOR A BETTER FUTURE</p>
        </div>
        <div className="col body-img"></div>
      </div>
    </>
  );
};

export default MainPage;
