import React, { Component } from 'react';
import './App.css';
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
        <p className="App-intro">;{this.state.apiResponse}</p>
      </div>
    );
  }
}

export default App;
