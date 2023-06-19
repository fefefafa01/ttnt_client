import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { React, useState, useEffect } from 'react';
import { Changer } from './LanguageChange'

function Login () {
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

  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

    const [values, setValues] = useState({
        email: '',
        password:''
    })
    const [errors, setErrors] = useState({})
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.className]: [event.target.value]}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        //setErrors(validation(values));
    }

    const ToReg = () => {
        window.location.href='localhost:3000/Register'
    }

    return (
    <>
    <div className="col-xs-9 col-md-7 col-lg-3 wrapper">
        <div className="form-box login">
            <h2><Changer inp = 'Login' /></h2>
            <form action="#" onSubmit={handleSubmit}>
                <div className="input-box">
                    <input type="email" placeholder='Email Address' onChange={handleInput} />
                    {errors.email && <span className = 'text-danger'> {errors.email}</span>}
                </div>
                <div className="input-box">
                    <input  value={password}
                            type={visible ? "text" : "password"} 
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            />
                    <div className="p-2" onClick={() => setVisible(!visible)}>
                        {visible ? <EyeOutlined className="eye"/> : <EyeInvisibleOutlined className="eye"/>}
                    </div>
                </div>
            </form>
        </div>
        <div className="remember-forgot">
            <label htmlFor="">
                <input type={'checkbox'} />
                <Changer inp = 'Remember' />
            </label>
            <p /*onClick={toggleAModal}*/><Changer inp = 'Forgot Password?' /></p>
        </div>  
        <button className="btn" type='submit'>
            <Changer inp = 'User Login' />
        </button>
        <div className="login-register">
            <p onClick={ToReg} className="register-link"><Changer inp ='Create Account' /></p>
        </div>
    </div>
    </>
    )
}



export {Login}
