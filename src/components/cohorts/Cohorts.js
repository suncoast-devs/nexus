import React from 'react'
import { Link } from 'react-router-dom'
import { Cohort } from '@/components/models'
import useModelData from '@/hooks/useModelData'
import LoadingIndicator from '@/components/utils/LoadingIndicator'

const CohortTable = ({ cohorts, title }) => {
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
                          <Link className="button is-link is-inverted" to={`/cohorts/${cohort.id}/gradebook`}>
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

const Cohorts = () => {
  const { loading, data: cohorts } = useModelData(() => Cohort.order({ start_date: 'desc' }).all())

  if (loading) {
    return <LoadingIndicator />
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">
          Cohorts
          <span className="is-pulled-right">
            <Link className="button is-link" to="/cohorts/new">
              New
            </Link>
          </span>
        </h1>
      </div>
      <CohortTable cohorts={cohorts.filter(cohort => cohort.active)} title="Active" />
      <CohortTable cohorts={cohorts.filter(cohort => !cohort.active)} title="Inactive" />
    </section>
  )
}

export default Cohorts
