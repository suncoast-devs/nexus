import LectureVideoPlayback from '/src/components/models/LectureVideoPlayback'

export function recordLectureVideoPlayback(lectureVideoId) {
  const lectureVideoPlayback = new LectureVideoPlayback({ lectureVideoId })
  console.log({ lectureVideoId })
  lectureVideoPlayback.save().then(() => {
    // Nothing to do
  })
}
