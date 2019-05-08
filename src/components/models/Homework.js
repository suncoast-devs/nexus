import ApplicationRecord from './ApplicationRecord'
import { attr, belongsTo, hasMany } from 'spraypaint'

const Homework = ApplicationRecord.extend({
  static: {
    jsonapiType: 'homeworks'
  },
  attrs: {
    name: attr(),
    body: attr(),
    summary: attr(),
    title: attr(),
    cohort_id: attr(),
    countsTowardsCompletion: attr(),
    cohort: belongsTo(),
    assignments: hasMany()
  }
})

export default Homework
