import ApplicationRecord from './ApplicationRecord'
import { attr, belongsTo } from 'spraypaint'

const LectureVideo = ApplicationRecord.extend({
  static: {
    jsonapiType: 'lecture_videos',
  },
  attrs: {
    title: attr(),
    videoUrl: attr(),
    videoFileName: attr(),
    presentedOn: attr(),
    createdAt: attr(),

    cohortId: attr(),
    cohort: belongsTo(),
  },
})

export default LectureVideo
