import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { React, useState, useEffect, useContext } from "react";
import { Changer } from "../Languages/LanguageChange";
import { Link } from "react-router-dom";
import { AccountContext } from "./Login.comps/AccountContext";
import { useTranslation } from "react-i18next";
import { backlocale } from "constants/constindex";

const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexpassupdown = /(?=.*?[A-Z])(?=.*?[a-z])/;
    const regexpassnum = /(?=.*?[0-9])/;

    if (!values.email || !regex.test(values.email)) {
        errors.email = <Changer inp="Invalid email address" />;
    } 
    if (!values.password) {
        errors.password = <Changer inp="Password is required" />;
    } else if (!regexpassupdown.test(values.password)) {
        errors.password = (
            <Changer inp="Passwords must contain both uppercase and lowercase characters" />
        )
    } else if (!regexpassnum.test(values.password)) {
        errors.password = (
            <Changer inp="Passwords must contain at least one number" />
        );
    } else if (values.password.length < 8) {
        errors.password = (
            <Changer inp="Password must be more than 8 characters" />
        );
    }

    if (values.confpassword !== values.password) {
        errors.confpassword = <Changer inp="The confirm password is different from the password" />;
    }
    
    return errors;
};

function ResetPwd() {
    var loc;
    const [password, setPassword] = useState("");
    const [confpassword, confsetPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [confvisible, confsetVisible] = useState(false);
    const { setUser } = useContext(AccountContext) || {};
    const [hide, sethide] = useState(true);
    const { t } = useTranslation();
    const initialValues = { email: "", password: "", confpassword: "" };
    const [formValues, setFormvalues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormvalues({ ...formValues, [name]: value });
        setPassword(e.target.value);
        confsetPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        loc = backlocale + "auth/resetpwd";
        fetch(loc, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            },
            body: JSON.stringify(formValues),
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
            setUser({ ...data });
            if (data.status === "Email Unavailable") {
                setFormErrors({ email: t("Email address does not exist") });
            } else if (data.status === "Changed Pass") {
                sethide(!hide);
            }
        });
    };

    useEffect(() => {
            console.log(formErrors);
            console.log("is Submit:", isSubmit);
            if (Object.keys(formErrors).length === 0 && isSubmit) {
                console.log(formValues);
            }
        }, 
        [formErrors]
    );

    return (
    <>
        {hide && (
            <div className="wrapper reset_pwd">
                <div className="form-box login">
                    <h2>
                        <Changer inp="Reset Password" />
                    </h2>
                    <form action="#" onSubmit={handleSubmit}>
                        <div className="input-box">
                            <input
                            name="email"
                            type="text"
                            placeholder={t("Email Address")}
                            value={formValues.email}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="error">
                            <span>{formErrors.email}</span>
                        </div>
                        <div className="input-box">
                            <input
                            name="password"
                            value={formValues.password}
                            type={visible ? "text" : "password"}
                            placeholder={t("Password")}
                            onChange={handleChange}
                            />
                            <div
                                className="p-2"
                                onMouseDown={() => setVisible(true)}
                                onMouseUp={() => setVisible(false)}
                            >
                                {visible ? (
                                    <EyeOutlined className="eye" />
                                    ) : (
                                    <EyeInvisibleOutlined className="eye" />
                                    )
                                }
                            </div>
                        </div>
                        <div className="error">
                            <span>{formErrors.password}</span>
                        </div>
                        <div className="input-box">
                            <input
                            name="confpassword"
                            value={formValues.confpassword}
                            type={confvisible ? "text" : "password"}
                            placeholder={t("Confirm New Password")}
                            onChange={handleChange}
                            />
                            <div
                                className="p-2"
                                onMouseDown={() => confsetVisible(true)}
                                onMouseUp={() => confsetVisible(false)}
                            >
                                {confvisible ? (
                                    <EyeOutlined className="eye" />
                                    ) : (
                                    <EyeInvisibleOutlined className="eye" />
                                    )
                                }
                            </div>
                        </div>
                        <div className="error">
                            <span>{formErrors.confpassword}</span>
                        </div>
                        <button className="btn btn-dark">
                            <Changer inp="Reset Password" />
                        </button>
                    </form>
                </div>
            </div>
        )}
        {!hide && (
            <div className="wrapper">
                <div className="form-box">
                    <h2>
                        <Changer inp="Reset Password" />
                    </h2>
                    <div className="form-box valid-box">
                        <span className="border-box">
                            <p>
                                <Changer inp="Your password was successfully reset!" />
                            </p>
                            <p>
                                <Changer inp="please log in" />
                            </p>
                            <button className="btn">
                                <Link className="back_login" to="/login">
                                    <Changer inp="Go to Login" />
                                </Link>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        )}
    </>
    );
}

export { ResetPwd };