import React, { Component } from 'react';
import logo from './img/logo.svg';
import './style/App.css';
import './style/gameboard.css';
import Clock from './scripts/clock'

class App extends Component {
  render() {
    return (
      <div className="">
        <header className="App App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Greedy Snake</h1>
        </header>
        <div className="App-intro">
        Game Board
        </div>
        <div className="game-board">
          <span className="snake-header" />
          <Clock />
          <table></table>
        </div>
      </div>
    );
  }
}

export default App;

