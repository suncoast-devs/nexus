import React from 'react'
import moment from 'moment'
import useModelData from '@/hooks/useModelData'
import LectureVideo from '@/components/models/LectureVideo'
import { LectureVideoPlayer } from '@/components/lecturevideos/LectureVideoPlayer'
import { recordLectureVideoPlayback } from '@/components/lecturevideos/recordLectureVideoPlayback'

export function LectureVideoPage({ id }) {
  const { loading, data: lectureVideo } = useModelData(() => {
    return LectureVideo.find(id)
  })

  if (loading) {
    return <></>
  }

  return (
    <div className="section">
      <div className="level mb-5">
        <div className="level-left">
          <div className="level-item">
            <h1 className="title">{lectureVideo.title}</h1>
          </div>
        </div>

        <div className="level-right">
          <div className="level-item">
            <div className="pr-3">
              {lectureVideo.presentedAgo} ({moment(lectureVideo.presentedOn).format('dddd')})
            </div>
            <div className="control">
              <a
                className="button is-link is-light is-small"
                href={lectureVideo.videoUrl}
                download={lectureVideo.videoFileName}
                onClick={event => {
                  setTimeout(() => {
                    recordLectureVideoPlayback(lectureVideo.id)
                  }, 1000)
                }}
              >
                <span className="icon">
                  <i className="fas fa-download" />
                </span>
                <span>Download</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="columns">
        <div className="column is-10 is-offset-1">
          <LectureVideoPlayer lectureVideo={lectureVideo} />
        </div>
      </div>
    </div>
  )
}
