import ApplicationRecord from './ApplicationRecord'
import { attr, belongsTo, hasMany } from 'spraypaint'
import moment from 'moment'

const CohortDate = ApplicationRecord.extend({
  static: {
    jsonapiType: 'cohort_dates'
  },
  attrs: {
    cohort_id: attr(),
    cohort: belongsTo(),
    day: attr(),
    description: attr(),
    attendanceRecords: hasMany()
  }
})

CohortDate.prototype.formattedDate = function() {
  return moment(this.day).format('ddd MM/DD')
}

export default CohortDate
