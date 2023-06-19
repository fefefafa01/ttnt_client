import { RegValid } from './Validation';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { React, useState } from 'react';
import { Changer } from './LanguageChange'


function Register () {
    var [fname, setFname] = useState('');
    const[password, setPassword] = useState("");
    const[confpassword, confsetPassword] = useState("");
    const[visible, setVisible] = useState(false);
    const[confvisible, confsetVisible] = useState(false);
    const [vad, setVad] = useState(true)
    const [Nvad, NsetVad] = useState(false)
    const togglevalid = () => {
        if (fname==='') alert('First Name Must Not Be Empty')
        setVad(!vad)
        NsetVad(!Nvad)
     }
    const confirmName = (e) => {
        setFname(e)
    }

    return (
    <> { vad &&
    <div className="col-xs-9 col-md-7 col-lg-3 wrapper">
        <div className="form-box login">
            <h2><Changer inp = 'Create New Account'/></h2>
            <form action="#">
                <div className="input-box">
                    <input type="email" id='emailadr' placeholder='Email Address' required />
                </div>
                <div>
                    <input className="name-box name-left" type="text" id='fname' placeholder='First Name' onChange={togglevalid} required />
                    <input className="name-box name-right" type="text" id='lname' placeholder='Last Name' required />
                </div>
                <div className="input-box">
                    <input  value={password}
                            id='pwd'
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
                            id='confpwd'
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

export {Register};