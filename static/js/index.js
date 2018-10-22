import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import { render } from 'react-dom';
import App from './modules/App';
import Sidebar from './modules/Sidebar';
import Scan from './modules/Scan';
import Settings from './modules/Settings';

render((
  <Router history={hashHistory}>
    <Route path="*" component={Sidebar} />
  </Router>
), document.getElementById('sidebar'));

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/settings" component={Settings} />
      <Route path="/scan" component={Scan} />
    </Route>
  </Router>
), document.getElementById('contents'));
