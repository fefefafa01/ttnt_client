import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { React, useState } from 'react';
import { Changer } from './LanguageChange'
import { Register } from './Register';
import {ResetPwd} from './ResetPwd'

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
        //setErrors(validation(values));
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



export {Login}
