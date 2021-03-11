import React, { useState } from 'react'
import { PersonImage } from '../person/PersonImage'

export function CreateAssignmentComment({
  name = 'comment',
  buttonText = 'Post Comment',
  profile,
  assignment,
  createAssignmentEvent,
}) {
  const [assignmentEventDetails, setAssignmentEventDetails] = useState({
    name,
    payload: { comment: '' },
    assignmentId: assignment.id,
  })

  const onSubmit = async () => {
    await createAssignmentEvent(assignmentEventDetails)

    updateComment('')
  }

  const updateComment = comment => setAssignmentEventDetails({ ...assignmentEventDetails, payload: { comment } })

  return (
    <article className="media">
      <figure className="media-left">
        <p className="image is-64x64">
          <PersonImage url={profile.smallProfileImageUrl} imgClassName="is-rounded" />
        </p>
      </figure>
      <div className="media-content">
        <div className="field">
          <p className="control">
            <textarea
              className="textarea"
              placeholder="Add a comment..."
              value={assignmentEventDetails.payload.comment}
              onChange={event => updateComment(event.target.value)}
            />
          </p>
        </div>
        <nav className="level">
          <div className="level-left">
            <div className="level-item">
              <span className="button is-info" onClick={onSubmit}>
                {buttonText}
              </span>
            </div>
          </div>
        </nav>
      </div>
    </article>
  )
}
