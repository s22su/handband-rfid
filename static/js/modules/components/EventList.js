import React, { Component } from 'react';
import EventListItem from './EventListItem';

class EventList extends Component {

  constructor(props) {
    super(props);
    this.state = { allEvents: [] };
  }

  componentDidMount() {
    this.loadEvents();
    setInterval(() => this.loadEvents(), 2000);
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

  render() {
    return (
      <div>
        <br />
        <hr />
        <br />
        <h2>Event list</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Filename</th>
              <th>N x M</th>
            </tr>
          </thead>
          <tbody>
            {this.state.allEvents.map(event => <EventListItem key={event.id} id={event.id} filename={event.filename} n={event.n} m={event.m} />)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default EventList;
