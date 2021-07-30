import React from 'react'
import { Link, useHistory } from 'react-router-dom'

export function CohortTable({ cohorts, title, profile, forceUpdateProfile }) {
  const history = useHistory()
  const { dashboardCohortIds } = profile

  function toggleCohort(event, id) {
    event.preventDefault()
    event.stopPropagation()

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
              <tr
                key={cohort.id}
                onClick={event => {
                  history.push(`/cohorts/${cohort.id}`)
                }}
              >
                <td>
                  <span className="mr-3">
                    <input
                      type="checkbox"
                      checked={dashboardCohortIds.includes(parseInt(cohort.id))}
                      onClick={event => toggleCohort(event, parseInt(cohort.id))}
                    />
                  </span>
                  {cohort.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
