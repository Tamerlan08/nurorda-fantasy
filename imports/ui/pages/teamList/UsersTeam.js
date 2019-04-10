import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Table, DropdownButton, ButtonGroup } from 'react-bootstrap';
import { Usersteams } from '../../../api/usersteams.js';
import { Button , Grid, Row, Col, Clearfix} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TeamInput from './teamInput.js'
import { Teams } from '../../../api/teams.js';
import Team from '../../components/Team/Team.js';
import Usersteam from './UsersTeamTable.js';
import Navigation from '../../components/Navigation/Navigation';
import { Roles } from 'meteor/alanning:roles';
import getUserProfile from '../../../modules/get-user-profile';

 class UsersTeam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
      selectedOptionTeam: "Select your team",
      activeTeam: "Team is not selected"
    }
  };

  testF() {
    if(this.props.user == this.props.usersteam.user){
      this.state.activeTeam = this.props.usersteam.team;
      console.log(this.state.activeTeam)
    } else {
      alert("error");
    }
  }

  handleSelect(eventKey, event) {
    const teams = this.props.teams.map ((team) => team.teamName)
    this.setState({ selectedOptionTeam: teams[eventKey] });
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref

    const team = this.state.selectedOptionTeam;

    Meteor.call('usersteams.insert', team);
}

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderUsersteams() {
    let filteredUsersteams = this.props.usersteams;
    if (this.state.hideCompleted) {
      filteredUsersteams = filteredUsersteams.filter(usersteam => !Usersteam.checked);
    }
    return filteredUsersteams.map((usersteam) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = usersteam.owner === currentUserId;

      return (
        <Usersteam
          key={usersteam._id}
          usersteam={usersteam}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }


  render() {
    const teams = this.props.teams.map ((team) => team.teamName)
    const {selectedOption} = this.state;
    return (
      <div className="UsersteamGrid">
        <center>
          <Button onClick={this.testF.bind(this)}>Test Button</Button>
          <h1 className="UsersteamTitle">Add Player</h1>
            <div className="UsersteamTeam">
            <ButtonGroup justified className="UsersteamTeamDropdown">
              <DropdownButton
                title={this.state.selectedOptionTeam}
                id="document-type"
                onSelect={this.handleSelect.bind(this)}>
                  {teams.map((team, i) => (
                  <MenuItem key={i} eventKey={i}>
                    {team}
                  </MenuItem>))}
                </DropdownButton>
              </ButtonGroup>
              </div>
              <p></p>
              <div className="UsersteamSubmit">
                <Button className="usersteam-submit-button" bsStyle="warning" name="Confirm" onClick={this.handleSubmit.bind(this)}>Confirm & Submit</Button>
              </div>
            </center>
          <p></p>
          <div className="UsersteamTable">
            <Table bordered condensed className="table">
              <thead>
                <tr>
                  <td><strong>User-ID</strong></td>
                  <td><strong>Team</strong></td>
                </tr>
              </thead>
              <tbody>
                  {this.renderUsersteams()}
              </tbody>
            </Table>
          </div>
    </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('usersteams');
  Meteor.subscribe('teams');
  return {
    user: getUserProfile(Meteor.users.findOne({ _id: Meteor.userId() })),
    usersteams: Usersteams.find({}, { sort: { createdAt: -1 } }).fetch(),
    teams: Teams.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Usersteams.find({ checked: { $ne: false } }).count(),
    currentUser: Meteor.user(),
  };

})(UsersTeam);
