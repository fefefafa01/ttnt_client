import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { React, useState } from 'react';
import { Changer } from './LanguageChange'

function Login () {
    const[password, setPassword] = useState("");
    const[visible, setVisible] = useState(false);
    return (
    <div className="col-xs-9 col-md-7 col-lg-3 wrapper">
        <div className="form-box login">
            <h2><Changer inp = 'Login' /></h2>
            <form action="#">
                <div className="input-box">
                    <input type="email" placeholder='Email Address' required />
                </div>
                <div className="input-box">
                    <input  value={password}
                            type={visible ? "text" : "password"} 
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                    <div className="p-2" onClick={() => setVisible(!visible)}>
                        {visible ? <EyeOutlined/> : <EyeInvisibleOutlined/>}
                    </div>
                </div>
            </form>
        </div>
        <div className="remember-forgot">
            <label htmlFor="">
                <input type={'checkbox'} />
                <Changer inp = 'Remember' />
            </label>
            <a href="#"><Changer inp = 'Forgot Password?' /></a>
        </div>  
        <button className="btn" type='submit'>
            <Changer inp = 'User Login' />
        </button>
        <div className="login-register">
            <p><a href="#" className="register-link"><Changer inp = 'Create Account' /></a></p>
        </div>
    </div>
    )
}

function Register () {
    const[password, setPassword] = useState("");
    const[confpassword, confsetPassword] = useState("");
    const[visible, setVisible] = useState(false);
    const[confvisible, confsetVisible] = useState(false);
    return (
    <div className="col-xs-9 col-md-7 col-lg-3 wrapper">
        <div className="form-box login">
            <h2><Changer inp = 'Create New Account'/></h2>
            <form action="#">
                <div className="input-box">
                    <input type="email" placeholder='Email Address' required />
                </div>
                <div>
                    <input className="input-box name-box" type="text" placeholder='First Name' required />
                    <input className="input-box name-box" type="text" placeholder='Last Name' required />
                </div>
                <div className="input-box">
                    <input  value={password}
                            type={visible ? "text" : "password"} 
                            placeholder='Password' 
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                    <div className="p-2" onClick={() => setVisible(!visible)}>
                        {visible ? <EyeOutlined/> : <EyeInvisibleOutlined/>}
                    </div>
                </div>
                <div className="input-box">
                    <input  value={confpassword}
                            type={confvisible ? "text" : "password"} 
                            placeholder='Confirm Password' 
                            onChange={(e) => confsetPassword(e.target.value)}
                            required />
                    <div className="p-2" onClick={() => confsetVisible(!confvisible)}>
                        {confvisible ? <EyeOutlined/> : <EyeInvisibleOutlined/>}
                    </div>
                </div>
            </form>
        </div>
        <button className="btn" type='submit'>
            <Changer inp = "Create Account" />
        </button>
    </div>
    )
}

function ResetPwd () {
    return (
        1
    )
}

export {Login, Register, ResetPwd}