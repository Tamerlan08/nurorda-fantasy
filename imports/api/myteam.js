import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const MyPlayers = new Mongo.Collection('myPlayers');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tmyPlayers that are public or belong to the current user
  Meteor.publish('myPlayers', function myPlayersPublication() {
    return MyPlayers.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'myPlayers.insert'(player) {
    check(player, String);


    // Make sure the user is logged in before inserting a tmyPlayer
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    console.log(player)
    MyPlayers.insert({
      player: Stores.findOne(this.store._id).StudentName,
    });
  },

'myPlayers.remove'(myPlayerId) {
    check(myPlayerId, String);

    const myPlayer = MyPlayers.findOne(myPlayerId);
    if (myPlayer.private && myPlayer.owner !== this.userId) {
      // If the tmyPlayer is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    MyPlayers.remove(myPlayerId);
  },

});
