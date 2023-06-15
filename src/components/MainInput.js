import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { React, useState } from 'react';
import { Changer } from './LanguageChange'
import { RegValid } from './Validation';


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
    return (
    <> {hide &&
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
                    <input className="input-box name-box" type="text" placeholder='First Name' id='' required />
                    <input className="input-box name-box" type="text" placeholder='Last Name' required />
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
        <button onClick={togglevalid} className="btn" type='submit'>
            <Changer inp = "Create Account" />
        </button>
    </div>}
    {Nvad && <RegValid />}
    </>
    )
}

function ResetPwd(){
    const[confpassword, confsetPassword] = useState("");
    const[password, setPassword] = useState("");
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
        //setErrors(PwdValid(values));
    }
    const[visible, setVisible] = useState(false);
    const[confvisible, confsetVisible] = useState(false);
  return (
    <div className="wrapper">
        <div className="form-box">
            <h2><Changer inp='Reset Password' /></h2>
            <form action="">
                <div className="input-box">
                    <span className="icon"></span>
                    <input type="email" placeholder='Email Address' />
                </div>
                <div className="input-box">
                    <input value={password}
                        type={visible ? "text" : "password"} 
                        placeholder='Password' 
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    <div className="p-2" onClick={() => setVisible(!visible)}>
                        {visible ? <EyeOutlined className="eye"/> : <EyeInvisibleOutlined className="eye"/>}
                    </div>
                </div> 
                <div className="input-box">
                    <input value={confpassword}
                        type={confvisible ? "text" : "password"} 
                        placeholder='Confirm Password' 
                        onChange={(e) => confsetPassword(e.target.value)}
                        />
                    <div className="p-2" onClick={() => confsetVisible(!confvisible)}>
                        {confvisible ? <EyeOutlined className="eye"/> : <EyeInvisibleOutlined className="eye"/>}
                    </div>
                </div>
                    <button className="btn" type='submit'>
                    <Changer inp='Reset Password' />
                    </button>
                <p></p>
            </form>
            </div>
        </div>
  )
  };

export {Login, Register, ResetPwd}
