import { Routes, Route } from "react-router-dom"
import MainPage from "mainClient/mainpage/MainPage"
import HomePage from "mainClient/homepage/Homepage"

const Views = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<MainPage />}/>
                {/* <Route path='*' element={<MainPage />}/> */}
                <Route path='/homepage' element={<HomePage />}/>
                <Route path='/homepage/a' element={<HomePage />}/>
                <Route path='/homepage/u' element={<HomePage />}/>
            </Routes>
        </div>
    )
}

export {Views}