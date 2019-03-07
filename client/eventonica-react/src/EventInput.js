import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

class EventInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      start_time: '',
      venue_name: '',
      venue_address: ''
    }
  }

  componentDidUpdate (prevProps) {
    if(prevProps.selectedEvent !== this.props.selectedEvent) {
      this.setState({...this.props.selectedEvent})
    } 
  }
  // browser event as parameter
  // update this.state with form inputs
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // check if an event was passed with edit button
    if(this.props.selectedEvent) {
      this.props.editEvent({...this.state})
    } else {
      // passing form inputs over to EventList to make API call
      this.props.createEvent({...this.state});
    }
      this.setState ({
        title: '',
        start_time: '',
        venue_name: '',
        venue_address: ''
      })
  }

  render() {
    const {title, start_time, venue_name, venue_address} = this.state;
    return (
      <div>
        <form>
          <h2>Create New Event</h2>
          <label>Title</label>
          <input type="text" name="title" value={title} onChange={this.handleChange}></input>
          <label>Time</label>
          <input type="text" name="start_time" value={start_time} onChange={this.handleChange}></input>
          <label>Venue</label>
          <input type="text" name="venue_name" value={venue_name} onChange={this.handleChange}></input>
          <label>Address</label>
          <input type="text" name="venue_address" value={venue_address} onChange={this.handleChange}></input>
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
      // <Container>
      //   <Form onSubmit={this.handleSubmit}>
      //     <Form.Group controlId="formBasicEmail">
      //       <Form.Label>Title</Form.Label>
      //       <Form.Control  type="text" placeholder="Title of your event" />
      //     </Form.Group>

      //     <Form.Group controlId="formBasicPassword">
      //       <Form.Label>Time</Form.Label>
      //       <Form.Control type="text" placeholder="start time of your event" />
      //     </Form.Group>
      //     <Button variant="primary" type="submit">
      //       Submit
      //     </Button>
      //   </Form>
      // </Container>
      
    )
  }
}
 
export default EventInput