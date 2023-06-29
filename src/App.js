import React, { Component } from 'react';
import './i18n'
import './App.css';
import { Views } from 'components/Views';
import { changeLanguage } from 'i18next';
import { Specpdf } from 'components/SpecPDF';

class App extends Component {
    
    render() {
        if (!localStorage.lng || localStorage.lng==='EN') {
            localStorage.lng='EN';
            changeLanguage('en');
        } else if (localStorage.lng==='VI') {
            changeLanguage('vi');
        }
        return (
            <div className="App">
                <Specpdf />
            </div>
        );
    }
}

export default App;
