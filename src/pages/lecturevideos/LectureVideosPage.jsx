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

  // Only show the cohorts the admin wants, otherwise it would
  const cohortsToShow = profile.isAdmin
    ? cohorts.filter(cohort => profile.dashboardCohortIds.includes(parseInt(cohort.id)))
    : cohorts

  return (
    <div className="container">
      {cohortsToShow.map(cohort => (
        <React.Fragment key={cohort.id}>
          <nav className="level" />
          {cohort.lectureVideos.length !== 0 ? <h1 className="title">No videos yet...</h1> : <></>}
          <table className="table is-bordered is-hoverable is-striped is-fullwidth">
            <tbody>
              {cohort.lectureVideos.sort(compareLectureVideoDates).map(lectureVideo => (
                <tr>
                  <td>
                    <Link to={`/lecture_videos/${lectureVideo.id}`}>{lectureVideo.title}</Link>
                  </td>
                  <td>
                    {lectureVideo.presentedAgo} ({moment(lectureVideo.presentedOn).format('dddd')})
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </React.Fragment>
      ))}
    </div>
  )
}
