import React from 'react'

export const LeftRight = ({ left, right }) => (
  <nav className="level">
    <div className="level-left">
      <div className="level-item">{left}</div>
    </div>
    <div className="level-right">
      <p className="level-item">{right}</p>
    </div>
  </nav>
)
