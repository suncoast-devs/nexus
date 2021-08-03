import React from 'react'
import cx from 'classnames'
import { AttendanceStatus } from './statuses'

export function StatusButton({
  statusKey,
  status,
  setStatusKey,
}: {
  statusKey: string
  status: AttendanceStatus
  setStatusKey: (string: string) => void
}) {
  return (
    <button
      className={cx('button', {
        [status.className]: statusKey === status.key,
        'has-text-black': statusKey === status.key,
        'has-text-grey-light': statusKey !== status.key,
      })}
      style={{ minWidth: '100%' }}
      onClick={() => setStatusKey(status.key)}
    >
      <span className="icon">{status.icon}</span>
      <span>{status.text}</span>
    </button>
  )
}
