import React, { useState } from 'react'
import { PersonImage } from '@/components/person/PersonImage'

export function CreateAssignmentComment({
  name = 'comment',
  buttonText = 'Post Comment',
  profile,
  assignment,
  createAssignmentEvent,
  cancelNewAssignmentEvent,
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
    <>
      <article className="message is-link">
        <div className="message-header">
          <p>Leave a Message For Your Instructor</p>
          <button className="delete" aria-label="delete" onClick={cancelNewAssignmentEvent}></button>
        </div>
        <div className="message-body">
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
                    placeholder="Dear Instructor..."
                    value={assignmentEventDetails.payload.comment}
                    onChange={event => updateComment(event.target.value)}
                  />
                </p>
              </div>
              <nav className="level">
                <div className="level-left">
                  <div className="level-item">
                    <div className="buttons">
                      <button className="button is-info" onClick={onSubmit}>
                        {buttonText}
                      </button>
                      <button className="button" onClick={cancelNewAssignmentEvent}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </article>
        </div>
      </article>
    </>
  )
}
