import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import AddEventForm from './components/AddEventForm';
import EventList from './components/EventList';

class Settings extends Component {
  render() {
    return (
      <div>
        <AddEventForm />
        <EventList />
      </div>
    );
  }
}

ReactDOM.render(
  <Settings />,
  document.getElementById('contents')
);

export default Settings;
