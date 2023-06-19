import { Routes, Route } from "react-router-dom"
import MainPage from "mainClient/mainpage/MainPage"

const Views = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<MainPage type='Login'/>}/>
                <Route path='/register' element={<MainPage type='Register' />}/>
                <Route path='/resetpwd' element={<MainPage type='ResetPwd' />}/>
                <Route path='*' element={<MainPage type='Login'/>}/>
            </Routes>
        </div>
    )
}

export {Views}