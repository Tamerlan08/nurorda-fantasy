import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Button, Table } from 'react-bootstrap';
import { Usersteams } from '../../../api/usersteams.js';
import { Bert } from 'meteor/themeteorchef:bert';
// Usersteam component - represents a single todo item
export default class Usersteam extends Component {
  deleteThisUsersteam() {
    Meteor.call('usersteams.remove', this.props.usersteam._id);
  }
  render() {
    // Give usersteams a different className when they are checked off,
    // so that we can style them nicely in CSS
    const usersteamClassName = classnames({
      checked: this.props.usersteam.checked,
      private: this.props.usersteam.private,
    });

    return (
            <tr>
              <td>{this.props.usersteam.user}</td>
              <td>{this.props.usersteam.team}</td>
              <td>
                <Button bsStyle="danger" className="delete" onClick={this.deleteThisUsersteam.bind(this)}>
                  Delete
                </Button>
              </td>
            </tr>
    );
  }
}
