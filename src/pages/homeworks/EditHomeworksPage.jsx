import React, { useState } from 'react'
import moment from 'moment'
import { Homework, Cohort } from '/src/components/models'
import useModelData from '/src/hooks/useModelData'
import { Link } from 'react-router-dom'
import { EditHomework } from '/src/components/homeworks/EditHomework'

export function EditHomeworksPage({ cohort_id }) {
  const [homework, setHomework] = useState()

  const { data: cohort, reload: reloadCohort } = useModelData(() => Cohort.includes('homeworks').find(cohort_id))

  // Homework in ID order (order that they were inserted)
  const homeworks = (cohort.homeworks || []).sort((a, b) => a.id - b.id)

  const assignHomework = homework => {
    homework.reassigned = true
    homework.save().then(() => {
      reloadCohort()
    })
  }

  return (
    <section className="section">
      <div
        className="container"
        onKeyDown={event => {
          if (event.keyCode === 27) {
            setHomework()
          }
        }}
      >
        {homework && (
          <EditHomework cohort={cohort} reloadCohort={reloadCohort} homework={homework} setHomework={setHomework} />
        )}

        <h1 className="title">{cohort.name}</h1>

        <button
          className="button is-link"
          onClick={() => setHomework(new Homework({ dueAt: moment().add(1, 'days'), countsTowardsCompletion: true }))}
        >
          New Homework
        </button>

        <table className="table is-fullwidth is-hoverable is-vcentered">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Summary</th>
              <th>Counts</th>
              <th>Assigned</th>
            </tr>
          </thead>
          <tbody>
            {homeworks
              .sort((a, b) => b.id - a.id)
              .map(homework => (
                <tr key={homework.id}>
                  <td>
                    <div className="buttons are-normal">
                      <Link
                        to={`/cohorts/${cohort.id}/homeworks/${homework.id}`}
                        className="button is-link is-inverted"
                      >
                        Show
                      </Link>
                      <button className="button is-link is-inverted" onClick={() => setHomework(homework)}>
                        Edit
                      </button>
                    </div>
                  </td>
                  <td className="is-vcentered">{homework.name}</td>
                  <td className="is-vcentered">{homework.summary}</td>
                  <td className="is-vcentered">
                    {homework.countsTowardsCompletion ? <i className="fas fa-check" /> : ''}
                  </td>
                  <td className="is-vcentered">
                    {homework.assigned ? (
                      <>
                        <i className="fas fa-check has-text-primary mr-3" />
                        <span className="button is-primary is-small" onClick={() => assignHomework(homework)}>
                          Re-assign
                        </span>
                      </>
                    ) : (
                      <>
                        <i class="fas fa-times has-text-danger mr-3"></i>
                        <span className="button is-primary is-small" onClick={() => assignHomework(homework)}>
                          Assign
                        </span>
                      </>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
