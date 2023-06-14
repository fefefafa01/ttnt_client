//Link with UserHandler.js in ./server
import { Changer } from './LanguageChange';

function LoginValid () {
    return (
        1
    )
}

function RegValid () {
    return (
        <div className='col-xs-9 col-md-7 col-lg-3 wrapper'>
            <div className='form-box login'>
                <h2><Changer inp ='Create New Account' /></h2>
            </div>
            <div className = 'form-box valid-box'>
                <span className = 'border-box'>
                <p><Changer inp='Your account was successfully created!'/></p>
                <p><Changer inp='please log in'/></p>
                <button className="btn" type='submit'>
                <Changer inp = 'Go to Login' />
                </button>
                </span>
            </div>
        </div>
    )
}

function PwdValid () {
    return (
        1
    )
}

export {LoginValid, PwdValid, RegValid}