import { ApplicationRecord } from './ApplicationRecord'
import { Model, Attr, BelongsTo } from 'spraypaint'
import { CohortDate, Person } from '.'

@Model()
export class AttendanceRecord extends ApplicationRecord {
  static jsonapiType = 'attendance_records'

  @Attr() status!: string
  @Attr() note!: string
  @Attr() person_id!: string
  @Attr() cohort_date_id!: string

  @BelongsTo() person!: Person
  @BelongsTo() cohortDate!: CohortDate
}
