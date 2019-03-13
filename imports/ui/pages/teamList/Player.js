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
                <div className="studentPrice-2ndDIV">
                  <center>
                    <p>{this.props.player._id}</p>
                    <p>{this.props.player.studentid}</p>
                    <p>Players Name: <strong>{this.props.player.studentName}</strong></p>
                    <p>Players Price: <strong>{this.props.player.studentPrice}M</strong></p>
                    <p>
                    <Button bsStyle="success" className="BuyButton" onClick={this.buyPlayer.bind(this)} disabled>
                    Buy
                    </Button>
                    <Button bsStyle="danger" className="SellButton" onClick={this.sellPlayer.bind(this)} disabled>
                    Sell
                    </Button>
                    </p>
                    <hr></hr>
                    <p>Options to Modify</p>
                    <p>
                    <Button bsStyle="danger" className="delete" onClick={this.deleteThisPlayer.bind(this)}>
                      DELETE
                    </Button>
                    </p>
                  </center>
                </div>
        );
      }
      else {
        return "";
      }
  }
}

export default Player;
