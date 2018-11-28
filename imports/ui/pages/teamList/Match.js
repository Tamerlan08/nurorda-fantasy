import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import classnames from 'classnames';
import { Button, Table } from 'react-bootstrap';

import { Matchs } from '../../../api/matchs.js';
import { Teams } from '../../../api/teams.js';
// Team component - represents a single todo item
class Match extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
      selectedOptionTeamOne: null,
      selectedOptionTeamTwo: null,
    }
  };

  deleteThisMatch() {
    Meteor.call('matchs.remove', this.props.match._id);
  }

  togglePrivateMatch() {
    Meteor.call('matchs.setPrivate', this.props.match._id, ! this.props.match.private);
  }

  handleSelectFirst(eventKey, event) {
    const teams = this.props.teams.map ((team) => team.teamName)
    this.setState({ selectedOptionTeamOne: teams[eventKey] });
  }

  handleSelectSecond(eventKey, event) {
    const teams = this.props.teams.map ((team) => team.teamName)
    this.setState({ selectedOptionTeamTwo: teams[eventKey] });
  }

  render() {

    const teamClassName = classnames({
      checked: this.props.match.checked,
      private: this.props.match.private,
    });

    const teams = this.props.teams.map ((team) => team.teamName)

    const {selectedOption} = this.state;

    return (
            <tr>
              <td>{this.props.match.season}</td>
              <td>{this.props.match.round}</td>
              <td>({this.props.match.teamOne}) <strong>{this.props.match.scoredOne}</strong> : <strong>{this.props.match.scoredTwo}</strong> ({this.props.match.teamTwo})</td>
              <td>
                <Button bsStyle="danger" className="delete" onClick={this.deleteThisMatch.bind(this)}>
                  &times;
                </Button>
              </td>
            </tr>
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
})(Match)
