import ApplicationRecord from './ApplicationRecord'
import { attr, belongsTo, hasMany } from 'spraypaint'

const Unit = ApplicationRecord.extend({
  static: {
    jsonapiType: 'units'
  },
  attrs: {
    cohort: belongsTo(),
    program: belongsTo(),
    studentEnrollments: hasMany(),
    people: hasMany(),
    cohort_id: attr(),
    program_id: attr()
  }
})

export default Unit
