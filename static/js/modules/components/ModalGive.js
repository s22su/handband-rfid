import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class ModalGive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      form: {},
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.handleGive = this.handleGive.bind(this);
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
  }

  handleGive() {
    const form = this.state.form;

    fetch('/log/give', {
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
        alert('All ok! Phone can be given to customer!');
      } else if (res.hasOwnProperty('error') && res.error === 'error') {
        alert('Phone is already given away!' + res.error);
      } else {
        alert('Some error happened! Try again!');
      }
      this.close();
    })
    .catch(err => console.error('/log/add', err.toString()));
  }

  render() {
    return (
      <div className="static-modal">
        <Modal show={this.state.showModal}>
          <Modal.Header>
            <Modal.Title>Give phone back to the customer 👍</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ textAlign: 'center' }}>
              <h3><i>Phone is in cell number:</i></h3>
              <hr />
              <h1>{this.state.form.Cell}</h1>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close} bsStyle="danger">Close</Button>
            <Button onClick={this.handleGive} bsStyle="success">Yes, return the phone!</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ModalGive;
