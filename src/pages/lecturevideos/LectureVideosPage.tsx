import React from 'react'
import { Link, useParams } from 'react-router-dom'
import moment from 'moment'

import { Cohort, UnProxyCollection, UnProxyRecord } from '@/components/models'
import { compareLectureVideoDates } from '@/components/lecturevideos/compareLectureVideoDates'
import { useQuery } from 'react-query'
import useProfile from '@/hooks/useProfile'

export function LectureVideosPageForUser() {
  const { profile } = useProfile()

  const profileCohortIds = profile.cohorts.map(cohort => cohort.id)

  const { data: cohorts = [] } = useQuery(['lecture-videos-for-user'], () =>
    Cohort.includes('lecture_videos').order('name').all().then(UnProxyCollection)
  )

  const cohortsForUser = cohorts.filter(cohort => profileCohortIds.includes(cohort.id))
  const otherCohorts = cohorts.filter(cohort => !profileCohortIds.includes(cohort.id))

  return (
    <>
      {cohortsForUser.map(cohort => (
        <div className="section" key={cohort.id}>
          <LectureVideosPage cohort={cohort} />
        </div>
      ))}

      {otherCohorts.length === 0 ? (
        <></>
      ) : (
        <div className="section">
          <div className="container">
            <div className="title">Other Cohorts</div>

            <table className="table is-bordered is-hoverable is-striped is-fullwidth">
              <tbody>
                {otherCohorts.map(cohort => (
                  <tr key={cohort.id}>
                    <td>
                      <Link to={`/cohorts/${cohort.id}/lecture-videos`}>{cohort.name}</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}

export function LectureVideoPageForCohortId() {
  const { id } = useParams<{ id: string }>()

  const { data: cohort } = useQuery(['lecture-videos-for-cohort-id', id], () =>
    Cohort.includes('lecture_videos').order('name').find(id).then(UnProxyRecord)
  )

  if (!cohort) {
    return <></>
  }

  return (
    <div className="section" key={cohort.id}>
      <LectureVideosPage cohort={cohort} />
    </div>
  )
}

export function LectureVideosPage({ cohort }: { cohort: Cohort }) {
  return (
    <>
      <div className="container">
        <div className="title">
          <Link to={`/cohorts/${cohort.id}/lecture-videos`}>{cohort.name}</Link>
        </div>
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
    </>
  )
}
