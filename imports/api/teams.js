import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Teams = new Mongo.Collection('teams');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish teams that are public or belong to the current user
  Meteor.publish('teams', function teamsPublication() {
    return Teams.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'teams.insert'(teamName, teamLeader) {
    check(teamName, String);
    check(teamLeader, String);
 

    // Make sure the user is logged in before inserting a team
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Teams.insert({
      teamName,
      teamLeader,
      score: 0,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'teams.addPlus'(teamId) {
    check(teamId , String)
    const team = Teams.findOne(teamId);
    team.score = team.score + 1,
    Teams.update(teamId, { $set: {score:team.score} });
  },

  'teams.addMinus'(teamId) {
    check(teamId , String)
    const team = Teams.findOne(teamId);
    team.score = team.score - 1,
    Teams.update(teamId, { $set: {score: team.score} });
  },

  'teams.setChecked'(teamId, setChecked) {
    check(teamId, String);
    check(setChecked, Boolean);

    const team = Teams.findOne(teamId);
    if (team.private && team.owner !== this.userId) {
      // If the team is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Teams.update(teamId, { $set: { checked: setChecked } });
  },
  'teams.setPrivate'(teamId, setToPrivate) {
    check(teamId, String);
    check(setToPrivate, Boolean);

    const team = Teams.findOne(teamId);

    // Make sure only the team owner can make a team private
    if (team.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Teams.update(teamId, { $set: { private: setToPrivate } });
  },
'teams.remove'(teamId) {
    check(teamId, String);

    const team = Teams.findOne(teamId);
    if (team.private && team.owner !== this.userId) {
      // If the team is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Teams.remove(teamId);
  },

});
