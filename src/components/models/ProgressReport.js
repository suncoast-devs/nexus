import ApplicationRecord from './ApplicationRecord'
import { attr, belongsTo, hasMany } from 'spraypaint'

const ProgressReport = ApplicationRecord.extend({
  static: {
    jsonapiType: 'progress_reports'
  },
  // ... code ...
  attrs: {
    startDate: attr(),
    endDate: attr(),
    idsOfHomeworks: attr(),
    idsOfPeople: attr(),
    cohort_id: attr(),
    completed: attr(),
    cohort: belongsTo(),
    studentProgressReports: hasMany(),
    people: hasMany(),
    homeworks: hasMany()
  }
})

export default ProgressReport
