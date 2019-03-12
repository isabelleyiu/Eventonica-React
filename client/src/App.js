import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';

class App extends Component {
  render() {
    return (
      <body>
        <div className="App">
          <EventList />
        </div>
      </body>
      
    );
  }
}

export default App;
