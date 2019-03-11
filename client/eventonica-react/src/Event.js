import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
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
        <h4>Time: {start_time}</h4>
        <h4>Venue: {venue_name}</h4>
        <h4>Address: {venue_address}</h4>
        <Button variant="outline-danger" onClick={selectedEvent}>EDIT</Button> 
        <Button variant="outline-danger" onClick={deleteEvent}>DELETE</Button> 
      </div>
    )
  }
}

export default Event