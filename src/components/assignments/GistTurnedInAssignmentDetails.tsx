import { AssignmentEventDetails } from '@/pages/assignments/StudentAssignmentPage'
import React from 'react'

export function GistTurnedInAssignmentDetails({ assignmentEvent }: { assignmentEvent: AssignmentEventDetails }) {
  return (
    <a target="_" href={assignmentEvent.payload.gist_url}>
      <i className="fab fa-github" />
    </a>
  )
}
