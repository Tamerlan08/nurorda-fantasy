/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role, jsx-a11y/anchor-is-valid */

import React from 'react';
import autoBind from 'react-autobind';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import SearchInput from '../../components/SearchInput/SearchInput';
import delay from '../../../modules/delay';
import { Roles } from 'meteor/alanning:roles';
import getUserProfile from '../../../modules/get-user-profile';
import { Players } from '../../../api/players.js';
import { Students } from '../../../api/students.js';

const UserRatingHeader = styled.div`
  h4 span {
    display: inline-block;
    padding: 2px 6px;
    border-radius: 3px;
    font-weight: bold;
    font-size: 15px;
    margin-left: 3px;
    background: var(--gray-lighter);
    color: var(--gray);
  }

  .SearchInput {
    float: right;
    width: 200px;
  }
`;

const StyledListGroup = styled(ListGroup)`
  margin-bottom: 0;
`;

const StyledListGroupItem = styled(ListGroupItem)`
  padding: 15px;
  position: relative;
  overflow: hidden;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 75px;
    display: block;
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,0) 0%, rgba(255,255,255,1) 100%);
  }

  &:hover {
    background: #fafafa;

    &:after {
      display: none;
    }
  }

  a {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  p {
    margin: 0;
    white-space: nowrap;

    span:not(.label) {
      color: var(--gray-light);
      margin-left: 5px;
    }

    .label {
      display: inline-block;
      position: relative;
      top: -1px;
      margin-left: 3px;
    }

    .label-facebook {
      background: var(--facebook);
      color: #fff;
    }

    .label-google {
      background: var(--google);
      color: #fff;
    }

    .label-github {
      background: var(--github);
      color: #fff;
    }
  }
`;

class UserRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      users: [],
      usersPerPage: 10,
      currentPage: 1,
      searching: false,
    };
    autoBind(this);
  }

  componentWillMount() {
    this.fetchUsers();
  }

  fetchUsers(search) {
    Meteor.call('admin.fetchUsersPublic', {
      currentPage: this.state.currentPage,
      perPage: this.state.usersPerPage,
      search,
    }, (error, response) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        this.setState({ ...response });
      }
    });
  }

  myfunction(){
    const abcdef = this.state.users.map((user) => user._id);
    const numOfUsers = abcdef.length;
    let num2 = 0
    while(numOfUsers-1 >= num2){
      const userId = abcdef[num2];
      const players = Players.find({ owner: userId }).fetch();
      const num = Players.find({ owner: userId }).count();
      Meteor.call('students.userRating', userId, players, num);
      num2 += 1;
    }
  }

  handleSearch(event) {
    event.persist();
    if (event.target.value.trim() !== '') {
      this.setState({ searching: true });
      delay(() => this.fetchUsers(event.target.value.trim()), 500);
    } else {
      this.setState({ searching: false });
      this.fetchUsers();
    }
  }

  renderPagination(totalUsers, perPage, currentPage) {
    const pages = [];
    const pagesToGenerate = Math.ceil(totalUsers / perPage);

    for (let pageNumber = 1; pageNumber <= pagesToGenerate; pageNumber += 1) {
      pages.push( // eslint-disable-line
        <li
          role="button"
          key={`pagination_${pageNumber}`}
          className={pageNumber === currentPage ? 'active' : ''}
          onClick={() => this.setState({ currentPage: pageNumber }, () => this.fetchUsers())}
          onKeyDown={() => this.setState({ currentPage: pageNumber }, () => this.fetchUsers())}
        >
          <a href="#" role="button" onClick={event => event.preventDefault()}>{pageNumber}</a>
        </li>,
      ); // eslint-disable-line
    }

    return (
      <ul className="pagination pagination-md">
        {pages}
      </ul>
    );
  }

  render() {
    const style = {}
    return (
      <div className="UserRating" onLoad={this.myfunction()}>
        <UserRatingHeader className="page-header clearfix">
          <h4 className="pull-left">User Rating {this.state.total ? <span>{this.state.total} profiles registered</span> : ''}</h4>
          <SearchInput
            placeholder="Search users..."
            onKeyUp={this.handleSearch}
          />
        </UserRatingHeader>
        <StyledListGroup>
          {this.state.users.map(({
            _id, emails, username, profile, service, rating
          }) => (
            <StyledListGroupItem key={_id}>
              <p>{profile.name.first} {profile.name.last} <span>{rating}</span></p>
            </StyledListGroupItem>
          ))}
        </StyledListGroup>
        {this.state.total && !this.state.searching && this.state.total > this.state.usersPerPage ? this.renderPagination(this.state.total, this.state.usersPerPage, this.state.currentPage) : ''}
      </div>
    );
  }
}

UserRating.propTypes = {
  // prop: PropTypes.string.isRequired,
};

export default withTracker(() => {
  Meteor.subscribe('players');
  Meteor.subscribe('students');
  return {
    players: Players.find({}, { sort: { createdAt: -1 } }).fetch(),
    students: Students.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: getUserProfile(Meteor.users.findOne({ _id: Meteor.userId() })),
  };

})(UserRating);
