import React, { Component } from 'react';
import { Container, Button, Form  } from 'react-bootstrap';


class EventForm extends Component {
  render() {
    return (
      <Container>
          <h1>Eventonica</h1>
          <p>
            Find out what events are happening in your city!.
          </p>
          <Form>
            <Form.Group>
              <Form.Label>Event Category</Form.Label>
              <Form.Control type="text" placeholder="Dancing" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" placeholder="San Francisco" />
            </Form.Group>

            {/* <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>When</Form.Label>
              <Form.Control as="select">
                <option>Today</option>
                <option>This Week</option>
                <option>Next Week</option>
                <option>This Month</option>
              </Form.Control>
            </Form.Group> */}

            <Button variant="warning" type="submit">Search</Button>
          </Form>

    
      </Container>
      
    )
  }
}

export default EventForm;