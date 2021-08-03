import React from 'react'
import { MarkDownDiv } from '@/components/utils/MarkDownDiv'
import { AssignmentEvent } from '../models'

export function ReopenedAssignment({ assignmentEvent }: { assignmentEvent: AssignmentEvent }) {
  return (
    <>
      <div className="notification is-danger is-light">Re Opened Assignment</div>
      <div className="content mb-4">
        <MarkDownDiv markdown={assignmentEvent.payload.comment} />
      </div>
    </>
  )
}
