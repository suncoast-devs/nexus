import { ApplicationRecord } from './ApplicationRecord'
import { Model, Attr, BelongsTo, HasMany } from 'spraypaint'
import { Assignment, Cohort, Person } from '.'

@Model()
export class StudentEnrollment extends ApplicationRecord {
  static jsonapiType = 'student_enrollments'
  @Attr() active!: boolean
  @Attr() auditing!: boolean
  @Attr() canBeAssignedHomework!: boolean
  @Attr() showGrade!: boolean
  @Attr() generateProgressReport!: boolean
  @Attr() completionPercentage!: number
  @Attr() completedAssignmentsCount!: number
  @Attr() neededToCompleteCount!: number

  @Attr() cohortId!: string
  @BelongsTo() cohort!: Cohort

  @Attr() invitationCode!: string

  @Attr() personId!: string
  @BelongsTo() person!: Person

  @HasMany() assignments!: Assignment[]
}
