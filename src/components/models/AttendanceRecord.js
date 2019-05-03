import ApplicationRecord from './ApplicationRecord'
import { attr, belongsTo } from 'spraypaint'

const AttendanceRecord = ApplicationRecord.extend({
  static: {
    jsonapiType: 'attendance_records'
  },
  attrs: {
    status: attr(),
    note: attr(),
    person_id: attr(),
    cohort_date_id: attr(),
    person: belongsTo(),
    cohortDate: belongsTo()
  }
})

export default AttendanceRecord
