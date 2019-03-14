import React, { Component } from 'react';

import EventfulForm from './EventfulForm';
import EventfulEvent from './EventfulEvent';
import { Container, Row, Col } from 'react-bootstrap';

class Eventful extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventful: []
    }
  }

  componentDidMount() {
    this.searchEventful();
  }

  searchEventful = (searchKeyword='dancing', searchLocation='San Franscisco') => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const eventfulURL = 'https://api.eventful.com/json/events/search?total_items=4&';
    const keyword = `keyword=${searchKeyword}&`;
    const location = `location=${searchLocation}&`;
    const API_KEY = `app_key=${process.env.REACT_APP_EVENTFUL_API_KEY}`;

    fetch(proxyurl + eventfulURL + keyword + location + API_KEY)
      .then(data => data.json())
      .then(eventful => {
        this.setState({
          eventful: eventful.events.event
        })
      })
      .catch(err => console.log('Error', err));
  }

  render() {
    const eventful = this.state.eventful.map(event => (
      <Col align="center" sm={12} md={12} lg={6} xl={4}>
        <EventfulEvent 
          key={event.id}
          {...event}
        />
      </Col>
      
    ));

    return (
      <>
        <EventfulForm searchEventful={this.searchEventful}/>
        <Container style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
          <Row>
            {eventful}
          </Row>
        </Container>
      </>
    )
  }
}

export default Eventful;