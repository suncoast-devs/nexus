import React from 'react'

type Error = {
  fullMessage: string
}

export function ErrorNotification({ errors, onClear }: { errors: Record<string, Error>; onClear: () => void }) {
  if (Object.keys(errors).length === 0) {
    return <></>
  }

  return (
    <div className="notification is-danger">
      <button className="delete" onClick={onClear} />
      {Object.keys(errors).map(error => (
        <p key={error}>{errors[error].fullMessage}</p>
      ))}
    </div>
  )
}
