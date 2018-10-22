import React, { Component } from 'react';

class EventList extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.filename}</td>
        <td>{this.props.n} x {this.props.m}</td>
      </tr>
    );
  }
}

export default EventList;
