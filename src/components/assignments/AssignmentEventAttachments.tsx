import { AssignmentEventDetails } from '@/pages/assignments/StudentAssignmentPage'
import React from 'react'
import { AssignmentEvent } from '../models'
import { AssignmentEventAttachment } from './AssignmentEventAttachment'

export function AssignmentEventAttachments({
  assignmentEvent,
}: {
  assignmentEvent: AssignmentEvent | AssignmentEventDetails
}) {
  const ids = assignmentEvent.uploadsSignedIds || []

  if (ids.length === 0) {
    return null
  }

  return (
    <>
      <aside className="menu">
        <ul className="menu-list">
          <li>
            <div className="menu-label">Attachments</div>
            <ul className="menu-list">
              {ids.map(id => (
                <AssignmentEventAttachment key={id} id={id} />
              ))}
            </ul>
          </li>
        </ul>
      </aside>
    </>
  )
}
