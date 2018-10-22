import React, { Component } from 'react';
import { Col, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

import ModalTake from './ModalTake';
import ModalGive from './ModalGive';

class ScanForm extends Component {
  constructor(props) {
    super(props);
    this.state = { allEvents: [] };
    this.handleScan = this.handleScan.bind(this);
  }

  componentDidMount() {
    this.loadEvents();
  }

  handleScan(e) {
    e.preventDefault();
    let form = {
      Rfid: document.querySelector('#Rfid').value,
      EventId: document.querySelector('#EventId').value,
    };

    this.checkRFID(form).then(response => {
      if (response.hasOwnProperty('not-found') && response['not-found']) {
        this.refs.takeModal.open(form);
      } else {
        form = response;
        this.refs.giveModal.open(form);
      }
    });
  }

  loadEvents() {
    fetch('/events/get')
      .then(response => response.json())
      .then(response => {
        const allEvents = [];
        response.forEach(v => {
          allEvents.push({ id: v.Id, filename: v.Filename, n: v.N, m: v.M });
        });
        return allEvents;
      })
      .then(data => this.setState({ allEvents: data }))
      .catch(err => console.error('/events/get', err.toString()));
  }

  checkRFID(form) {
    return fetch('/log/find-rfid', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
    .then(response => response.json())
    .catch(err => console.error('/events/add', err.toString()));
  }

  render() {
    return (
      <div>
        <Form horizontal onSubmit={this.handleScan}>

          <FormGroup controlId="formControlsText">
            <Col componentClass={ControlLabel} sm={2}>
              Event:
            </Col>
            <Col sm={8}>
              <FormControl name="EventId" id="EventId" componentClass="select">
                {this.state.allEvents.map(event => <option key={event.id} value={event.id}>{event.filename} (id = {event.id})</option>)}
              </FormControl>
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsText">
            <Col componentClass={ControlLabel} sm={2}>
              Scan RFID tag:
            </Col>
            <Col sm={8}>
              <FormControl
                type="text"
                name="Rfid"
                id="Rfid"
                placeholder="RFID tag here"
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button bsStyle="success" type="button" id="scanButton" onClick={this.handleScan}>
                Scan now!
              </Button>
            </Col>
          </FormGroup>
        </Form>

        <ModalTake show="false" ref="takeModal" />
        <ModalGive show="false" ref="giveModal" />
      </div>
    );
  }
}

export default ScanForm;
