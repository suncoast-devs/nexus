import ApplicationRecord from './ApplicationRecord'
import { attr, belongsTo } from 'spraypaint'

const StudentProgressReport = ApplicationRecord.extend({
  static: {
    jsonapiType: 'student_progress_reports',
  },
  // ... code ...
  attrs: {
    progressReportId: attr(),
    progressReport: belongsTo(),
    cohort: belongsTo(),

    personId: attr(),
    person: belongsTo(),

    content: attr(),
    reportImageData: attr(),

    reportImageUrl: attr(),
  },
})

export default StudentProgressReport
