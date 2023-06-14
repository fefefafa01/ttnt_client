import React from "react";
import { useState, useEffect } from "react";
import profile from "../img/Profile.png";
import PowerButton from "../img/PowerButton.png";

function Profile() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="col-1 dropdown">
      <button className="dropbtn" onClick={handleOpen}>
        <img className="profile" src={profile} alt="Profile" />
      </button>
      {open ? (
        <div className="dropdown-content">
          <a href="#">My Profile</a>
          <a href="#">Reset Password</a>
          <a href="#">
            Sign Out{" "}
            <img className="powerbutton" src={PowerButton} alt="PowerButton" />{" "}
          </a>
        </div>
      ) : null}
    </div>
  );
}

export default Profile;
