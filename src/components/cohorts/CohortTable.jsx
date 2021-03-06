import React from 'react'
import { Link } from 'react-router-dom'

export function CohortTable({ cohorts, title, profile, forceUpdateProfile }) {
  const { dashboardCohortIds } = profile

  function toggleCohort(event, id) {
    const newCohortIds = event.target.checked
      ? [...dashboardCohortIds, id]
      : dashboardCohortIds.filter(cohortId => cohortId !== id)

    profile.dashboardCohortIds = newCohortIds
    profile.save().then(() => {
      forceUpdateProfile()
    })
  }

  return (
    <div className="section">
      <div className="container">
        <h2 className="title">{title}</h2>
        <table className="table is-bordered is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {cohorts.map(cohort => (
              <tr key={cohort.id}>
                <td>
                  <div className="level">
                    <div className="level-left">
                      <div className="level-item">{cohort.name}</div>
                    </div>
                    <div className="level-right">
                      <div className="level-item">
                        <input
                          type="checkbox"
                          checked={dashboardCohortIds.includes(parseInt(cohort.id))}
                          onChange={event => toggleCohort(event, parseInt(cohort.id))}
                        />
                        <div className="buttons are-small">
                          <Link className="button is-link is-inverted" to={`/cohorts/${cohort.id}`}>
                            Edit
                          </Link>
                          <Link className="button is-link is-inverted" to={`/cohorts/${cohort.id}/attendance`}>
                            Attendance
                          </Link>
                          <Link className="button is-link is-inverted" to={`/cohorts/${cohort.id}/homeworks`}>
                            Homeworks
                          </Link>
                          <Link className="button is-link is-inverted" to={`/cohorts/${cohort.id}/graggook`}>
                            Gradebook
                          </Link>
                          <Link className="button is-link is-inverted" to={`/cohorts/${cohort.id}/progress-reports`}>
                            Progress Reports
                          </Link>
                          <Link className="button is-link is-inverted" to={`/cohorts/${cohort.id}/lecture-videos`}>
                            Lecture Videos
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
