import React, { useState } from 'react'
import statuses from './statuses'
import moment from 'moment'
import cx from 'classnames'
import { ModalForm } from '../utils/ModalForm'

const AttendanceModal = ({ selectedAttendanceRecord, onClose }) => {
  const [statusKey, setStatusKey] = useState(selectedAttendanceRecord.status)
  const [note, setNote] = useState(selectedAttendanceRecord.note || '')

  const destroy = () => {
    selectedAttendanceRecord.destroy().then(onClose())
  }

  const save = () => {
    selectedAttendanceRecord.status = statusKey
    selectedAttendanceRecord.note = note
    selectedAttendanceRecord.save().then(onClose())
  }

  const nonEmptyStatuses = statuses.filter(status => status.key !== ' ')
  const statusesLeft = nonEmptyStatuses.filter((status, index) => index % 2 === 0)
  const statusesRight = nonEmptyStatuses.filter((status, index) => index % 2 === 1)

  const StatusButton = ({ statusKey, status }) => (
    <button
      className={cx('button', {
        [status.className]: statusKey === status.key,
        'has-text-black': statusKey === status.key,
        'has-text-grey-light': statusKey !== status.key
      })}
      style={{ minWidth: '100%' }}
      onClick={() => setStatusKey(status.key)}
    >
      <span className="icon">{status.icon}</span>
      <span>{status.text}</span>
    </button>
  )

  const StatusButtons = ({ statuses }) => (
    <div className="column is-half">
      <div className="buttons">
        {statuses.map(status => (
          <StatusButton key={status.key} statusKey={statusKey} status={status} />
        ))}
      </div>
    </div>
  )

  return (
    <ModalForm
      onConfirm={save}
      onClose={onClose}
      onDelete={selectedAttendanceRecord.isPersisted && destroy}
      active={true}
      title={
        <span>
          Attendance for <span className="has-text-primary">{selectedAttendanceRecord.person.fullName}</span> on{' '}
          <span className="has-text-primary">{selectedAttendanceRecord.cohortDate.formattedDate}</span>
        </span>
      }
    >
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
            <div className="columns">
              <StatusButtons statuses={statusesLeft} />
              <StatusButtons statuses={statusesRight} />
            </div>
          </div>
        </div>
      </section>
    </ModalForm>
  )
}

export default AttendanceModal
