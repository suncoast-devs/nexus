import ApplicationRecord from './ApplicationRecord'
import { attr, belongsTo } from 'spraypaint'

const StudentEnrollment = ApplicationRecord.extend({
  static: {
    jsonapiType: 'student_enrollments',
  },
  attrs: {
    active: attr(),

    cohort_id: attr(),
    cohort: belongsTo(),

    units: attr(),
    invitationCode: attr(),

    person_id: attr(),
    person: belongsTo(),
  },
})

StudentEnrollment.prototype.isInUnit = function(unit) {
  return this.units.includes(parseInt(unit.id))
}

StudentEnrollment.prototype.ensureUnit = function(unit) {
  if (!this.isInUnit(unit)) {
    this.units = this.units.concat(parseInt(unit.id))
  }
}

StudentEnrollment.prototype.toggleUnit = function(unit) {
  if (this.isInUnit(unit)) {
    this.units = this.units.filter(unit_id => unit_id !== parseInt(unit.id))
  } else {
    this.units = this.units.concat(parseInt(unit.id))
  }
}

export default StudentEnrollment
