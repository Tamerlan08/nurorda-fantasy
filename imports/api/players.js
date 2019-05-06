import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Players = new Mongo.Collection('players');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish players that are public or belong to the current user
  Meteor.publish('players', function playersPublication() {
    return Players.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'players.insert'(studentid, studentName, studentPrice) {
    check(studentid, String);
    check(studentName, String);
    check(studentPrice, Number);

    // Make sure the user is logged in before inserting a player
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Players.insert({
      studentid,
      studentName,
      studentPrice: parseFloat(studentPrice),
      createdAt: new Date(),
      username: Meteor.users.findOne(this.userId).username,
      owner: Meteor.users.findOne(this.userId)._id,
    });
  },
  'players.setChecked'(playerId, setChecked) {
    check(playerId, String);
    check(setChecked, Boolean);

    const player = Players.findOne(playerId);
    if (player.private && player.owner !== this.userId) {
      // If the player is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Players.update(playerId, { $set: { checked: setChecked } });
  },
  'players.sell'(playerId, userId){
    const user = Meteor.users.findOne(userId);
    const player = Players.findOne(playerId);
    user.defaultMoney += player.studentPrice,
    user.players -= 1;
    Meteor.users.update(userId, { $set: {defaultMoney: user.defaultMoney, players: user.players} });
  },
  'players.setPrivate'(playerId, setToPrivate) {
    check(playerId, String);
    check(setToPrivate, Boolean);

    const player = Players.findOne(playerId);

    // Make sure only the player owner can make a player private
    if (player.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Players.update(playerId, { $set: { private: setToPrivate } });
  },
'players.remove'(playerId) {
    check(playerId, String);

    const player = Players.findOne(playerId);
    if (player.private && player.owner !== this.userId) {
      // If the player is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Players.remove(playerId);
  },

});
