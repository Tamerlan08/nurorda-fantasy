import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Button, Table } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';
import PropTypes from 'prop-types';
import { Stores } from '../../../api/stores.js';

export default class MyTeamRender extends Component {

  deleteThisStore() {
    Meteor.call('stores.remove', this.props.store._id);
  }
  plus10M(){
    Meteor.call('stores.plus10M', this.props.store._id);
  }
  minus10M(){
    Meteor.call('stores.minus10M', this.props.store._id);
  }
  plus1M(){
    Meteor.call('stores.plus1M', this.props.store._id);
  }
  minus1M(){
    Meteor.call('stores.minus1M', this.props.store._id);
  }
  buyPlayer(){
    Bert.alert('You already bought this player!','danger')
  }
  sellPlayer(){
    Meteor.call('stores.transfer-testsell', this.props.store._id, this.props.user._id);
    Bert.alert('Player sold!', 'success')
  }

  render() {
    const style = this.props.store.owned ? {} : {display: 'none'};
    return (
            <div className="studentPrice-2ndDIV" style={style}>
              <center>
                <p>Players Name: <strong>{this.props.store.studentName}</strong></p>
                <p>Players Price: <strong>{this.props.store.studentPrice}M</strong></p>
                <p>
                <Button bsStyle="success" className="BuyButton" onClick={this.buyPlayer.bind(this)}>
                Buy
                </Button>
                <Button bsStyle="danger" className="SellButton" onClick={this.sellPlayer.bind(this)}>
                Sell
                </Button>
                </p>
                <hr></hr>
                <p>Options to Modify</p>
                <p>
                <Button bsStyle="danger" className="delete" onClick={this.deleteThisStore.bind(this)}>
                  DELETE
                </Button>
                </p>
                <p>
                <Button bsStyle="info" bsSize="xsmall" onClick={this.minus10M.bind(this)}>
                -10M
                </Button>
                <Button bsStyle="info" bsSize="xsmall" onClick={this.minus1M.bind(this)}>
                -1M
                </Button>
                <Button bsStyle="info" bsSize="xsmall" onClick={this.plus1M.bind(this)}>
                +1M
                </Button>
                <Button bsStyle="info" bsSize="xsmall" onClick={this.plus10M.bind(this)}>
                +10M
                </Button>
                </p>
              </center>
            </div>
    );
  }
}
