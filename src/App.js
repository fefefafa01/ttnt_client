import React, { Component } from 'react';
import './i18n'
import './App.css';
import { AppRender } from 'components/LanguageOption'
import { Changer } from 'components/LanguageChange'
import './mainClient/mainpage/MainPage'
import MainPage from './mainClient/mainpage/MainPage';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

callAPI() {
    fetch("http://localhost:5000/testconnection")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
}

componentDidMount() {
    this.callAPI();
}

  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <MainPage />
        <h1><Changer inp='welcome' /></h1>
        <p><Changer inp='selection'></Changer></p>
        <AppRender></AppRender> {/* MultiLanguage */}
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
