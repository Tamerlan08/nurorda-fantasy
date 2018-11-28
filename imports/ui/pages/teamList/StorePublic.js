import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Button, Table } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';
import PropTypes from 'prop-types';


import { Stores } from '../../../api/stores.js';
export default class StorePublic extends Component {


  buyPlayer(){
    Meteor.call('stores.transfer', this.props.store._id, this.props.user._id);
    Meteor.call('stores.remove', this.props.store._id);
  }

  render() {
    return (
            <div className="studentPrice-2ndDIV">
              <center>
                <p>Players Name: <strong>{this.props.store.studentName}</strong></p>
                <p>Players Price: <strong>{this.props.store.studentPrice}M</strong></p>
                <p>
                <Button bsStyle="success" className="BuyButton" onClick={this.buyPlayer.bind(this)}>
                Buy
                </Button>
                <Button bsStyle="danger" className="SellButton">
                Sell
                </Button>
                </p>
              </center>
            </div>
    );
  }
}
