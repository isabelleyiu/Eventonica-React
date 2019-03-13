import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';


import Header from './Header';
import Home from './Home';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <body>
          <div className="App">
            <Header />
            <Route exact path="/" component={Home} />
           
          </div>
        </body>
      </BrowserRouter>
    );
  }
}

export default App;
