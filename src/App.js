import MainPage from "./mainClient/mainpage/MainPage";
import Homepage from "mainClient/homepage/Homepage";
import React, { Component } from 'react';
import './i18n'
import './App.css';
import { Views } from 'components/Views';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Views />
            </div>
        );
    }
}

export default App;
