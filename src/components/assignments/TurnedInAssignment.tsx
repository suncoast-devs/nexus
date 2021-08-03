import React from 'react'
import { MarkDownDiv } from '@/components/utils/MarkDownDiv'
import { GithubTurnedInAssignmentDetails } from './GithubTurnedInAssignmentDetails'
import { GistTurnedInAssignmentDetails } from './GistTurnedInAssignmentDetails'
import { URLTurnedInAssignmentDetails } from './URLTurnedInAssignmentDetails'
import { AssignmentEvent, Homework } from '../models'

export function TurnedInAssignment({
  homework,
  assignmentEvent,
}: {
  homework: Homework
  assignmentEvent: AssignmentEvent
}) {
  function wordCase(string: string | undefined) {
    return string ? string.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()) : null
  }

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
      {assignmentEvent.payload.level ? (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Level</th>
                <th>Assignment Was Challenging</th>
                <th>Lecture Prepared</th>
                <th>Total Hours</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{wordCase(assignmentEvent.payload.level)}</td>
                <td>{wordCase(assignmentEvent.payload.difficulty)}</td>
                <td>{wordCase(assignmentEvent.payload.lecturePreparedMe)}</td>
                <td>{wordCase(assignmentEvent.payload.totalHours)}</td>
              </tr>
            </tbody>
          </table>
          <hr />
        </>
      ) : null}
      {assignmentEvent.payload.comment && (
        <div className="content mb-4">
          <MarkDownDiv markdown={assignmentEvent.payload.comment} />
        </div>
      )}
    </>
  )
}
