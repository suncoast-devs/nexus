import React from 'react'
import cx from 'classnames'

export function StatusButton({ statusKey, status, setStatusKey }) {
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
