import { Routes, Route } from "react-router-dom"
import MainPage from "mainClient/mainpage/MainPage"
import HomePage from "mainClient/homepage/Homepage"

const Views = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<MainPage />}/>
                <Route path='/register/*' element={<MainPage />}/>
                <Route path='/resetpwd/*' element={<MainPage />}/>
                <Route path='/login/*' element={<MainPage />}/>
                <Route path='*' element={<MainPage />}/>
                <Route path='/homepage' element={<HomePage />}/>
            </Routes>
        </div>
    )
}

export {Views}