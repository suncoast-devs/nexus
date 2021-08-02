import { ApplicationRecord } from './ApplicationRecord'
import { HasMany, BelongsTo, Model } from 'spraypaint'
import StudentEnrollment from './StudentEnrollment'
import { Assignment, Cohort, Homework } from '.'

@Model()
export class Gradebook extends ApplicationRecord {
  static jsonapiType = 'gradebooks'

  @BelongsTo() cohort!: Cohort
  @HasMany() homeworks!: Homework[]
  @HasMany() studentEnrollments!: StudentEnrollment[]
  @HasMany() assignments!: Assignment[]
}
