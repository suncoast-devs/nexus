import React from 'react'
import { MarkDownDiv } from '@/components/utils/MarkDownDiv'
import { GithubTurnedInAssignmentDetails } from './GithubTurnedInAssignmentDetails'
import { GistTurnedInAssignmentDetails } from './GistTurnedInAssignmentDetails'
import { URLTurnedInAssignmentDetails } from './URLTurnedInAssignmentDetails'

export function TurnedInAssignment({ homework, assignmentEvent }) {
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
