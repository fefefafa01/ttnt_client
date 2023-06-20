import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Changer } from './LanguageChange'

const validate = (values) =>{
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!values.email){
        errors.email = "Email is required";
    }
    else if (!regex.test(values.email)) {
        errors.email = "This is not a valid email format!";
    }

    if (!values.password) {
        errors.password = "Password is required";}
    else if (values.password.length < 4) {
        errors.password = "Password must be more than 4 characters";}
    //   } else if (values.password.length > 10) {
    //     errors.password = "Password cannot exceed more than 10 characters";
    //   }
    return errors;
};

function Login() {
  const [hide, sethide] = useState(true);
  const [appear, setappear] = useState(false);
  const [Aappear, setAappear] = useState(false);
  const toggleModal = () => {
    sethide(!hide);
    console.log(hide);
    setappear(!appear);
  };

  const toggleAModal = () => {
    sethide(!hide);
    console.log(hide);
    setAappear(!Aappear);
  };

//   const [pass, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const initialValues = {email:"", password:""};
    const [formValues, setFormvalues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (localStorage.checkbox && localStorage.username !== "") {
            setIsChecked(true);
          setFormvalues({
            email: localStorage.email,
            password: localStorage.password,
          });
        }
        else if(!localStorage.checkbox){
            setIsChecked(false);
            localStorage.delete();
        }
        console.log(isChecked);
      }, []);

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormvalues({...formValues, [name]: value});
        // setPassword(e.target.value);
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    const handleCheck = (e) =>{
        setIsChecked(e.target.checked);
        console.log(isChecked);
    }

    const loginSubmit = () => {
        if (isChecked && formValues.email !== "") {
          localStorage.email = formValues.email;
          localStorage.password = formValues.password
          localStorage.checkbox = isChecked;
        }
        // here call the API to signup/login
        else if(!isChecked){
            localStorage.email = "";
            localStorage.password = "";
            localStorage.checkbox = isChecked;
        }
    };

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
          console.log(formValues);
        }
    }, [formErrors]);

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
                            <input type={"checkbox"} checked={isChecked} name='IsRememberMe' onChange={handleCheck} />
                            <Changer inp="Remember" />
                        </label>
                        <p onClick={toggleAModal}>
                            <Link to ="/resetpwd/*" ><Changer inp="Forgot Password" /></Link>
                        </p>
                    </div>
                <button className="btn btn-dark" type="submit" onClick={loginSubmit}>
                    <Changer inp="User Login" />
                </button>
            </form>
          </div>
          <div className="login-register">
            <p className="register-link">
                <Link to ="/register/*"><Changer inp="Create Account" /></Link>
            </p>
          </div>
        </div>
  );
}

export {Login}
