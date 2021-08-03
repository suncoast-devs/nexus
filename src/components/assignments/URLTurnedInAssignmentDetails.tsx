import React from 'react'
import { AssignmentEvent } from '../models'

export function URLTurnedInAssignmentDetails({ assignmentEvent }: { assignmentEvent: AssignmentEvent }) {
  return (
    <a target="_" href={assignmentEvent.payload.url}>
      <i className="fas fa-home" />
    </a>
  )
}
