import useProfile from '@/hooks/useProfile'
import { Cohort } from '@/components/models'
import React from 'react'
import { useHistory } from 'react-router-dom'

export function CohortTable({ cohorts, title }: { cohorts: Cohort[]; title: string }) {
  const { profile, forceUpdateProfile } = useProfile()
  const history = useHistory()

  const { dashboardCohortIds } = profile

  function toggleCohort(event: React.MouseEvent<HTMLInputElement, MouseEvent>, id: number) {
    event.preventDefault()
    event.stopPropagation()

    const newCohortIds = (event.target as HTMLInputElement).checked
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
                onClick={() => {
                  history.push(`/cohorts/${cohort.id}`)
                }}
              >
                <td>
                  <span className="mr-3">
                    <input
                      type="checkbox"
                      checked={dashboardCohortIds.includes(Number(cohort.id))}
                      onClick={event => toggleCohort(event, Number(cohort.id))}
                      onChange={() => {
                        /* do nothing since the click handles everything */
                      }}
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
