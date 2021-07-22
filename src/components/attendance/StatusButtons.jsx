import React from 'react'
import { StatusButton } from './StatusButton'

export function StatusButtons({ statuses, statusKey, setStatusKey }) {
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
