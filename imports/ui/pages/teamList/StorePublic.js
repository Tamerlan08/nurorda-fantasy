import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Button, Table } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';
import PropTypes from 'prop-types';


import { Stores } from '../../../api/stores.js';
export default class StorePublic extends Component {


  buyPlayer(){
    if (this.props.user.defaultMoney >= this.props.store.studentPrice) {
    Meteor.call('stores.transfer-buy', this.props.store._id, this.props.user._id);
    Bert.alert('Check player in your team!', 'success')
    } else {
    Bert.alert('You dont have enough money! Try selling your players to buy this one.', 'danger')
    }
  }
  sellPlayer(){
    Bert.alert('Buy this player first!','danger')
  }

  render() {
    const style = this.props.store.owned ? {display: 'none'} : {};
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
              </center>
            </div>
    );
  }
}