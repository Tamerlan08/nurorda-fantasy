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
      formActive: false,
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

  displayAdmin(){
    this.setState({
      formActive: !this.state.formActive,
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
            <div className="TeamAllForms">
            <div className="page-header clearfix">
            <h4 className="pull-left">Team List {Roles.userIsInRole(this.props.userId, 'admin') ? <span className="headertext" onClick={this.displayAdmin.bind(this)}>Forms</span>:""}</h4>
            </div>
            <div className={this.state.formActive ? "display":"hide"}>
              <form>
                <input className="form"
                  type="text"
                  ref="TeamName"
                  placeholder="Team Name"
                  align="right"
                />
              </form>

              <form>
                <input className="form"
                  type="text"
                  ref="TeamLeader"
                  placeholder= "Team Leader"
                  align="middle"
                />
              </form>
              <Button className="form" bsStyle="warning" name="Confirm" onClick={this.handleSubmit.bind(this)}>Confirm & Submit</Button>
            </div>
            </div>
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
