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
      formActive: false,
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
    const scoredOne1 = ReactDOM.findDOMNode(this.refs.ScoredOne).value.trim();
    const scoredTwo1 = ReactDOM.findDOMNode(this.refs.ScoredTwo).value.trim();
    if (this.state.selectedOptionSeason == "Select season"){
      Bert.alert("Please enter all required details!", 'danger')
    } else if (this.state.selectedOptionRound == "Select round"){
      Bert.alert("Please enter all required details!", 'danger')
    } else if (this.state.selectedOptionTeamOne == "Select team"){
      Bert.alert("Please enter all required details!", 'danger')
    } else if (this.state.selectedOptionTeamTwo == "Select team"){
      Bert.alert("Please enter all required details!", 'danger')
    } else if ( scoredOne1 == ""){
      Bert.alert("Please enter all required details!", 'danger')
    } else if ( scoredTwo1 == ""){
      Bert.alert("Please enter all required details!", 'danger')
    } else {
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
    this.setState({ selectedOptionSeason: "Select season" });
    this.setState({ selectedOptionRound: "Select round" });
    this.setState({ selectedOptionTeamOne: "Select team" });
    this.setState({ selectedOptionTeamTwo: "Select team" });

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
              <div className="page-header clearfix">
              <h4 className="pull-left">Matches {Roles.userIsInRole(this.props.userId, 'admin') ? <span className="headertext" onClick={this.displayAdmin.bind(this)}>Forms</span>:""}</h4>
              </div>
              <div className={this.state.formActive ? "display":"hide"}>
                <ButtonGroup justified className="dropdown">
                  <DropdownButton
                    title={this.state.selectedOptionSeason}
                    id="document-type"
                    onSelect={this.handleSelectSeason.bind(this)}>
                      <MenuItem eventKey={'Fall Season'}>
                        Fall Season
                      </MenuItem>
                      <MenuItem eventKey={'Winter Season'}>
                        Winter Season
                      </MenuItem>
                      <MenuItem eventKey={'Spring Season'}>
                        Spring Season
                      </MenuItem>
                  </DropdownButton>
                </ButtonGroup>
                <ButtonGroup justified className="dropdown">
                  <DropdownButton
                    title={this.state.selectedOptionRound}
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
                      <MenuItem eventKey={'Quarter-final'}>
                        Quarter Final
                      </MenuItem>
                      <MenuItem eventKey={'Semi-final'}>
                        Semi Final
                      </MenuItem>
                      <MenuItem eventKey={'Final Match'}>
                        Final Match
                      </MenuItem>
                  </DropdownButton>
                </ButtonGroup>
                  <ButtonGroup justified className="dropdown">
                    <DropdownButton
                      title={this.state.selectedOptionTeamOne}
                      id="document-type"
                      onSelect={this.handleSelectFirst.bind(this)}>
                      {teams.map((team, i) => (
                        <MenuItem key={i} eventKey={i}>
                          {team}
                        </MenuItem>))}
                    </DropdownButton>
                  </ButtonGroup>
                  <form>
                    <input className="form"
                      type="number"
                      ref="ScoredOne"
                      placeholder="First Teams Score"
                      align="left"
                    />
                  </form>
                  <ButtonGroup justified className="dropdown">
                    <DropdownButton
                      title={this.state.selectedOptionTeamTwo}
                      id="document-type"
                      onSelect={this.handleSelectSecond.bind(this)}>
                      {teams.map((team, i) => (
                        <MenuItem key={i} eventKey={i}>
                          {team}
                        </MenuItem>))}
                    </DropdownButton>
                  </ButtonGroup>
                  <form>
                    <input className="form"
                      type="number"
                      ref="ScoredTwo"
                      placeholder= "Second Teams Score"
                      align="right"
                    />
                  </form>
                <Button bsStyle="warning" className="form" onClick={this.OnehandleSubmit.bind(this)}>Confirm & Submit</Button>
              </div>
            <Table bordered condensed>
              <thead>
                <tr>
                  <td><strong>Season</strong></td>
                  <td><strong>Match</strong></td>
                  <td><strong>team1/team2</strong></td>
                  <td><strong> EDIT </strong></td>
                </tr>
              </thead>
              <tbody>
                  {this.renderMatchs()}
              </tbody>
            </Table>
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
