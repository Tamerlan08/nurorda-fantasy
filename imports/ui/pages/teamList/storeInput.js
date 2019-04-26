import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Table, DropdownButton, Badge, ButtonGroup } from 'react-bootstrap';
import { Button , Grid, Row, Col, Clearfix} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Navigation from '../../components/Navigation/Navigation';
import Select from 'react-select';
import { Students } from '../../../api/students.js';
import Student from './Student.js';
import { Stores } from '../../../api/stores.js';
import Store from './Store.js';
import PlayerInput from './playerInput.js';
import StudentInput from './studentInput.js';
import { Players } from '../../../api/players.js';
import getUserProfile from '../../../modules/get-user-profile';


class StoreInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
      selectedOptionStudent: "Select student",
    }
    this.buyPlayer = this.buyPlayer.bind(this);
  };

  handleSelectStudent(eventKey, event) {
    const studentSurnames = this.props.students.map ((student) => student.surname)
    const studentNames = this.props.students.map ((student) => student.name)
    this.setState({ selectedOptionStudent: studentSurnames[eventKey] + " " + studentNames[eventKey] });
  }

  OnehandleSubmit(event) {
    const studentPrice1 = ReactDOM.findDOMNode(this.refs.studentPrice).value.trim();;
    if (studentPrice1 == ""){
      Bert.alert("Please enter all required details!", 'danger')
    } else if ( this.state.selectedOptionStudent == "Select student"){
      Bert.alert("Please enter all required details!", 'danger')
    } else {
    event.preventDefault();

    // Find the text field via the React ref
    const studentPrice = ReactDOM.findDOMNode(this.refs.studentPrice).value.trim();
    const studentName = this.state.selectedOptionStudent;
    Meteor.call('stores.insert', studentName, studentPrice);

    // Clear form
    ReactDOM.findDOMNode(this.refs.studentPrice).value = '';
  }}

  renderStores() {
    let stores = this.props.stores;
      return stores.map((store) => {
        return (
          Roles.userIsInRole(this.props.userId, 'admin') ?
          (<div key={store._id}>
          <center>
            <p>Players Name: <strong>{store.studentName}</strong></p>
            <p>Players Price: <strong>{store.studentPrice}M</strong></p>
            <p>
            <Button bsStyle="success" className="BuyButton" onClick={this.buyPlayer.bind(this)} disabled>
            Buy
            </Button>
            <Button bsStyle="danger" className="SellButton" onClick={this.sellPlayer.bind(this)} disabled>
            Sell
            </Button>
            </p>
            <hr></hr>
            <p>Options to Modify</p>
            <p>

            <Button bsStyle="danger" className="delete" onClick={this.deleteThisStore.bind(this)}>
              DELETE
            </Button>
            </p>
            <p>
            <Button bsStyle="info" bsSize="xsmall" onClick={this.minus10M.bind(this)}>
            -10M
            </Button>
            <Button bsStyle="info" bsSize="xsmall" onClick={this.minus1M.bind(this)}>
            -1M
            </Button>
            <Button bsStyle="info" bsSize="xsmall" onClick={this.plus1M.bind(this)}>
            +1M
            </Button>
            <Button bsStyle="info" bsSize="xsmall" onClick={this.plus10M.bind(this)}>
            +10M
            </Button>
            </p>
          </center>
        </div>) :
        (<div key={store._id}>
        <center>
          <p>Players Name: <strong>{store.studentName}</strong></p>
          <p>Players Price: <strong>{store.studentPrice}M</strong></p>
          <p>
          <Button bsStyle="success" className="BuyButton" onClick={() => this.buyPlayer(store._id)}>
          Buy
          </Button>
          </p>
          <hr></hr>
          <p>Options to Modify</p>
          <p>

          <Button bsStyle="danger" className="delete" onClick={this.deleteThisStore.bind(this)}>
            DELETE
          </Button>
          </p>
          <p>
          <Button bsStyle="info" bsSize="xsmall" onClick={this.minus10M.bind(this)}>
          -10M
          </Button>
          <Button bsStyle="info" bsSize="xsmall" onClick={this.minus1M.bind(this)}>
          -1M
          </Button>
          <Button bsStyle="info" bsSize="xsmall" onClick={this.plus1M.bind(this)}>
          +1M
          </Button>
          <Button bsStyle="info" bsSize="xsmall" onClick={this.plus10M.bind(this)}>
          +10M
          </Button>
          </p>
        </center>
      </div>)
      )
      })
  }

  deleteThisStore() {
    Meteor.call('stores.remove', this.props.store._id);
  }
  plus10M(){
    Meteor.call('stores.plus10M', this.props.store._id);
  }
  minus10M(){
    Meteor.call('stores.minus10M', this.props.store._id);
  }
  plus1M(){
    Meteor.call('stores.plus1M', this.props.store._id);
  }
  minus1M(){
    Meteor.call('stores.minus1M', this.props.store._id);
  }
  buyPlayer(toBuyPlayer){
    console.log(toBuyPlayer)
    const store = Stores.findOne(toBuyPlayer);
    const user = getUserProfile(Meteor.users.findOne({ _id: Meteor.userId() }));
    const players = Players.find({owner: Meteor.userId}).fetch();
    const playerid = players.map((player) => {
      if (player.studentid === toBuyPlayer) {
          Bert.alert("Player is already in your team!", 'danger');
      }
      else {
          console.log("#");
        if (user.defaultMoney >= store.studentPrice) {
        Meteor.call('stores.transfer-testbuy', store._id, user._id);
        event.preventDefault();
        const studentid = store._id;
        const studentPrice = store.studentPrice;
        const studentName = store.studentName;

        Meteor.call('players.insert', studentid, studentName, studentPrice);
        Bert.alert("Check player in your team!", 'success')
        }
        else {
        Bert.alert('You dont have enough money! Try selling your players to buy this one.', 'danger')
        }
      }
    });
  }

  render() {
    const students = this.props.students.map ((student) => student.surname + " " + student.name)
    const playerid = this.props.players.map ((player) => player.studentid)
    const {selectedOption} = this.state;
    const { user } = this.props;
    let stores = this.props.stores;

    return (
      <div>
        <Grid>
          <Row>
            <Col md={12}>
              { this.props.currentUser ?
              <div className="StoreMain">
                <center>
                <h2>Transfer Market</h2>
                <h4>Players in your team: <Badge>{this.props.user.players}</Badge></h4>
                <h4>Balance available: <Badge>{this.props.user.defaultMoney}</Badge></h4>
                {
                  Roles.userIsInRole(this.props.userId, 'admin') ?
                  (<div>
                  <ButtonGroup justified className="StoreStudent">
                    <DropdownButton className="dropdown-studentPrice"
                      title={this.state.selectedOptionStudent}
                      id="document-type"
                      onSelect={this.handleSelectStudent.bind(this)}>
                       {students.map((student, i) => (
                       <MenuItem key={i} eventKey={i}>
                         {student}
                       </MenuItem>))}
                    </DropdownButton>
                  </ButtonGroup>
                  <p></p>
                  <form>
                     <input className="input-studentPrice"
                       type="number"
                       min={0}
                       ref="studentPrice"
                       placeholder="Student Price"
                       align="left"
                       />
                  </form>
                  <Button bsStyle="warning" className="dropdown-submit-button" onClick={this.OnehandleSubmit.bind(this)}>Confirm & Submit</Button>
                  </div>
                  ) : ""
                }
                </center>
                <p></p>
              </div> : '' }
            <p></p>
            <div className="DIV-studentPrice">
              {
                this.renderStores()
              }
            </div>
          </Col>
        </Row>
      </Grid>
        <div className="hiddenContent">
        <PlayerInput />
        <StudentInput />
        </div>
    </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('stores');
  Meteor.subscribe('students');
  Meteor.subscribe('players');
  return {
    user: getUserProfile(Meteor.users.findOne({ _id: Meteor.userId() })),
    stores: Stores.find({}, { sort: { createdAt: -1 } }).fetch(),
    students: Students.find({}, { sort: { createdAt: -1 } }).fetch(),
    players: Players.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };

})(StoreInput);
