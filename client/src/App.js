import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';


import Header from './Header';
import EventList from './EventList';
import Eventful from './Eventful'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <body>
          <div className="App">
            <Header />
            <Route exact path="/" component={Eventful} />
            <Route path="/events" component={EventList} />
            {/* <Route path="/eventful" component={Eventful} /> */}
          </div>
        </body>
      </BrowserRouter>
    );
  }
}

export default App;
