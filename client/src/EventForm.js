import React, { Component } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      date: '',
      time: '',
      venue_name: '',
      venue_address: ''
    }
  }

  static getDerivedStateFromProps(props, state){
    if(props.selectedEvent && !state.id) {
        let time = moment(props.selectedEvent.start_time).local();
        return {
          id: props.selectedEvent.id,
          title: props.selectedEvent.title,
          date: time.format("YYYY-MM-DD"),
          time: time.format("hh:mm a"),
          venue_name: props.selectedEvent.venue_name,
          venue_address: props.selectedEvent.venue_address
        };
    } 
    return null;
  }
  
  // browser event as parameter
  // update this.state with form inputs
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const eventISO8601Time = moment(`${this.state.date} ${this.state.time}` , "YYYY-MM-DD HH:mm a").format();

    const inputEvent = {
      id: this.state.id,
      title: this.state.title,
      start_time: eventISO8601Time,
      venue_name: this.state.venue_name,
      venue_address: this.state.venue_address
    }
    // check if an event was passed with edit button
    if(this.props.selectedEvent) {
      this.props.editEvent(inputEvent)
    } else {
      // passing form inputs over to EventList to make API call
      this.props.createEvent(inputEvent)
    }
    // empty form
    this.setState({
      title: '',
      date: '',
      time: '',
      venue_name: '',
      venue_address: ''
    })
    this.props.history.push('/events/all');
  }

  render() {
    const {title, date, time, venue_name, venue_address} = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label style={{color: 'white'}}>EVENT</Form.Label>
          <Form.Control type="text" placeholder="Learn React" name="title" value={title} onChange={this.handleChange} />
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label style={{color: 'white'}}>DATE</Form.Label>
            <Form.Control type="text" placeholder="YYYY-MM-DD"  name="date" value={date} onChange={this.handleChange} />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label style={{color: 'white'}}>TIME</Form.Label>
            <Form.Control type="text" placeholder="06:30 pm" name="time" value={time} onChange={this.handleChange} />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label style={{color: 'white'}}>VENUE</Form.Label>
            <Form.Control placeholder="Techtonica" name="venue_name" value={venue_name} onChange={this.handleChange} />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label style={{color: 'white'}}>Address</Form.Label>
            <Form.Control placeholder="1234 Main St" name="venue_address" value={venue_address} onChange={this.handleChange} />
          </Form.Group>
        </Form.Row>

        <Button variant="warning" type="submit">Submit</Button>
      </Form>
    )
  }
}
 
export default withRouter(EventForm)