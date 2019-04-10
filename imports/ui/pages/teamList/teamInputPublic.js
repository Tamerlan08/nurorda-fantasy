import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Table } from 'react-bootstrap';
import { Button , Grid, Row, Col, Clearfix} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Teams } from '../../../api/teams.js';
import TeamPublic from '../../components/TeamPublic/TeamPublic.js';
import Navigation from '../../components/Navigation/Navigation';

 class teamInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    }
  };

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const teamName = ReactDOM.findDOMNode(this.refs.TeamName).value.trim();
    const teamLeader = ReactDOM.findDOMNode(this.refs.TeamLeader).value.trim();

    Meteor.call('teams.insert', teamName, teamLeader);

    // Clear form
 ReactDOM.findDOMNode(this.refs.TeamName).value = '';
 ReactDOM.findDOMNode(this.refs.TeamLeader).value= '';

}

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderTeams() {
    let filteredTeams = this.props.teams;
    if (this.state.hideCompleted) {
      filteredTeams = filteredTeams.filter(team => !TeamPublic.checked);
    }
    return filteredTeams.map((team) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = team.owner === currentUserId;

      return (
        <TeamPublic
          key={team._id}
          team={team}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <Table bordered condensed>
          <thead>
            <tr>
              <td><strong>Team Name</strong></td>
              <td><strong>Team Leader</strong></td>
              <td><strong>Team Score</strong></td>
            </tr>
          </thead>
          <tbody>
              {this.renderTeams()}
          </tbody>
        </Table>
      </div>

    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('teams');
  return {
    teams: Teams.find({}, {sort: {score: -1 }}).fetch(),
    incompleteCount: Teams.find({ checked: { $ne: false } }).count(),
    currentUser: Meteor.user(),
  };

})(teamInput);
