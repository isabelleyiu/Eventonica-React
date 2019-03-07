import React, { Component } from 'react';
import Event from './Event';
import './EventList.css';

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

  deleteEvent = (id) => {
    fetch(`/api/events/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => {
      const events = this.state.events.filter(event => event.id !== id);
      this.setState({events});
    })
  }

  render() {
    const events = this.state.events.map(event => (
      <Event 
        key={event.id}
        {...event}
        deleteEvent={this.deleteEvent.bind(this, event.id)}
      />
    ))
    return (
      <div>
        <h1>Eventonica</h1>
        <p>Here are the events:</p>
        <div className="event-list">
          {events}
        </div>
      </div>
    )
  }
}

export default EventList