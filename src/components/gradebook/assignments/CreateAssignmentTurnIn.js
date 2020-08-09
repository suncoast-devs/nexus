import React, { useState } from 'react'
import LoadingIndicator from '@/components/utils/LoadingIndicator'
import { PersonImage } from '@/components/PersonImage'
import { GithubTurnIn } from './GithubTurnIn'
import { GistTurnIn } from './GistTurnIn'
import { URLTurnIn } from './URLTurnIn'

export const CreateAssignmentTurnIn = ({ profile, assignment, homework, createAssignmentEvent }) => {
  const [assignmentEventDetails, setAssignmentEventDetails] = useState({
    name: 'turnin',
    payload: { comment: '' },
    assignmentId: assignment.id,
  })

  const onSubmit = async () => {
    await createAssignmentEvent(assignmentEventDetails)

    updateComment('')
  }

  const updateComment = comment =>
    setAssignmentEventDetails({ ...assignmentEventDetails, payload: { ...assignmentEventDetails.payload, comment } })

  return (
    <article className="media">
      <figure className="media-left">
        <p className="image is-64x64">
          <PersonImage url={profile.smallProfileImageUrl} imgClassName="is-rounded" />
        </p>
      </figure>
      <div className="media-content">
        {homework.turnInType === 'github' && (
          <GithubTurnIn {...{ assignmentEventDetails, setAssignmentEventDetails }} />
        )}
        {homework.turnInType === 'gist' && <GistTurnIn {...{ assignmentEventDetails, setAssignmentEventDetails }} />}
        {homework.turnInType === 'url' && <URLTurnIn {...{ assignmentEventDetails, setAssignmentEventDetails }} />}

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
                Turn In Assignment
              </span>
            </div>
          </div>
        </nav>
      </div>
    </article>
  )
}
