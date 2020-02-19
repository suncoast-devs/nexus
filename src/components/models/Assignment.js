import ApplicationRecord from './ApplicationRecord'
import { attr, belongsTo } from 'spraypaint'

const Assignment = ApplicationRecord.extend({
  static: {
    jsonapiType: 'assignments',
  },
  attrs: {
    score: attr(),
    issue: attr(),
    personId: attr(),
    homeworkId: attr(),
    completed: attr(),
    person: belongsTo(),
    homework: belongsTo(),
  },
})

Assignment.prototype.scoreInfo = function() {
  return Assignment.scoreInfo(this.score)
}

Assignment.scoreInfo = function(score) {
  return score ? Assignment.scoreInfos[parseInt(score)] : Assignment.noScore
}

Assignment.noScore = {
  title: 'Not Graded',
  style: {
    iconColor: 'black',
    buttonColor: 'white',
    textColor: 'black',
  },
}

Assignment.scoreInfos = [
  {
    title: 'Unacceptable',
    style: {
      iconColor: 'black',
      buttonColor: 'white',
      textColor: 'black',
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
