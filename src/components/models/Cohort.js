import ApplicationRecord from './ApplicationRecord'
import { attr, hasMany, belongsTo } from 'spraypaint'

const Cohort = ApplicationRecord.extend({
  static: {
    jsonapiType: 'cohorts',
  },
  // ... code ...
  attrs: {
    name: attr(),
    startDate: attr(),
    endDate: attr(),
    units: attr(),
    active: attr(),
    program: belongsTo(),
    programId: attr(),
    assignedHomeworkMarkedForCompletionCount: attr(),
    studentEnrollments: hasMany(),
    people: hasMany(),
    cohortDates: hasMany(),
    homeworks: hasMany(),
    progressReports: hasMany(),
    lectureVideos: hasMany(),
  },

  methods: {
    assignmentsForThisCohort: function (assignments) {
      return assignments.filter(assignment => {
        return assignment.homework && assignment.homework.cohort.id === this.id
      })
    },
  },
})

export default Cohort
