import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { React, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Changer } from './LanguageChange'
import { AccountContext } from './Login.comps/AccountContext';

const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
        errors.email = "Email is required";
    }
    else if (!regex.test(values.email)) {
        errors.email = "This is not a valid email format!";
    }

    if (!values.password) {
        errors.password = "Password is required";
    }
    else if (values.password.length < 4) {
        errors.password = "Password must be more than 4 characters";
    }
    //   } else if (values.password.length > 10) {
    //     errors.password = "Password cannot exceed more than 10 characters";
    //   }
    return errors;
};

function Login() {

    const { setUser } = useContext(AccountContext) || {};
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState(null);

    const initialValues = {email:'', password:''};
    const [formValues, setFormvalues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormvalues({...formValues, [name]: value});
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        fetch("http://localhost:5000/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
              },
              body: JSON.stringify(formValues),
        })
        .catch(err => {
            return;
        })
        .then (res => {
            if (!res || !res.ok || res.status >= 400) {
                return;
            }
            return res.json();
        })
        .then (data => {
            if (!data) return;
            setUser({...data});
            if(data.status) {
                setError(data.status);
            } else if (data.loggedIn) {
                window.location.assign('/homepage');
            }
        })
    }

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, 
        [formErrors],
    );

    return (
        <div className="col-xs-9 col-md-7 col-lg-3 wrapper">
            <div className="form-box login">
                <h2>
                    <Changer inp="Login" />
                </h2>
                <form action="#" onSubmit={handleSubmit}>
                    <div className="input-box">
                        <input
                        type="text"
                        name="email"
                        placeholder="Email Address"
                        value={formValues.email}
                        onChange={handleChange}
                        />     
                    </div>
                    <div className="error"><span>{formErrors.email}</span></div>
                    <div className="input-box">
                        <input name="password"
                        value={formValues.password}
                        type={visible ? "text" : "password"}
                        placeholder="Password"
                        onChange={handleChange}
                        />
                        <div className="p-2" onClick={() => setVisible(!visible)}>
                        {visible ? (
                            <EyeOutlined className="eye" />
                        ) : (
                            <EyeInvisibleOutlined className="eye" />
                        )}
                        </div>
                    </div>
                    <div className="error"><span>{formErrors.password}</span></div>
                        <div className="remember-forgot">
                            <label htmlFor="">
                                <input type={"checkbox"} />
                                <Changer inp="Remember" />
                            </label>
                            <p>
                                <Link to ="/resetpwd" ><Changer inp="Forgot Password?" /></Link>
                            </p>
                        </div>
                    <button className="btn btn-dark" type="submit">
                    <Changer inp="User Login" />
                    </button>
                </form>
            </div>
            <div className="login-register">
                <p className="register-link">
                    <Link to ="/register" ><Changer inp="Create Account" /></Link>
                </p>
            </div>
        </div>
    );
}

export {Login}
