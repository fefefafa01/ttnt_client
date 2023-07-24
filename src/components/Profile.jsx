import React from "react";
import { useState, useRef, useEffect } from "react";
import profile from "../img/Profile.png";
import PowerButton from "../img/PowerButton.png";
import "./comp.styles/profile.scss";
import { Changer } from "./Languages/LanguageChange";
import { useTranslation } from "react-i18next";
import { backlocale } from "constants/constindex";

function Profile() {
    var loc;
    const [open, setOpen] = useState(false);
    const [logOut, setLogOut] = useState(false);
    var [firstname, setFirstname] = useState("");
    var [lastname, setLastname] = useState("");
    var [role, setRole] = useState("");
    const { t } = useTranslation();
    const handleOpen = () => {
        setOpen(!open);
    };

    const handleSignOut = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.removeItem("isLoggedIn");
        setLogOut(true);
        window.location.assign("/login");
    };

    const handleRP = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.removeItem("isLoggedIn");
        setLogOut(true);
        window.location.assign("/resetpwd");
    };

    if (open && localStorage.email !== "") {
        loc = backlocale + "prof/info";
        fetch(loc, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                    "GET, PUT, POST, DELETE, PATCH, OPTIONS",
            },
            body: JSON.stringify(localStorage.email),
        })
            .catch((err) => {
                return;
            })
            .then((res) => {
                if (!res || !res.ok || res.status >= 400) {
                    return;
                }
                return res.json();
            })
            .then((data) => {
                if (!data) return;
                setFirstname(data.firstname.firstname);
                setLastname(data.lastname.lastname);
                setRole(t(data.roleid.role));
            });
    }

    const selectDropdownRef = useRef(null);

    const toggleDropdown = () => {
        if (selectDropdownRef.current) {
            selectDropdownRef.current.classList.toggle("active");
        }
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                selectDropdownRef.current &&
                !selectDropdownRef.current.contains(event.target)
            ) {
                selectDropdownRef.current.classList.remove("active");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [selectDropdownRef]);

    return (
        <div className="drop" ref={selectDropdownRef}>
            <button
                className="dropbtn"
                type="button"
                aria-expanded="false"
                data-bs-toggle="drop"
            >
                <img
                    className="profile"
                    src={profile}
                    alt="Profile"
                    onClick={toggleDropdown}
                />
            </button>
                <div className="dropdown-content">
                <a href="#" onClick={handleOpen}>
                    <Changer inp="My Profile" />
                </a>
                <a href="#" onClick={handleRP}>
                    <Changer inp="Reset Password" />
                </a>
                <a href="#" onClick={handleSignOut}>
                    <Changer inp="Sign Out" />
                    <img
                        className="powerbutton"
                        src={PowerButton}
                        alt="PowerButton"
                    />
                </a>
            </div>
            {open && (
                <div className="dropdown-content profile">
                    <span>
                        <a href="#">
                            <Changer inp="My Profile" />
                        </a>
                        <a href="#" onClick={handleOpen}>
                            <Changer inp="Back" />
                        </a>
                    </span>
                    <div className="myProfile">
                        <a>
                            <Changer inp="First Name" />: {firstname}
                        </a>
                        <a>
                            <Changer inp="Last Name" />: {lastname}
                        </a>
                        <a>
                            <Changer inp="Email Address" />:{" "}
                            {localStorage.email}
                        </a>
                        <a>
                            <Changer inp="Role" />: {role}
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
