import React, { useState } from 'react'
import moment from 'moment'
import { Assignment } from '@/components/models'
import { PersonImage } from '../../PersonImage'
import { MarkDownDiv } from '../../utils/MarkDownDiv'

export const ShowAssignmentEvent = ({ homework, assignmentEvent }) => {
  const dateAgoHuman = moment(assignmentEvent.createdAt).fromNow()
  const { person } = assignmentEvent

  let body = <></>

  switch (assignmentEvent.name) {
    case 'comment':
      body = <MarkDownDiv markdown={assignmentEvent.payload.comment} />
      break

    case 'reopen':
      body = <ReopenedAssignment assignmentEvent={assignmentEvent} />
      break

    case 'turnin':
      body = <TurnedInAssignment homework={homework} assignmentEvent={assignmentEvent} />
      break

    case 'grade':
      body = <GradedAssignment assignmentEvent={assignmentEvent} />
      break

    default:
      break
  }

  return (
    <article className="media">
      <figure className="media-left">
        <p className="image is-64x64">
          <PersonImage alt={person.fullName} url={person.smallProfileImageUrl} />
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{person.fullName}</strong> <small>{dateAgoHuman}</small>
          </p>

          {body}
        </div>
      </div>
    </article>
  )
}

const ReopenedAssignment = ({ assignmentEvent }) => {
  return (
    <>
      <div className="notification is-danger is-light">Re Opened Assignment</div>
      <MarkDownDiv markdown={assignmentEvent.payload.comment} />
    </>
  )
}

const GithubTurnedInAssignmentDetails = ({ assignmentEvent }) => {
  return (
    <>
      <a target="_" href={assignmentEvent.payload.repo_url}>
        <i className="fab fa-github" />
      </a>
      {assignmentEvent.payload.homepage && (
        <a target="_" href={assignmentEvent.payload.homepage}>
          <i className="ml-2 fas fa-home" />
        </a>
      )}
    </>
  )
}

const GistTurnedInAssignmentDetails = ({ assignmentEvent }) => {
  return (
    <a target="_" href={assignmentEvent.payload.gist_url}>
      <i className="fab fa-github" />
    </a>
  )
}

const URLTurnedInAssignmentDetails = ({ assignmentEvent }) => {
  return (
    <a target="_" href={assignmentEvent.payload.url}>
      <i className="fas fa-home" />
    </a>
  )
}

const TurnedInAssignment = ({ homework, assignmentEvent }) => {
  return (
    <>
      <div className="notification is-success is-light">
        <div className="level">
          <div className="level-left">
            <div className="level-item">Turned In Assignment</div>
          </div>
          <div className="level-right">
            <div className="level-item">
              {homework.turnInType === 'github' && (
                <GithubTurnedInAssignmentDetails assignmentEvent={assignmentEvent} />
              )}
              {homework.turnInType === 'gist' && <GistTurnedInAssignmentDetails assignmentEvent={assignmentEvent} />}
              {homework.turnInType === 'url' && <URLTurnedInAssignmentDetails assignmentEvent={assignmentEvent} />}
            </div>
          </div>
        </div>
      </div>
      {assignmentEvent.payload.comment && <MarkDownDiv markdown={assignmentEvent.payload.comment} />}
    </>
  )
}

const GradedAssignment = ({ assignmentEvent }) => {
  const [showGif, setShowGif] = useState(true)

  return (
    <>
      <div className="notification is-success is-light">
        <div className="level">
          <div className="level-left">
            <div className="level-item">Graded</div>
          </div>
          <div className="level-right">
            <div className="level-item">{Assignment.scoreInfo(assignmentEvent.payload.score).title}</div>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <MarkDownDiv markdown={assignmentEvent.payload.comment} />
      </div>
      {showGif && (
        <article className="media">
          <div className="media-content">
            <img
              className="mt-3 image"
              alt={assignmentEvent.payload.gif_caption}
              src={assignmentEvent.payload.gif_url}
            />
            <span className="mt-2 tag is-info is-light">{assignmentEvent.payload.gif_caption}</span>
          </div>
          <div className="media-right">
            <button className="delete" onClick={() => setShowGif(false)} />
          </div>
        </article>
      )}
    </>
  )
}
