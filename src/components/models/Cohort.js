import ApplicationRecord from './ApplicationRecord'
import { attr, hasMany } from 'spraypaint'
import Person from './Person' // Important to load the associated model

const Cohort = ApplicationRecord.extend({
  static: {
    jsonapiType: 'cohorts'
  },
  // ... code ...
  attrs: {
    name: attr(),
    description: attr(),
    people: hasMany()
  }
})

export default Cohort
