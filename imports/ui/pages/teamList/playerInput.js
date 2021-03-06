import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Table, DropdownButton, Badge, ButtonGroup } from 'react-bootstrap';
import { Button , Grid, Row, Col, Clearfix} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Navigation from '../../components/Navigation/Navigation';
import Select from 'react-select';
import StudentInput from './studentInput.js'
import { Students } from '../../../api/students.js';
import { Players } from '../../../api/players.js';
import Player from '../../components/Player/Player.js';
import { Stores } from '../../../api/stores.js';
import { Roles } from 'meteor/alanning:roles';
import getUserProfile from '../../../modules/get-user-profile';

class PlayerInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
      selectedOptionStudent: "Select student",
    }
  };
  updateButton(){
    Meteor.call('stores.updatebutton', this.props.store._id, this.props.user._id);
  }
  handleSelectStudent(eventKey, event) {
    const students = this.props.students.map ((student) => student.name)
    this.setState({ selectedOptionStudent: students[eventKey] });
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const studentPrice = ReactDOM.findDOMNode(this.refs.studentPrice).value.trim();
    const studentName = this.state.selectedOptionStudent;
    Meteor.call('players.insert', studentName, studentPrice);

    // Clear form
 ReactDOM.findDOMNode(this.refs.studentPrice).value = '';
}

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderPlayers() {
    let filteredPlayers = this.props.players;
    if (this.state.hideCompleted) {
      filteredPlayers = filteredPlayers.filter(player => !Player.checked);
    }
    return filteredPlayers.map((player) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = player.owner === currentUserId;

      return (
        <Player
          key={player._id}
          player={player}
          user={this.props.user}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  render() {
    const students = this.props.students.map ((student) => student.name)
    const {selectedOption} = this.state;
    const { user } = this.props;

    return (
      <div>
      <div className="page-header clearfix">
      <h4 className="pull-left">My Team Players</h4>
      <h4 className="pull-left"><span className="headertext">Balance: {this.props.user.defaultMoney}</span> <span className="headertext">Players: {this.props.user.players}</span></h4>
      </div>
        {Roles.userIsInRole(this.props.user._id, 'admin') ?
        <div>
          <h3>Page is empty!</h3>
          <h3>Admin accounts can not have thier own team.</h3>
        </div>:
        <div className="DIV-studentPrice">
            {this.renderPlayers()}
        </div>}
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('stores');
  Meteor.subscribe('players');
  Meteor.subscribe('students');
  return {
    user: getUserProfile(Meteor.users.findOne({ _id: Meteor.userId() })),
    stores: Stores.find({}, { sort: { createdAt: -1 } }).fetch(),
    players: Players.find({}, { sort: { createdAt: -1 } }).fetch(),
    students: Students.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };

})(PlayerInput);
