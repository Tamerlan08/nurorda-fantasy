import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Stores = new Mongo.Collection('stores');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish stores that are public or belong to the current user
  Meteor.publish('stores', function storesPublication() {
    return Stores.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'stores.insert'(studentName, studentPrice) {
    check(studentName, String);
    check(studentPrice, String);

    // Make sure the user is logged in before inserting a store
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Stores.insert({
      studentName,
      studentPrice: parseFloat(studentPrice),
      counter: 0,
      createdAt: new Date(),
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'stores.transfer-testbuy'(storeId, userId) {
    check(storeId , String);
    check(userId, String);
    const store = Stores.findOne(storeId);
    const user = Meteor.users.findOne({ _id: userId });


    if (user.players >= 6) {
      throw new Meteor.Error('You have reached the limit of players!');
    }
    else {
      user.defaultMoney = user.defaultMoney - store.studentPrice;
      user.players +=1;
      Meteor.users.update(userId, { $set: {defaultMoney: user.defaultMoney, players: user.players} });
    }
  },
  'stores.buy'(storeId, userId) {
    check(storeId, String);
    check(userId, String);
    const store = Stores.findOne(storeId);
    const user = Meteor.users.findOne({ _id: userId });
    if (user.players >= 6){
      Bert.alert("You have reached the limit of players!", 'danger');
      return 0;
    } else if (store.studentPrice > user.defaultMoney) {
      Bert.alert("You dont have enough money!", 'danger');
      return 0;
    } else {
      user.defaultMoney -= store.studentPrice;
      user.players += 1;
      Meteor.users.update(userId, { $set: {defaultMoney: user.defaultMoney, players: user.players} });
      return 1;
    }
  },


  'stores.plus1M'(storeId) {
    check(storeId , String)
    const store = Stores.findOne(storeId);
    store.studentPrice = store.studentPrice + 1,
    Stores.update(storeId, { $set: {studentPrice: store.studentPrice} });
  },

  'stores.minus1M'(storeId) {
    check(storeId , String)
    const store = Stores.findOne(storeId);
    store.studentPrice = store.studentPrice - 1,
    Stores.update(storeId, { $set: {studentPrice: store.studentPrice} });
  },

  'stores.plus10M'(storeId) {
    check(storeId , String)
    const store = Stores.findOne(storeId);
    store.studentPrice = store.studentPrice + 10,
    Stores.update(storeId, { $set: {studentPrice: store.studentPrice} });
  },

  'stores.minus10M'(storeId) {
    check(storeId , String)
    const store = Stores.findOne(storeId);
    store.studentPrice = store.studentPrice - 10,
    Stores.update(storeId, { $set: {studentPrice: store.studentPrice} });
  },

  'stores.setChecked'(storeId, setChecked) {
    check(storeId, String);
    check(setChecked, Boolean);

    const store = Stores.findOne(storeId);
    if (store.private && store.owner !== this.userId) {
      // If the store is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Stores.update(storeId, { $set: { checked: setChecked } });
  },
  'stores.setPrivate'(storeId, setToPrivate) {
    check(storeId, String);
    check(setToPrivate, Boolean);

    const store = Stores.findOne(storeId);

    // Make sure only the store owner can make a store private
    if (store.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Stores.update(storeId, { $set: { private: setToPrivate } });
  },
'stores.remove'(storeId) {
    check(storeId, String);

    const store = Stores.findOne(storeId);
    if (store.private && store.owner !== this.userId) {
      // If the store is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Stores.remove(storeId);
  },

});
