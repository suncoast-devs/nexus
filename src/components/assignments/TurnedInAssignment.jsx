import React from 'react'
import { MarkDownDiv } from '@/components/utils/MarkDownDiv'
import { GithubTurnedInAssignmentDetails } from './GithubTurnedInAssignmentDetails'
import { GistTurnedInAssignmentDetails } from './GistTurnedInAssignmentDetails'
import { URLTurnedInAssignmentDetails } from './URLTurnedInAssignmentDetails'

export function TurnedInAssignment({ homework, assignmentEvent }) {
  function wordCase(string) {
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
        <table className="table">
          <thead>
            <tr>
              <th>Level</th>
              <th>Difficulty</th>
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
      ) : null}
      {assignmentEvent.payload.comment && <MarkDownDiv markdown={assignmentEvent.payload.comment} />}
    </>
  )
}
