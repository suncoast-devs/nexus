import ApplicationRecord from './ApplicationRecord'
import { attr, hasMany } from 'spraypaint'

const Cohort = ApplicationRecord.extend({
  static: {
    jsonapiType: 'cohorts'
  },
  // ... code ...
  attrs: {
    name: attr(),
    description: attr(),
    people: hasMany(),
    units: hasMany()
  }
})

export default Cohort
