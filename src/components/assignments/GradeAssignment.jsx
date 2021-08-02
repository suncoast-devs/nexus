import React, { useState } from 'react'
import { Assignment } from '@/components/models'
import cx from 'classnames'
import { MarkDownTextArea } from './MarkDownTextArea'
import { AssignmentEventUploads } from './AssignmentEventUploads'

export function GradeAssignment({ assignment, createAssignmentEvent, cancelNewAssignmentEvent }) {
  const placeholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  const [assignmentEventDetails, setAssignmentEventDetails] = useState({
    name: 'grade',
    payload: { comment: '' },
    assignmentId: assignment.id,
  })

  const updateComment = comment =>
    setAssignmentEventDetails({ ...assignmentEventDetails, payload: { ...assignmentEventDetails.payload, comment } })

  const onSubmit = async () => {
    await createAssignmentEvent(assignmentEventDetails)

    updateComment('')
  }

  const assignScore = score => {
    fetch(`https://gifs.suncoast.io/gifs/${score}?content_type=image/gif&max_byte_size=5000000#`)
      .then(response => response.json())
      .then(gifApi => {
        setAssignmentEventDetails({
          ...assignmentEventDetails,
          payload: { ...assignmentEventDetails.payload, score, gif_url: gifApi.image, gif_caption: gifApi.caption },
        })
      })

    setAssignmentEventDetails({
      ...assignmentEventDetails,
      payload: { ...assignmentEventDetails.payload, gif_url: placeholder, score },
    })
  }

  return (
    <article className="message is-link">
      <div className="message-header">
        <p>Grade This Assignment</p>
        <button className="delete" aria-label="delete" onClick={cancelNewAssignmentEvent}></button>
      </div>

      <div className="message-body">
        <article className="media">
          <figure className="media-left">
            <p className="image is-128x128">
              {assignmentEventDetails.payload.gif_url ? (
                <img
                  className="image"
                  alt={assignmentEventDetails.payload.gif_caption}
                  src={assignmentEventDetails.payload.gif_url}
                />
              ) : null}
            </p>
          </figure>

          <figure className="media-left">
            <aside className="menu">
              <p className="menu-label">Select a grade</p>
              <ul className="menu-list">
                {Assignment.scoreInfos.map((info, score) => {
                  return (
                    <li key={score}>
                      <a
                        style={{ textDecoration: 'none' }}
                        className={cx({ 'is-active has-text-white': assignmentEventDetails.payload.score === score })}
                        onClick={() => assignScore(score)}
                      >
                        {info.title}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </aside>
          </figure>
        </article>

        <div className="my-4">
          <div className="field">
            <div className="control">
              <MarkDownTextArea value={assignmentEventDetails.payload.comment} updateValue={updateComment} />
              <AssignmentEventUploads
                assignmentEventDetails={assignmentEventDetails}
                setAssignmentEventDetails={setAssignmentEventDetails}
              />{' '}
            </div>
          </div>
        </div>

        <div className="buttons">
          <button
            disabled={assignmentEventDetails.payload.score === undefined}
            className="button is-info"
            onClick={onSubmit}
          >
            Grade
          </button>
          <button className="button" onClick={cancelNewAssignmentEvent}>
            Cancel
          </button>
        </div>
      </div>
    </article>
  )
}
