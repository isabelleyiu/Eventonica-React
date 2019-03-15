import React, { Component } from 'react';

import EventfulForm from './EventfulForm';
import EventfulEvent from './EventfulEvent';
import { Container, Row, Col } from 'react-bootstrap';

class Eventful extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventful: [],
      loading: true
    }
  }

  componentDidMount() {
    this.searchEventful();
  }

  searchEventful = (searchCategory='music', searchLocation='San+Franscisco') => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const eventfulURL = 'https://api.eventful.com/json/events/search?';
    const category = `category=${searchCategory}&`;
    const location = `location=${searchLocation}&`;
    const API_KEY = `app_key=${process.env.REACT_APP_EVENTFUL_API_KEY}`;

    fetch(proxyurl + eventfulURL + category + location + API_KEY)
      .then(data => data.json())
      .then(eventful => {
        this.setState({
          eventful: eventful.events.event,
          loading: false
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
            {(this.state.loading)? <h1 style={{color: 'white', align:'center'}}>Loading...</h1> : eventful}
          </Row>
        </Container>
      </>
    )
  }
}

export default Eventful;