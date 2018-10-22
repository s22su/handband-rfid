import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ScanForm from './components/ScanForm';
import ScanList from './components/ScanList';

class Scan extends Component {
  render() {
    return (
      <div>
        <ScanForm />
        <ScanList />
      </div>
    );
  }
}


ReactDOM.render(
  <Scan />,
  document.getElementById('contents')
);

export default Scan;
