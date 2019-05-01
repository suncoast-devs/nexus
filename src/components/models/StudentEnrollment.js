import ApplicationRecord from './ApplicationRecord'
import { attr, belongsTo } from 'spraypaint'

const StudentEnrollment = ApplicationRecord.extend({
  static: {
    jsonapiType: 'student_enrollments'
  },
  attrs: {
    unit_id: attr(),
    person_id: attr(),
    unit: belongsTo(),
    person: belongsTo()
  }
})

export default StudentEnrollment
