import React, { Component } from 'react';
import './i18n'
import './App.css';
import MainPage from './mainClient/mainpage/MainPage';
import {Views} from './components/Views'

function App() {
  
//   constructor(props) {
//     super(props);
//     this.state = { apiResponse: "" };
//   }

// callAPI() {
//     fetch("http://localhost:5000/testconnection")
//         .then(res => res.text())
//         .then(res => this.setState({ apiResponse: res }));
// }

// componentDidMount() {
//     this.callAPI();
// }

  return (
    <div className="App">
      <Views />
    </div>
  );
}

export default App;
