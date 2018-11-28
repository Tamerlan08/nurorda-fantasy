import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Button, Table } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';
import PropTypes from 'prop-types';
import { Teams } from '../../../api/teams.js';

// TeamPublic component - a component of a team shown in the teams table
export default class TeamPublic extends Component {

  render() {
    const teamClassName = classnames({
      checked: this.props.team.checked,
      private: this.props.team.private,
    });

    return (
            <tr>
              <td>{this.props.team.teamName}</td>
              <td>{this.props.team.teamLeader}</td>
              <td>{this.props.team.score}</td>
            </tr>
    );
  }
}
