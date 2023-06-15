//Link with UserHandler.js in ./server
import { Changer } from './LanguageChange';
import MainPage from '../mainClient/mainpage/MainPage';
import { React, useState } from 'react';
import { Login } from './MainInput';


function LoginValid () {
    return (
        1
    )
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

function PwdValid () {
    const [hide, sethide] = useState(true)
    const [appear, setappear] = useState(false)
    const toggleModal = () => {
        sethide(!hide)
        console.log(hide)
        setappear(!appear)
     }
    return (
        <>{hide &&
        <div className='col-xs-9 col-md-7 col-lg-3 wrapper'>
            <div className='form-box login'>
                <h2><Changer inp ='Create New Account' /></h2>
            </div>
            <div className = 'form-box valid-box'>
                <span className = 'border-box'>
                <p><Changer inp='Your password was successfully reset!'/></p>
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

export {LoginValid, PwdValid, RegValid}