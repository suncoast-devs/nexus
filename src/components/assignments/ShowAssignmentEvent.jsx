import React from 'react'
import moment from 'moment'
import { PersonImage } from '@/components/person/PersonImage'
import { MarkDownDiv } from '@/components/utils/MarkDownDiv'
import { ReopenedAssignment } from './ReopenedAssignment'
import { TurnedInAssignment } from './TurnedInAssignment'
import { GradedAssignment } from './GradedAssignment'
import { AssignmentEventAttachments } from './AssignmentEventAttachments'

export function ShowAssignmentEvent({ homework, assignmentEvent }) {
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
    <nav className="box pb-6 mb-6">
      <div className="mb-4">
        <article className="media">
          <figure className="media-left">
            <p className="image is-64x64">
              <PersonImage alt={person.fullName} url={person.smallProfileImageUrl} />
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{person.fullName}</strong> <small className="is-pulled-right">{dateAgoHuman}</small>
              </p>
            </div>
          </div>
        </article>
      </div>
      <div className="mb-5">{body}</div>
      <div>
        <AssignmentEventAttachments assignmentEvent={assignmentEvent} />
      </div>
    </nav>
  )
}
