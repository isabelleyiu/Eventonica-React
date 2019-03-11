import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Moment from 'react-moment';
import './Event.css'

class Event extends Component {
  constructor(props){
    super(props);
  }
    
  render() {
    const {title, start_time, venue_name, venue_address, selectedEvent, deleteEvent} = this.props;

    return (
      <div className="event-card">
        <h3>{title}</h3>
        <h4>Date: <Moment format="dddd, MMMM Do">{start_time}</Moment></h4>
        <h4>Time: <Moment format="h:mma">{start_time}</Moment></h4>
        <h4>Venue: {venue_name}</h4>
        <h4>Address: {venue_address}</h4>
        <Button variant="outline-danger" onClick={selectedEvent}>EDIT</Button> 
        <Button variant="outline-danger" onClick={deleteEvent}>DELETE</Button> 
      </div>
    )
  }
}

export default Event