import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { React, useState } from 'react';
import { Changer } from './LanguageChange'

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

  export {ResetPwd}