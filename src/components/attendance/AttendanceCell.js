import React from 'react'
import statuses from './statuses'
import cx from 'classnames'

const AttendanceCell = ({ onClick, statusKey, note }) => {
  const status = statuses.find(status => status.key === statusKey)

  return (
    <td
      className={cx('is-medium', 'has-white-text', 'has-text-centered', status.className, 'tooltip')}
      data-tooltip={`${status.text} ${note ? ' - ' : ''} ${note || ''}`}
      onClick={onClick}
    >
      {status.icon}
    </td>
  )
}

export default AttendanceCell
