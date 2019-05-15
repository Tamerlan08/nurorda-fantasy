import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Players } from './players.js'

export const Students = new Mongo.Collection('students');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish students that are public or belong to the current user
  Meteor.publish('students', function studentsPublication() {
    return Students.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'students.insert'(surname, name, grade, team) {
    check(surname, String);
    check(name, String);
    check(grade, String);
    check(team, String);

    // Make sure the user is logged in before inserting a student
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Students.insert({
      surname,
      name,
      grade,
      team,
      isAvailable1: false,
      isAvailable2: false,
      isAvailable3: false,
      isAvailable4: false,
      isAvailable5: false,
      isAvailable6: false,
      averageNumber: 0,
      average: parseFloat(0.00),
      score: 0,
      scoreSecond: 0,
      scoreThird: 0,
      scoreFourth: 0,
      scoreFifth: 0,
      scoreSix: 0,
      totalScore: 0,
      averageScore: 0,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },

  // 'students.minusscoreSix'(studentId) {
  //   check(studentId, String)
  //   const student = Students.findOne(studentId);
  //   student.scoreSix = student.scoreSix - 1,
  //   student.totalScore = student.totalScore - 1,
    // student.averageScore = student.totalScore / 6,
    // Students.update(studentId , { $set: { scoreSix:student.scoreSix }});
    // Students.update(studentId , { $set: { totalScore:student.totalScore }});
    // Students.update(studentId , { $set: { averageScore:student.averageScore }});
  // },  NORM EXAMPLE
  'students.averageNumber'(studentId) {
    check(studentId, String)
    const student = Students.findOne(studentId);
    if (student.scoreSix == 0){
      student.isAvailable6 = 0;
    } else {
      student.isAvailable6 = 1;
    }
    if (student.scoreFifth == 0){
      student.isAvailable5 = 0;
    } else {
      student.isAvailable5 = 1;
    }
    if (student.scoreFourth == 0){
      student.isAvailable4 = 0;
    } else {
      student.isAvailable4 = 1;
    }
    if (student.scoreThird == 0){
      student.isAvailable3 = 0;
    } else {
      student.isAvailable3 = 1;
    }
    if (student.scoreSecond == 0){
      student.isAvailable2 = 0;
    } else {
      student.isAvailable2 = 1;
    }
    if (student.score == 0){
      student.isAvailable1 = 0;
    } else {
      student.isAvailable1 = 1;
    }
    student.averageNumber = student.isAvailable1 + student.isAvailable2 + student.isAvailable3 + student.isAvailable4 + student.isAvailable5 + student.isAvailable6;
    if(student.averageNumber == 0){
      student.averageNumber = 1;
    }
    console.log("Average Number:", student.averageNumber)
    Students.update(studentId , { $set: { averageNumber:student.averageNumber }});
  },

  'students.userRating'(userId, players, num) {
    check(userId, String);
    check(players, Array);
    check(num, Number);
    const user = Meteor.users.findOne({ _id: userId });
    let num2 = 0;
    const averageNum = num;
    const students = Students.find().fetch();
    const playerIds = players.map((player) => player.studentName);
    const studentIds = students.map((student) => student.surname + " " + student.name);
    rating = 0;
    if(num == 0){
      userrating = 0;
    } else {
    while (num-1 >= num2){
      var array = playerIds[num2].split(" ");
      const average = Students.findOne({ surname: array[0], name: array[1]}).average;
      rating += parseFloat(average);
      num2 += 1;
    }
    userrating = rating / averageNum;
    userrating = userrating.toFixed(2);
    }
    Meteor.users.update(userId, { $set: {rating: userrating} });
  },

  'students.averageCalculate'(studentId) {
    check(studentId, String)
    const student = Students.findOne(studentId);
    student.average = student.totalScore / student.averageNumber;
    student.average = student.average.toFixed(2),
    console.log("Average:", student.average)
    Students.update(studentId , { $set: { average:student.average }});
  },

  'students.addscoreSix'(studentId) {
    check(studentId, String)
    const student = Students.findOne(studentId);
    student.scoreSix = student.scoreSix + 1,
    student.totalScore = student.totalScore + 1,
    student.averageScore = student.totalScore / 6,
    student.averageScore = student.averageScore.toFixed(2),
    Students.update(studentId , { $set: { scoreSix:student.scoreSix }});
    Students.update(studentId , { $set: { totalScore:student.totalScore }});
    Students.update(studentId , { $set: { averageScore:student.averageScore }});
   },

  'students.minusscoreSix'(studentId) {
    check(studentId, String)
    const student = Students.findOne(studentId);
    student.scoreSix = student.scoreSix - 1,
    student.totalScore = student.totalScore - 1,
    student.averageScore = student.totalScore / 6,
    student.averageScore = student.averageScore.toFixed(2),
    Students.update(studentId , { $set: { scoreSix:student.scoreSix }});
    Students.update(studentId , { $set: { totalScore:student.totalScore }});
    Students.update(studentId , { $set: { averageScore:student.averageScore }});
  },

  'students.addscoreFifth'(studentId) {
    check(studentId, String)
    const student = Students.findOne(studentId);
    student.scoreFifth = student.scoreFifth + 1,
    student.totalScore = student.totalScore + 1,
    student.averageScore = student.totalScore / 6,
    student.averageScore = student.averageScore.toFixed(2),
    Students.update(studentId , { $set: { scoreFifth:student.scoreFifth }});
    Students.update(studentId , { $set: { totalScore:student.totalScore }});
    Students.update(studentId , { $set: { averageScore:student.averageScore }});
  },

  'students.minusscoreFifth'(studentId) {
    check(studentId, String)
    const student = Students.findOne(studentId);
    student.scoreFifth = student.scoreFifth - 1,
    student.totalScore = student.totalScore - 1,
    student.averageScore = student.totalScore / 6,
    student.averageScore = student.averageScore.toFixed(2),
    Students.update(studentId , { $set: { scoreFifth:student.scoreFifth }});
    Students.update(studentId , { $set: { totalScore:student.totalScore }});
    Students.update(studentId , { $set: { averageScore:student.averageScore }});
  },

  'students.addscoreFourth'(studentId) {
    check(studentId, String)
    const student = Students.findOne(studentId);
    student.scoreFourth = student.scoreFourth + 1,
    student.totalScore = student.totalScore + 1,
    student.averageScore = student.totalScore / 6,
    student.averageScore = student.averageScore.toFixed(2),
    Students.update(studentId , { $set: { scoreFourth:student.scoreFourth }});
    Students.update(studentId , { $set: { totalScore:student.totalScore }});
    Students.update(studentId , { $set: { averageScore:student.averageScore }});
  },

  'students.minusscoreFourth'(studentId) {
    check(studentId, String)
    const student = Students.findOne(studentId);
    student.scoreFourth = student.scoreFourth - 1,
    student.totalScore = student.totalScore - 1,
    student.averageScore = student.totalScore / 6,
    student.averageScore = student.averageScore.toFixed(2),
    Students.update(studentId , { $set: { scoreFourth:student.scoreFourth }});
    Students.update(studentId , { $set: { totalScore:student.totalScore }});
    Students.update(studentId , { $set: { averageScore:student.averageScore }});
  },

  'students.addscoreThird'(studentId) {
    check(studentId, String)
    const student = Students.findOne(studentId);
    student.scoreThird = student.scoreThird + 1,
    student.totalScore = student.totalScore + 1,
    student.averageScore = student.totalScore / 6,
    student.averageScore = student.averageScore.toFixed(2),
    Students.update(studentId , { $set: { scoreThird:student.scoreThird }});
    Students.update(studentId , { $set: { totalScore:student.totalScore }});
    Students.update(studentId , { $set: { averageScore:student.averageScore }});
  },

  'students.minusscoreThird'(studentId) {
    check(studentId, String)
    const student = Students.findOne(studentId);
    student.scoreThird = student.scoreThird - 1,
    student.totalScore = student.totalScore - 1,
    student.averageScore = student.totalScore / 6,
    student.averageScore = student.averageScore.toFixed(2),
    Students.update(studentId , { $set: { scoreThird:student.scoreThird }});
    Students.update(studentId , { $set: { totalScore:student.totalScore }});
    Students.update(studentId , { $set: { averageScore:student.averageScore }});
  },

  'students.addscoreSecond'(studentId) {
    check(studentId, String)
    const student = Students.findOne(studentId);
    student.scoreSecond = student.scoreSecond + 1,
    student.totalScore = student.totalScore + 1,
    student.averageScore = student.totalScore / 6,
    student.averageScore = student.averageScore.toFixed(2),
    Students.update(studentId , { $set: { scoreSecond:student.scoreSecond }});
    Students.update(studentId , { $set: { totalScore:student.totalScore }});
    Students.update(studentId , { $set: { averageScore:student.averageScore }});
  },

  'students.minusscoreSecond'(studentId) {
    check(studentId, String)
    const student = Students.findOne(studentId);
    student.scoreSecond = student.scoreSecond - 1,
    student.totalScore = student.totalScore - 1,
    student.averageScore = student.totalScore / 6,
    student.averageScore = student.averageScore.toFixed(2),
    Students.update(studentId , { $set: { scoreSecond:student.scoreSecond }});
    Students.update(studentId , { $set: { totalScore:student.totalScore }});
    Students.update(studentId , { $set: { averageScore:student.averageScore }});
  },

  'students.addPlus'(studentId) {
    check(studentId , String)
    const student = Students.findOne(studentId);
    student.score = student.score + 1,
    student.totalScore = student.totalScore + 1,
    student.averageScore = student.totalScore / 6,
    student.averageScore = student.averageScore.toFixed(2),
    Students.update(studentId , { $set: { score:student.score }});
    Students.update(studentId , { $set: { totalScore:student.totalScore }});
    Students.update(studentId , { $set: { averageScore:student.averageScore }});
  },

  'students.addMinus'(studentId) {
    check(studentId , String)
    const student = Students.findOne(studentId);
    student.score = student.score - 1;
    student.totalScore = student.totalScore - 1,
    student.averageScore = student.totalScore / 6,
    student.averageScore = student.averageScore.toFixed(2),
    Students.update(studentId , { $set: { score:student.score }});
    Students.update(studentId , { $set: { totalScore:student.totalScore }});
    Students.update(studentId , { $set: { averageScore:student.averageScore }});
  },

  'students.setChecked'(studentId, setChecked) {
    check(studentId, String);
    check(setChecked, Boolean);

    const student = Students.findOne(studentId);
    if (student.private && student.owner !== this.userId) {
      // If the student is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Students.update(studentId, { $set: { checked: setChecked } });
  },
  'students.setPrivate'(studentId, setToPrivate) {
    check(studentId, String);
    check(setToPrivate, Boolean);

    const student = Students.findOne(studentId);

    // Make sure only the student owner can make a student private
    if (student.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Students.update(studentId, { $set: { private: setToPrivate } });
  },
'students.remove'(studentId) {
    check(studentId, String);

    const student = Students.findOne(studentId);
    if (student.private && student.owner !== this.userId) {
      // If the student is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Students.remove(studentId);
  },

});
