import { ApplicationRecord } from './ApplicationRecord'
import { Model, Attr, BelongsTo, HasMany } from 'spraypaint'
import { Cohort, Person, Program, StudentEnrollment } from '.'

export class Unit extends ApplicationRecord {
  static jsonapiType = 'units'

  @BelongsTo() cohort!: Cohort
  @Attr() cohort_id!: string

  @BelongsTo() program!: Program

  @Attr() title!: string

  @HasMany() studentEnrollments!: StudentEnrollment[]
  @HasMany() people!: Person[]
}
