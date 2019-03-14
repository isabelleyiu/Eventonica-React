import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink, Route, Redirect } from 'react-router-dom';

import './EventList.css';
import Event from './Event';
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
    .then(events => this.setState({events: events}))
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

    return (
      <Container  style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
        <h1 style={{color: 'white'}}>Events</h1>
        <NavLink to="/events/form">Create New Event</NavLink>

        <Route path="/events/form" render={() => <EventForm  history={this.props.history} editEvent={this.editEvent} selectedEvent={this.state.selectedEvent} createEvent={this.createEvent} />} />
        {/* <EventForm editEvent={this.editEvent} selectedEvent={this.state.selectedEvent} createEvent={this.createEvent} /> */}

        <Route exact path="/events" render={() => <Redirect to="/events/all" />} />
        <Row className="event-list">
          <Route path="/events/all" render={() => events} />
        </Row> 
      </Container>
    )
  }
}

export default EventList