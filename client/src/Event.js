import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import Moment from 'react-moment';
import { withRouter } from 'react-router-dom';
// import './Event.css'

class Event extends Component {
  constructor(props){
    super(props);
  }
    
  render() {
    const {title, start_time, venue_name, venue_address, selectedEvent, deleteEvent} = this.props;

    return (
      <Card bg="light" style={{ width: '18rem' ,margin: '10px 10px'}}>
        <Card.Header>Suggested Events</Card.Header>
        <Card.Body>
          <h3>{title}</h3>
          <Card.Text>
          <h6>Date: <Moment format="dddd, MMMM Do YYYY">{start_time}</Moment></h6>
          <h6>Time: <Moment format="h:mma">{start_time}</Moment></h6>
          <h6>Venue: {venue_name}</h6>
          <h6>Address: {venue_address}</h6>
          </Card.Text>
          <Button variant="outline-danger" onClick={selectedEvent} style={{marginRight: '5px'}}>EDIT</Button> 
          <Button variant="danger" onClick={deleteEvent}>DELETE</Button> 
        </Card.Body>
      </Card>
    )
  }
}

export default withRouter(Event);