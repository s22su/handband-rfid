import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default React.createClass({
  render() {
    return (
      <Nav bsStyle="pills" stacked>
        <LinkContainer to={{ pathname: '/' }}>
          <NavItem><span className="glyphicon glyphicon-home" aria-hidden="true"></span> Home</NavItem>
        </LinkContainer>
        <LinkContainer to={{ pathname: '/scan' }}>
          <NavItem><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Scan</NavItem>
        </LinkContainer>
        <LinkContainer to={{ pathname: '/settings' }}>
          <NavItem><span className="glyphicon glyphicon-cog" aria-hidden="true"></span> Settings</NavItem>
        </LinkContainer>
      </Nav>
    )
  }
})
