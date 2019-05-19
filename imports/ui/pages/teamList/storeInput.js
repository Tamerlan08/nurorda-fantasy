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
import { Stores } from '../../../api/stores.js';
import PlayerInput from './playerInput.js';
import StudentInput from './studentInput.js';
import { Players } from '../../../api/players.js';
import { Roles } from 'meteor/alanning:roles';
import getUserProfile from '../../../modules/get-user-profile';

class StoreInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formActive: false,
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
            <div className="studentPrice-2ndDIV">
              <center>
              <p>Players Name: <strong>{store.studentName}</strong></p>
              <p>Players Price: <strong>{store.studentPrice}M</strong></p>
              <p>
              <Button bsStyle="success" className="BuyButton" onClick={() => this.buyPlayer(store._id)}>
              Buy
              </Button>
              <Button bsStyle="danger" className="SellButton" disabled>
              Sell
              </Button>
              </p>
              <hr></hr>
              <p>Options to Modify</p>
              <p>

              <Button bsStyle="danger" className="delete" onClick={() => this.deleteThisStore(store._id)}>
                DELETE
              </Button>
              </p>
              <p>
              <Button bsStyle="info" bsSize="xsmall" onClick={() => this.minus10M(store._id)}>
              -10M
              </Button>
              <Button bsStyle="info" bsSize="xsmall" onClick={() => this.minus1M(store._id)}>
              -1M
              </Button>
              <Button bsStyle="info" bsSize="xsmall" onClick={() => this.plus1M(store._id)}>
              +1M
              </Button>
              <Button bsStyle="info" bsSize="xsmall" onClick={() => this.plus10M(store._id)}>
              +10M
              </Button>
              </p>
            </center>
          </div>
        </div>) :
        (<div key={store._id}>
          <div className="studentPrice-2ndDIV">
            <center>
            <p>Players Name: <strong>{store.studentName}</strong></p>
            <p>Players Price: <strong>{store.studentPrice}M</strong></p>
            <p>
            <Button bsStyle="success" className="BuyButton" onClick={() => this.buyPlayer(store._id)}>
            Buy
            </Button>
            </p>
          </center>
        </div>
      </div>)
      )
      })
  }

  deleteThisStore(storeid) {
    Meteor.call('stores.remove', storeid);
  }
  plus10M(storeid){
    Meteor.call('stores.plus10M', storeid);
  }
  minus10M(storeid){
    Meteor.call('stores.minus10M', storeid);
  }
  plus1M(storeid){
    Meteor.call('stores.plus1M', storeid);
  }
  minus1M(storeid){
    Meteor.call('stores.minus1M', storeid);
  }
  buyPlayer(toBuyPlayer){
    console.log(toBuyPlayer)
    const store = Stores.findOne(toBuyPlayer);
    const user = getUserProfile(Meteor.users.findOne({ _id: Meteor.userId() }));
    const players = Players.find({owner: Meteor.userId}).fetch();
    const playeridmap = players.map((player) => player._id);
    if (user.players >= 6){
      Bert.alert("6 is maximal player count in one team")
    } else {
    if (playeridmap == ""){
      if (user.defaultMoney >= store.studentPrice) {
      Meteor.call('stores.transfer-testbuy', store._id, user._id);
      event.preventDefault();
      const studentid = store._id;
      const studentPrice = store.studentPrice;
      const studentName = store.studentName;
      Meteor.call('players.insert', studentid, studentName, studentPrice);
      Bert.alert("Check player in your team!", 'success')
      } else {
        Bert.alert("You dont have enough money!", 'danger')
      }
    } else if (playeridmap.includes(toBuyPlayer)){
      Bert.alert("Player is already in your team")
    } else {
      if (user.defaultMoney >= store.studentPrice) {
      Meteor.call('stores.transfer-testbuy', store._id, user._id);
      event.preventDefault();
      const studentid = store._id;
      const studentPrice = store.studentPrice;
      const studentName = store.studentName;
      Meteor.call('players.insert', studentid, studentName, studentPrice);
      Bert.alert("Check player in your team!", 'success')
    } else {
      Bert.alert("You dont have enough money!", 'danger')
    }
  }}}
  displayAdmin(){
    this.setState({
      formActive: !this.state.formActive,
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
                <div className="page-header clearfix">
                <h4 className="pull-left">Transfer Market</h4>
                <h4 className="pull-left"><span className="headertext">Balance: {this.props.user.defaultMoney}</span> <span className="headertext">Players: {this.props.user.players}</span> {Roles.userIsInRole(this.props.userId, 'admin') ? <span className="headertext" onClick={this.displayAdmin.bind(this)}>Forms</span>:""}</h4>
                </div>
                {
                  Roles.userIsInRole(this.props.userId, 'admin') ?
                  (<div className={this.state.formActive ? "display":"hide"}>
                  <ButtonGroup justified className="dropdown">
                    <DropdownButton
                      title={this.state.selectedOptionStudent}
                      id="document-type"
                      onSelect={this.handleSelectStudent.bind(this)}>
                       {students.map((student, i) => (
                       <MenuItem key={i} eventKey={i}>
                         {student}
                       </MenuItem>))}
                    </DropdownButton>
                  </ButtonGroup>
                  <form>
                     <input className="form"
                       type="number"
                       min={0}
                       ref="studentPrice"
                       placeholder="Student Price"
                       align="left"
                       />
                  </form>
                  <Button bsStyle="warning" className="form" onClick={this.OnehandleSubmit.bind(this)}>Confirm & Submit</Button>
                  </div>
                  ) : ""
                }
              </div> : '' }
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
