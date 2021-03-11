import React from 'react'

export function ErrorNotification({ errors, onClear }) {
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
