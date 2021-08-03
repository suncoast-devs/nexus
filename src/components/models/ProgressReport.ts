import { ApplicationRecord } from './ApplicationRecord'
import { Model, Attr, BelongsTo, HasMany } from 'spraypaint'
import { Cohort, Homework, Person, StudentProgressReport } from '.'

@Model()
export class ProgressReport extends ApplicationRecord {
  static jsonapiType = 'progress_reports'

  @Attr() startDate!: string
  @Attr() endDate!: string
  @Attr() idsOfHomeworks!: number[]
  @Attr() idsOfPeople!: number[]
  @Attr() cohort_id!: string
  @Attr() completed!: boolean
  @BelongsTo() cohort!: Cohort
  @HasMany() studentProgressReports!: StudentProgressReport[]
  @HasMany() people!: Person[]
  @HasMany() homeworks!: Homework[]

  sortedIdsOfPeople() {
    return this.idsOfPeople.sort((a, b) => a - b)
  }
}
