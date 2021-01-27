import ApplicationRecord from './ApplicationRecord'
import { attr, belongsTo } from 'spraypaint'

const LectureVideoPlayback = ApplicationRecord.extend({
  static: {
    jsonapiType: 'lecture_video_playbacks',
  },
  attrs: {
    lectureVideoId: attr(),
    lectureVideo: belongsTo(),
  },
})

export default LectureVideoPlayback
