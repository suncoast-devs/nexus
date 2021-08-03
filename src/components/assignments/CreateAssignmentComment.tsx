import React, { useState } from 'react'
import { PersonImage } from '@/components/person/PersonImage'
import { MarkDownTextArea } from './MarkDownTextArea'
import { AssignmentEventUploads } from './AssignmentEventUploads'
import useProfile from '@/hooks/useProfile'
import { Assignment } from '../models'
import { AssignmentEventDetails } from '@/pages/assignments/StudentAssignmentPage'

export function CreateAssignmentComment({
  name = 'comment',
  buttonText = 'Post Comment',
  assignment,
  createAssignmentEvent,
  cancelNewAssignmentEvent,
}: {
  name?: string
  buttonText?: string
  assignment: Assignment
  createAssignmentEvent: (assignmentEventDetails: AssignmentEventDetails) => void
  cancelNewAssignmentEvent: () => void
}) {
  const { profile } = useProfile()
  const [assignmentEventDetails, setAssignmentEventDetails] = useState<AssignmentEventDetails>({
    name,
    payload: { comment: '' },
    assignmentId: assignment.key(),
    uploadsSignedIds: [],
  })

  const onSubmit = async () => {
    await createAssignmentEvent(assignmentEventDetails)

    updateComment('')
  }

  function updateComment(comment: string) {
    setAssignmentEventDetails({ ...assignmentEventDetails, payload: { comment } })
  }

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
                <PersonImage alt={profile.fullName} url={profile.smallProfileImageUrl} imgClassName="is-rounded" />
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
