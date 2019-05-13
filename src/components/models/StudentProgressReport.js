import ApplicationRecord from './ApplicationRecord'
import { attr, belongsTo } from 'spraypaint'

const StudentProgressReport = ApplicationRecord.extend({
  static: {
    jsonapiType: 'student_progress_reports'
  },
  // ... code ...
  attrs: {
    progress_report_id: attr(),
    progress_report: belongsTo(),
    cohort: belongsTo(),

    person_id: attr(),
    person: belongsTo(),

    content: attr(),
    reportImageData: attr(),

    reportImageUrl: attr()
  }
})

export default StudentProgressReport
