import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Table, DropdownButton } from 'react-bootstrap';
import { Button , Grid, Row, Col, Clearfix} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import TeamInput from './teamInput.js'
import { Teams } from '../../../api/teams.js';
import Team from '../../components/Team/Team.js';
import { Matchs } from '../../../api/matchs.js';
import Match from './MatchPublic.js';
import Navigation from '../../components/Navigation/Navigation';
import Select from 'react-select';

class MatchInputPublic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    }
  };
  renderMatchs() {
    let filteredMatchs = this.props.matchs;
    if (this.state.hideCompleted) {
      filteredMatchs = filteredMatchs.filter(match => !Match.checked);
    }
    return filteredMatchs.map((match) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = match.owner === currentUserId;

      return (
        <Match
          key={match._id}
          match={match}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }

  render() {

    return (
      <div>
        <p></p>
          <Table bordered condensed>
            <thead>
              <tr>
                <td><strong>Season</strong></td>
                <td><strong>Round</strong></td>
                <td><strong>team1/team2</strong></td>
              </tr>
            </thead>
            <tbody>
              {this.renderMatchs()}
            </tbody>
          </Table>
        <div className="hiddenContent">
        <TeamInput />
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('matchs')
  Meteor.subscribe('teams')
  return {
    matchs: Matchs.find({}, { sort: { createdAt: -1 } }).fetch(),
    teams: Teams.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Matchs.find({ checked: { $ne: false } }).count(),
    incompleteCount: Teams.find({ checked: { $ne: false } }).count(),
    currentUser: Meteor.user(),
  };

})(MatchInputPublic);
