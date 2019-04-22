import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Button, Table } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';
import PropTypes from 'prop-types';
import { NextMatchs } from '../../../api/nextMatchs.js';
import { Bert } from 'meteor/themeteorchef:bert';

// NextMatch component - represents a single todo item
export default class NextMatch extends Component {
  deleteThisNextMatch() {
    Meteor.call('nextMatchs.remove', this.props.nextMatch._id);
  }

  render() {
    // Give nextMatchs a different className when they are checked off,
    // so that we can style them nicely in CSS

    return (
      <div className="nextMatch-div">
        <center>
          <p></p>
          <p className="nextMatch-round">{this.props.nextMatch.round}</p>
          <p></p>
          <p className="nextMatch-date">{this.props.nextMatch.date}</p>
          <p></p>
          <p className="nextMatch-team"><strong>{this.props.nextMatch.team1}</strong> vs <strong>{this.props.nextMatch.team2}</strong></p>
        </center>
      </div>
    );
  }
}
