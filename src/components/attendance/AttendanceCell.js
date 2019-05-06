import React from 'react'
import statuses from './statuses'

const AttendanceCell = ({ onClick, attendanceRecord }) => {
  const status = statuses.find(status => status.key === attendanceRecord.status)

  return (
    <td
      className={`${attendanceRecord.status === ' ' ? '' : 'tooltip'} is-medium ${
        status.className
      } has-text-white has-text-centered`}
      data-tooltip={`${status.text} ${attendanceRecord.note ? ' - ' : ''} ${attendanceRecord.note || ''}`}
      onClick={onClick}
    >
      {status.icon}
    </td>
  )
}

export default AttendanceCell
