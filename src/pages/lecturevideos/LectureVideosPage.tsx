import React from 'react'
import { Link, useParams } from 'react-router-dom'
import moment from 'moment'

import { Cohort, UnProxyCollection } from '@/components/models'
import { compareLectureVideoDates } from '@/components/lecturevideos/compareLectureVideoDates'
import { useQuery } from 'react-query'
import useProfile from '@/hooks/useProfile'

export function LectureVideosPageForUser() {
  const { profile } = useProfile()

  const { data: cohorts = [] } = useQuery(['lecture-videos-for-user'], () =>
    Cohort.includes('lecture_videos').order('name').all().then(UnProxyCollection)
  )

  return (
    <>
      {profile.cohorts.map(cohort => (
        <div className="section" key={cohort.id}>
          <LectureVideosPage cohort={cohort} cohorts={cohorts} />
        </div>
      ))}
    </>
  )
}

export function LectureVideoPageForCohortId() {
  const { id } = useParams<{ id: string }>()

  const { data: cohorts = [] } = useQuery(['lecture-videos-for-user'], () =>
    Cohort.includes('lecture_videos').order('name').all().then(UnProxyCollection)
  )

  const cohort = cohorts.find(cohort => cohort.id === id)

  if (!cohort) {
    return <></>
  }

  return (
    <div className="section" key={cohort.id}>
      <LectureVideosPage cohort={cohort} cohorts={cohorts} />
    </div>
  )
}

export function LectureVideosPage({ cohort, cohorts }: { cohort: Cohort; cohorts: Cohort[] }) {
  return (
    <>
      <div className="container">
        <div className="title">{cohort.name}</div>
        <nav className="level" />
        {cohort.lectureVideos.length === 0 ? <h1 className="title">No videos yet...</h1> : <></>}
        <table className="table is-bordered is-hoverable is-striped is-fullwidth">
          <tbody>
            {cohort.lectureVideos.sort(compareLectureVideoDates).map(lectureVideo => (
              <tr key={lectureVideo.id}>
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
      </div>

      <div className="container">
        <div className="title">Other Cohorts</div>
      </div>

      <div className="container">
        <table className="table is-bordered is-hoverable is-striped is-fullwidth">
          <tbody>
            {cohorts.map(cohort => (
              <tr key={cohort.id}>
                <td>
                  <Link to={`/cohorts/${cohort.id}/lecture-videos`}>{cohort.name}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
