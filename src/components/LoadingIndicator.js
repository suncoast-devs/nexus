import React, { useState } from 'react'

const LoadingIndicator = ({ delay = 250 }) => {
  const [timerFired, setTimerFired] = useState(false)

  window.setTimeout(() => setTimerFired(true), delay)

  return timerFired ? <button className="button is-large is-info is-loading" style={{ minWidth: '100%' }} /> : <></>
}

export default LoadingIndicator
