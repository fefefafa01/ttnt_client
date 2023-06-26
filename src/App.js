import React, { Component } from "react";
import "./i18n";
import "./App.css";
import MainPage from "./mainClient/mainpage/MainPage";
import Homepage from "mainClient/homepage/Homepage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Homepage />
      </div>
    );
  }
}

export default App;
