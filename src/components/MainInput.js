import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { React, useState } from 'react';

function Login () {
    const[password, setPassword] = useState("");
    const[visible, setVisible] = useState(false);
    return (
    <div className="col-xs-9 col-md-7 col-lg-3 wrapper">
        <div className="form-box login">
            <h2>Login</h2>
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
                        {visible ? <EyeOutlined className="eye"/> : <EyeInvisibleOutlined className="eye"/>}
                    </div>
                </div>
            </form>
        </div>
        <div className="remember-forgot">
            <label htmlFor="">
                <input type={'checkbox'} />
                Remember 
            </label>
            <a href="#">Forgot Password?</a>
        </div>  
        <button className="btn" type='submit'>
            User Login
        </button>
        <div className="login-register">
            <p><a href="#" className="register-link">Create Account</a></p>
        </div>
    </div>
    )
}

function Register () {
    return (
        1
    )
}

function ResetPwd () {
    return (
        1
    )
}

export {Login, Register, ResetPwd}