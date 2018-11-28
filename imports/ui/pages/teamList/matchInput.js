import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Table, DropdownButton, ButtonGroup } from 'react-bootstrap';
import { Button , Grid, Row, Col, Clearfix} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TeamInput from './teamInput.js'
import { Teams } from '../../../api/teams.js';
import Team from '../../components/Team/Team.js';
import { Matchs } from '../../../api/matchs.js';
import Match from './Match.js';
import Navigation from '../../components/Navigation/Navigation';
import Select from 'react-select';

class MatchInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
      selectedOptionTeamOne: "Select team",
      selectedOptionTeamTwo: "Select team",
      selectedOptionRound: "Select round",
      selectedOptionSeason: "Select season",
    }
  };

  handleSelectSeason(event) {
    this.setState({ selectedOptionSeason: event });
  }
  handleSelectRound(event) {
    this.setState({ selectedOptionRound: event });
  }
  handleSelectFirst(eventKey, event) {
    const teams = this.props.teams.map ((team) => team.teamName)
    this.setState({ selectedOptionTeamOne: teams[eventKey] });
  }
  handleSelectSecond(eventKey, event) {
    const teams = this.props.teams.map ((team) => team.teamName)
    this.setState({ selectedOptionTeamTwo: teams[eventKey] });
  }

  OnehandleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const scoredOne = ReactDOM.findDOMNode(this.refs.ScoredOne).value.trim();
    const scoredTwo = ReactDOM.findDOMNode(this.refs.ScoredTwo).value.trim();

    const teamOne = this.state.selectedOptionTeamOne;
    const teamTwo = this.state.selectedOptionTeamTwo;
    const season = this.state.selectedOptionSeason;
    const round = this.state.selectedOptionRound;

    Meteor.call('matchs.insert', scoredOne , scoredTwo, teamOne, teamTwo, round, season);

    // Clear form
 ReactDOM.findDOMNode(this.refs.ScoredOne).value = '';
 ReactDOM.findDOMNode(this.refs.ScoredTwo).value= '';
}

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderMatchs() {
    let filteredMatchs = this.props.matchs;
    if (this.state.hideCompleted) {
      filteredMatchs = filteredMatchs.filter(match => !Match.checked);
    }
    return filteredMatchs.map((match) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = match.owner === currentUserId;

      return (
        <Match
          key={match._id}
          match={match}
          showPrivateButton={showPrivateButton}
        />
      );
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

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }

  render() {
    const round = this.props.matchs.map((match) => match.round)
    const teams = this.props.teams.map ((team) => team.teamName)
    const {selectedOption} = this.state;
    return (
      <div>
        <Grid>
          <Row>
            <Col md={12}>
              { this.props.currentUser ?
              <div className="TeamAllForms">
                <center>
                  <h1>Add Match</h1>
                    <div className="dropdown-round">
                    <h4>Match Info</h4>
                      <ButtonGroup justified className="MatchSeason">
                        <DropdownButton className="SeasonSelect"
                          title={this.state.selectedOptionSeason}
                          id="document-type"
                          onSelect={this.handleSelectSeason.bind(this)}>
                            <MenuItem eventKey={'Fall Season'}>
                              Fall Season
                            </MenuItem>
                            <MenuItem eventKey={'Winter Season'}>
                              Winter Season
                            </MenuItem>
                        </DropdownButton>
                      </ButtonGroup>
                      <p></p>
                      <ButtonGroup justified className="MatchRound">
                        <DropdownButton className="dropdownbutton-team1"
                          title={this.state.selectedOptionRound}
                          id="document-type"
                          onSelect={this.handleSelectRound.bind(this)}>
                            <MenuItem eventKey={'First Round'}>
                              First Round
                            </MenuItem>
                            <MenuItem eventKey={'Second Round'}>
                              Second Round
                            </MenuItem>
                            <MenuItem eventKey={'Third Round'}>
                              Third Round
                            </MenuItem>
                            <MenuItem eventKey={'Quarter-final'}>
                              Quarter Final
                            </MenuItem>
                            <MenuItem eventKey={'Semi-final'}>
                              Semi Final
                            </MenuItem>
                            <MenuItem eventKey={'Final'}>
                              Final Round
                            </MenuItem>
                        </DropdownButton>
                      </ButtonGroup>
                      <p></p>
                    </div>
                    <div className="dropdown-team1">
                      <h4>First Team</h4>
                        <ButtonGroup justified className="MatchTeamDropdown">
                          <DropdownButton className="dropdownbutton-team1"
                            title={this.state.selectedOptionTeamOne}
                            id="document-type"
                            onSelect={this.handleSelectFirst.bind(this)}>
                            {teams.map((team, i) => (
                              <MenuItem key={i} eventKey={i}>
                                {team}
                              </MenuItem>))}
                          </DropdownButton>
                        </ButtonGroup>
                        <p></p>
                        <form>
                          <input className="input-TeamOne"
                            type="number"
                            ref="ScoredOne"
                            placeholder="First Teams Score"
                            align="left"
                          />
                        </form>
                    </div>

                    <div className="dropdown-team2">
                      <h4>Second Team</h4>
                        <ButtonGroup justified className="MatchTeamDropdown">
                          <DropdownButton className="dropdownbutton-team2"
                            title={this.state.selectedOptionTeamTwo}
                            id="document-type"
                            onSelect={this.handleSelectSecond.bind(this)}>
                            {teams.map((team, i) => (
                              <MenuItem key={i} eventKey={i}>
                                {team}
                              </MenuItem>))}
                          </DropdownButton>
                        </ButtonGroup>
                        <p></p>
                        <form>
                          <input className="input-TeamTwo"
                            type="number"
                            ref="ScoredTwo"
                            placeholder= "Second Teams Score"
                            align="right"
                          />
                        </form>
                    </div>
                    <p></p>
                    <p></p>
                    <Button bsStyle="warning" className="dropdown-submit-button" onClick={this.OnehandleSubmit.bind(this)}>Confirm & Submit</Button>
                </center>
                <p></p>
              </div> : '' }

            <p></p>
            { this.props.currentUser ?
            <Table bordered condensed>
              <thead>
                <tr>
                  <td><strong>Season</strong></td>
                  <td><strong>Round</strong></td>
                  <td><strong>team1/team2</strong></td>
                  <td><strong> EDIT </strong></td>
                </tr>
              </thead>
              <tbody>
                  {this.renderMatchs()}
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
        <div className="hiddenContent">
        <TeamInput />
        </div>
    </div>

    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('matchs');
  Meteor.subscribe('teams');
  return {
    matchs: Matchs.find({}, { sort: { createdAt: -1 } }).fetch(),
    teams: Teams.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Matchs.find({ checked: { $ne: false } }).count(),
    incompleteCount: Teams.find({ checked: { $ne: false } }).count(),
    currentUser: Meteor.user(),
  };

})(MatchInput);
