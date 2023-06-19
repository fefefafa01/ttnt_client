//Link with UserHandler.js in ./server
import { Changer } from './LanguageChange';
import { React, useState } from 'react';
import { Login } from './Login';


function LoginValid() {
  return 1;
}

function RegValid () {
    const [hide, sethide] = useState(true)
    const [appear, setappear] = useState(false)
    const toggleModal = () => {
        sethide(!hide)
        console.log(hide)
        setappear(!appear)
     }
    return (
        <> {hide &&
        <div className='col-xs-9 col-md-7 col-lg-3 wrapper'>
            <div className='form-box login'>
                <h2><Changer inp ='Create New Account' /></h2>
            </div>
            <div className = 'form-box valid-box'>
                <span className = 'border-box'>
                <p><Changer inp='Your account was successfully created!'/></p>
                <p><Changer inp='please log in'/></p>
                <button onClick={toggleModal} className="btn" type='submit'>
                <Changer inp = 'Go to Login' />
                </button>
                </span>
            </div>
        </div>}
        {appear && <Login />}
        </>
    )
}

function PwdValid (values) {
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
  if (values.email === "") {
    error.email = "Email should not be empty";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Invalid email address";
  } else {
    error.email = "";
  }

  if (values.password === "") {
    error.password = "Password should not be empty";
  } else if (!password_pattern.test(values.password)) {
    error.password = "Incorrect email or password";
  } else {
    error.password = "";
  }

  if (values.confirm === "") {
    error.confirm = "Please enter your password again";
  } else if (values.confirm !== values.password) {
    error.confirm = "Passwords must be same";
  } else {
    error.confirm = "";
  }
  return error;
}
export { LoginValid, PwdValid, RegValid };
