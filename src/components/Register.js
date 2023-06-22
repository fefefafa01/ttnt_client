import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { React, useState, useEffect, useContext } from 'react';
import { Changer } from './LanguageChange'
import { Link } from 'react-router-dom';
import {AccountContext} from './Login.comps/AccountContext';

const Validate = (values) =>{
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

    if (!values.confpassword) {
        errors.confpassword = "Password is required";
    }
    else if (values.confpassword.length < 4) {
        errors.confpassword = "Password must be more than 4 characters";
    }
    else if (values.confpassword !== values.password) {
        errors.confpassword = "Password must be the same";
    }
  //   } else if (values.password.length > 10) {
  //     errors.password = "Password cannot exceed more than 10 characters";
  //   }

    if (!values.last_name) {
        errors.last_name = "Last Name is required";
    }
    if (!values.first_name) {
        errors.first_name = "First Name is required";
    } 
    return errors;
};

function Register() {
    const { setUser } = useContext(AccountContext) || {};
    const [error, setError] = useState(null);
    const [password, setPassword] = useState("");
    const [confpassword, confsetPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [confvisible, confsetVisible] = useState(false);
    const [vad, setVad] = useState(true);
    const [Nvad, NsetVad] = useState(false);
    const initialValues = {email:"", password:"", confpassword:"", first_name:"", last_name:""};
    const [formValues, setFormvalues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormvalues({...formValues, [name]: value});
        setPassword(e.target.value);
        confsetPassword(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(Validate(formValues));
        setIsSubmit(true);
        console.log(formValues);
        fetch("http://localhost:5000/auth/reg", {
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
            if (data.status) {
                setError(data.status);
            }
        })
        if (Object.keys(formErrors).length === 0 && isSubmit) {
              setVad(!vad);
              NsetVad(!Nvad);
        };
    }
    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors]);

    return (
        <>
            {vad && (
                <div className="col-xs-9 col-md-7 col-lg-3 wrapper">
                    <div className="form-box login">
                        <h2>
                            <Changer inp="Create New Account" />
                        </h2>
                    <form action="#" onSubmit={handleSubmit}>
                        <div className="input-box">
                            <input type="text" 
                            name="email" 
                            placeholder="Email Address" 
                            value={formValues.email} 
                            onChange={handleChange}
                            />
                        </div>
                    <div className="error"><span>{formErrors.email}</span></div>
                        <div>
                            <input  name="first_name"
                            value={formValues.first_name}
                            className="name-box name-left"
                            type="text"
                            placeholder="First Name"
                            onChange={handleChange}
                            />
                            <input  name="last_name"
                            value={formValues.last_name}
                            className="name-box name-right"
                            type="text"
                            placeholder="Last Name"
                            onChange={handleChange}
                            />
                        </div>
                        <div>
                            <span className="error_first_name">{formErrors.first_name}</span>
                            <span className="error_last_name">{formErrors.last_name}</span>
                        </div>
                        <div className="input-box">
                            <input  name="password"
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
                                    )
                                }
                            </div>
                        </div>
                        <div className="error">
                            <span>{formErrors.password}</span>
                        </div>
                        <div className="input-box">
                            <input  name="confpassword"
                            value={formValues.confpassword}
                            type={confvisible ? "text" : "password"}
                            placeholder="Confirm Password"
                            onChange={handleChange} 
                            />
                            <div className="p-2" onClick={() => confsetVisible(!confvisible)}>
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
                        <button className="btn btn-dark regbtn" type="submit">
                            <Changer inp="Create Account" />
                        </button>
                    </form>
                </div>    
            </div>
            )}
            {!vad && (
                <div className='col-xs-9 col-md-7 col-lg-3 wrapper'>
                <div className='form-box login'>
                    <h2><Changer inp ='Create New Account' /></h2>
                </div>
                <div className = 'form-box valid-box'>
                    <span className = 'border-box'>
                        <p><Changer inp='Your account was successfully created!'/></p>
                        <p><Changer inp='please log in'/></p>
                        <button className="btn" type='submit'>
                            <Link className="back_login" to ="/login"><Changer inp = 'Go to Login' /></Link>
                        </button>
                    </span>
                </div>
            </div>
            )}
        </>
    )
}
  

export {Register};