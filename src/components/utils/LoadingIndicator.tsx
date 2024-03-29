import React, { useState, useEffect } from 'react'

export function LoadingIndicator({ message = '', delay = 250 }) {
  const [timerFired, setTimerFired] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setTimerFired(true), delay)
    return () => {
      window.clearTimeout(id)
    }
  }, [])

  return timerFired ? (
    <div className="notification is-info">
      <div className="has-text-white">
        <p className="has-text-centered">{message}</p>
        <span className="button is-large is-info is-loading" style={{ minWidth: '100%' }} />
      </div>
    </div>
  ) : (
    <></>
  )
}
