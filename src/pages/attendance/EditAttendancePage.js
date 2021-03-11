import React, { useState } from 'react'
import moment from 'moment'

import { Cohort, AttendanceRecord } from '@/components/models'
import useModelData from '@/hooks/useModelData'
import { PersonComponent } from '@/components/person/PersonComponent'
import { InactivePerson } from '@/components/person/InactivePerson'
import { LoadingIndicator } from '@/components/utils/LoadingIndicator'
import { AttendanceCell } from '../../components/attendance/AttendanceCell'
import { AttendanceModal } from '../../components/attendance/AttendanceModal'

function AttendanceHeaderCell({ cohort, reload, cohortDate }) {
  const onClick = () => {
    const answer = window.confirm('This will set all students to present for the day. Continue?')
    if (!answer) {
      return
    }

    const deletes = cohortDate.attendanceRecords.map(record => record.destroy())
    const inserts = cohort.studentEnrollments.map(enrollment => {
      let attendanceRecord = new AttendanceRecord()
      attendanceRecord.status = enrollment.active ? 'P' : 'D'
      attendanceRecord.note = ''
      attendanceRecord.person_id = enrollment.person.id
      attendanceRecord.cohort_date_id = cohortDate.id
      return attendanceRecord.save()
    })

    const all = deletes.concat(inserts)
    Promise.all(all).then(() => {
      Promise.all(inserts).then(reload)
    })
  }

  return (
    <th className="has-cursor-pointer" style={{ textAlign: 'center' }} onClick={onClick}>
      {cohortDate.formattedDate()}
    </th>
  )
}

function AttendanceRow({ sortedCohortDates, setSelectedAttendanceRecord, setShowModal, person, active }) {
  const attendanceRecordForDate = cohortDate =>
    cohortDate.attendanceRecords.find(record => record.person.id === person.id) || new AttendanceRecord({ status: ' ' })

  return (
    <tr>
      <td>{active ? <PersonComponent person={person} /> : <InactivePerson person={person} />}</td>
      {sortedCohortDates.map(cohortDate => {
        const attendanceRecord = attendanceRecordForDate(cohortDate)

        attendanceRecord.cohortDate = cohortDate
        attendanceRecord.cohort_date_id = cohortDate.id
        attendanceRecord.person = person
        attendanceRecord.person_id = person.id

        return (
          <AttendanceCell
            key={cohortDate.day}
            active={active}
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

export function EditAttendancePage({ cohort_id }) {
  const [showModal, setShowModal] = useState(false)
  const [onlyToday, setOnlyToday] = useState(true)
  const [selectedAttendanceRecord, setSelectedAttendanceRecord] = useState()

  const { loading, data: cohort, reload } = useModelData(() =>
    Cohort.includes([{ student_enrollments: 'person' }, { cohort_dates: { attendance_records: 'person' } }]).find(
      cohort_id
    )
  )

  if (loading) {
    return <LoadingIndicator />
  }

  const today = moment().format('YYYY-MM-DD')

  const sortedCohortDates = onlyToday
    ? cohort.cohortDates.filter(date => date.day === today)
    : cohort.cohortDates.sort((a, b) => a.day.localeCompare(b.day))

  const activeEnrollments = cohort.studentEnrollments
    .filter(enrollment => enrollment.active)
    .sort((a, b) => a.person.fullName.localeCompare(b.person.fullName))

  const inactiveEnrollments = cohort.studentEnrollments
    .filter(enrollment => !enrollment.active)
    .sort((a, b) => a.person.fullName.localeCompare(b.person.fullName))

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
                  <AttendanceHeaderCell key={cohortDate.id} cohort={cohort} reload={reload} cohortDate={cohortDate} />
                ))}
              </tr>
            </thead>
            <tbody>
              {activeEnrollments.map(enrollment => (
                <AttendanceRow
                  key={enrollment.person.id}
                  sortedCohortDates={sortedCohortDates}
                  setSelectedAttendanceRecord={setSelectedAttendanceRecord}
                  setShowModal={setShowModal}
                  person={enrollment.person}
                  active={enrollment.active}
                />
              ))}
              {inactiveEnrollments.map(enrollment => (
                <AttendanceRow
                  key={enrollment.person.id}
                  sortedCohortDates={sortedCohortDates}
                  setSelectedAttendanceRecord={setSelectedAttendanceRecord}
                  setShowModal={setShowModal}
                  person={enrollment.person}
                  active={enrollment.active}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
