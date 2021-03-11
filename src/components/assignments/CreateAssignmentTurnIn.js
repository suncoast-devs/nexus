import React, { useState } from 'react'
import { PersonImage } from '@/components/person/PersonImage'
import { GithubTurnIn } from './GithubTurnIn'
import { GistTurnIn } from './GistTurnIn'
import { URLTurnIn } from './URLTurnIn'

export function CreateAssignmentTurnIn({ profile, assignment, homework, createAssignmentEvent }) {
  const [assignmentEventDetails, setAssignmentEventDetails] = useState({
    name: 'turnin',
    payload: { comment: '' },
    assignmentId: assignment.id,
  })
  const [turnInValid, setTurnInValid] = useState(true)

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
          <GithubTurnIn {...{ assignmentEventDetails, setAssignmentEventDetails, setTurnInValid }} />
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
              <button className="button is-info" disabled={!turnInValid} onClick={onSubmit}>
                Turn In Assignment
              </button>
            </div>
          </div>
        </nav>
      </div>
    </article>
  )
}
