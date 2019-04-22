import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Table, DropdownButton, ButtonGroup } from 'react-bootstrap';
import { Button , Grid, Row, Col, Clearfix } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Teams } from '../../../api/teams.js';
import { NextMatchs } from '../../../api/nextMatchs.js';
import NextMatch from './nextMatch.js';
import Navigation from '../../components/Navigation/Navigation';

 class nextMatchInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
      selectedTeamOne: "Select first team",
      selectedTeamTwo: "Select second team",
      selectedRound: "Select round",
      selectedDay: "Day",
      selectedMonth: "Month",
      selectedYear: "Year",
    }
  };

  handleSubmit(event) {
    if(this.state.selectedRound == "Select round"){
      Bert.alert("Please enter all required details!", 'danger')
    } else if (this.state.selectedDay == "Day"){
      Bert.alert("Please enter all required details!", 'danger')
    } else if (this.state.selectedMonth == "Month"){
      Bert.alert("Please enter all required details!", 'danger')
    } else if (this.state.selectedYear == "Year"){
      Bert.alert("Please enter all required details!", 'danger')
    } else if (this.state.selectedTeamOne == "Select first team"){
      Bert.alert("Please enter all required details!", 'danger')
    } else if (this.state.selectedTeamTwo == "Select second team"){
      Bert.alert("Please enter all required details!", 'danger')
    } else {
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
  }}

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
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
    if (this.state.hideCompleted) {
      filteredNextMatchs = filteredNextMatchs.filter(nextMatch => !NextMatch.checked);
    }
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
        <Grid>
          <Row>
            <Col md={12}>
            { this.props.currentUser ?
            <div className="TeamAllForms">
            <center>
            <h1>Add Next Match</h1>

            <div className="TeamName">
                <ButtonGroup justified className="MatchTeamDropdown">
                  <DropdownButton className="dropdownbutton-team1"
                    title={this.state.selectedRound}
                    id="document-type"
                    onSelect={this.handleSelectRound.bind(this)}>
                      <MenuItem eventKey={'First Match'}>
                        First Match
                      </MenuItem>
                      <MenuItem eventKey={'Second Match'}>
                        Second Match
                      </MenuItem>
                      <MenuItem eventKey={'Third Match'}>
                        Third Match
                      </MenuItem>
                      <MenuItem eventKey={'Quarter Final'}>
                        Quarter Final
                      </MenuItem>
                      <MenuItem eventKey={'Semi Final'}>
                        Semi Final
                      </MenuItem>
                      <MenuItem eventKey={'Final Match'}>
                        Final Match
                      </MenuItem>
                  </DropdownButton>
                </ButtonGroup>

                <ButtonGroup justified className="MatchTeamDropdown">
                  <DropdownButton className="dropdownbutton-team1"
                    title={this.state.selectedDay}
                    id="document-type"
                    onSelect={this.handleSelectDay.bind(this)}>
                      <MenuItem eventKey={'1'}>
                        1
                      </MenuItem>
                      <MenuItem eventKey={'2'}>
                        2
                      </MenuItem>
                      <MenuItem eventKey={'3'}>
                        3
                      </MenuItem>
                      <MenuItem eventKey={'4'}>
                        4
                      </MenuItem>
                      <MenuItem eventKey={'5'}>
                        5
                      </MenuItem>
                      <MenuItem eventKey={'6'}>
                        6
                      </MenuItem>
                      <MenuItem eventKey={'7'}>
                        7
                      </MenuItem>
                      <MenuItem eventKey={'8'}>
                        8
                      </MenuItem>
                      <MenuItem eventKey={'9'}>
                        9
                      </MenuItem>
                      <MenuItem eventKey={'10'}>
                        10
                      </MenuItem>
                      <MenuItem eventKey={'11'}>
                        11
                      </MenuItem>
                      <MenuItem eventKey={'12'}>
                        12
                      </MenuItem>
                      <MenuItem eventKey={'13'}>
                        13
                      </MenuItem>
                      <MenuItem eventKey={'14'}>
                        14
                      </MenuItem>
                      <MenuItem eventKey={'15'}>
                        15
                      </MenuItem>
                      <MenuItem eventKey={'16'}>
                        16
                      </MenuItem>
                      <MenuItem eventKey={'17'}>
                        17
                      </MenuItem>
                      <MenuItem eventKey={'18'}>
                        18
                      </MenuItem>
                      <MenuItem eventKey={'19'}>
                        19
                      </MenuItem>
                      <MenuItem eventKey={'20'}>
                        20
                      </MenuItem>
                      <MenuItem eventKey={'21'}>
                        21
                      </MenuItem>
                      <MenuItem eventKey={'22'}>
                        22
                      </MenuItem>
                      <MenuItem eventKey={'23'}>
                        23
                      </MenuItem>
                      <MenuItem eventKey={'24'}>
                        24
                      </MenuItem>
                      <MenuItem eventKey={'25'}>
                        25
                      </MenuItem>
                      <MenuItem eventKey={'26'}>
                        26
                      </MenuItem>
                      <MenuItem eventKey={'27'}>
                        27
                      </MenuItem>
                      <MenuItem eventKey={'28'}>
                        28
                      </MenuItem>
                      <MenuItem eventKey={'29'}>
                        29
                      </MenuItem>
                      <MenuItem eventKey={'30'}>
                        30
                      </MenuItem>
                      <MenuItem eventKey={'31'}>
                        31
                      </MenuItem>
                  </DropdownButton>
                  <DropdownButton className="dropdownbutton-team1"
                    title={this.state.selectedMonth}
                    id="document-type"
                    onSelect={this.handleSelectMonth.bind(this)}>
                      <MenuItem eventKey={'January'}>
                        January
                      </MenuItem>
                      <MenuItem eventKey={'February'}>
                        February
                      </MenuItem>
                      <MenuItem eventKey={'March'}>
                        March
                      </MenuItem>
                      <MenuItem eventKey={'April'}>
                        April
                      </MenuItem>
                      <MenuItem eventKey={'May'}>
                        May
                      </MenuItem>
                      <MenuItem eventKey={'June'}>
                        June
                      </MenuItem>
                      <MenuItem eventKey={'July'}>
                        July
                      </MenuItem>
                      <MenuItem eventKey={'August'}>
                        August
                      </MenuItem>
                      <MenuItem eventKey={'September'}>
                        September
                      </MenuItem>
                      <MenuItem eventKey={'October'}>
                        October
                      </MenuItem>
                      <MenuItem eventKey={'November'}>
                        November
                      </MenuItem>
                      <MenuItem eventKey={'December'}>
                        December
                      </MenuItem>
                  </DropdownButton>
                  <DropdownButton className="dropdownbutton-team1"
                    title={this.state.selectedYear}
                    id="document-type"
                    onSelect={this.handleSelectYear.bind(this)}>
                      <MenuItem eventKey={'2019'}>
                        2019
                      </MenuItem>
                      <MenuItem eventKey={'2020'}>
                        2020
                      </MenuItem>
                      <MenuItem eventKey={'2021'}>
                        2021
                      </MenuItem>
                  </DropdownButton>
                </ButtonGroup>

                <ButtonGroup justified className="MatchTeamDropdown">
                  <DropdownButton className="dropdownbutton-team1"
                    title={this.state.selectedTeamOne}
                    id="document-type"
                    onSelect={this.handleSelectFirst.bind(this)}>
                    {teams.map((team, i) => (
                      <MenuItem key={i} eventKey={i}>
                        {team}
                      </MenuItem>))}
                  </DropdownButton>
                </ButtonGroup>

                <ButtonGroup justified className="MatchTeamDropdown">
                  <DropdownButton className="dropdownbutton-team1"
                    title={this.state.selectedTeamTwo}
                    id="document-type"
                    onSelect={this.handleSelectSecond.bind(this)}>
                    {teams.map((team, i) => (
                      <MenuItem key={i} eventKey={i}>
                        {team}
                      </MenuItem>))}
                  </DropdownButton>
                </ButtonGroup>
                <p></p>
              </div>
              <p></p>
              <Button className="teamInput-submit-button" bsStyle="warning" name="Confirm" onClick={this.handleSubmit.bind(this)}>Confirm & Submit</Button>
              </center>
              <p></p>
            </div> : '' }
            <p></p>
            { this.props.currentUser ?
            <div>
              {this.renderNextMatchs()}
            </div>
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
  Meteor.subscribe('nextMatchs');
  Meteor.subscribe('teams');
  return {
    nextMatchs: NextMatchs.find({}, {sort: {score: -1 }}).fetch(),
    teams: Teams.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: NextMatchs.find({ checked: { $ne: false } }).count(),
    currentUser: Meteor.user(),
  };
})(nextMatchInput);
