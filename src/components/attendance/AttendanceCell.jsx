import React from 'react'
import statuses from './statuses'
import cx from 'classnames'

export function AttendanceCell({ onClick, statusKey, note, active }) {
  const status = statuses.find(status => status.key === statusKey)

  return (
    <td
      className={cx('is-medium', 'has-text-white', 'has-text-centered', status.className, 'tooltip')}
      data-tooltip={`${status.text} ${note ? ' - ' : ''} ${note || ''}`}
      onClick={active ? onClick : () => {}}
    >
      {status.icon}
    </td>
  )
}
