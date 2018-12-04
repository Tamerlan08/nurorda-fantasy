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
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'stores.transfer'(storeId, userId) {
    check(storeId , String);
    check(userId, String);
    const store = Stores.findOne(storeId);
    const user = Meteor.users.findOne({ _id: userId });
    console.log("Store:",storeId);
    console.log("User:",userId);
    console.log("Submitted by:",store.owner);
    user.defaultMoney = user.defaultMoney - store.studentPrice,
    store.owner = this.userId
    Stores.update(storeId, { $set: {studentPrice: store.studentPrice} });
    Stores.update(storeId, { $set: {owner: userId} });
    Meteor.users.update(userId, { $set: {defaultMoney: user.defaultMoney} });
    console.log("Owned by:",store.owner)
    console.log("Balance available:",user.defaultMoney)
    console.log("==================")
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
