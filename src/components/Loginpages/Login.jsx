import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { React, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Changer } from "../Languages/LanguageChange";
import { AccountContext } from "./Login.comps/AccountContext";
import { useTranslation } from "react-i18next";
import { backlocale, japregex, vietregex } from "constants/constindex";

const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
        errors.email = <Changer inp="Email is required" />;
    } else if (!regex.test(values.email)) {
        errors.email = <Changer inp="Invalid email address" />;
    }

    if (!values.password) {
        errors.password = <Changer inp="Password is required" />;
    }
    return errors;
};

function Login() {
    const loc = backlocale + "auth/login";
    const { setUser } = useContext(AccountContext) || {};
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState(null);

    const initialValues = { email: "", password: "" };
    const [formValues, setFormvalues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [dateLogin, setDateLogin] = useState("");

    useEffect(() => {
        if (localStorage.checkbox && localStorage.email !== "") {
            setIsChecked(true);
            setFormvalues({
                email: localStorage.checkEmail,
                password: localStorage.checkPassword,
            });
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 7);
            setDateLogin(expirationDate.toISOString());
        } else if (!localStorage.checkbox) {
            setIsChecked(false);
            localStorage.removeItem("checkEmail");
            localStorage.removeItem("checkPassword");
        }
        console.log(isChecked);
    }, []);

    const { t } = useTranslation();

    const handleChange = (e) => {
        const viregex = vietregex;
        const jpregex = japregex;
        const { name, value } = e.target;
        if (!viregex.test(value) && !jpregex.test(value)) {
            if (!jpregex.test(value)) {
                setFormvalues({ ...formValues, [name]: value });
            }
        }
    };

    function handleSubmit (e) {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            setError(null);
        }
        fetch(loc, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                    "GET,PUT,POST,DELETE,PATCH,OPTIONS",
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
                localStorage.setItem("isLoggedIn", false);
                setUser({ ...data });
                if (
                    data.status === "Wrong Email" ||
                    data.status === "Wrong Password"
                ) {
                    setError("Invalid email or password");
                } else if (data.loggedIn) {
                    localStorage.isLoggedIn = true;
                    window.location.assign("/homepage");
                }
            });
    };

    const handleCheck = (e) => {
        setIsChecked(e.target.checked);
        console.log(isChecked);
    };

    const loginSubmit = () => {
        if (isChecked && formValues.email !== "") {
            localStorage.email = formValues.email;
            localStorage.password = formValues.password;
            localStorage.checkbox = isChecked;
            localStorage.checkEmail = formValues.email;
            localStorage.checkPassword = formValues.password;
            localStorage.expirationDate = dateLogin;
        }
        // here call the API to signup/login
        else if (!isChecked) {
            localStorage.email = formValues.email;
            localStorage.password = "";
            localStorage.checkbox = false;
            localStorage.checkEmail = "";
            localStorage.checkPassword = "";
        }
    };

    //Out Focus
    const [emailblurred, setEmailb] = useState(false);
    const [passwordblurred, setPassb] = useState(false);

    function handleBlur(name) {
        let erro = {};
        if (name === "email" || emailblurred) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
            if (!formValues.email) {
                erro.email = t("Email is required");
            } else if (!regex.test(formValues.email)) {
                erro.email = t("Invalid email address");
            }
            if (!emailblurred) {
                setEmailb(true);
            }
        }

        if (name === "password" || passwordblurred) {
            if (!formValues.password) {
                erro.password = t("Password is required");
            }
            if (!passwordblurred) {
                setPassb(true);
            }
        }

        setFormErrors(erro);
    }

    useEffect(() => {
        // console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            setError(null);
            //console.log(formValues);
        }
    }, [formErrors]);

    return (
        <div className="col-xs-9 col-md-7 col-lg-3 wrapper">
            <div className="form-box login">
                <h2>
                    <Changer inp="User Login" />
                </h2>
                <form action="#" onSubmit={handleSubmit}>
                    <div className="fill">
                        <div className="input-box">
                            <input
                                type="text"
                                name="email"
                                placeholder={t("Email Address")}
                                value={
                                    localStorage.expirationDate === Date()
                                        ? ""
                                        : formValues.email
                                }
                                onChange={handleChange}
                                onBlur={() => handleBlur("email")}
                            />
                        </div>
                        <div className="error">
                            <span>{formErrors.email}</span>
                        </div>
                    </div>
                    <div className="fill">
                        <div className="input-box">
                            <input
                                name="password"
                                value={
                                    localStorage.expirationDate === Date()
                                        ? ""
                                        : formValues.password
                                }
                                type={visible ? "text" : "password"}
                                placeholder={t("Password")}
                                onChange={handleChange}
                                onBlur={() => handleBlur("password")}
                            />
                            <div
                                className="p-2"
                                onMouseDown={() => setVisible(true)}
                                onMouseUp={() => setVisible(false)}
                                onMouseLeave={() => setVisible(false)}
                            >
                                {visible ? (
                                    <EyeOutlined className="eye" />
                                ) : (
                                    <EyeInvisibleOutlined className="eye" />
                                )}
                            </div>
                        </div>
                        <div className="error">
                            <span>{formErrors.password}</span>
                        </div>
                    </div>
                    <div className="remember-forgot">
                        <label htmlFor="">
                            <input
                                type={"checkbox"}
                                name="IsRememberMe"
                                onChange={handleCheck}
                            />
                            <Changer inp="Remember" />
                        </label>
                        <p>
                            <Link to="/resetpwd">
                                <Changer inp="Forgot Password?" />
                            </Link>
                        </p>
                    </div>
                    <p className="p-error">{error ? error : null}</p>
                    <button
                        className="btn btn-dark"
                        type="submit"
                        onClick={loginSubmit}
                    >
                        <Changer inp="Login" />
                    </button>
                </form>
            </div>
            <div className="login-register">
                <p className="register-link">
                    <Link to="/register">
                        <Changer inp="Create Account" />
                    </Link>
                </p>
            </div>
        </div>
    );
}

export { Login };
