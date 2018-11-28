import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import classnames from 'classnames';
import { Button, Table } from 'react-bootstrap';

import { Matchs } from '../../../api/matchs.js';
import { Teams } from '../../../api/teams.js';
// Team component - represents a single todo item
class MatchPublic extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    }
  };

  render() {
    const teamClassName = classnames({
      checked: this.props.match.checked,
      private: this.props.match.private,
    });
    return (
            <tr>
              <td>{this.props.match.season}</td>
              <td>{this.props.match.round}</td>
              <td>({this.props.match.teamOne}) <strong>{this.props.match.scoredOne}</strong> : <strong>{this.props.match.scoredTwo}</strong> ({this.props.match.teamTwo})</td>
            </tr>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('matchs');
  Meteor.subscribe('teams');


  return {
    matchs: Matchs.find({}, { sort: { createdAt: -1 } }).fetch(),
    teams: Teams.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Matchs.find({ checked: { $ne: false } }).count(),
    incompleteCount: Teams.find({ checked: { $ne: false } }).count(),
    currentUser: Meteor.user(),
  };
})(MatchPublic)
