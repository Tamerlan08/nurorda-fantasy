import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Button, Table } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';
import PropTypes from 'prop-types';
import { Bert } from 'meteor/themeteorchef:bert';
import { Players } from '../../../api/players.js';
import { Stores } from '../../../api/stores.js';
class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owned: false
    }
    // this.buyPlayer = this.buyPlayer.bind(this);
  };
  //
  // deleteThisStore() {
  //   Meteor.call('stores.remove', this.props.store._id);
  // }
  // plus10M(){
  //   Meteor.call('stores.plus10M', this.props.store._id);
  // }
  // minus10M(){
  //   Meteor.call('stores.minus10M', this.props.store._id);
  // }
  // plus1M(){
  //   Meteor.call('stores.plus1M', this.props.store._id);
  // }
  // minus1M(){
  //   Meteor.call('stores.minus1M', this.props.store._id);
  // }
  // buyPlayer(event){
  //   const toBuyPlayer = event;
  //   console.log(toBuyPlayer);
  //   const players = Players.find({owner: this.props.user._id}).fetch();
  //   const playerid = players.map((player) => {
  //     if (player.studentid = toBuyPlayer) {
  //         Bert.alert("Player is already in your team!", 'danger');
  //     }
  //     else {
  //       if (this.props.user.defaultMoney >= this.props.store.studentPrice) {
  //       // Meteor.call('stores.transfer-testbuy', this.props.store._id, this.props.user._id);
  //       event.preventDefault();
  //       // Find the text field via the React ref
  //       const studentid = this.props.store._id
  //       const studentPrice = this.props.store.studentPrice;
  //       const studentName = this.props.store.studentName;
  //       // const studentSurname = this.props.store.studentSurname;
  //       Meteor.call('players.insert', studentid, studentName, studentPrice);
  //       Bert.alert("Check player in your team!", 'success')
  //       } else {
  //       Bert.alert('You dont have enough money! Try selling your players to buy this one.', 'danger')
  //       }
  //     }
  //   });
    // const storeid = this.props.store._id
    // if (playerid.includes(storeid) ) {
    //   Bert.alert("Player is already in your team!", 'danger')
    // }
  //   else {
  //   if (this.props.user.defaultMoney >= this.props.store.studentPrice) {
  //   Meteor.call('stores.transfer-testbuy', this.props.store._id, this.props.user._id);
  //   event.preventDefault();
  //   // Find the text field via the React ref
  //   const studentid = this.props.store._id
  //   const studentPrice = this.props.store.studentPrice;
  //   const studentName = this.props.store.studentName;
  //   // const studentSurname = this.props.store.studentSurname;
  //   Meteor.call('players.insert', studentid, studentName, studentPrice);
  //   Bert.alert("Check player in your team!", 'success')
  //   } else {
  //   Bert.alert('You dont have enough money! Try selling your players to buy this one.', 'danger')
  //   }
  // }
// }
  // buyPlayer2(){
  //   const players = Players.find({owner: this.props.user._id}).fetch;
  //   const playerid = players.map ((player) => player.studentid);
  //   if ( playerid.includes(storeid) ){
  //     Bert.alert("Player is already in your team!", 'danger')
  //   } else {
  //     Meteor.call('stores.buy', this.props.store._id, this.props.user._id);
  //     event.preventDefault();
  //     const studentid = this.props.store._id;
  //     const studentPrice = this.props.store.studentPrice;
  //     const studentName = this.props.store.studentName;
  //     Meteor.call('players.insert', studentid, studentName, studentPrice);
  //     Bert.alert("Check player in your team!", 'success')
  //   }
  // }
  // sellPlayer(){
  //   Bert.alert('You can not sell this player!', 'danger')
  // }
  // function(){
  //   const playerid = this.props.players.map ((player) => player.studentid)
  // }

  render() {
    // const playerid = this.props.players.map ((player) => player.studentid)
    return (
            <div className="studentPrice-2ndDIV">
              <center>
                <p>Players Name: <strong>{this.props.store.studentName}</strong></p>
                <p>Players Price: <strong>{this.props.store.studentPrice}M</strong></p>
                <p>
                <Button bsStyle="success" className="BuyButton" onClick={this.buyPlayer(this.props.store._id)}>
                Buy
                </Button>
                <Button bsStyle="danger" className="SellButton" onClick={this.sellPlayer.bind(this)} disabled>
                Sell
                </Button>
                </p>
              </center>
            </div>
    );
  }
}

export default Store;
