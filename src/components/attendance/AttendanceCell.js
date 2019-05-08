import React from 'react'
import statuses from './statuses'
import cx from 'classnames'

const AttendanceCell = ({ onClick, attendanceRecord }) => {
  const status = statuses.find(status => status.key === attendanceRecord.status)

  return (
    <td
      className={cx('is-medium', 'has-white-text', 'has-text-centered', status.className, 'tooltip')}
      data-tooltip={`${status.text} ${attendanceRecord.note ? ' - ' : ''} ${attendanceRecord.note || ''}`}
      onClick={onClick}
    >
      {status.icon}
    </td>
  )
}

export default AttendanceCell
