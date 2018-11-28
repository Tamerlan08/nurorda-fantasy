import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Button, Table } from 'react-bootstrap';
import { Students } from '../../../api/students.js';
// Student component - represents a single todo item
export default class Student extends Component {

  render() {
    // Give students a different className when they are checked off,
    // so that we can style them nicely in CSS
    const studentClassName = classnames({
      checked: this.props.student.checked,
      private: this.props.student.private,
    });

    return (
            <tr>
              <td>{this.props.student.surname}</td>
              <td>{this.props.student.name}</td>
              <td>{this.props.student.grade}</td>
              <td>{this.props.student.team}</td>
              <td>{this.props.student.score}</td>
              <td>{this.props.student.scoreSecond}</td>
              <td>{this.props.student.scoreThird}</td>
              <td>{this.props.student.scoreFourth}</td>
              <td>{this.props.student.scoreFifth}</td>
              <td>{this.props.student.scoreSix}</td>
              <td>{this.props.student.averageScore}</td>
              <td>{this.props.student.totalScore}</td>
            </tr>
    );
  }
}
