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
    startDate: attr(),
    endDate: attr(),
    program_id: attr(),
    people: hasMany(),
    units: hasMany(),
    cohortDates: hasMany()
  }
})

export default Cohort
