import React, { useState } from 'react'
import { PersonImage } from '@/components/person/PersonImage'
import { GithubTurnIn } from './GithubTurnIn'
import { GistTurnIn } from './GistTurnIn'
import { URLTurnIn } from './URLTurnIn'

export function CreateAssignmentTurnIn({ profile, assignment, homework, createAssignmentEvent }) {
  const [assignmentEventDetails, setAssignmentEventDetails] = useState({
    name: 'turnin',
    payload: { level: 'explorer', difficulty: '', lecturePreparedMe: '', totalHours: '', comment: '' },
    assignmentId: assignment.id,
  })
  const [turnInValid, setTurnInValid] = useState(true)

  const onSubmit = async () => {
    await createAssignmentEvent(assignmentEventDetails)

    updateComment('')
  }

  const updateComment = comment =>
    setAssignmentEventDetails({ ...assignmentEventDetails, payload: { ...assignmentEventDetails.payload, comment } })

  const updateAssignmentLevel = level =>
    setAssignmentEventDetails({ ...assignmentEventDetails, payload: { ...assignmentEventDetails.payload, level } })

  const updateDifficulty = difficulty =>
    setAssignmentEventDetails({ ...assignmentEventDetails, payload: { ...assignmentEventDetails.payload, difficulty } })

  const updateLecturePreparedMe = lecturePreparedMe =>
    setAssignmentEventDetails({
      ...assignmentEventDetails,
      payload: { ...assignmentEventDetails.payload, lecturePreparedMe },
    })

  const updateTotalHours = totalHours =>
    setAssignmentEventDetails({
      ...assignmentEventDetails,
      payload: { ...assignmentEventDetails.payload, totalHours },
    })

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
          <label className="label">Homework level completed</label>
          <div className="select">
            <select
              value={assignmentEventDetails.payload.level}
              onChange={event => updateAssignmentLevel(event.target.value)}
            >
              <option key="explorer">Explorer</option>
              <option key="adventure">Adventure</option>
              <option key="epic">Epic</option>
            </select>
          </div>
        </div>

        <div className="field">
          <label className="label">This assignment was challenging</label>
          <div className="select">
            <select
              value={assignmentEventDetails.payload.difficulty}
              onChange={event => updateDifficulty(event.target.value)}
            >
              <option key="">Choose One</option>
              <option key="strongly disagree">Strongly Disagree</option>
              <option key="disagree">Disagree</option>
              <option key="neither">Neither Disagree nor Agree</option>
              <option key="agree">Agree</option>
              <option key="strongly agree">Strongly Agree</option>
            </select>
          </div>
        </div>

        <div className="field">
          <label className="label">Lecture prepared me for this assignment</label>
          <div className="select">
            <select
              value={assignmentEventDetails.payload.lecturePreparedMe}
              onChange={event => updateLecturePreparedMe(event.target.value)}
            >
              <option key="">Choose One</option>
              <option key="strongly disagree">Strongly Disagree</option>
              <option key="disagree">Disagree</option>
              <option key="neither">Neither Disagree nor Agree</option>
              <option key="agree">Agree</option>
              <option key="strongly agree">Strongly Agree</option>
              <option key="agree">Agree</option>
            </select>
          </div>
        </div>

        <div className="field">
          <label className="label">How many total working hours did you spend on this assignment?</label>
          <div className="select">
            <select
              value={assignmentEventDetails.payload.totalHours}
              onChange={event => updateTotalHours(event.target.value)}
            >
              <option key="">Choose One</option>
              <option key="less than one">Less than an hour</option>
              <option key="one to four">Between one hour and four hours</option>
              <option key="between four and eight">Between four and eight hours</option>
              <option key="between eight and 24">Between eight and 24 hours</option>
              <option key="more than 24">More than 24 hours</option>
              <option key="agree">Agree</option>
            </select>
          </div>
        </div>

        <div className="field">
          <label className="label">Homework Feedback</label>
          <p className="control">
            <textarea
              className="textarea"
              placeholder="Write any comment you have here for your instructor..."
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
