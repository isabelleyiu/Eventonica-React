import React, { Component } from 'react';

import EventfulForm from './EventfulForm';

class Eventful extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventful: []
    }
  }

  componentDidMount() {
    // const eventfulURL = 'http://api.eventful.com/json/events/search?';
    // const API_KEY = `app_key=${process.env.REACT_APP_WEATHER_API_KE}`;
    // const keyword = `keyword=${searchKeyword}&`;
    // const location = `location=${searchLocation}&`;

    // fetch(url + keyword + location + API_KEY)
    //   .then(data => data.json())
    //   .then(data => data.events.event)
  }



  render() {
    return (
      <EventfulForm />
    )
  }
}

export default Eventful;