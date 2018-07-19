import React, { Component } from 'react';
// import { Switch, Route } from 'react-router-dom';
import { Route } from 'react-router-dom';

import logo from './img/logo.svg';
import './style/App.css';
import './style/chat-history.css';

import ServiceBoard from './scripts/customer-service';
import ResponseDetail from './scripts/response-detail';
import UserCenter from './scripts/user-center';
import ShuttleDetail from './scripts/shuttles-detail';

class App extends Component {

  render() {
    return (
      <div className="">
        <header className="App App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h5 className="App-title">Customer Service</h5>
        </header>
        <div className="App-intro">
        </div>

        {/* <Switch> */}
          <Route exact path='/' component={ServiceBoard} />
          {/* <Route exact path='/' render={()=><ServiceBoard />} /> */}
          <Route path='/detail' component={ResponseDetail} />
          <Route path='/user' component={UserCenter} />
          <Route path='/shuttles' component={ShuttleDetail} />
        {/* </Switch> */}
      </div>
    );
  }
}

export default App;

