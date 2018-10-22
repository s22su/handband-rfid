import React, { Component } from 'react';
import { Col, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

class AddEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleEventSubmit = this.handleEventSubmit.bind(this);
  }

  handleEventSubmit(e) {
    e.preventDefault();
    const newEvent = {
      Filename: document.querySelector('#Filename').value,
      N: document.querySelector('#N').value,
      M: document.querySelector('#M').value,
    };

    console.log(newEvent);

    fetch('/events/add', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    })
    .then(response => response.json())
    .catch(err => console.error('/events/add', err.toString()));
  }

  render() {
    return (
      <Form horizontal>
        <FormGroup controlId="formControlsText">
          <Col componentClass={ControlLabel} sm={2}>
            Filename:
          </Col>
          <Col sm={8}>
            <FormControl
              type="text"
              name="Filename"
              id="Filename"
              placeholder="no spaces, only a-z and underscore"
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="formControlsText">
          <Col componentClass={ControlLabel} sm={2}>
            N:
          </Col>
          <Col sm={8}>
            <FormControl
              type="text"
              name="N"
              id="N"
              placeholder="number"
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="formControlsText">
          <Col componentClass={ControlLabel} sm={2}>
            M:
          </Col>
          <Col sm={8}>
            <FormControl
              type="text"
              name="M"
              id="M"
              placeholder="number"
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="button" id="addEventButton" onClick={this.handleEventSubmit}>
              Add event
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default AddEventForm;
