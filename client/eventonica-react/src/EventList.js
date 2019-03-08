import React, { Component } from 'react';
import Event from './Event';
import './EventList.css';
import EventInput from './EventInput';

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

  selectedEvent = (event) => {
    this.setState({selectedEvent: event})
  } 

  editEvent = (eventInput) => {
    console.log(eventInput);
    fetch(`/api/events/${eventInput.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventInput)
    })
    .then(res => res.json())
    .then((newEvent) => {
      const events = this.state.events.map(event => {
        return (event.id === newEvent.id) ? newEvent : event;
      });
      this.setState({events, selectedEvent: null});
      
    })
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
        selectedEvent={this.selectedEvent.bind(this, event)}
      />
    ))
    return (
      <div>
        <h1>Eventonica</h1>
        <EventInput editEvent={this.editEvent} selectedEvent={this.state.selectedEvent} createEvent={this.createEvent} />
        <p>Here are the events:</p>
        <div className="event-list">
          {events}
        </div>
      </div>
    )
  }
}

export default EventList