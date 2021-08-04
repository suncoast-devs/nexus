import { Model, Attr, HasMany } from 'spraypaint'
import { Assignment, AttendanceRecord, Cohort, StudentEnrollment } from '.'
import { ApplicationRecord } from './ApplicationRecord'

@Model()
export class Person extends ApplicationRecord {
  static jsonapiType = 'people'

  @Attr() isAdmin!: boolean
  @Attr() givenName!: string
  @Attr() fullName!: string
  @Attr() familyName!: string
  @Attr() additionalName!: string
  @Attr() honorificPrefix!: string
  @Attr() honorificSuffix!: string
  @Attr() nickname!: string
  @Attr() github!: string
  @Attr() shirtSize!: string
  @Attr() dietaryNote!: string
  @Attr() issues!: string
  @Attr() token!: string
  @Attr() smallProfileImageUrl!: string
  @Attr() slackUser!: string
  @Attr() slackInviteCode!: string
  @Attr() dashboardCohortIds!: number[]
  @HasMany() cohorts!: Cohort[]
  @HasMany() studentEnrollments!: StudentEnrollment[]
  @HasMany() attendanceRecords!: AttendanceRecord[]
  @HasMany() assignments!: Assignment[]

  isMatch(text: string) {
    const lowerText = text.toLowerCase()

    return [
      this.fullName,
      this.givenName,
      this.fullName,
      this.familyName,
      this.additionalName,
      this.github,
      this.nickname,
    ]
      .filter(Boolean)
      .some(name => name.toLowerCase().includes(lowerText))
  }
}
