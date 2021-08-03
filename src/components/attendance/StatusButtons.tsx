import React from 'react'
import { StatusButton } from './StatusButton'
import { AttendanceStatus } from './statuses'

export function StatusButtons({
  statuses,
  statusKey,
  setStatusKey,
}: {
  statuses: AttendanceStatus[]
  statusKey: string
  setStatusKey: (string: string) => void
}) {
  return (
    <div className="column is-half">
      <div className="buttons">
        {statuses.map(status => (
          <StatusButton key={status.key} statusKey={statusKey} setStatusKey={setStatusKey} status={status} />
        ))}
      </div>
    </div>
  )
}
