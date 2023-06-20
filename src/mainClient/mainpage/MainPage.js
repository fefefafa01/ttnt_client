import {Login} from '../../components/Login'
import { Register } from 'components/Register'
import { ResetPwd } from 'components/ResetPwd'
import { Changer } from '../../components/LanguageChange.js'
import Multi_Lang from '../../components/Multi_Lang'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import './MainPage.css'
import { React} from 'react';
import { Route, Routes } from 'react-router-dom';

function MainPage () {
  return (
    <>
    <div className="header">
        <div className="col-2">
        <link href="//db.onlinewebfonts.com/c/11cd399ec653d4e156ce034b85c19cb7?family=VLNL+Decks" rel="stylesheet" type="text/css"/>
          <p className="logo">
            AISIN
          </p><br></br>
          <p className="col logotext">
            We Touch The Future
        </p>       
        </div>
        <div className="label col">
          <p className="label"><Changer inp = 'Welcome to AISIN Parts Support' /></p>
        </div>
        <Multi_Lang/>
    </div>
    <div className="body">
        <Routes>
        <Route path='/*' element={<Login/>}/>
        <Route path='/login/*' element={<Login/>}/>
        <Route path="/register/*" element={<Register/>}/> 
        <Route path="/resetpwd/*" element={<ResetPwd/>}/> 
        </Routes>      
        <div className="col-sm-12 col-md content">
          <p className="logo">
            AISIN
          </p><br></br>
          <p className="contenttext">
            AIMING FOR A BETTER FUTURE
          </p>
        </div>
        <div className="col body-img"></div>
      </div>
    </>
  );
}

export default MainPage;

