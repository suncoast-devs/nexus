import { ApplicationRecord } from './ApplicationRecord'
import { Model, Attr, BelongsTo } from 'spraypaint'
import { Cohort, Person, ProgressReport } from '.'

export type Content = {
  step?: string
  doingWell: string
  improve: string
  attendanceIssues: string
  image?: { dataURL: string; blob: Blob | null }
}

@Model()
export class StudentProgressReport extends ApplicationRecord {
  static jsonapiType = 'student_progress_reports'

  @Attr() progressReportId!: string
  @BelongsTo() progressReport!: ProgressReport
  @BelongsTo() cohort!: Cohort

  @Attr() personId!: string
  @BelongsTo() person!: Person

  @Attr() content!: Content
  @Attr() reportImageData!: string

  @Attr() reportImageUrl!: string
}
