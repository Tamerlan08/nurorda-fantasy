import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Button, Table } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';
import PropTypes from 'prop-types';
import { Teams } from '../../../api/teams.js';
import { Bert } from 'meteor/themeteorchef:bert';

// Team component - represents a single todo item
export default class Team extends Component {
  deleteThisTeam() {
    Meteor.call('teams.remove', this.props.team._id);
  }
  addPlus(){
    Meteor.call('teams.addPlus', this.props.team._id)
  }
  addMinus(){
    if (this.props.team.score > 0){
    Meteor.call('teams.addMinus', this.props.team._id)
    } else {
    Bert.alert('Score can not be negative!', 'danger')
    }
  }

  render() {
    // Give teams a different className when they are checked off,
    // so that we can style them nicely in CSS
    const teamClassName = classnames({
      checked: this.props.team.checked,
      private: this.props.team.private,
    });

    return (
            <tr>
              <td>{this.props.team.teamName}</td>
              <td>{this.props.team.teamLeader}</td>
              <td>
              <Button bsStyle="success" bsSize="xsmall" className="minus1" onClick={this.addMinus.bind(this)}>
              <span className="glyphicon glyphicon-minus"></span>
              </Button>
              <span> </span>
              {this.props.team.score}
              <span> </span>
              <Button bsStyle="success" bsSize="xsmall" className="plus1" onClick={this.addPlus.bind(this)}>
              <span className="glyphicon glyphicon-plus"></span>
              </Button>
              </td>
              <td>
               <Button bsStyle="danger" className="delete" onClick={this.deleteThisTeam.bind(this)}>
                  &times;
                </Button>
              </td>
            </tr>
    );
  }
}
