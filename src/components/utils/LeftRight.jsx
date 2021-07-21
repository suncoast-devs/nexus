import React from 'react'

export function LeftRight({ left, right }) {
  return (
    <nav className="level">
      <div className="level-left">
        <div className="level-item">{left}</div>
      </div>
      <div className="level-right">
        <p className="level-item">{right}</p>
      </div>
    </nav>
  )
}
