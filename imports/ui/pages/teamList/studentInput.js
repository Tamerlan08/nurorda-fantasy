import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Table, DropdownButton, ButtonGroup } from 'react-bootstrap';
import { Students } from '../../../api/students.js';
import { Button , Grid, Row, Col, Clearfix} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TeamInput from './teamInput.js'
import { Teams } from '../../../api/teams.js';
import Team from '../../components/Team/Team.js';
import Student from './Student.js';
import Navigation from '../../components/Navigation/Navigation';

 class Writing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
      selectedOptionTeam: "Select team",
    }
  };

  handleSelect(eventKey, event) {
    const teams = this.props.teams.map ((team) => team.teamName)
    this.setState({ selectedOptionTeam: teams[eventKey] });
  }

  handleSubmit(event) {
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

}

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
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
        <center>
          <h1 className="StudentTitle">Add Student</h1>
            <div className="StudentSurname">
              <form className="Surname">
                <input className="input-Surname"
                  type="text"
                  ref="Surname"
                  placeholder="Surname"
                  align="right"
                />
              </form>
            </div>
            <div className="StudentName">
              <form className="Name">
                <input className="input-Name"
                  type="text"
                  ref="Name"
                  placeholder= "Name"
                  align="middle"
                />
              </form>
            </div>
            <div className="StudentGrade">
              <form className="Grade">
                <input className="input-Grade"
                  type="text-center"
                  ref="Grade"
                  placeholder="Grade"
                  align="left"
                />
              </form>
            </div>
            <div className="StudentTeam">
            <ButtonGroup justified className="StudentTeamDropdown">
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
              <div className="StudentSubmit">
                <Button className="student-submit-button" bsStyle="warning" name="Confirm" onClick={this.handleSubmit.bind(this)}>Confirm & Submit</Button>
              </div>
            </center>
          <p></p>
          <div className="StudentTable">
            <Table bordered condensed className="table">
              <thead>
                <tr>
                  <td><strong>Surname</strong></td>
                  <td><strong>Name</strong></td>
                  <td><strong>Grade</strong></td>
                  <td><strong>Team</strong></td>
                  <td><strong>First Round</strong></td>
                  <td><strong>Second Round</strong></td>
                  <td><strong>Third Round</strong></td>
                  <td><strong>Quarter Final</strong></td>
                  <td><strong>Semi Final</strong></td>
                  <td><strong>Final Round</strong></td>
                  <td><strong>Average</strong></td>
                  <td><strong>Total Points</strong></td>
                  <td><strong> EDIT </strong></td>
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
  Meteor.subscribe('teams');
  return {
    students: Students.find({}, { sort: { createdAt: -1 } }).fetch(),
    teams: Teams.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Students.find({ checked: { $ne: false } }).count(),
    currentUser: Meteor.user(),
  };

})(Writing);
