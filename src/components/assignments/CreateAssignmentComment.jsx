import React, { useState } from 'react'
import { PersonImage } from '@/components/person/PersonImage'
import { MarkDownTextArea } from './MarkDownTextArea'
import { AssignmentEventUploads } from './AssignmentEventUploads'
import useProfile from '@/hooks/useProfile'

export function CreateAssignmentComment({
  name = 'comment',
  buttonText = 'Post Comment',
  assignment,
  createAssignmentEvent,
  cancelNewAssignmentEvent,
}) {
  const { profile } = useProfile()
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
              <div className="pb-2">
                <MarkDownTextArea value={assignmentEventDetails.payload.comment} updateValue={updateComment} />
              </div>
              <AssignmentEventUploads
                assignmentEventDetails={assignmentEventDetails}
                setAssignmentEventDetails={setAssignmentEventDetails}
              />

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
