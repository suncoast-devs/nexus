import React, { useState } from 'react'
import { Assignment } from '@/components/models'
import LoadingButton from '@/components/utils/LoadingButton'

export const GradeAssignment = ({ assignment, createAssignmentEvent }) => {
  const placeholder = 'https://bulma.io/images/placeholders/128x128.png'
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

  const assignScore = (score, stopLoading) => {
    fetch(`https://gifs.suncoast.io/gifs/${score}?content_type=image/gif&max_byte_size=5000000#`)
      .then(response => response.json())
      .then(gifApi => {
        setAssignmentEventDetails({
          ...assignmentEventDetails,
          payload: { ...assignmentEventDetails.payload, score, gif_url: gifApi.image, gif_caption: gifApi.caption },
        })
        stopLoading()
      })

    setAssignmentEventDetails({
      ...assignmentEventDetails,
      payload: { ...assignmentEventDetails.payload, gif_url: placeholder, score },
    })
  }

  return (
    <>
      <article className="media">
        <figure className="media-left">
          <p className="image is-128x128">
            {assignmentEventDetails.payload.gif_url ? (
              <img
                className="image"
                alt={assignmentEventDetails.payload.gif_caption}
                src={assignmentEventDetails.payload.gif_url}
              />
            ) : (
              <img className="image" src={placeholder} alt="awaiting grade" />
            )}
          </p>
        </figure>
        <div className="media-content">
          <div className="buttons">
            {Assignment.scoreInfos.map((info, score) => {
              return (
                <LoadingButton
                  key={score}
                  style={{ backgroundColor: info.style.buttonColor, color: info.style.textColor }}
                  onClick={stopLoading => assignScore(score, stopLoading)}
                >
                  {info.title}
                </LoadingButton>
              )
            })}
          </div>

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
                  Grade
                </span>
              </div>
            </div>
          </nav>
        </div>
      </article>
    </>
  )
}
