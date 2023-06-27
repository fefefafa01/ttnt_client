import React from "react";
import { useState, useEffect, useRef } from "react";
import profile from "../img/Profile.png";
import PowerButton from "../img/PowerButton.png";
import "./comp.styles/profile.css";
import { Changer } from "./LanguageChange";

function Profile() {
  const [open, setOpen] = useState(true);
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
    <div className="drop">
      <button className="dropbtn">
        <img className="profile" src={profile} alt="Profile" />
      </button>

      <div className="dropdown-content">
        <a href="#" onClick={handleOpen}>
          My Profile
        </a>

        <a href="#" onClick={handlePwd}>
          Reset Password
        </a>
        <a href="#" onClick={handleSignOut}>
          Sign Out
          <img className="powerbutton" src={PowerButton} alt="PowerButton" />
        </a>
      </div>
      {open && (
        <div className="dropdown-content">
          <span>
            <a href="#"> My Profile </a>
            <a href="#" onClick={handleOpen}>
              Back
            </a>
          </span>
          <div className="myProfile">
            <a> First name: Tanaka Ayashi</a>
            <a> Last name </a>
            <a> Email address </a>
            <a> Role </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
