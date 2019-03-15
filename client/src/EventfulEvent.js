import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';

class EventfulEvent extends Component {
  constructor(props){
    super(props);
  }

  render() {
    console.log(this.props)
    const {id, url, city_name, start_time, description, title, venue_address, venue_name} = this.props;
    const defaultImage = 'https://images.unsplash.com/photo-1549451371-64aa98a6f660?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';
    let imageURL = defaultImage;
    
    if(this.props.image){
      imageURL = this.props.image.medium.url
    }
   
    // const imageURL = this.props.image.medium.url || defaultImage;
    return (
      <Card bg="light" style={{ width: '18rem', margin: '10px 10px' }}>
        <Card.Img variant="top" src={imageURL} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{start_time}</Card.Text>
          <Card.Text>{venue_name}</Card.Text>
          <Card.Text>{venue_address}</Card.Text>
          <Card.Text>{city_name}</Card.Text>
          <Button variant="link"><a href={url} target="_blank">More Info</a></Button>
        </Card.Body>
      </Card>
    )
  }
}

export default EventfulEvent;