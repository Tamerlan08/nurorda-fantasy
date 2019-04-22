import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Table } from 'react-bootstrap';
import { Button , Grid, Row, Col, Clearfix} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Teams } from '../../../api/teams.js';
import Team from '../../components/Team/Team.js';
import Navigation from '../../components/Navigation/Navigation';

 class teamInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    }
  };

  handleSubmit(event) {
    const teamName1 = ReactDOM.findDOMNode(this.refs.TeamName).value.trim();
    const teamLeader1 = ReactDOM.findDOMNode(this.refs.TeamLeader).value.trim();
    if(teamName1 == ""){
      Bert.alert("Please enter all required details!", 'danger')
    } else if (teamLeader1 == ""){
      Bert.alert("Please enter all required details!", 'danger')
    } else {
    event.preventDefault();

    // Find the text field via the React ref
    const teamName = ReactDOM.findDOMNode(this.refs.TeamName).value.trim();
    const teamLeader = ReactDOM.findDOMNode(this.refs.TeamLeader).value.trim();

    Meteor.call('teams.insert', teamName, teamLeader);

    // Clear form
    ReactDOM.findDOMNode(this.refs.TeamName).value = '';
    ReactDOM.findDOMNode(this.refs.TeamLeader).value= '';

  }}

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderTeams() {
    let filteredTeams = this.props.teams;
    if (this.state.hideCompleted) {
      filteredTeams = filteredTeams.filter(team => !Team.checked);
    }
    return filteredTeams.map((team) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = team.owner === currentUserId;

      return (
        <Team
          key={team._id}
          team={team}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col md={12}>
            { this.props.currentUser ?
            <div className="TeamAllForms">
            <center>
            <h1>Add Team</h1>

            <div className="TeamInfoForm">
              <h4>Information about Team</h4>
                <form className="TeamName" >
                  <input className="input-TeamName"
                    type="text"
                    ref="TeamName"
                    placeholder="Team Name"
                    align="right"
                  />
                </form>

                <form className="TeamLeader">
                  <input className="input-TeamLeader"
                    type="text"
                    ref="TeamLeader"
                    placeholder= "Team Leader"
                    align="middle"
                  />
                </form>
                <p></p>
              </div>
              <p></p>
              <Button className="teamInput-submit-button" bsStyle="warning" name="Confirm" onClick={this.handleSubmit.bind(this)}>Confirm & Submit</Button>
              </center>
              <p></p>
            </div> : '' }
            <p></p>
            { this.props.currentUser ?
            <Table bordered condensed>
              <thead>
                <tr>
                  <td><strong>Team Name</strong></td>
                  <td><strong>Team Leader</strong></td>
                  <td><strong>Team Score</strong></td>
                  <td><strong> EDIT </strong></td>
                </tr>
              </thead>
              <tbody>
                  {this.renderTeams()}
              </tbody>
            </Table>
              :
              <span>
              <center>
              <h2 className="authText">Authorize to view this page</h2>
              </center>
              </span>
            }
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
export default withTracker(() => {
  Meteor.subscribe('teams');

  return {
    teams: Teams.find({}, {sort: {score: -1 }}).fetch(),
    incompleteCount: Teams.find({ checked: { $ne: false } }).count(),
    currentUser: Meteor.user(),
  };
})(teamInput);
