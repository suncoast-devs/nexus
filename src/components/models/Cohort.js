import ApplicationRecord from './ApplicationRecord'
import { attr, hasMany, belongsTo } from 'spraypaint'
import moment from 'moment'

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
    program: belongsTo(),
    people: hasMany(),
    units: hasMany(),
    cohortDates: hasMany(),
    homeworks: hasMany()
  }
})

Cohort.active = () => {
  return Cohort.all().then(response => {
    return new Promise((resolve, reject) => {
      const today = moment().format('YYYY-MM-DD')

      resolve({ data: response.data.filter(cohort => cohort.startDate <= today && today <= cohort.endDate) })
    })
  })
}

export default Cohort
