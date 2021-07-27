import React from 'react'
import { MarkDownDiv } from '/src/components/utils/MarkDownDiv'

export function ReopenedAssignment({ assignmentEvent }) {
  return (
    <>
      <div className="notification is-danger is-light">Re Opened Assignment</div>
      <MarkDownDiv markdown={assignmentEvent.payload.comment} />
    </>
  )
}
