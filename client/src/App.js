import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Navbar} from './components'
import Test from './components/test'
import Routes from './routes'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Welcome to Chore Bunny</h1>
        </header>
        <p className="App-intro">
<img src='http://localhost:3000/bunny.png' />
        </p>

        <div>
          <Test />
      <Navbar />
      <Routes />
    </div>


      </div>
    );
  }
}

export default App;
