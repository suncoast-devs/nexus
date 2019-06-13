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
    startDate: attr(),
    endDate: attr(),
    units: attr(),
    program: belongsTo(),
    people: hasMany(),
    cohortDates: hasMany(),
    homeworks: hasMany(),
    progressReports: hasMany()
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
