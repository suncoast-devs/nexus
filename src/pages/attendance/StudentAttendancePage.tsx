import React from 'react'

import { PersonComponent } from '@/components/person/PersonComponent'
import { AttendanceRecord, UnProxyCollection } from '@/components/models'
import { AttendanceCell } from '@/components/attendance/AttendanceCell'
import useProfile from '@/hooks/useProfile'
import { useQuery } from 'react-query'

export function StudentAttendancePage({ showTitle }: { showTitle: boolean }) {
  const { profile } = useProfile()
  const { isLoading, data: attendanceRecords = [] } = useQuery('attendance-records', () =>
    AttendanceRecord.includes('cohort_date').order('cohort_date').all().then(UnProxyCollection)
  )

  if (isLoading) {
    return <button className="button is-loading">Loading</button>
  }

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
                  <PersonComponent person={profile} />
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
