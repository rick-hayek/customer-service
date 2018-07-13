import React, { Component } from 'react';

import logo from './img/logo.svg';
import './style/App.css';
import './style/chat-history.css';

import ServiceBoard from './scripts/customer-service';

class App extends Component {

  render() {
    return (
      <div className="">
        <header className="App App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h3 className="App-title">Customer Service</h3>
        </header>
        <div className="App-intro">
        </div>

        <ServiceBoard />
      </div>
    );
  }
}

export default App;

