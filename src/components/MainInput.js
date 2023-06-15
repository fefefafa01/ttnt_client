import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { React, useState } from "react";
import { LoginValid, PwdValid } from "./Validation";
import { Link, Routes, Route } from "react-router-dom";

function Login() {
  const [login, setlogin] = useState(true);
  const toggleModal1 = () => {
    setlogin(!login);
    console.log(login);
  };

  const [resetPwd, setPwd] = useState(false);
  const toggleModal2 = () => {
    setPwd(!resetPwd);
    console.log(resetPwd);
  };

  const [signup, setsignup] = useState(false);
  const toggleModal3 = () => {
    setsignup(!signup);
    console.log(signup);
  };

  return (
    <>
      {login && (
        <div className="wrapper">
          <div className="form-box">
            <h2>Login</h2>
            <form action="">
              <div className="input-box">
                <input type="email" placeholder="Email Address"></input>
              </div>
              <div className="input-box">
                <input type="password" placeholder="Password"></input>
              </div>
              <div className="remember-forgot">
                <label htmlFor="">
                  <input type={"checkbox"} />
                  Remember
                </label>
                <label htmlFor="">
                  <div onClick={toggleModal1} className="register-link">
                    <div onClick={toggleModal2} className="register-link">
                      Forgot Password?
                    </div>
                  </div>
                </label>
              </div>
              <button className="btn" type="submit">
                Login
              </button>
              <div className="login-register" onClick={toggleModal1}>
                <div onClick={toggleModal3} className="register-link">
                  Create Account
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {resetPwd && <ResetPwd />}
      {signup && <Register />}
    </>
  );
}

function Register() {
  return 1;
}

function ResetPwd() {
  const [hide, sethide] = useState(true);
  const toggleModal1 = () => {
    sethide(!hide);
  };

  const [show, setshow] = useState(false);
  const toggleModal2 = () => {
    setshow(!show);
  };

  const [login, setlogin] = useState(false);
  const toggleModal3 = () => {
    setlogin(!login);
  };

  return (
    <>
      {hide && (
        <div className="wrapper">
          <div className="form-box">
            <h2>Reset Password</h2>
            <form action="">
              <div className="input-box">
                <span className="icon"></span>
                <input type="email" placeholder="Email Address" />
              </div>
              <div className="input-box">
                <span className="icon"></span>
                <input type="password" placeholder="Password" />
              </div>
              <div className="input-box">
                <span className="icon"></span>
                <input type="confirm" placeholder="Confirm New Password" />
              </div>
              <button className="btn" onClick={toggleModal1}>
                <div onClick={toggleModal2} className="register-link">
                  Reset Password
                </div>
              </button>
              <p></p>
            </form>
          </div>
        </div>
      )}

      {show && (
        <div className="wrapper">
          <div className="form-box">
            <h2>Reset Password</h2>
            <div className="form-box valid-box">
              <span className="border-box">
                <p>Your password was successfully reset!</p>
                <p>please log in</p>
                <button onClick={toggleModal2} className="btn">
                  <div onClick={toggleModal3} className="register-link">
                    Go to Login
                  </div>
                </button>
              </span>
            </div>
          </div>
        </div>
      )}
      {login && <Login />}
    </>
  );
}

export { Login, Register, ResetPwd };
