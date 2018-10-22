import React, { Component } from 'react';
import Time from 'react-time';

class ScanListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    e.preventDefault();

    const delEvent = {
      Id: this.props.id
    };

    fetch('/log/delete', {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(delEvent),
    })
    .then(response => response.json())
    .catch(err => console.error('/events/add', err.toString()));
  }

  render() {
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.rfid}</td>
        <td>{this.props.cell}</td>
        <td><Time value={this.props.time_taken} format="HH:mm DD/MM/YYYY" /></td>
        <td><Time value={this.props.time_given} format="HH:mm DD/MM/YYYY" /></td>
        <td><a href="#delete" className="label label-danger" onClick={this.handleDelete}>Delete</a></td>
      </tr>
    );
  }
}

export default ScanListItem;
