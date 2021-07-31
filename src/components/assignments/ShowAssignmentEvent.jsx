import React from 'react'
import moment from 'moment'
import { PersonImage } from '@/components/person/PersonImage'
import { MarkDownDiv } from '@/components/utils/MarkDownDiv'
import { ReopenedAssignment } from './ReopenedAssignment'
import { TurnedInAssignment } from './TurnedInAssignment'
import { GradedAssignment } from './GradedAssignment'

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
    <article className="media mb-6">
      <figure className="media-left">
        <p className="image is-64x64">
          <PersonImage alt={person.fullName} url={person.smallProfileImageUrl} />
        </p>
      </figure>
      <div className="media-content">
        <div className="mb-4">
          <p>
            <strong>{person.fullName}</strong> <small>{dateAgoHuman}</small>
          </p>
        </div>
        {body}
      </div>
    </article>
  )
}
