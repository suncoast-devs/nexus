import { ApplicationRecord } from './ApplicationRecord'
import { Attr, BelongsTo, Model } from 'spraypaint'
import { LectureVideo } from './LectureVideo'

@Model()
export class LectureVideoPlayback extends ApplicationRecord {
  static jsonapiType = 'lecture_video_playbacks'

  @Attr() lectureVideoId!: string
  @BelongsTo() lectureVideo!: LectureVideo
}
