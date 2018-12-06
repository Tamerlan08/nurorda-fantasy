import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Table, DropdownButton, Badge } from 'react-bootstrap';
import { Button , Grid, Row, Col, Clearfix} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Navigation from '../../components/Navigation/Navigation';
import Select from 'react-select';
import StudentInput from './studentInput.js'
import { Students } from '../../../api/students.js';
import Student from './Student.js';
import { Stores } from '../../../api/stores.js';
import Store from './StorePublic.js';
import getUserProfile from '../../../modules/get-user-profile';


class StoreInputPublic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
      selectedOptionStudent: "Select student",
    }
  };

  handleSelectStudent(eventKey, event) {
    const students = this.props.students.map ((student) => student.name)
    this.setState({ selectedOptionStudent: students[eventKey] });
  }

  OnehandleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const studentPrice = ReactDOM.findDOMNode(this.refs.studentPrice).value.trim();
    const studentName = this.state.selectedOptionStudent;

    Meteor.call('stores.insert', studentName, studentPrice);

    // Clear form
 ReactDOM.findDOMNode(this.refs.studentPrice).value = '';
}

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderStores() {
    let filteredStores = this.props.stores;
    if (this.state.hideCompleted) {
      filteredStores = filteredStores.filter(store => !Store.checked);
    }
    return filteredStores.map((store) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = store.owner === currentUserId;

      return (
        <Store
          key={store._id}
          store={store}
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
        <div className="StoreMain">
          <center>
            <h1>Transfer Market</h1>
            <h4>Balance available: <Badge>{user.defaultMoney}M</Badge></h4>
          </center>
          <p></p>
        </div>
        <p></p>
        <div className="DIV-studentPrice">
          {this.renderStores()}
        </div>
        <div className="hiddenContent">
          <StudentInput />
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('stores');
  Meteor.subscribe('students');
  return {
    user: getUserProfile(Meteor.users.findOne({ _id: Meteor.userId() })),
    stores: Stores.find({}, { sort: { createdAt: -1 } }).fetch(),
    students: Students.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };

})(StoreInputPublic);