import React from 'react'
import useModelData from '@/hooks/useModelData'
import LectureVideo from '@/components/models/LectureVideo'
import Cohort from '@/components/models/Cohort'

const LectureVideos = ({ profile, cohortId }) => {
  const { loading, data: cohorts } = useModelData(() => {
    let query = Cohort.includes('lecture_videos')

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
            <table className="table is-fullwidth is-hoverable">
              <thead>
                <tr>
                  <th>Video</th>
                  <th>Title</th>
                </tr>
              </thead>
              <tbody>
                {cohort.lectureVideos.map(lectureVideo => (
                  <tr key={lectureVideo.id}>
                    <td>
                      <a href={lectureVideo.videoUrl}>{lectureVideo.videoUrl}</a>
                    </td>
                    <td>{lectureVideo.title}</td>
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
