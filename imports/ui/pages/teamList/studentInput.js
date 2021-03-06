import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Button , Grid, Row, Col, Clearfix} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Table, DropdownButton, ButtonGroup } from 'react-bootstrap';
import { Students } from '../../../api/students.js';
import { Players } from '../../../api/players.js';
import { Teams } from '../../../api/teams.js';
import TeamInput from './teamInput.js'
import Team from '../../components/Team/Team.js';
import Student from '../../components/Student/Student.js';
import getUserProfile from '../../../modules/get-user-profile';
import { Roles } from 'meteor/alanning:roles';
import Navigation from '../../components/Navigation/Navigation';

 class Writing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formActive: false,
      hideCompleted: false,
      selectedOptionTeam: "Select team",
    }
  };

  handleSelect(eventKey, event) {
    const teams = this.props.teams.map ((team) => team.teamName)
    this.setState({ selectedOptionTeam: teams[eventKey] });
  }

  handleSubmit(event) {
    const name1 = ReactDOM.findDOMNode(this.refs.Name).value.trim();
    const surname1 = ReactDOM.findDOMNode(this.refs.Surname).value.trim();
    const grade1 = ReactDOM.findDOMNode(this.refs.Grade).value.trim();
    if ( name1 == ""){
      Bert.alert("Please enter all required details!", 'danger')
    } else if ( surname1 == ""){
      Bert.alert("Please enter all required details!", 'danger')
    } else if ( grade1 == ""){
      Bert.alert("Please enter all required details!", 'danger')
    } else if ( this.state.selectedOptionTeam == "Select team"){
      Bert.alert("Please enter all required details!", 'danger')
    } else {
    event.preventDefault();

    // Find the text field via the React ref
    const name = ReactDOM.findDOMNode(this.refs.Name).value.trim();
    const surname = ReactDOM.findDOMNode(this.refs.Surname).value.trim();
    const grade = ReactDOM.findDOMNode(this.refs.Grade).value.trim();
    const team = this.state.selectedOptionTeam;

    Meteor.call('students.insert', surname,name,grade,team);

    // Clear form
    ReactDOM.findDOMNode(this.refs.Surname).value = '';
    ReactDOM.findDOMNode(this.refs.Name).value = '';
    ReactDOM.findDOMNode(this.refs.Grade).value= '';
    this.setState({ selectedOptionTeam: "Select team" });
  }}

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  rating() {
    const players = Players.find({ owner: this.props.currentUser._id }).fetch();
    const num = Players.find({ owner: this.props.currentUser._id }).count();
    Meteor.call('students.userRating', this.props.currentUser._id, players, num);
  }

  displayAdmin(){
    this.setState({
      formActive: !this.state.formActive,
    });
  }

  renderStudents() {
    let filteredStudents = this.props.students;
    if (this.state.hideCompleted) {
      filteredStudents = filteredStudents.filter(student => !Student.checked);
    }
    return filteredStudents.map((student) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = student.owner === currentUserId;

      return (
        <Student
          key={student._id}
          student={student}
          userId={this.props.user._id}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }


  render() {
    const teams = this.props.teams.map ((team) => team.teamName)
    const {selectedOption} = this.state;
    return (
      <div className="StudentGrid">
        <div className="page-header clearfix">
          <h4 className="pull-left">Player List {Roles.userIsInRole(this.props.userId, 'admin') ? <span className="headertext" onClick={this.displayAdmin.bind(this)}>Forms</span>:""}</h4>
        </div>
        <div className={this.state.formActive ? "display":"hide"}>
          <form>
            <input className="form"
              type="text"
              ref="Surname"
              placeholder="Surname"
              align="right"
            />
          </form>
          <form>
            <input className="form"
              type="text"
              ref="Name"
              placeholder= "Name"
              align="middle"
            />
          </form>
          <form>
            <input className="form"
              type="text-center"
              ref="Grade"
              placeholder="Grade"
              align="left"
            />
          </form>
        <ButtonGroup justified className="dropdown">
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
        <Button className="form" bsStyle="warning" name="Confirm" onClick={this.handleSubmit.bind(this)}>Confirm & Submit</Button>
        </div>
        <div className="StudentTable">
          <Table bordered condensed className="table">
            <thead>
              <tr>
                <td><strong>Surname</strong></td>
                <td><strong>Name</strong></td>
                <td><strong>Grade</strong></td>
                <td><strong>Team</strong></td>
                <td><strong>First Match</strong></td>
                <td><strong>Second Match</strong></td>
                <td><strong>Third Match</strong></td>
                <td><strong>Quarter Final</strong></td>
                <td><strong>Semi Final</strong></td>
                <td><strong>Final Match</strong></td>
                <td><strong>Average</strong></td>
                <td><strong>Total Points</strong></td>
                {Roles.userIsInRole(this.props.userId, 'admin') ?
                <td><strong> EDIT </strong></td>:""}
              </tr>
            </thead>
            <tbody>
                {this.renderStudents()}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('students');
  Meteor.subscribe('players');
  Meteor.subscribe('teams');
  return {
    user: getUserProfile(Meteor.users.findOne({ _id: Meteor.userId() })),
    students: Students.find({}, { sort: { average: -1 } }).fetch(),
    players: Players.find({}, { sort: { createdAt: -1 } }).fetch(),
    teams: Teams.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Students.find({ checked: { $ne: false } }).count(),
    currentUser: Meteor.user(),
  };

})(Writing);
