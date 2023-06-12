import React, { Component } from 'react';
import './i18n'
import './App.css';
import { AppRender } from 'components/LanguageOption'
import { Changer } from 'components/LanguageChange'

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
        <header className="App-header">
          <h1><Changer inp='welcome' /></h1>
          <p><Changer inp='selection'></Changer></p>
          <AppRender></AppRender> {/* MultiLanguage */}
          <h1 className="App-title">AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</h1>
        </header>
        <p className="App-intro">;{this.state.apiResponse}</p>
      </div>
    );
  }
}

export default App;
