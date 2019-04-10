import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Usersteams = new Mongo.Collection('usersteams');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish usersteams that are public or belong to the current user
  Meteor.publish('usersteams', function usersteamsPublication() {
    return Usersteams.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'usersteams.insert'(team) {
    check(team, String);

    // Make sure the user is logged in before inserting a usersteam
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Usersteams.insert({
      user: this.userId,
      team,
      username: Meteor.users.findOne(this.userId).username,
    });
  },

  // 'usersteams.minusscoreSix'(usersteamId) {
  //   check(usersteamId, String)
  //   const usersteam = Usersteams.findOne(usersteamId);
  //   usersteam.scoreSix = usersteam.scoreSix - 1,
  //   usersteam.totalScore = usersteam.totalScore - 1,
    // usersteam.averageScore = usersteam.totalScore / 6,
    // Usersteams.update(usersteamId , { $set: { scoreSix:usersteam.scoreSix }});
    // Usersteams.update(usersteamId , { $set: { totalScore:usersteam.totalScore }});
    // Usersteams.update(usersteamId , { $set: { averageScore:usersteam.averageScore }});
  // },  NORM EXAMPLE


  'usersteams.setChecked'(usersteamId, setChecked) {
    check(usersteamId, String);
    check(setChecked, Boolean);

    const usersteam = Usersteams.findOne(usersteamId);
    if (usersteam.private && usersteam.owner !== this.userId) {
      // If the usersteam is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Usersteams.update(usersteamId, { $set: { checked: setChecked } });
  },
  'usersteams.setPrivate'(usersteamId, setToPrivate) {
    check(usersteamId, String);
    check(setToPrivate, Boolean);

    const usersteam = Usersteams.findOne(usersteamId);

    // Make sure only the usersteam owner can make a usersteam private
    if (usersteam.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Usersteams.update(usersteamId, { $set: { private: setToPrivate } });
  },
'usersteams.remove'(usersteamId) {
    check(usersteamId, String);

    const usersteam = Usersteams.findOne(usersteamId);
    if (usersteam.private && usersteam.owner !== this.userId) {
      // If the usersteam is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Usersteams.remove(usersteamId);
  },

});
