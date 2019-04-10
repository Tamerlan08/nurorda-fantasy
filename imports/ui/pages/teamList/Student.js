import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Button, Table } from 'react-bootstrap';
import { Students } from '../../../api/students.js';
import { Bert } from 'meteor/themeteorchef:bert';
// Student component - represents a single todo item
export default class Student extends Component {
  deleteThisStudent() {
    Meteor.call('students.remove', this.props.student._id);
  }
  TotaladdPlus(){
    Meteor.call('students.addPlus', this.props.student._id);
    Meteor.call('students.averageNumber', this.props.student._id);
    Meteor.call('students.averageCalculate', this.props.student._id);
  }
  TotaladdMinus(){
    if (this.props.student.score > 0){
    Meteor.call('students.addMinus', this.props.student._id);
    Meteor.call('students.averageNumber', this.props.student._id);
    Meteor.call('students.averageCalculate', this.props.student._id);
    }else{
    Bert.alert('Score can not be negative!', 'danger')
    }
  }
  TotaladdTwo(){
    Meteor.call('students.addscoreSecond' , this.props.student._id);
    Meteor.call('students.averageNumber', this.props.student._id);
    Meteor.call('students.averageCalculate', this.props.student._id);
  }
  TotalminusTwo(){
    if (this.props.student.scoreSecond > 0){
    Meteor.call('students.minusscoreSecond' , this.props.student._id);
    Meteor.call('students.averageNumber', this.props.student._id);
    Meteor.call('students.averageCalculate', this.props.student._id);
  }else{
    Bert.alert('Score can not be negative!', 'danger')
    }
  }
  TotaladdThird(){
    Meteor.call('students.addscoreThird' , this.props.student._id);
    Meteor.call('students.averageNumber', this.props.student._id);
    Meteor.call('students.averageCalculate', this.props.student._id);
  }
  TotalminusThird(){
    if (this.props.student.scoreThird > 0){
    Meteor.call('students.minusscoreThird' , this.props.student._id);
    Meteor.call('students.averageNumber', this.props.student._id);
    Meteor.call('students.averageCalculate', this.props.student._id);
    }else{
    Bert.alert('Score can not be negative!', 'danger')
    }
  }
  TotaladdFourth(){
    Meteor.call('students.addscoreFourth' , this.props.student._id);
    Meteor.call('students.averageNumber', this.props.student._id);
    Meteor.call('students.averageCalculate', this.props.student._id);
  }
  TotalminusFourth(){
    if (this.props.student.scoreFourth > 0){
    Meteor.call('students.minusscoreFourth' , this.props.student._id);
    Meteor.call('students.averageNumber', this.props.student._id);
    Meteor.call('students.averageCalculate', this.props.student._id);
    }else{
    Bert.alert('Score can not be negative!', 'danger')
    }
  }
  TotaladdFifth(){
    Meteor.call('students.addscoreFifth' , this.props.student._id);
    Meteor.call('students.averageNumber', this.props.student._id);
    Meteor.call('students.averageCalculate', this.props.student._id);
  }
  TotalminusFifth(){
    if (this.props.student.scoreFifth > 0){
    Meteor.call('students.minusscoreFifth' , this.props.student._id);
    Meteor.call('students.averageNumber', this.props.student._id);
    Meteor.call('students.averageCalculate', this.props.student._id);
    }else{
    Bert.alert('Score can not be negative!', 'danger')
    }
  }
  TotaladdSix(){
    Meteor.call('students.addscoreSix' , this.props.student._id);
    Meteor.call('students.averageNumber', this.props.student._id);
    Meteor.call('students.averageCalculate', this.props.student._id);
  }
  TotalminusSix(){
    if (this.props.student.scoreSix > 0){
    Meteor.call('students.minusscoreSix' , this.props.student._id);
    Meteor.call('students.averageNumber', this.props.student._id);
    Meteor.call('students.averageCalculate', this.props.student._id);
    }else{
    Bert.alert('Score can not be negative!', 'danger')
    }
  }
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
              <td>
                <p className="title">{this.props.student.score}</p>
                <Button bsStyle="success" bsSize="xsmall" className="minus" onClick={this.TotaladdMinus.bind(this)}>
                <span className="glyphicon glyphicon-minus"></span>
                </Button>
                <Button bsStyle="success" bsSize="xsmall" className="plus" onClick={this.TotaladdPlus.bind(this)}>
                <span className="glyphicon glyphicon-plus"></span>
                </Button>
              </td>
              <td>
                <p className="title">{this.props.student.scoreSecond}</p>
                <Button bsStyle="success" bsSize="xsmall" className="minus" onClick={this.TotalminusTwo.bind(this)}>
                <span className="glyphicon glyphicon-minus"></span>
                </Button>
                <Button bsStyle="success" bsSize="xsmall" className="plus" onClick={this.TotaladdTwo.bind(this)}>
                <span className="glyphicon glyphicon-plus"></span>
                </Button>
              </td>
              <td>
                <p className="title">{this.props.student.scoreThird}</p>
                <Button bsStyle="success" bsSize="xsmall" className="minus" onClick={this.TotalminusThird.bind(this)}>
                <span className="glyphicon glyphicon-minus"></span>
                </Button>
                <Button bsStyle="success" bsSize="xsmall" className="plus" onClick={this.TotaladdThird.bind(this)}>
                <span className="glyphicon glyphicon-plus"></span>
                </Button>
              </td>
              <td>
                <p className="title">{this.props.student.scoreFourth}</p>
                <Button bsStyle="success" bsSize="xsmall" className="minus" onClick={this.TotalminusFourth.bind(this)}>
                <span className="glyphicon glyphicon-minus"></span>
                </Button>
                <Button bsStyle="success" bsSize="xsmall" className="plus" onClick={this.TotaladdFourth.bind(this)}>
                <span className="glyphicon glyphicon-plus"></span>
                </Button>
              </td>
              <td>
                <p className="title">{this.props.student.scoreFifth}</p>
                <Button bsStyle="success" bsSize="xsmall" className="minus" onClick={this.TotalminusFifth.bind(this)}>
                <span className="glyphicon glyphicon-minus"></span>
                </Button>
                <Button bsStyle="success" bsSize="xsmall" className="plus" onClick={this.TotaladdFifth.bind(this)}>
                <span className="glyphicon glyphicon-plus"></span>
                </Button>
              </td>
              <td>
                <p className="title">{this.props.student.scoreSix}</p>
                <Button bsStyle="success" bsSize="xsmall" className="minus" onClick={this.TotalminusSix.bind(this)}>
                <span className="glyphicon glyphicon-minus"></span>
                </Button>
                <Button bsStyle="success" bsSize="xsmall" className="plus" onClick={this.TotaladdSix.bind(this)}>
                <span className="glyphicon glyphicon-plus"></span>
                </Button>
              </td>
              <td>
               {this.props.student.average}
              </td>
              <td>
               {this.props.student.totalScore}
              </td>
              <td>
                <Button bsStyle="danger" className="delete" onClick={this.deleteThisStudent.bind(this)}>
                  Delete
                </Button>
              </td>
            </tr>
    );
  }
}
