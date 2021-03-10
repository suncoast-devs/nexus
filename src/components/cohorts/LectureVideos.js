import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
} from 'video-react'
import moment from 'moment'

import useModelData from '@/hooks/useModelData'
import Cohort from '@/components/models/Cohort'
import LectureVideoPlayback from '@/components/models/LectureVideoPlayback'
import LectureVideo from '@/components/models/LectureVideo'

const compareLectureVideoDates = (a, b) => {
  if (!a.presentedOn || !b.presentedOn) {
    return 0
  }

  const aPresentedOn = Date.parse(a.presentedOn)
  const bPresentedOn = Date.parse(b.presentedOn)

  // If the times are equal, use the createdAt time to order the videos
  if (aPresentedOn - bPresentedOn === 0) {
    const aCreatedAt = Date.parse(a.createdAt)
    const bCreatedAt = Date.parse(b.createdAt)

    return bCreatedAt - aCreatedAt
  } else {
    return bPresentedOn - aPresentedOn
  }
}

const recordLectureVideoPlayback = lectureVideoId => {
  const lectureVideoPlayback = new LectureVideoPlayback({ lectureVideoId })
  console.log({ lectureVideoId })
  lectureVideoPlayback.save().then(() => {
    // Nothing to do
  })
}

const LectureVideoPlayer = ({ lectureVideo }) => {
  // If we are transitioning from never started to started
  // then record a playback event.
  const handleStateChange = (state, prevState) => {
    if (state.hasStarted && !prevState.hasStarted) {
      recordLectureVideoPlayback(lectureVideo.id)
    }
  }

  return (
    <Player
      preload="none"
      ref={player => {
        player && player.subscribeToStateChange(handleStateChange)
      }}
    >
      <source src={lectureVideo.videoUrl} />
      <ControlBar>
        <ReplayControl seconds={10} order={1.1} />
        <ForwardControl seconds={30} order={1.2} />
        <CurrentTimeDisplay order={4.1} />
        <TimeDivider order={4.2} />
        <PlaybackRateMenuButton rates={[4, 2, 1, 0.5, 0.25]} order={7.1} />
        <VolumeMenuButton />
      </ControlBar>
    </Player>
  )
}

export const LectureVideoPage = ({ id }) => {
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

const LectureVideos = ({ profile, cohortId }) => {
  const [currentVideo, setCurrentVideo] = useState(0)

  const { data: cohorts } = useModelData(() => {
    // This is required otherwise the query below fails
    new LectureVideo()

    let query = Cohort.includes('lecture_videos').order({ start_date: 'desc' })

    // If a specific cohort was specified
    if (cohortId) {
      query = query.where({ id: cohortId })
    } else {
      // Only show the active cohorts for admins, otherwise it would
      // be too much information
      if (profile.isAdmin) {
        query = query.where({ active: true })
      }
    }

    return query.all()
  })

  return (
    <section className="section">
      <div className="container">
        {cohorts.map(cohort => (
          <React.Fragment key={cohort.id}>
            <h1 className="title">Lecture Videos for {cohort.name}</h1>
            <ul>
              {cohort.lectureVideos.sort(compareLectureVideoDates).map(lectureVideo => (
                <li className="my-3 mx-3">
                  <Link to={`/lecture_videos/${lectureVideo.id}`} className="is-size-4">
                    <div className="level">
                      <div className="level-left">
                        <div className="level-item">{lectureVideo.title}</div>
                      </div>
                      <div className="level-right is-size-7 pr-3">
                        <div className="level-item">
                          {lectureVideo.presentedAgo} ({moment(lectureVideo.presentedOn).format('dddd')})
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}

export default LectureVideos
