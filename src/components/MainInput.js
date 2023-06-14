import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { React, useState } from 'react';
import { LoginValid, PwdValid } from './Validation';
import { Link, Routes, Route } from 'react-router-dom';

function Login(){
    const [popupStyle, showPopup] = useState("hide")
    const popup = () => {
        showPopup("login-popup")
        setTimeout(() => showPopup("hide"), 3000)
    }
    
  return (
    <div className="wrapper">
        <div className="form-box">
            <h2>Login</h2>
            <form action="">
                <div className="input-box">
                    <span className="icon"></span>
                    <input type="email" placeholder='Email Address'></input>
                </div>
                <div className="input-box">
                    <span className="icon"></span>
                    <input type="password" placeholder='Password'></input>
                </div>
                <div className="remember-forgot">
                    <label htmlFor="">
                        <input type={'checkbox'} />
                            Remember 
                    </label>
                    <Routes>
                        <Route path='/resetPwd' element={<ResetPwd/>}></Route>
                    </Routes>
                    <label htmlFor="">
                        <Link to="/resetPwd" className="register-link">Forgot Password?</Link>
                    </label>    
                </div>  
                <button className="btn" type='submit' onClick={popup}>
                    Login
                </button>
                <div className={popupStyle}>
                    <h3>HIIIII</h3>
                </div>
                <Routes>
                        <Route path='/register' element={<Register/>}></Route>
                    </Routes>
                <div className="login-register">
                    <p><Link to="/register"  className="register-link">Create Account</Link></p>
                </div>
                </form>
        </div>
    </div>
  );
  };

function Register () {
    return (
        <div className="wrapper">
            <div className="form-box">
                <h2>Sign Up</h2>
                <form action="#">
                    <div className="input-box">
                        <span className="icon"></span>
                        <input type="email" placeholder='Email Address' required />
                    </div>
                    <div className="input-box">
                        <span className="icon"></span>
                        <input type="password" placeholder='Password' required />
                    </div>
                    <div className="remember-forgot">
                        <label htmlFor="">
                            <input type={'checkbox'} />
                                Remember 
                        </label>
                        Forgot Password?
                    </div>  
                    <button className="btn" type='submit'>
                        Login
                    </button>
                    <div className="login-register">
                        <p>abc</p>
                        
                    </div>
                    </form>
            </div>
        </div>
      );
    };

function ResetPwd(){
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
        setErrors(PwdValid(values));
    }

  return (
    <div className="wrapper">
        <div className="form-box">
            <h2>Reset Password</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className="input-box">
                    <span className="icon"></span>
                    <input type="email" placeholder='Email Address' 
                    onChange={handleInput} required />
                    {errors.email && <span className = 'text-danger'> {errors.email}</span>}
                </div>
                <div className="input-box">
                    <span className="icon"></span>
                    <input type="password" placeholder='Password' 
                    onChange={handleInput} required />
                    {errors.email && <span className = 'text-danger'> {errors.email}</span>}
                </div> 
                <div className="input-box">
                    <span className="icon"></span>
                    <input type="confirm password" placeholder='Confirm New Password' 
                    onChange={handleInput} required />
                    {errors.email && <span className = 'text-danger'> {errors.email}</span>}
                </div>
                    <button className="btn" type='submit'>
                        Reset Password
                    </button>
                <p></p>
            </form>
            </div>
        </div>
  )
  };

export {Login, Register, ResetPwd}