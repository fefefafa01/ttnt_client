import React from "react";
import { useState, useEffect } from "react";
import profile from "../img/Profile.png";
import PowerButton from "../img/PowerButton.png";
import "./comp.styles/profile.css";

function Profile() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleSignOut = (e) => {
    e.preventDefault();
    window.location.assign("/login");
  };
  const handlePwd = (e) => {
    e.preventDefault();
    window.location.assign("/resetpwd");
  };
  return (
    <div className="col-1 drop-down">
      <button className="dropbtn" onClick={handleOpen}>
        <img className="profile" src={profile} alt="Profile" />
      </button>
      {open ? (
        <div className="dropdown-content">
          <a href="#">My Profile</a>
          <br></br>
          <a href="#" onClick={handlePwd}>
            Reset Password
          </a>
          <br></br>
          <a href="#" onClick={handleSignOut}>
            Sign Out
            <img
              className="powerbutton"
              src={PowerButton}
              alt="PowerButton"
            />{" "}
          </a>
        </div>
      ) : null}
    </div>
  );
}

export default Profile;
