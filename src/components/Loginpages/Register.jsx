import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { React, useState, useEffect, useContext } from "react";
import { Changer } from "../Languages/LanguageChange";
import { AccountContext } from "./Login.comps/AccountContext";
import { useTranslation } from "react-i18next";
import { backlocale, japregex, vietregex } from "constants/constindex";

const Validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexpassupdown = /(?=.*?[A-Z])(?=.*?[a-z])/;
    const regexpassnum = /(?=.*?[0-9])/;

    if (!values.email) {
        errors.email = <Changer inp="Email is required" />;
    } else if (!regex.test(values.email)) {
        errors.email = <Changer inp="Invalid email address" />;
    }
    if (!values.password) {
        errors.password = <Changer inp="Password is required" />;
    } else if (!regexpassupdown.test(values.password)) {
        errors.password = (
            <Changer inp="Passwords must contain both uppercase and lowercase characters" />
        );
    } else if (!regexpassnum.test(values.password)) {
        errors.password = (
            <Changer inp="Passwords must contain at least one number" />
        );
    } else if (values.password.length < 8) {
        errors.password = (
            <Changer inp="Passwords must contain at least 8 characters" />
        );
    }
    if (!values.confpassword) {
        errors.confpassword = <Changer inp="Password is required" />;
    } else if (values.confpassword !== values.password) {
        errors.confpassword = (
            <Changer inp="The confirm password is different from the password" />
        );
    }

    if (!values.last_name) {
        errors.last_name = <Changer inp="Last Name is required" />;
    }
    if (!values.first_name) {
        errors.first_name = <Changer inp="First Name is required" />;
    }
    return errors;
};

function Register() {
    var loc;
    const { setUser } = useContext(AccountContext) || {};
    var { t } = useTranslation();
    const [visible, setVisible] = useState(false);
    const [confvisible, confsetVisible] = useState(false);
    const [vad, setVad] = useState(true);
    const initialValues = {
        email: "",
        password: "",
        confpassword: "",
        first_name: "",
        last_name: "",
    };

    const [errormsg, setErrormsg] = useState(null);
    const [formValues, setFormvalues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const handleChange = (e) => {
        var { name, value } = e.target;
        const viregex = vietregex;
        const jpregex = japregex;
        if (name === "first_name" || name === "last_name") {
            setFormvalues({ ...formValues, [name]: value });
        } else if (
            (name === "email" ||
                name === "password" ||
                name === "confpassword") &&
            !viregex.test(value) &&
            !jpregex.test(value)
        ) {
            if (!jpregex.test(value))
                setFormvalues({ ...formValues, [name]: value });
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(Validate(formValues));
        setIsSubmit(true);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            setErrormsg(null);
        }
        //Fetch
        loc = backlocale + "auth/reg";
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
                setUser({ ...data });
                if (data.status === "Email Taken") {
                    setErrormsg(t("Email address already exists"));
                } else if (data.status === "Registered") {
                    setVad(!vad);
                }
            });
    };

    //Out Focus
    const [emailblurred, setEmailb] = useState(false);
    const [passwordblurred, setPassb] = useState(false);
    const [fstnblurred, setFNb] = useState(false);
    const [lstnblurred, setLNb] = useState(false);
    const [confpblurred, setCPassb] = useState(false);

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
            const regexpassupdown = /(?=.*?[A-Z])(?=.*?[a-z])/;
            const regexpassnum = /(?=.*?[0-9])/;

            if (!formValues.password) {
                erro.password = t("Password is required");
            } else if (!regexpassupdown.test(formValues.password)) {
                erro.password = t(
                    "Passwords must contain both uppercase and lowercase characters"
                );
            } else if (!regexpassnum.test(formValues.password)) {
                erro.password = t("Passwords must contain at least one number");
            } else if (formValues.password.length < 8) {
                erro.password = t(
                    "Passwords must contain at least 8 characters"
                );
            }
            if (!passwordblurred) {
                setPassb(true);
            }
        }

        if (name === "confpass" || confpblurred) {
            if (!formValues.confpassword) {
                erro.confpassword = t("Password is required");
            } else if (formValues.confpassword !== formValues.password) {
                erro.confpassword = t(
                    "The confirm password is different from the password"
                );
            }
            if (!confpblurred) {
                setCPassb(true);
            }
        }

        if (name === "FN" || fstnblurred) {
            if (!formValues.first_name) {
                erro.first_name = t("First Name is required");
            }
            if (!fstnblurred) {
                setFNb(true);
            }
        }
        if (name === "LN" || lstnblurred) {
            if (!formValues.last_name) {
                erro.last_name = t("Last Name is required");
            }
            if (!lstnblurred) {
                setLNb(true);
            }
        }
        setFormErrors(erro);
    }

    useEffect(() => {
        // console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            //console.log(formValues);
            setErrormsg(null);
        }
    }, [formErrors]);

    const handlebacklog = () => {
        window.location.assign("/login");
    }

    return (
        <>
            {vad && (
                <div className="col-xs-9 col-md-7 col-lg-3 wrapper">
                    <div className="form-box login">
                        <h2>
                            <Changer inp="Create New Account" />
                        </h2>
                        <form action="#" onSubmit={handleSubmit}>
                            <div className="fill">
                                <div className="input-box">
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder={t("Email Address")}
                                        value={formValues.email}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur("email")}
                                    />
                                </div>
                                <div className="error">
                                    <span>{formErrors.email}</span>
                                </div>
                            </div>
                            <div className="full-name">
                                <div className="name">
                                    <div className="left">
                                        <input
                                            name="first_name"
                                            value={formValues.first_name}
                                            className="name-box name-left"
                                            type="text"
                                            placeholder={t("First Name")}
                                            onChange={handleChange}
                                            onBlur={() => handleBlur("FN")}
                                        />
                                        <span className="name-error error_first_name">
                                            {formErrors.first_name}
                                        </span>
                                    </div>

                                    <div className="right">
                                        <input
                                            name="last_name"
                                            value={formValues.last_name}
                                            className="name-box name-right"
                                            type="text"
                                            placeholder={t("Last Name")}
                                            onChange={handleChange}
                                            onBlurCapture={() =>
                                                handleBlur("LN")
                                            }
                                        />
                                        <span className="name-error error_last_name">
                                            {formErrors.last_name}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="fill">
                                <div className="input-box">
                                    <input
                                        name="password"
                                        value={formValues.password}
                                        type={visible ? "text" : "password"}
                                        placeholder={t("Password")}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur("password")}
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
                            </div>
                            <div className="fill">
                                <div className="input-box">
                                    <input
                                        name="confpassword"
                                        value={formValues.confpassword}
                                        type={confvisible ? "text" : "password"}
                                        placeholder={t("Confirm Password")}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur("confpass")}
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
                                        )}
                                    </div>
                                </div>
                                <div className="error">
                                    <span>{formErrors.confpassword}</span>
                                </div>
                            </div>
                            <p className="preg-error">
                                {errormsg ? errormsg : null}
                            </p>
                            <button
                                className="btn btn-dark regbtn"
                                type="submit"
                            >
                                <Changer inp="Create Account" />
                            </button>
                        </form>
                    </div>
                </div>
            )}
            {!vad && (
                <div className="col-xs-9 col-md-7 col-lg-3 wrapper">
                    <div className="form-box login">
                        <h2>
                            <Changer inp="Create New Account" />
                        </h2>
                    </div>
                    <div className="form-box valid-box">
                        <span className="border-box">
                            <p>
                                <Changer inp="Your account was successfully created!" />
                            </p>
                            <p>
                                <Changer inp="please log in" />
                            </p>
                            <button className="regbackbtn" onClick={handlebacklog}>
                                <div className="back_login">
                                    <Changer inp="Go to Login" />
                                </div>
                            </button>
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}

export { Register };
