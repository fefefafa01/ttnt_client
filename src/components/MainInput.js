import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { React, useState } from 'react';
import { Changer } from './LanguageChange'
import { RegValid, LoginValid, PwdValid } from "./Validation";

function validation(values){
  let error = {}
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

  if(values.email === "") {
     error.email = "Email should not be empty"
  }
  else if (!email_pattern.test(values.email)) {
     error.email = "Invalid email address"
  }
  else {
     error.email = ""
  }

  if(values.password === "") {
     error.password = "Password should not be empty"
  }
  else if(!password_pattern.test(values.password)) {
     error.password = "Incorrect email or password"
  }
  else {
     error.password = ""
  }
  return error;
}


function Login () {
  const [hide, sethide] = useState(true)
  const [appear, setappear] = useState(false)
  const [Aappear, setAappear] = useState(false)
  const toggleModal = () => {
  sethide(!hide)
  console.log(hide)
  setappear(!appear)
  }

  const toggleAModal = () => {
  sethide(!hide)
  console.log(hide)
  setAappear(!Aappear)
  }

  const[password, setPassword] = useState("");
  const[visible, setVisible] = useState(false);

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
      setErrors(validation(values));
  }

  return (
  <> {hide &&
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
          <p onClick={toggleAModal}><Changer inp = 'Forgot Password?' /></p>
      </div>  
      <button className="btn" type='submit'>
          <Changer inp = 'User Login' />
      </button>
      <div className="login-register">
          <p onClick={toggleModal} className="register-link"><Changer inp ='Create Account' /></p>
      </div>
  </div>}
  { appear && <Register /> }
  { Aappear && <ResetPwd />}
  </>
  )
}


function Register () {
  const[password, setPassword] = useState("");
  const[confpassword, confsetPassword] = useState("");
  const[visible, setVisible] = useState(false);
  const[confvisible, confsetVisible] = useState(false);
  const [vad, setVad] = useState(true)
  const [Nvad, NsetVad] = useState(false)
  const togglevalid = () => {
      setVad(!vad)
      NsetVad(!Nvad)
   }

  return (
  <> { vad &&
  <div className="col-xs-9 col-md-7 col-lg-3 wrapper">
      <div className="form-box login">
          <h2><Changer inp = 'Create New Account'/></h2>
          <form action="#">
              <div className="input-box">
                  <input type="email" placeholder='Email Address' required />
              </div>
              <div>
                  <input className="name-box name-left" type="text" placeholder='First Name' id='' required />
                  <input className="name-box name-right" type="text" placeholder='Last Name' required />
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
              <div className="input-box">
                  <input  value={confpassword}
                          type={confvisible ? "text" : "password"} 
                          placeholder='Confirm Password' 
                          onChange={(e) => confsetPassword(e.target.value)}
                          required />
                  <div className="p-2" onClick={() => confsetVisible(!confvisible)}>
                      {confvisible ? <EyeOutlined className="eye"/> : <EyeInvisibleOutlined className="eye"/>}
                  </div>
              </div>
          </form>
      </div>
      <button onClick={togglevalid} className="btn regbtn" type='submit'>
          <Changer inp = "Create Account" />
      </button>
  </div>}
  {Nvad && <RegValid />}
  </>
  )
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

export {Login, Register, ResetPwd}