import React, { Component } from 'react';
import './i18n'
import './App.css';
import { Views } from 'components/Views';
import Multi_Lang from 'components/Multi_Lang';
import { Changer } from 'components/LanguageChange';

class App extends Component {
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
    
    render() {
        return (
            <div className="App">
                {/* <Multi_Lang />
                <div><Changer inp='Login' /></div> */}
                <Views />
            </div>
        );
    }
}

export default App;
