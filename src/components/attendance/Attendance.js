import React, { useState } from 'react'
import moment from 'moment'

import { Cohort, AttendanceRecord } from '../models'
import useModelData from '../../hooks/useModelData'
import statuses from './statuses'

const Modal = ({ selected, setSelected, reload }) => {
  if (!selected) {
    return <></>
  }

  const [statusKey, setStatusKey] = useState(selected.attendanceRecord.status)
  const [note, setNote] = useState(selected.attendanceRecord.note)

  const close = () => setSelected(undefined)

  const destroy = () => {
    if (selected.attendanceRecord.isPersisted) {
      selected.attendanceRecord.destroy().then(() => {
        reload()
        close()
      })
    }
  }

  const save = () => {
    selected.attendanceRecord.status = statusKey
    selected.attendanceRecord.note = note
    selected.attendanceRecord.person_id = selected.person.id
    selected.attendanceRecord.cohort_date_id = selected.cohortDate.id
    selected.attendanceRecord.save().then(() => {
      reload()
      close()
    })
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            Attendance for <span className="has-text-primary">{selected.person.fullName}</span> on{' '}
            <span className="has-text-primary">{moment(selected.cohortDate.day).format('ddd MM/DD')}</span>
          </p>
          <button className="delete" aria-label="close" onClick={close} />
        </header>
        <section className="modal-card-body">
          <section className="section">
            <div className="columns">
              <div className="column">
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      value={note}
                      onChange={event => setNote(event.target.value)}
                      placeholder="Note.."
                    />
                  </div>
                </div>
                {statuses.filter(status => status.key !== ' ').map(status => (
                  <div
                    key={status.key}
                    className={`${statusKey === status.key ? 'has-text-black' : 'has-text-grey-light'}`}
                    style={{
                      padding: '0.2rem',
                      cursor: 'pointer',
                      border: statusKey === status.key ? '2px dashed #b5b5b5' : '2px solid transparent'
                    }}
                    onClick={() => setStatusKey(status.key)}
                  >
                    <span
                      className={`icon is-medium ${
                        statusKey === status.key ? status.className : 'has-background-grey-light'
                      } has-text-white has-text-centered`}
                    >
                      {status.icon}
                    </span>
                    {status.text}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <button className="button is-success" onClick={save}>
                  Save
                </button>
              </div>
              <div className="level-item">
                <button className="button is-primary" onClick={close}>
                  Cancel
                </button>
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <button className="button is-danger is-pulled-right" onClick={destroy}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

const Attendance = ({
  match: {
    params: { id }
  }
}) => {
  const [selected, setSelected] = useState()
  const [onlyToday, setOnlyToday] = useState(true)

  const { loading, data: cohort, reload } = useModelData(() =>
    Cohort.includes(['people', { cohort_dates: { attendance_records: 'person' } }]).find(id)
  )

  if (loading) {
    return <></>
  }

  const attendanceCell = (person, cohortDate) => {
    const attendanceRecord =
      cohortDate.attendanceRecords.find(record => record.person.id === person.id) ||
      new AttendanceRecord({ status: ' ' })

    const status = statuses.find(status => status.key === attendanceRecord.status)

    return (
      <td
        key={cohortDate.day}
        className={`${attendanceRecord.status === ' ' ? '' : 'tooltip'} is-medium ${
          status.className
        } has-text-white has-text-centered`}
        data-tooltip={`${status.text} ${attendanceRecord.note ? ' - ' : ''} ${attendanceRecord.note || ''}`}
        onClick={() => setSelected({ attendanceRecord, person, cohortDate })}
      >
        {status.icon}
      </td>
    )
  }

  const clickDay = cohortDate => {
    const answer = window.confirm('This will set all students to present for the day. Continue?')
    if (!answer) {
      return
    }

    const deletes = cohortDate.attendanceRecords.map(record => record.destroy())

    Promise.all(deletes).then(() => {
      const inserts = cohort.people.map(person => {
        let attendanceRecord = new AttendanceRecord()
        attendanceRecord.status = 'P'
        attendanceRecord.note = ''
        attendanceRecord.person_id = person.id
        attendanceRecord.cohort_date_id = cohortDate.id
        return attendanceRecord.save()
      })

      Promise.all(inserts).then(() => {
        reload()
      })
    })
  }

  let sortedCohortDates

  if (onlyToday) {
    const today = moment().format('YYYY-MM-DD')
    sortedCohortDates = cohort.cohortDates.filter(date => date.day === today)
  } else {
    sortedCohortDates = cohort.cohortDates.sort((a, b) => a.day.localeCompare(b.day))
  }

  return (
    <section className="section">
      <Modal selected={selected} setSelected={setSelected} reload={reload} />
      <div className="container">
        <h1 className="title">{cohort.name} </h1>
        <div>
          <input onClick={() => setOnlyToday(!onlyToday)} value={onlyToday} checked={onlyToday} type="checkbox" /> Today
          Only
        </div>
        <div className="attendance-table">
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Name</th>
                {sortedCohortDates.map(cohortDate => (
                  <th key={cohortDate.day} style={{ cursor: 'pointer' }} onClick={() => clickDay(cohortDate)}>
                    {moment(cohortDate.day).format('ddd MM/DD')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cohort.people.sort((a, b) => a.fullName.localeCompare(b.fullName)).map(person => {
                return (
                  <tr key={person.id}>
                    <td>{person.fullName}</td>
                    {sortedCohortDates.map(cohortDate => attendanceCell(person, cohortDate))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Attendance
