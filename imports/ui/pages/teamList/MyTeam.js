import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Table, DropdownButton, Badge, ButtonGroup } from 'react-bootstrap';
import { Button , Grid, Row, Col, Clearfix} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Navigation from '../../components/Navigation/Navigation';
import Select from 'react-select';
import { Stores } from '../../../api/stores.js';
import Store from './storeInput.js'
import MyTeamRender from './MyTeamRender.js';
import getUserProfile from '../../../modules/get-user-profile';


class MyTeam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    }
  };

  renderStores() {
    let filteredStores = this.props.stores;
    if (this.state.hideCompleted) {
      filteredStores = filteredStores.filter(store => !Store.checked);
    }
    return filteredStores.map((store) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = store.owner === currentUserId;
      return (
        <MyTeamRender
          key={store._id}
          store={store}
          user={this.props.user}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <div className="page-header clearfix">
          <h4 className="pull-left">Players of my team</h4>
        </div>
        <div className="StoreMain">
          <center>
            <h4>Balance available: <Badge>{this.props.user.defaultMoney}M</Badge></h4>
          </center>
          <p></p>
        </div>
        <div className="DIV-studentPrice">
          {this.renderStores()}
        </div>
        <div className="hiddenContent">
          <Store />
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('stores');
  return {
    user: getUserProfile(Meteor.users.findOne({ _id: Meteor.userId() })),
    stores: Stores.find({}, { owner: Meteor.userId() }).fetch(),
    currentUser: Meteor.user(),
  };

})(MyTeam);
