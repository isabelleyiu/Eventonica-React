import React, { Component } from 'react';
import Event from './Event';
import { Container, Row, Col } from 'react-bootstrap';
import './EventList.css';
import EventForm from './EventForm';

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
    .catch(err => console.log(err => console.log(err.stack)))
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
    this.setState({selectedEvent: event});
  } 

  editEvent = (eventInput) => {
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
      this.setState({events});
      
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
      <Col align="center" sm={12} md={12} lg={6} xl={4}>
      <Event 
        key={event.id}
        {...event}
        deleteEvent={this.deleteEvent.bind(this, event.id)}
        selectedEvent={this.selectedEvent.bind(this, event)}
      /></Col>
    ))
    // console.log(this.state);
    return (
      <Container  style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
        <h1 style={{color: 'white'}}>Eventonica</h1>
        <EventForm editEvent={this.editEvent} selectedEvent={this.state.selectedEvent} createEvent={this.createEvent} />
        {/* <h2>Here are the events:</h2> */}
        <Row className="event-list">
          {events}
        </Row>
      </Container>
    )
  }
}

export default EventList