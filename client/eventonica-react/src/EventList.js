import React, { Component } from 'react';
import Event from './Event';

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    }
  }
  componentWillMount() {
    this.loadEvents()
  }

  loadEvents = () => {
    fetch('/api/events')
    .then(res => res.json())
    .then(events => this.setState({events}))
  }

  render() {
    const events = this.state.events.map(event => (
      <Event 
        key={event.id}
        {...event}
      />
    ))
    return (
      <div>
        <h1>Eventonica</h1>
        <p>Here are the events:</p>
        <ul>
          {events}
        </ul>
      </div>
    )
  }
}

export default EventList