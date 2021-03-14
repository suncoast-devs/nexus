import ApplicationRecord from './ApplicationRecord'
import { hasMany, belongsTo } from 'spraypaint'

export const Gradebook = ApplicationRecord.extend({
  static: {
    jsonapiType: 'gradebooks',
  },
  attrs: {
    cohort: belongsTo(),
    homeworks: hasMany(),
    studentEnrollments: hasMany(),
    assignments: hasMany(),
  },
})
