import React, { Component } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import moment from 'moment';

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

  componentDidUpdate (prevProps) {
    if(prevProps.selectedEvent !== this.props.selectedEvent) {
        const time = moment(this.props.selectedEvent.start_time).local();
        this.setState({
          id: this.props.selectedEvent.id,
          title: this.props.selectedEvent.title,
          date: time.format("YYYY-MM-DD"),
          time: time.format("hh:mm a"),
          venue_name: this.props.selectedEvent.venue_name,
          venue_address: this.props.selectedEvent.venue_address
        })
    } 
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
      this.props.createEvent(inputEvent);
    }
      this.setState({
        title: '',
        date: '',
        time: '',
        venue_name: '',
        venue_address: ''
      })
  }

  render() {
    const {title, date, time, venue_name, venue_address} = this.state;
    return (
      // <div className="event-form">
      //   <Form>
      //     <h2>Create New Event</h2>
      //     <label>EVENT</label>
      //     <input type="text" placeholder="Learn React" name="title" value={title} onChange={this.handleChange}></input>
      //     <label>DATE</label>
      //     <input type="text" placeholder="YYYY-MM-DD" name="date" value={date} onChange={this.handleChange}></input>
      //     <label>TIME</label>
      //     <input type="text" placeholder="06:30 pm" name="time" value={time} onChange={this.handleChange}></input>
      //     <label>VENUE</label>
      //     <input type="text" placeholder="Techtonica" name="venue_name" value={venue_name} onChange={this.handleChange}></input>
      //     <label>ADDRESS</label>
      //     <input type="text" placeholder="201 Mission Street" name="venue_address" value={venue_address} onChange={this.handleChange}></input>
      //     <button onClick={this.handleSubmit}>Submit</button>
      //   </Form>
      // </div>
      <Form >
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

        <Button variant="warning" type="submit" onClick={this.handleSubmit}>
          Submit
        </Button>
      </Form>
    )
  }
}
 
export default EventForm