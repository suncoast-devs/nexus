import React from 'react'
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
  const { data: cohorts } = useModelData(() => {
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
            <table className="table is-fullwidth is-bordered is-hoverable">
              <tbody>
                {cohort.lectureVideos.sort(compareLectureVideoDates).map(lectureVideo => (
                  <tr key={lectureVideo.id}>
                    <td>
                      <h1 className="title">{lectureVideo.title}</h1>
                      <video width="640" height="480" controls>
                        <source src={lectureVideo.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
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
