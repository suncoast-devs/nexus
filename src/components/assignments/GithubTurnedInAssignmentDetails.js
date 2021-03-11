import React from 'react'

export function GithubTurnedInAssignmentDetails({ assignmentEvent }) {
  return (
    <>
      <a target="_" href={assignmentEvent.payload.repo_url}>
        <i className="fab fa-github" />
      </a>
      {assignmentEvent.payload.homepage && (
        <a target="_" href={assignmentEvent.payload.homepage}>
          <i className="ml-2 fas fa-home" />
        </a>
      )}
    </>
  )
}
