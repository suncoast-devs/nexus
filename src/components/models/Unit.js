import ApplicationRecord from './ApplicationRecord'
import { attr, belongsTo, hasMany } from 'spraypaint'

const Unit = ApplicationRecord.extend({
  static: {
    jsonapiType: 'units'
  },
  attrs: {
    cohort: belongsTo(),
    cohort_id: attr(),

    program: belongsTo(),
    program_id: attr(),

    title: attr(),

    studentEnrollments: hasMany(),
    people: hasMany()
  }
})

export default Unit
