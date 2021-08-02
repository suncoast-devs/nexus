import { ApplicationRecord } from './ApplicationRecord'
import { Attr, BelongsTo, Model } from 'spraypaint'
import { Cohort } from '.'

@Model()
export class LectureVideo extends ApplicationRecord {
  static jsonapiType = 'lecture_videos'
  @Attr() title!: string
  @Attr() videoUrl!: string
  @Attr() videoFileName!: string
  @Attr() presentedOn!: string
  @Attr() presentedAgo!: string
  @Attr() createdAt!: string

  @Attr() cohortId!: string
  @BelongsTo() cohort!: Cohort
}
