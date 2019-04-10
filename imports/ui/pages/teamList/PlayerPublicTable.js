import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Button, Table } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';
import PropTypes from 'prop-types';
import { Bert } from 'meteor/themeteorchef:bert';

import { Players } from '../../../api/players.js';
class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOwner: true,
    }
  };

  deleteThisPlayer() {
    Meteor.call('players.remove', this.props.player._id);
  }
  buyPlayer(){
    Bert.alert('Player is already in your team!', 'danger')
  }
  sellPlayer(){
    Meteor.call('players.sell', this.props.player._id, this.props.user._id);
    Meteor.call('players.remove', this.props.player._id);
    Bert.alert('Player sold!', 'success')
  }
  render() {
      if (this.props.user._id == this.props.player.owner) {
        return (
                <tr>
                  <td>{this.props.player.studentName}</td>
                  <td>{this.props.player.studentPrice}M</td>
                </tr>
        );
      }
      else {
        return "";
      }
  }
}

export default Player;
