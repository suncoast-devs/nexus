import { ApplicationRecord } from './ApplicationRecord'
import { Model, Attr, BelongsTo, HasMany } from 'spraypaint'
import moment from 'moment'
import { Cohort, AttendanceRecord } from '.'

@Model()
export class CohortDate extends ApplicationRecord {
  static jsonapiType = 'cohort_dates'

  @Attr() cohort_id!: string
  @Attr() day!: string
  @Attr() description!: string
  @BelongsTo() cohort!: Cohort
  @HasMany() attendanceRecords!: AttendanceRecord[]

  formattedDate() {
    return moment(this.day).format('ddd MM/DD')
  }
}
