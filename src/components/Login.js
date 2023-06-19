import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { React, useState } from 'react';
import { Changer } from './LanguageChange'

function Login () {
    // const [hide, sethide] = useState(true)
    // const [appear, setappear] = useState(false)
    // const [Aappear, setAappear] = useState(false)
    // const toggleModal = () => {
    // sethide(!hide)
    // console.log(hide)
    // setappear(!appear)
    // }

    // const toggleAModal = () => {
    // sethide(!hide)
    // console.log(hide)
    // setAappear(!Aappear)
    // }

    const[password, setPassword] = useState("");
    const[visible, setVisible] = useState(false);

    // const [values, setValues] = useState({
    //     email: '',
    //     password:''
    // })
    //const [errors, setErrors] = useState({})
    const SubmitLogin = () => {
        //window.location.replace("http://localhost:3000/register")
        console.log('Submitted')
    }
    return (
        <form /*action="#" onSubmit={handleSubmit}*/>
        <div className="col-xs-9 col-md-7 col-lg-3 wrapper">
            <div className="form-box login">
                <h2><Changer inp = 'Login' /></h2>
                    <div className="input-box">
                        <input type="email" placeholder='Email Address' required/>
                        {/*errors.email && <span className = 'text-danger'> {errors.email}</span>*/}
                    </div>
                    <div className="input-box">
                        <input  value={password}
                                type={visible ? "text" : "password"} 
                                placeholder='Password'
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                />
                        <div className="p-2" onClick={() =>setVisible(!visible)}>
                            {visible ? <EyeOutlined className="eye"/> : <EyeInvisibleOutlined className="eye"/>}
                        </div>
                    </div>
            </div>
            <div className="remember-forgot">
                <label htmlFor="">
                    <input type={'checkbox'} />
                    <Changer inp = 'Remember' />
                </label>
                <p /*onClick={toggleAModal}*/><Changer inp = 'Forgot Password?' /></p>
            </div>
            <button className="btn" type='submit' onClick={SubmitLogin}>
                <Changer inp = 'User Login' />
            </button>
            <div className="login-register">
                <p /*onClick={toggleModal}*/ className="register-link"><Changer inp ='Create Account' /></p>
            </div>
        </div>
        </form>
    )
}



export {Login}
