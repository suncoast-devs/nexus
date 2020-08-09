import ApplicationRecord from './ApplicationRecord'
import { attr, belongsTo, hasMany } from 'spraypaint'

const Homework = ApplicationRecord.extend({
  static: {
    jsonapiType: 'homeworks',
  },
  attrs: {
    name: attr(),
    body: attr(),
    summary: attr(),
    title: attr(),
    turnInType: attr(),
    assignmentsCount: attr(),
    countsTowardsCompletion: attr(),
    dueAt: attr(),
    createdAt: attr(),

    cohort_id: attr(),
    cohort: belongsTo(),
    assignments: hasMany(),
  },
})

export default Homework
