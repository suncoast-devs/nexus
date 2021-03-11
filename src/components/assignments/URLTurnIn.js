import React from 'react'

export function URLTurnIn({ assignmentEventDetails, setAssignmentEventDetails }) {
  const onChangeURL = event => {
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
