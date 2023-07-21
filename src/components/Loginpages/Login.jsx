import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { React, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Changer } from "../Languages/LanguageChange";
import { AccountContext } from "./Login.comps/AccountContext";
import { useTranslation } from "react-i18next";
import { backlocale } from "constants/constindex";

const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email || !regex.test(values.email)) {
        errors.email = <Changer inp="Invalid email address" />;
    } 
    return errors;
};

function Login() {
    const loc = backlocale+"auth/login";
    console.log(loc)
    const { setUser } = useContext(AccountContext) || {};
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState(null);

    const initialValues = { email: "", password: "" };
    const [formValues, setFormvalues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (localStorage.checkbox && localStorage.username !== "") {
            setIsChecked(true);
            setFormvalues({
                email: localStorage.checkEmail,
                password: localStorage.checkPassword,
            });
        } else if (!localStorage.checkbox) {
            setIsChecked(false);
            localStorage.removeItem("checkEmail");
            localStorage.removeItem("checkPassword");
        }
        console.log(isChecked);
    }, []);

    const { t } = useTranslation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormvalues({ ...formValues, [name]: value });
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
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
                if (data.status === "Wrong Email" || data.status === "Wrong Password") {
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
        }
        // here call the API to signup/login
        else if (!isChecked) {
            localStorage.email = "";
            localStorage.password = "";
            localStorage.checkbox = false;
            localStorage.checkEmail = "";
            localStorage.checkPassword = "";
        }
    };

    useEffect(() => {
        console.log(formErrors);
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
                    <div className="input-box">
                        <input
                            type="text"
                            name="email"
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
                            )}
                        </div>
                    </div>
                    <div className="error">
                        <span>{formErrors.password}</span>
                    </div>
                    <div className="remember-forgot">
                        <label htmlFor="">
                            <input
                                type={"checkbox"}
                                checked={isChecked}
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
                        <Changer inp="User Login" />
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
