import ApplicationRecord from './ApplicationRecord'
import { attr, hasMany, belongsTo } from 'spraypaint'

const LectureVideo = ApplicationRecord.extend({
  static: {
    jsonapiType: 'lecture_videos',
  },
  attrs: {
    title: attr(),
    videoUrl: attr(),

    cohortId: attr(),
    cohort: belongsTo(),
  },
})

export default LectureVideo
