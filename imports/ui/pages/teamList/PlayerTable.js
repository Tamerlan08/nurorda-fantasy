import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Table, DropdownButton, Badge, ButtonGroup } from 'react-bootstrap';
import { Button , Grid, Row, Col, Clearfix} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Navigation from '../../components/Navigation/Navigation';
import Select from 'react-select';
import StudentInput from './studentInput.js'
import { Students } from '../../../api/students.js';
import { Players } from '../../../api/players.js';
import Player from '../../components/PlayerTable/PlayerTable.js';
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

  renderPlayers1() {
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
    const checkPlayers = this.props.players.map((player) => player._id)
    return (
      <div>
        {checkPlayers=="" ?
        <div>
        <h3>You don't have players in your team</h3>
        <p>Try buying them from <LinkContainer to="/store"><a>Transfer Market</a></LinkContainer>!</p>
        </div>:
        <div>
        <div className="page-header clearfix">
        <h4 className="pull-left">Players of my team</h4>
        </div>
          <Table bordered condensed>
            <thead>
              <tr>
                <td><strong>Name</strong></td>
                <td><strong>Price</strong></td>
              </tr>
            </thead>
            <tbody>
              {this.renderPlayers1()}
            </tbody>
          </Table>
        </div>}
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('players');
  Meteor.subscribe('students');
  return {
    user: getUserProfile(Meteor.users.findOne({ _id: Meteor.userId() })),
    players: Players.find({}, { sort: { createdAt: -1 } }).fetch(),
    students: Students.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };

})(PlayerInput);
