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
      ownerfirst: false,
      ownersecond: false,
      ownerthird: false,
      username: Meteor.users.findOne(this.userId).username,
      owned: false,
      alreadybought: 0,
    });
  },
  'stores.transfer-testbuy'(storeId, userId) {
    check(storeId , String);
    check(userId, String);
    const store = Stores.findOne(storeId);
    const user = Meteor.users.findOne({ _id: userId });
    console.log("[?+]Testbuy transaction")
    if(store.ownerfirst == this.userId || store.ownersecond == this.userId || store.ownerthird == this.userId){
      console.log("Operation can not be done!")
      console.log("Player is already in your team")
      console.log("")
    } else if(store.ownerfirst == false){
      store.ownerfirst = this.userId
      user.defaultMoney = user.defaultMoney - store.studentPrice
      store.alreadybought = store.alreadybought + 1
      console.log("Success!")
    } else if(store.ownersecond == false){
      store.ownersecond = this.userId
      user.defaultMoney = user.defaultMoney - store.studentPrice
      store.alreadybought = store.alreadybought + 1
      console.log("Success!")
    } else if(store.ownerthird == false){
      store.ownerthird = this.userId
      user.defaultMoney = user.defaultMoney - store.studentPrice
      store.alreadybought = store.alreadybought + 1
      console.log("Success!")
    } else {
      console.log("Operation can not be done!")
      console.log("Player is not available in store")
    }
    console.log("First owner:",store.ownerfirst)
    console.log("Second owner:",store.ownersecond)
    console.log("Third owner:",store.ownerthird)
    console.log("Your userId:",this.userId)
    if(store.ownerfirst != false && store.ownersecond != false && store.ownerthird){
      store.owned = true
    } else {
      store.owned = false
    }
    console.log("Owned(true/false):",store.owned)
    Stores.update(storeId, { $set: {ownerfirst: store.ownerfirst} });
    Stores.update(storeId, { $set: {ownersecond: store.ownersecond} });
    Stores.update(storeId, { $set: {ownerthird: store.ownerthird} });
    Stores.update(storeId, { $set: {owned: store.owned} });
    Stores.update(storeId, { $set: {alreadybought: store.alreadybought} });
    Meteor.users.update(userId, { $set: {defaultMoney: user.defaultMoney} });
    console.log("=====================================")
  },
  'stores.transfer-testsell'(storeId, userId) {
    check(storeId , String);
    check(userId, String);
    const store = Stores.findOne(storeId);
    const user = Meteor.users.findOne({ _id: userId });
    console.log("[?+]Testsell transaction")
    if(this.userId == !(store.ownerfirst || store.ownersecond || store.ownerthird)){
      console.log("Operation can not be done!")
    } else if(store.ownerfirst == this.userId){
      user.defaultMoney = user.defaultMoney + store.studentPrice
      store.ownerfirst = Boolean(false)
      store.alreadybought = store.alreadybought - 1
    } else if(store.ownersecond == false){
      user.defaultMoney = user.defaultMoney + store.studentPrice
      store.ownersecond = Boolean(false)
      store.alreadybought = store.alreadybought - 1
    } else if(store.ownerthird == false){
      user.defaultMoney = user.defaultMoney + store.studentPrice
      store.ownerthird = Boolean(false)
      store.alreadybought = store.alreadybought - 1
    } else {
      console.log("Operation can not be done!")
    }
    console.log("First owner:",store.ownerfirst)
    console.log("Second owner:",store.ownersecond)
    console.log("Third owner:",store.ownerthird)
    console.log("Your userId:",this.userId)
    if(store.ownerfirst != false && store.ownersecond != false && store.ownerthird){
      store.owned == true
    } else {
      store.owned == false
    }
    console.log("Owned(true/false):",store.owned)
    Stores.update(storeId, { $set: {ownerfirst: store.ownerfirst} });
    Stores.update(storeId, { $set: {ownersecond: store.ownersecond} });
    Stores.update(storeId, { $set: {ownerthird: store.ownerthird} });
    Stores.update(storeId, { $set: {owned: store.owned} });
    Stores.update(storeId, { $set: {alreadybought: store.alreadybought} });
    Meteor.users.update(userId, { $set: {defaultMoney: user.defaultMoney} });
    console.log("=====================================")
  },
  'stores.transfer-buy'(storeId, userId) {
    check(storeId , String);
    check(userId, String);
    const store = Stores.findOne(storeId);
    const user = Meteor.users.findOne({ _id: userId });
    console.log("[+]Buy transaction")
    console.log("Store:",storeId);
    console.log("User:",userId);
    console.log("Submitted by:",store.owner);
    user.defaultMoney = user.defaultMoney - store.studentPrice,
    store.owner = this.userId
    store.owned = true
    Stores.update(storeId, { $set: {studentPrice: store.studentPrice} });
    Stores.update(storeId, { $set: {owner: userId} });
    Stores.update(storeId, { $set: {owned: true} });
    Meteor.users.update(userId, { $set: {defaultMoney: user.defaultMoney} });
    console.log("Owned by:",store.owner)
    console.log("Balance available:",user.defaultMoney)
    console.log("=====================================")
  },
  'stores.transfer-sell'(storeId, userId) {
    check(storeId , String);
    check(userId, String);
    const store = Stores.findOne(storeId);
    const user = Meteor.users.findOne({ _id: userId });
    console.log("[-]Sell transaction");
    console.log("Store:",storeId);
    console.log("User:",userId);
    console.log("Submitted by:",store.owner);
    user.defaultMoney = user.defaultMoney + store.studentPrice,
    store.owner = this.userId
    store.owned = null
    Stores.update(storeId, { $set: {studentPrice: store.studentPrice} });
    Stores.update(storeId, { $set: {owner: store.owner} });
    Stores.update(storeId, { $set: {owned: store.owned} });
    Meteor.users.update(userId, { $set: {defaultMoney: user.defaultMoney} });
    console.log("Owned by:",store.owner)
    console.log("Balance available:",user.defaultMoney)
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
