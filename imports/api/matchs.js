import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Matchs = new Mongo.Collection('matchs');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tmatchs that are public or belong to the current user
  Meteor.publish('matchs', function matchsPublication() {
    return Matchs.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'matchs.insert'(scoredOne, scoredTwo, teamOne, teamTwo, round, season) {
    check(scoredOne, String);
    check(scoredTwo, String);
    check(teamOne, String);
    check(teamTwo, String);
    check(round , String);
    check(season , String);


    // Make sure the user is logged in before inserting a tmatch
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    console.log(teamOne, teamTwo)
    Matchs.insert({
      scoredOne,
      scoredTwo,
      teamOne,
      teamTwo,
      round,
      season,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },

  'matchs.setChecked'(matchId, setChecked) {
    check(matchId, String);
    check(setChecked, Boolean);

    const match = Matchs.findOne(matchId);
    if (match.private && match.owner !== this.userId) {
      // If the tmatch is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Matchs.update(matchId, { $set: { checked: setChecked } });
  },
  'matchs.setPrivate'(matchId, setToPrivate) {
    check(matchId, String);
    check(setToPrivate, Boolean);

    const match = Matchs.findOne(matchId);

    // Make sure only the tmatch owner can make a tmatch private
    if (match.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Matchs.update(matchId, { $set: { private: setToPrivate } });
  },
'matchs.remove'(matchId) {
    check(matchId, String);

    const match = Matchs.findOne(matchId);
    if (match.private && match.owner !== this.userId) {
      // If the tmatch is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Matchs.remove(matchId);
  },

});
