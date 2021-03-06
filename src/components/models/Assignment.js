import ApplicationRecord from './ApplicationRecord'
import { attr, belongsTo, hasMany } from 'spraypaint'

const Assignment = ApplicationRecord.extend({
  static: {
    jsonapiType: 'assignments',
  },
  attrs: {
    score: attr(),
    issue: attr(),
    personId: attr(),
    studentEnrollmentId: attr(),
    homeworkId: attr(),
    turnedIn: attr(),
    createdAt: attr(),
    overdue: attr(),
    completed: attr(),

    person: belongsTo(),
    studentEnrollment: belongsTo(),
    homework: belongsTo(),
    assignmentEvents: hasMany(),
  },
})

Assignment.prototype.scoreInfo = function () {
  return Assignment.scoreInfo(this.score)
}

Assignment.minimumAcceptableScore = 2

Assignment.graded = function (score) {
  return score > 0
}

Assignment.needsGrade = function (score) {
  return !Assignment.graded(score)
}

Assignment.scoreInfo = function (score) {
  return Assignment.graded(score) ? Assignment.scoreInfos[parseInt(score)] : Assignment.noScore
}

Assignment.noScore = {
  title: 'Not Graded',
  progressReportTitle: 'Not Completed',
  style: {
    iconColor: 'black',
    buttonColor: 'white',
    textColor: 'black',
    progressReportTextColor: 'white',
    progressReportBackgroundColor: 'rgb(217, 83, 79)',
  },
}

Assignment.scoreInfos = [
  {
    title: 'Unacceptable',
    style: {
      iconColor: 'black',
      buttonColor: 'white',
      textColor: 'black',
      progressReportTextColor: 'white',
      progressReportBackgroundColor: 'rgb(217, 83, 79)',
    },
  },
  {
    title: 'Needs Improvement',
    style: {
      buttonColor: 'rgb(217, 83, 79)',
      iconColor: 'rgb(217, 83, 79)',
      textColor: 'white',
    },
  },
  {
    title: 'Acceptable',
    style: {
      buttonColor: 'rgb(240, 173, 78)',
      iconColor: 'rgb(240, 173, 78)',
      textColor: 'white',
    },
  },
  {
    title: 'Meets Expectation',
    style: {
      buttonColor: 'rgb(49, 176, 213)',
      iconColor: 'rgb(49, 176, 213)',
      textColor: 'white',
    },
  },
  {
    title: 'Exceeds Expectation',
    style: {
      buttonColor: 'rgb(51, 122, 183)',
      iconColor: 'rgb(51, 122, 183)',
      textColor: 'white',
    },
  },
]

export default Assignment
