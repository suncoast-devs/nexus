import { LectureVideoPlayback } from '@/components/models'

export function recordLectureVideoPlayback(lectureVideoId: string) {
  const lectureVideoPlayback = new LectureVideoPlayback({ lectureVideoId })
  console.log({ lectureVideoId })
  lectureVideoPlayback.save().then(() => {
    // Nothing to do
  })
}
