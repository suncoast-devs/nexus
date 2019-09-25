import ApplicationRecord from './ApplicationRecord'
import { attr, hasMany, belongsTo } from 'spraypaint'
import moment from 'moment'

const Cohort = ApplicationRecord.extend({
  static: {
    jsonapiType: 'cohorts',
  },
  // ... code ...
  attrs: {
    name: attr(),
    startDate: attr(),
    endDate: attr(),
    units: attr(),
    active: attr(),
    program: belongsTo(),
    programId: attr(),
    people: hasMany(),
    cohortDates: hasMany(),
    homeworks: hasMany(),
    progressReports: hasMany(),
  },
})

export default Cohort
