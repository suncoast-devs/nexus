import React from 'react'

export function URLTurnedInAssignmentDetails({ assignmentEvent }) {
  return (
    <a target="_" href={assignmentEvent.payload.url}>
      <i className="fas fa-home" />
    </a>
  )
}
