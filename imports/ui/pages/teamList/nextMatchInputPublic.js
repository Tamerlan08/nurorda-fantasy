import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Table, DropdownButton, ButtonGroup } from 'react-bootstrap';
import { Button , Grid, Row, Col, Clearfix } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Teams } from '../../../api/teams.js';
import { NextMatchs } from '../../../api/nextMatchs.js';
import NextMatch from './nextMatchPublic.js';
import Navigation from '../../components/Navigation/Navigation';

 class nextMatchInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTeamOne: "Select first team",
      selectedTeamTwo: "Select second team",
      selectedRound: "Select round",
      selectedDay: "Day",
      selectedMonth: "Month",
      selectedYear: "Year",
    }
  };

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const round = this.state.selectedRound;
    const team1 = this.state.selectedTeamOne;
    const team2 = this.state.selectedTeamTwo;
    const date = this.state.selectedDay + " " + this.state.selectedMonth + " " + this.state.selectedYear;

    Meteor.call('nextMatchs.insert', round, date, team1, team2);

    // Clear form
    this.setState({ selectedRound: "Select round" });
    this.setState({ selectedTeamOne: "Select first team" });
    this.setState({ selectedTeamTwo: "Select second team" });
    this.setState({ selectedDay: "Day" });
    this.setState({ selectedMonth: "Month" });
    this.setState({ selectedYear: "Year" });

   }

  handleSelectFirst(eventKey, event) {
    const teams = this.props.teams.map ((team) => team.teamName)
    this.setState({ selectedTeamOne: teams[eventKey] });
  }

  handleSelectSecond(eventKey, event) {
    const teams = this.props.teams.map ((team) => team.teamName)
    this.setState({ selectedTeamTwo: teams[eventKey] });
  }
  handleSelectRound(event) {
    this.setState({ selectedRound: event });
  }
  handleSelectDay(event) {
    this.setState({ selectedDay: event });
  }
  handleSelectMonth(event) {
    this.setState({ selectedMonth: event });
  }
  handleSelectYear(event) {
    this.setState({ selectedYear: event });
  }

  renderNextMatchs() {
    let filteredNextMatchs = this.props.nextMatchs;
    return filteredNextMatchs.map((nextMatch) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = nextMatch.owner === currentUserId;

      return (
        <NextMatch
          key={nextMatch._id}
          nextMatch={nextMatch}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }

  render() {
    const teams = this.props.teams.map ((team) => team.teamName)
    return (
      <div>
        {this.renderNextMatchs()}
      </div>
    );
  }
}
export default withTracker(() => {
  Meteor.subscribe('nextMatchs');
  Meteor.subscribe('teams');
  return {
    nextMatchs: NextMatchs.find({}, {sort: {score: -1 }}).fetch(),
    teams: Teams.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
})(nextMatchInput);
