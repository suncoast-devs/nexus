import { AssignmentEventDetails } from '@/pages/assignments/StudentAssignmentPage'
import React from 'react'

export function URLTurnIn({
  assignmentEventDetails,
  setAssignmentEventDetails,
}: {
  assignmentEventDetails: AssignmentEventDetails
  setAssignmentEventDetails: (assignmentDetails: AssignmentEventDetails) => void
}) {
  function onChangeURL(event: React.ChangeEvent<HTMLInputElement>) {
    setAssignmentEventDetails({
      ...assignmentEventDetails,
      payload: {
        ...assignmentEventDetails.payload,
        url: event.target.value,
      },
    })
  }

  return (
    <div className="field">
      <label className="label">URL</label>
      <div className="control">
        <input className="input" type="text" value={assignmentEventDetails.payload.url} onChange={onChangeURL} />
      </div>
    </div>
  )
}
