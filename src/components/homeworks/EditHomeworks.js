import React, { useState, useEffect } from 'react'
import moment from 'moment'

import { Homework, Cohort } from '@/components/models'
import formToObject from '@/utils/formToObject'
import useModelData from '@/hooks/useModelData'
import { Link } from 'react-router-dom'
import HandbookAssignment from '../models/HandbookAssignment'

const EditHomework = ({ cohort, reloadCohort, homework, setHomework }) => {
  const [body, setBody] = useState(homework.body)
  const [summary, setSummary] = useState(homework.summary)
  const [selectedHandbookAssignment, setSelectedHandbookAssignment] = useState(null)

  const submit = event => {
    event.preventDefault()

    const updatedHomework = formToObject(event.target, homework)

    if (!updatedHomework.isPersisted) {
      updatedHomework.cohort_id = cohort.id
    }

    updatedHomework.save().then(() => {
      setHomework()
      reloadCohort()
    })
  }

  const destroy = () => {
    homework.destroy().then(() => {
      setHomework()
      reloadCohort()
    })
  }

  const { data: handbookAssignments } = useModelData(() => HandbookAssignment.all())

  useEffect(() => {
    if (!selectedHandbookAssignment) {
      return
    }
    HandbookAssignment.selectExtra(['body'])
      .find(selectedHandbookAssignment)
      .then(response => {
        const handbookAssignment = response.data
        setBody(handbookAssignment.body.content)
        setSummary(handbookAssignment.body.front_matter.title)
      })
  }, [selectedHandbookAssignment])

  return (
    <form onSubmit={event => submit(event)}>
      <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Homework</p>
            <span className="delete" aria-label="close" onClick={() => setHomework()} />
          </header>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">Due</label>
              <div className="control">
                <input
                  className="date"
                  defaultValue={moment.utc(homework.dueAt).format('YYYY-MM-DD')}
                  name="dueAt"
                  type="date"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Handbook</label>
              <div className="control">
                <div className="select">
                  <select onChange={event => setSelectedHandbookAssignment(event.target.value)}>
                    <option></option>
                    {handbookAssignments.map(handbookAssignment => (
                      <option key={handbookAssignment.id} value={handbookAssignment.id}>
                        {handbookAssignment.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input className="input" defaultValue={homework.name} name="name" type="text" placeholder="Name" />
              </div>
            </div>
            <div className="field">
              <label className="label">Summary</label>
              <div className="control">
                <input
                  className="input"
                  value={summary}
                  onChange={event => setSummary(event.target.value)}
                  name="summary"
                  type="text"
                  placeholder="Summary"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Body</label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={body}
                  onChange={event => setBody(event.target.value)}
                  name="body"
                  rows="8"
                  placeholder="Body"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Turn In Type</label>
              <div className="select">
                <select name="turnInType" defaultValue={homework.turnInType}>
                  <option value="github">GitHub Repo</option>
                  <option value="gist">Gist</option>
                  <option value="comment">Comment</option>
                  <option value="url">URL</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label className="checkbox">
                <input
                  type="checkbox"
                  defaultChecked={homework.countsTowardsCompletion}
                  name="countsTowardsCompletion"
                />
                Counts Towards Completion
              </label>
            </div>
            <div className="field">
              <label className="checkbox">
                <input type="checkbox" defaultChecked={homework.assigned} name="assigned" />
                Assigned
              </label>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success">Save</button>
            {homework.isPersisted && (
              <button className="button is-danger" onClick={destroy}>
                Delete
              </button>
            )}
            <button className="button" onClick={() => setHomework()}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </form>
  )
}

const EditHomeworks = ({ cohort_id }) => {
  const [homework, setHomework] = useState()

  const { data: cohort, reload: reloadCohort } = useModelData(() => Cohort.includes('homeworks').find(cohort_id))

  // Homework in ID order (order that they were inserted)
  const homeworks = (cohort.homeworks || []).sort((a, b) => a.id - b.id)

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
                  <td className="is-vcentered">{homework.assigned ? 'Yes' : 'No'}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default EditHomeworks
