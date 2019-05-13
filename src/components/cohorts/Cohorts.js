import React from 'react'
import { Link } from 'react-router-dom'
import { Cohort } from '../models'
import useModelData from '../../hooks/useModelData'

const Cohorts = () => {
  const { loading, data: cohorts } = useModelData(() =>
    Cohort.includes('people')
      .order({ name: 'asc' })
      .all()
  )

  if (loading) {
    return <></>
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">
          Cohorts
          <span className="is-pulled-right">
            <Link className="button is-primary" to="/cohorts/new">
              New
            </Link>
          </span>
        </h1>
      </div>
      <div className="section">
        <div className="container">
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
                          <div className="buttons">
                            <Link className="button is-primary is-small" to={`/cohorts/${cohort.id}`}>
                              Edit
                            </Link>
                            <Link className="button is-primary is-small" to={`/cohorts/${cohort.id}/attendance`}>
                              Attendance
                            </Link>
                            <Link className="button is-primary is-small" to={`/cohorts/${cohort.id}/homeworks`}>
                              Homeworks
                            </Link>
                            <Link className="button is-primary is-small" to={`/cohorts/${cohort.id}/gradebook`}>
                              Gradebook
                            </Link>
                            <Link className="button is-primary is-small" to={`/cohorts/${cohort.id}/progress-reports`}>
                              Progress Reports
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
    </section>
  )
}

export default Cohorts
