import React from 'react'
import moment from 'moment'

import Person from '../Person'
import useModelData from '../../hooks/useModelData'
import AttendanceCell from './AttendanceCell'
import { AttendanceRecord } from '../models'

const StudentAttendance = ({ profile, showTitle }) => {
  const { loading, data } = useModelData(() =>
    AttendanceRecord.includes('cohort_date')
      .where({ person_id: profile.id })
      .all()
  )

  if (!profile.id) {
    return <></>
  }

  if (loading) {
    return <button className="button is-loading">Loading</button>
  }

  const attendanceRecords = data.sort((a, b) => a.cohortDate.day.localeCompare(b.cohortDate.day))

  return (
    <section className="section">
      <div className="container">
        {showTitle && <h1 className="title">Attendance for: {profile.fullName}</h1>}
        <div className="attendance-table">
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Name</th>
                {attendanceRecords.map(attendanceRecord => (
                  <th key={attendanceRecord.id}>{moment(attendanceRecord.cohortDate.day).format('ddd MM/DD')}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr key={profile.id}>
                <td>
                  <Person person={profile} />
                </td>
                {attendanceRecords.map(attendanceRecord => (
                  <AttendanceCell
                    key={attendanceRecord.id}
                    statusKey={attendanceRecord.status}
                    note={attendanceRecord.note}
                  />
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default StudentAttendance
