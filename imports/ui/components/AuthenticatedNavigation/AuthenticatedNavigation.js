import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';

const AuthenticatedNavigation = ({ name, history, userId }) => (
  <div>
    <Nav>

      {!Roles.userIsInRole(userId, 'admin') ?
      <LinkContainer to="/my-page">
        <NavItem eventKey={1} href="/my-page">My Page</NavItem>
      </LinkContainer> : ''}

      <LinkContainer to="/user-rating">
        <NavItem eventKey={1.1} href="/user-rating">Rating</NavItem>
      </LinkContainer>

      {!Roles.userIsInRole(userId, 'admin') ?
      <LinkContainer to="/teams">
        <NavItem eventKey={2} href="/teams">Teams</NavItem>
      </LinkContainer>:
      <LinkContainer to="/teams-admin">
        <NavItem eventKey={2.1} href="/teams-admin">Teams</NavItem>
      </LinkContainer>}

      {!Roles.userIsInRole(userId, 'admin') ?
      <LinkContainer to="/players">
        <NavItem eventKey={3} href="/players">Players</NavItem>
      </LinkContainer>:
      <LinkContainer to="/players-admin">
        <NavItem eventKey={3.1} href="/players-admin">Players</NavItem>
      </LinkContainer>}

      {!Roles.userIsInRole(userId, 'admin') ?
      <LinkContainer to="/matches">
        <NavItem eventKey={4} href="/matches">Matches</NavItem>
      </LinkContainer>:
      <LinkContainer to="/matches-admin">
        <NavItem eventKey={4.1} href="/matches-admin">Matches</NavItem>
      </LinkContainer>}

      {!Roles.userIsInRole(userId, 'admin') ?
      <LinkContainer to="/store">
        <NavItem eventKey={5} href="/store">Transfer Market</NavItem>
      </LinkContainer>:
      <LinkContainer to="/store">
        <NavItem eventKey={5.1} href="/store">Transfer Market</NavItem>
      </LinkContainer>}

      {!Roles.userIsInRole(userId, 'admin') ?
      <LinkContainer to="/myteam">
        <NavItem eventKey={6} href="/myteam">My Players</NavItem>
      </LinkContainer>:
      <LinkContainer to="/myteam-admin">
        <NavItem eventKey={6.1} href="/myteam-admin">My Players</NavItem>
      </LinkContainer>}
    </Nav>
    <Nav pullRight>
    {!Roles.userIsInRole(userId, 'admin') ?
      <NavDropdown eventKey={7} title={name} id="user-nav-dropdown">
        <LinkContainer to="/profile">
          <NavItem eventKey={7.1} href="/profile">Profile</NavItem>
        </LinkContainer>
        <MenuItem divider />
        <MenuItem eventKey={7.2} onClick={() => history.push('/logout')}>Logout</MenuItem>
      </NavDropdown> :
      <NavDropdown eventKey={7} title={name} id="user-nav-dropdown">
        <LinkContainer to="/profile">
          <NavItem eventKey={7.1} href="/profile">Profile</NavItem>
        </LinkContainer>
        <MenuItem divider />
        <LinkContainer exact to="/admin/users">
          <NavItem eventKey={6.1} href="/admin/users">Users</NavItem>
        </LinkContainer>
        <LinkContainer exact to="/admin/users/settings">
          <NavItem eventKey={6.2} href="/admin/users/settings">User Settings</NavItem>
        </LinkContainer>
        <MenuItem divider />
        <MenuItem eventKey={7.2} onClick={() => history.push('/logout')}>Logout</MenuItem>
      </NavDropdown> }
    </Nav>
  </div>
);

AuthenticatedNavigation.propTypes = {
  name: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(AuthenticatedNavigation);
