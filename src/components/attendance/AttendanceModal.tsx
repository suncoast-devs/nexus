import React, { useState } from 'react'
import statuses from './statuses'
import { ModalForm } from '@/components/utils/ModalForm'
import { StatusButtons } from './StatusButtons'
import { AttendanceRecord } from '../models'

export function AttendanceModal({
  selectedAttendanceRecord,
  onClose,
}: {
  selectedAttendanceRecord: AttendanceRecord
  onClose: () => void
}) {
  const [statusKey, setStatusKey] = useState(selectedAttendanceRecord.status)
  const [note, setNote] = useState(selectedAttendanceRecord.note || '')

  const destroy = () => {
    selectedAttendanceRecord.destroy().then(() => onClose())
  }

  const save = () => {
    selectedAttendanceRecord.status = statusKey
    selectedAttendanceRecord.note = note
    selectedAttendanceRecord.save().then(() => onClose())
  }

  const nonEmptyStatuses = statuses.filter(status => status.key !== ' ')
  const statusesLeft = nonEmptyStatuses.filter((_, index) => index % 2 === 0)
  const statusesRight = nonEmptyStatuses.filter((_, index) => index % 2 === 1)

  return (
    <ModalForm
      onConfirm={save}
      onClose={onClose}
      onDelete={selectedAttendanceRecord.isPersisted ? destroy : () => {}}
      active={true}
      title={
        <span>
          Attendance for <span className="has-text-primary">{selectedAttendanceRecord.person.fullName}</span> on{' '}
          <span className="has-text-primary">{selectedAttendanceRecord.cohortDate.formattedDate()}</span>
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
              <StatusButtons statuses={statusesLeft} statusKey={statusKey} setStatusKey={setStatusKey} />
              <StatusButtons statuses={statusesRight} statusKey={statusKey} setStatusKey={setStatusKey} />
            </div>
          </div>
        </div>
      </section>
    </ModalForm>
  )
}
