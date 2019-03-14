import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';

class EventfulEvent extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const {id, url, city_name, start_time, description, title, venue_address, venue_name} = this.props;
    // const imageURL = this.props.image.medium.url;
    return (
      <Card bg="light" style={{ width: '18rem', margin: '10px 10px' }}>
        <Card.Img variant="top" src='' />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{start_time}</Card.Text>
          <Card.Text>{venue_name}</Card.Text>
          <Card.Text>{venue_address}</Card.Text>
          <Card.Text>{city_name}</Card.Text>
          <Button variant="primary">More Info</Button>
        </Card.Body>
      </Card>
    )
  }
}

export default EventfulEvent;