import React, { Component } from 'react';
import Event from './Event';
import './EventList.css';
import EventInput from './EventInput'

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

  createEvent = (eventInput) => {
    fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventInput)
    })
    .then(res => res.json())
    .then(newEvent => {
      this.setState({events: [...this.state.events, newEvent]})
    })
  }
    // editEvent = (event) => {
    //   fetch(`/api/events/${event.id}`, {
    //     method: 'PUT',
    //     header: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       title: event.title,
    //       start_time: event.start_time,
    //       venue_name: event.venue_name,
    //       venue_address: event.venue_address
    //     })
    //   })
    // }
  

  render() {
    const events = this.state.events.map(event => (
      <Event 
        key={event.id}
        {...event}
        deleteEvent={this.deleteEvent.bind(this, event.id)}
        // editEvent={this.editEvent.bind(this, event)}
      />
    ))
    return (
      <div>
        <h1>Eventonica</h1>
        <EventInput createEvent={this.createEvent}/>
        <p>Here are the events:</p>
        <div className="event-list">
          {events}
        </div>
      </div>
    )
  }
}

export default EventList