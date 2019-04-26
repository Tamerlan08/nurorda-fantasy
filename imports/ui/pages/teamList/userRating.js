import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import classnames from 'classnames';
import { Button, Table } from 'react-bootstrap';
import { Matchs } from '../../../api/matchs.js';
import { Teams } from '../../../api/teams.js';
import getUserProfile from '../../../modules/get-user-profile';
// Team component - represents a single todo item
class UserRating extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    }
  };
  render() {
    const { user } = this.props;
    return (
            <div>
              <Table bordered condensed>
                <thead>
                  <tr>
                    <td><strong>UserID</strong></td>
                    <td><strong>Surname</strong></td>
                    <td><strong>Name</strong></td>
                    <td><strong>Average</strong></td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {users.map((user) => (
                      <td>{user.username}</td>
                    ))}
                    {surname.map((user) => (
                      <td>{user.user.profile.name.last}</td>
                    ))}
                    {name.map((user) => (
                      <td>{user.user.profile.name.first}</td>
                    ))}
                    </tr>
                </tbody>
              </Table>
            </div>
    );
  }
}

export default withTracker(() => {
  return {
    user: getUserProfile(Meteor.users.findOne({ _id: Meteor.userId() })),
  };
})(UserRating)
