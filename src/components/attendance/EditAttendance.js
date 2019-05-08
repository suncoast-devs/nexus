import React, { useState } from 'react'
import moment from 'moment'

import { Cohort, AttendanceRecord } from '../models'
import useModelData from '../../hooks/useModelData'
import Person from '../Person'
import AttendanceCell from './AttendanceCell'
import AttendanceModal from './AttendanceModal'
import LoadingIndicator from '../LoadingIndicator'

const EditAttendance = ({ cohort_id }) => {
  const [selected, setSelected] = useState()
  const [onlyToday, setOnlyToday] = useState(true)

  const { loading, data: cohort, reload } = useModelData(() =>
    Cohort.includes(['people', { cohort_dates: { attendance_records: 'person' } }]).find(cohort_id)
  )

  if (loading) {
    return <LoadingIndicator />
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
    <>
      <AttendanceModal selected={selected} setSelected={setSelected} reload={reload} />
      <div>
        <label>
          <input onChange={() => setOnlyToday(!onlyToday)} value={onlyToday} checked={onlyToday} type="checkbox" />{' '}
          Today Only
        </label>
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
                  <td>
                    <Person person={person} />
                  </td>
                  {sortedCohortDates.map(cohortDate => {
                    const attendanceRecord =
                      cohortDate.attendanceRecords.find(record => record.person.id === person.id) ||
                      new AttendanceRecord({ status: ' ' })

                    return (
                      <AttendanceCell
                        key={cohortDate.day}
                        attendanceRecord={attendanceRecord}
                        onClick={() => setSelected({ cohortDate, attendanceRecord, person })}
                      />
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default EditAttendance
