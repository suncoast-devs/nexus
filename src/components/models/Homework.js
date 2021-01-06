import ApplicationRecord from './ApplicationRecord'
import { attr, belongsTo, hasMany } from 'spraypaint'

const Homework = ApplicationRecord.extend({
  static: {
    jsonapiType: 'homeworks',
  },
  attrs: {
    name: attr(),
    body: attr(),
    body_with_resolved_urls: attr(),
    summary: attr(),
    title: attr(),
    turnInType: attr(),
    assigned: attr(),
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
