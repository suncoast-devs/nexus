import { ApplicationRecord } from './ApplicationRecord'
import { Attr, HasMany, BelongsTo, Model } from 'spraypaint'
import { Assignment, CohortDate, Homework, LectureVideo, Person, Program, ProgressReport, StudentEnrollment } from '.'

@Model()
export class Cohort extends ApplicationRecord {
  static jsonapiType = 'cohorts'

  @Attr() name!: string
  @Attr() startDate!: string
  @Attr() endDate!: string
  @Attr() units!: number
  @Attr() active!: boolean
  @Attr() programId!: string
  @Attr() assignedHomeworkMarkedForCompletionCount!: number
  @BelongsTo() program!: Program
  @HasMany() studentEnrollments!: StudentEnrollment[]
  @HasMany() people!: Person[]
  @HasMany() cohortDates!: CohortDate[]
  @HasMany() homeworks!: Homework[]
  @HasMany() progressReports!: ProgressReport[]
  @HasMany() lectureVideos!: LectureVideo[]

  assignmentsForThisCohort(assignments: Assignment[]) {
    return assignments.filter(assignment => {
      return assignment.homework && assignment.homework.cohort.id === this.id
    })
  }
}
