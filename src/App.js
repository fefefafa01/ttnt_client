import React, { Component } from 'react';
import './i18n'
import './App.css';
import { AppRender } from 'components/LanguageOption'
import { Changer } from 'components/LanguageChange'
import './mainClient/mainpage/MainPage'
import MainPage from './mainClient/mainpage/MainPage';

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
      <div className="App">
        <MainPage />
        <AppRender></AppRender> {/* MultiLanguage */}
      </div>
    );
  }
}

export default App;
