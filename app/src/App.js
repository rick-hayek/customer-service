import React, { Component } from 'react';

import logo from './img/logo.svg';
import './style/App.css';
import './style/chat-history.css';
import './style/chat-menubar.css';

import ServiceBoard from './scripts/customer-service';

class App extends Component {

  render() {
    return (
      <div className="">
        <header className="App App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Client Service</h1>
        </header>
        <div className="App-intro">
        </div>

        <ServiceBoard />
      </div>
    );
  }
}

export default App;

