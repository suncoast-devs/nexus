import React, { useState } from 'react'
import statuses from './statuses'
import moment from 'moment'

const AttendanceModal = ({ selected, setSelected, reload }) => {
  if (!selected) {
    return <></>
  }

  const [statusKey, setStatusKey] = useState(selected.attendanceRecord.status)
  const [note, setNote] = useState(selected.attendanceRecord.note)

  const close = () => setSelected()

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
            {selected.attendanceRecord.isPersisted && (
              <div className="level-right">
                <div className="level-item">
                  <button className="button is-danger is-pulled-right" onClick={destroy}>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default AttendanceModal
