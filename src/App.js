import React, { Component } from 'react';
import './App.css';

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
          <h1 className="App-title">AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</h1>
        </header>
        <p className="App-intro">;{this.state.apiResponse}</p>
      </div>
    );
  }
}

export default App;
