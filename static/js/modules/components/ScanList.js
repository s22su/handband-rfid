import React, { Component } from 'react';
import ScanListItem from './ScanListItem';

class ScanList extends Component {

  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  componentDidMount() {
    document.querySelector('#Rfid').focus();
    this.loadItems();
    setInterval(() => this.loadItems(), 1000);
  }

  loadItems() {
    const form = {
      EventId: document.querySelector('#EventId').value,
      Rfid: document.querySelector('#Rfid').value,
    };

    console.log('asd');

    fetch('/log/get', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then(response => response.json())
      .then(data => this.setState({ items: data }))
      .catch(err => console.error('/items/get', err.toString()));
  }

  render() {
    return (
      <div>
        <br />
        <hr />
        <br />
        <h2>Items list</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>RFID tag</th>
              <th>Cell number</th>
              <th>Time taken</th>
              <th>Time given back</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.items.map(item => <ScanListItem key={item.Id} id={item.Id} rfid={item.Rfid} time_given={item.TimeGiven} time_taken={item.TimeTaken} cell={item.Cell} />)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ScanList;
