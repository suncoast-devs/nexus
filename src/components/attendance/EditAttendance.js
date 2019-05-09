import React, { useState } from 'react'
import moment from 'moment'

import { Cohort, AttendanceRecord } from '../models'
import useModelData from '../../hooks/useModelData'
import PersonComponent from '../Person'
import AttendanceCell from './AttendanceCell'
import AttendanceModal from './AttendanceModal'
import LoadingIndicator from '../LoadingIndicator'

const EditAttendance = ({ cohort_id }) => {
  const [showModal, setShowModal] = useState(false)
  const [onlyToday, setOnlyToday] = useState(true)
  const [selectedAttendanceRecord, setSelectedAttendanceRecord] = useState()

  const { loading, data: cohort, reload } = useModelData(() =>
    Cohort.includes(['people', { cohort_dates: { attendance_records: 'person' } }]).find(cohort_id)
  )

  if (loading) {
    return <LoadingIndicator />
  }

  const today = moment().format('YYYY-MM-DD')

  const sortedCohortDates = onlyToday
    ? cohort.cohortDates.filter(date => date.day === today)
    : cohort.cohortDates.sort((a, b) => a.day.localeCompare(b.day))

  const AttendanceHeaderCell = ({ cohortDate }) => {
    const onClick = () => {
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

        Promise.all(inserts).then(reload)
      })
    }

    return (
      <th style={{ cursor: 'pointer' }} onClick={onClick}>
        {moment(cohortDate.day).format('ddd MM/DD')}
      </th>
    )
  }

  const AttendanceRow = ({ person }) => {
    const attendanceRecordForDate = cohortDate =>
      cohortDate.attendanceRecords.find(record => record.person.id === person.id) ||
      new AttendanceRecord({ status: ' ' })

    return (
      <tr>
        <td>
          <PersonComponent person={person} />
        </td>
        {sortedCohortDates.map(cohortDate => {
          const attendanceRecord = attendanceRecordForDate(cohortDate)

          attendanceRecord.cohortDate = cohortDate
          attendanceRecord.cohort_date_id = cohortDate.id
          attendanceRecord.person = person
          attendanceRecord.person_id = person.id

          return (
            <AttendanceCell
              key={cohortDate.day}
              statusKey={attendanceRecord.status}
              note={attendanceRecord.note}
              onClick={() => {
                setSelectedAttendanceRecord(attendanceRecord)
                setShowModal(true)
              }}
            />
          )
        })}
      </tr>
    )
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">{cohort.name}</h1>
        {showModal && (
          <AttendanceModal
            selectedAttendanceRecord={selectedAttendanceRecord}
            onClose={() => {
              reload()
              setShowModal(false)
            }}
          />
        )}
        <div className="field">
          <div className="control">
            <label>
              <input onChange={() => setOnlyToday(!onlyToday)} value={onlyToday} checked={onlyToday} type="checkbox" />{' '}
              Today Only
            </label>
          </div>
        </div>
        <div className="attendance-table">
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Name</th>
                {sortedCohortDates.map(cohortDate => (
                  <AttendanceHeaderCell key={cohortDate.id} cohortDate={cohortDate} />
                ))}
              </tr>
            </thead>
            <tbody>
              {cohort.people
                .sort((a, b) => a.fullName.localeCompare(b.fullName))
                .map(person => (
                  <AttendanceRow key={person.id} person={person} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default EditAttendance
