import ApplicationRecord from './ApplicationRecord'
import { attr, belongsTo, hasMany } from 'spraypaint'

const Homework = ApplicationRecord.extend({
  static: {
    jsonapiType: 'homeworks',
  },
  attrs: {
    name: attr(),
    body: attr(),
    bodyWithResolvedUrls: attr(),
    summary: attr(),
    title: attr(),
    turnInType: attr(),
    assigned: attr(),
    reassigned: attr(),
    assignmentsCount: attr(),
    countsTowardsCompletion: attr(),
    dueAt: attr(),
    createdAt: attr(),

    cohort_id: attr(),
    cohortId: attr(),
    cohort: belongsTo(),
    assignments: hasMany(),
  },
})

export default Homework
