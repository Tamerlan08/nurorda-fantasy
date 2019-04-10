import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Route, Redirect } from 'react-router'

import { Stores } from '../../../api/stores.js';
class Documents extends Component {
  render() {
    return (
      <Redirect to="/" />
    );
  }
}

export default Documents;
