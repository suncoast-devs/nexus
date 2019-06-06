import React from 'react'

import Person from '@/components//Person'
import useModelData from '@/hooks/useModelData'
import AttendanceCell from './AttendanceCell'
import { AttendanceRecord } from '@/components/models'

const StudentAttendance = ({ profile, showTitle }) => {
  const { loading, data } = useModelData(() => AttendanceRecord.includes('cohort_date').all())

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
                  <th style={{ textAlign: 'center' }} key={attendanceRecord.id}>
                    {attendanceRecord.cohortDate.formattedDate()}
                  </th>
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
