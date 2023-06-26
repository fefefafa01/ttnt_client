import {AdminHeader, StaffHeader} from '../../components/Header'
//import { Route, Routes } from 'react-router-dom';
import './Homepage.css'
//import { Changer } from '../../components/LanguageChange.js'

// import 'components/Epic2Filter'
// import './Homepage.css'

//Functions Aboves etc...

function HomePage () {
    return (
        <>
        <div>
            {/* <Routes>
                <Route path="/homepage/a" element={<HeaderType type='Admin'/>}/>
                <Route path="/homepage/u" element={<HeaderType type='' />}/>
                <Route path="/homepage" element={<HeaderType type='' />}/>
            </Routes> */}
            <AdminHeader />
        </div>
        <div>
            {/* <StaffHeader /> */}
        </div>
        </>
    )
}

export default HomePage;
