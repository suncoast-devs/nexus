import React from 'react'

export function GistTurnedInAssignmentDetails({ assignmentEvent }) {
  return (
    <a target="_" href={assignmentEvent.payload.gist_url}>
      <i className="fab fa-github" />
    </a>
  )
}
