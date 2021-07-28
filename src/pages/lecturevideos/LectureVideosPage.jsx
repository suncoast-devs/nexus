import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import useModelData from '@/hooks/useModelData'
import Cohort from '@/components/models/Cohort'
import LectureVideo from '@/components/models/LectureVideo'
import { compareLectureVideoDates } from '@/components/lecturevideos/compareLectureVideoDates'

export function LectureVideosPage({ profile, cohortId }) {
  const { data: cohorts } = useModelData(() => {
    // This is required otherwise the query below fails
    new LectureVideo()

    let query = Cohort.includes('lecture_videos').order({ start_date: 'desc' })

    // If a specific cohort was specified
    if (cohortId) {
      query = query.where({ id: cohortId })
    }

    return query.all()
  })

  console.log(profile.isAdmin)

  // Only show the cohorts the admin wants, otherwise it would
  const cohortsToShow = profile.isAdmin
    ? cohorts.filter(cohort => profile.dashboardCohortIds.includes(parseInt(cohort.id)))
    : cohorts

  return (
    <section className="section">
      <div className="container">
        {cohortsToShow.map(cohort => (
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
