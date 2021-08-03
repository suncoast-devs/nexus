import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { Cohort, UnProxyCollection } from '@/components/models'
import { compareLectureVideoDates } from '@/components/lecturevideos/compareLectureVideoDates'
import useProfile from '@/hooks/useProfile'
import { useQuery } from 'react-query'

export function LectureVideosPageForUser() {
  const { data: cohorts = [] } = useQuery(['lecture-videos-for-user'], () =>
    Cohort.includes('lecture-videos').all().then(UnProxyCollection)
  )

  return (
    <>
      {cohorts.map(cohort => (
        <>
          <div className="title">{cohort.name}</div>
          <LectureVideosPage cohort={cohort} />
        </>
      ))}
    </>
  )
}

export function LectureVideosPage({ cohort }: { cohort: Cohort }) {
  const { profile } = useProfile()

  return (
    <div className="container">
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
  )
}