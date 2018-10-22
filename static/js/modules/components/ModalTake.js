import React, { Component } from 'react';
import { Modal, Button, Form, FormControl, Col, FormGroup, ControlLabel } from 'react-bootstrap';

class ModalTake extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      form: {},
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.handleTake = this.handleTake.bind(this);
  }

  close() {
    this.setState({ showModal: false, form: {} });
    setTimeout(() => {
      document.querySelector('#Rfid').value = '';
      document.querySelector('#Rfid').focus();
    }, 200);
  }

  open(props) {
    this.setState({
      showModal: true,
      form: props,
    });

    document.querySelector('#Cell').focus();
  }

  handleTake(e) {
    e.preventDefault();
    const form = this.state.form;
    form.Cell = document.querySelector('#Cell').value;

    fetch('/log/add', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
    .then(response => response.json())
    .then(res => {
      if (res.hasOwnProperty('ok') && res.ok > 0) {
        alert('All ok! Phone taken!');
        this.close();
      } else if (res.hasOwnProperty('error') && res.error === 'cell') {
        alert('This cell is already taken, select other one!');
      } else {
        alert('Some random error happened! Try again!');
      }
    })
    .catch(err => console.error('/log/add', err.toString()));
  }

  render() {
    return (
      <div className="static-modal">
        <Modal show={this.state.showModal}>
          <Modal.Header>
            <Modal.Title>Take phone from the customer 👍</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal onSubmit={this.handleTake}>
              <FormGroup>
                <Col sm={5} componentClass={ControlLabel}>Enter cell number:</Col>
                <Col sm={3}>
                  <FormControl
                    type="text"
                    name="Cell"
                    id="Cell"
                    placeholder="cell number"
                  />
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close} bsStyle="danger">Close</Button>
            <Button onClick={this.handleTake} bsStyle="success">Take the phone</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ModalTake;
