import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const NextMatchs = new Mongo.Collection('nextMatchs');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish nextMatchs that are public or belong to the current user
  Meteor.publish('nextMatchs', function nextMatchsPublication() {
    return NextMatchs.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'nextMatchs.insert'(round, date, team1, team2) {
    check(round, String);
    check(date, String);
    check(team1, String);
    check(team2, String);


    // Make sure the user is logged in before inserting a nextMatch
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    NextMatchs.insert({
      round,
      date,
      team1,
      team2,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'nextMatchs.setChecked'(nextMatchId, setChecked) {
    check(nextMatchId, String);
    check(setChecked, Boolean);

    const nextMatch = NextMatchs.findOne(nextMatchId);
    if (nextMatch.private && nextMatch.owner !== this.userId) {
      // If the nextMatch is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    NextMatchs.update(nextMatchId, { $set: { checked: setChecked } });
  },
  'nextMatchs.setPrivate'(nextMatchId, setToPrivate) {
    check(nextMatchId, String);
    check(setToPrivate, Boolean);

    const nextMatch = NextMatchs.findOne(nextMatchId);

    // Make sure only the nextMatch owner can make a nextMatch private
    if (nextMatch.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    NextMatchs.update(nextMatchId, { $set: { private: setToPrivate } });
  },
'nextMatchs.remove'(nextMatchId) {
    check(nextMatchId, String);

    const nextMatch = NextMatchs.findOne(nextMatchId);
    if (nextMatch.private && nextMatch.owner !== this.userId) {
      // If the nextMatch is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    NextMatchs.remove(nextMatchId);
  },

});
