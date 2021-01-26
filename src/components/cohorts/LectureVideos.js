import React, { useState } from 'react'
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

import useModelData from '@/hooks/useModelData'
import Cohort from '@/components/models/Cohort'
import LectureVideo from '@/components/models/LectureVideo' // This is required to make the query below work. Do not remove.
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

const LectureVideos = ({ profile, cohortId }) => {
  const [currentVideo, setCurrentVideo] = useState(0)

  const { data: cohorts } = useModelData(() => {
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
            <table className="table is-fullwidth is-bordered is-hoverable">
              <tbody>
                {cohort.lectureVideos.sort(compareLectureVideoDates).map(lectureVideo => (
                  <tr key={lectureVideo.id}>
                    <td>
                      <div className="level mb-2">
                        <div className="level-left">
                          <div className="level-item">
                            <h1 className="title">{lectureVideo.title}</h1>
                          </div>
                        </div>

                        <div className="level-right">
                          <div className="level-item">
                            <div className="is-size-7 pr-3">{lectureVideo.presentedAgo}</div>
                            <div className="field is-grouped">
                              <p className="control">
                                <span
                                  className="button is-link is-light is-small"
                                  onClick={() =>
                                    setCurrentVideo(currentVideo === lectureVideo.id ? 0 : lectureVideo.id)
                                  }
                                >
                                  <span className="icon">
                                    <i className="fas fa-play-circle" />
                                  </span>
                                  <span>Play</span>
                                </span>
                              </p>

                              <p className="control">
                                <a
                                  className="button is-link is-light is-small"
                                  href={lectureVideo.videoUrl}
                                  download={lectureVideo.videoFileName}
                                >
                                  <span className="icon">
                                    <i className="fas fa-download" />
                                  </span>
                                  <span>Download</span>
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {currentVideo == lectureVideo.id && (
                        <div className="level">
                          <Player preload="none">
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
                        </div>
                      )}

                      <p />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}

export default LectureVideos
