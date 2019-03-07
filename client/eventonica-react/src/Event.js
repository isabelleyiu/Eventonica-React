import React, { Component } from 'react';
import './Event.css'

class Event extends Component {
  constructor(props){
    super(props);
  }
    
  render() {
    const {title, start_time, venue_name, venue_address} = this.props
    return (
      <div className="event-card">
        <h3>{this.props.title}</h3>
        <h4>Time: {this.props.start_time}</h4>
        <h4>Venue: {this.props.venue_name}</h4>
        <h4>Address: {this.props.venue_address}</h4>
        <span onClick={this.props.deleteEvent}> X </span>
      </div>
    )
  }
}

export default Event