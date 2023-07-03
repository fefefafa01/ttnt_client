import React from "react";
import { useState, useEffect, useRef } from "react";
import profile from "../img/Profile.png";
import PowerButton from "../img/PowerButton.png";
import './comp.styles/profile.css'

function Profile() {
    const [open, setOpen] = useState(false);
    const [logOut, setLogOut] = useState(false);
    var [firstname, setFirstname] = useState("");
    var [lastname, setLastname] = useState("");
    var [role, setRole] = useState("");
    const {t} = useTranslation();
    const handleOpen = () => {
        setOpen(!open);
    };
    const handleSignOut = (e) => {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('isLoggedIn')
        setLogOut(true);
        window.location.assign('/login')
        
    }

    return (
        <div className="col-1 dropdown">
            <button className="dropbtn" onClick={handleOpen}>
                <img className="profile" src={profile} alt="Profile" />
            </button>
            <div className="dropdown-content">
                <a href="#" onClick={handleOpen}>
                    <Changer inp='My Profile' />
                </a>
                <a href="#" onClick={handleRP}>
                    <Changer inp='Reset Password' />
                </a>
                <a href="#" onClick={handleSignOut}>
                    <Changer inp='Sign Out' />
                    <img className="powerbutton" src={PowerButton} alt="PowerButton" />
                </a>
            </div>
            {open && (
                <div className="dropdown-content">
                    <a href="#">My Profile</a>
                    <br></br>
                    <a href="#">Reset Password</a>
                    <br></br>
                    <a href="#" onClick={handleSignOut}>
                        Sign Out
                        <img className="powerbutton" src={PowerButton} alt="PowerButton" />{" "}
                    </a>
                </div>
            ) : null}
        </div>
    );
}

export default Profile;
