import React, { useState } from 'react'
import { Assignment, AssignmentEvent } from '/src//components/models'
import useModelData from '/src//hooks/useModelData'
import moment from 'moment'
import { CreateAssignmentComment } from '../../components/assignments/CreateAssignmentComment'
import { MarkDownDiv } from '/src//components/utils/MarkDownDiv'
import { ShowAssignmentEvent } from '../../components/assignments/ShowAssignmentEvent'
import { CreateAssignmentTurnIn } from '../../components/assignments/CreateAssignmentTurnIn'
import { GradeAssignment } from '../../components/assignments/GradeAssignment'

export function StudentAssignmentPage({ profile, id }) {
  const { loading, data: assignment, reload } = useModelData(() =>
    Assignment.includes(['person', 'homework', { assignment_events: 'person' }]).find(id)
  )

  const [newAssignmentEventName, setNewAssignmentEventName] = useState('')

  if (loading) {
    return <></>
  }

  const scoreInfo = assignment.scoreInfo()

  const dateAgoHuman = moment(assignment.createdAt).fromNow()
  const longDate = moment(assignment.createdAt).format('dddd MMMM Do, YYYY')

  const createAssignmentEvent = async assignmentEventDetails => {
    const assignmentEvent = new AssignmentEvent()
    assignmentEvent.name = assignmentEventDetails.name
    assignmentEvent.payload = assignmentEventDetails.payload
    assignmentEvent.assignmentId = assignment.id

    await assignmentEvent.save()

    setNewAssignmentEventName('')

    reload()

    return Promise.resolve(assignmentEvent)
  }

  let newAssignmentEventComponent = <></>

  switch (newAssignmentEventName) {
    case 'comment':
      newAssignmentEventComponent = (
        <CreateAssignmentComment
          profile={profile}
          assignment={assignment}
          createAssignmentEvent={createAssignmentEvent}
        />
      )
      break

    case 'reopen':
      newAssignmentEventComponent = (
        <CreateAssignmentComment
          name="reopen"
          buttonText="Reopen Assignment"
          profile={profile}
          assignment={assignment}
          createAssignmentEvent={createAssignmentEvent}
        />
      )
      break

    case 'turnin':
      newAssignmentEventComponent = (
        <CreateAssignmentTurnIn
          profile={profile}
          assignment={assignment}
          homework={assignment.homework}
          createAssignmentEvent={createAssignmentEvent}
        />
      )
      break

    case 'grade':
      newAssignmentEventComponent = (
        <GradeAssignment
          assignment={assignment}
          homework={assignment.homework}
          createAssignmentEvent={createAssignmentEvent}
        />
      )
      break

    default:
      break
  }

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="card">
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <div className="level">
                    <div className="level-left">
                      <div className="level-item">
                        <p className="title is-4">{assignment.homework.title}</p>
                      </div>
                    </div>
                    <div className="level-right">
                      <div className="level-item">
                        <div>
                          <p className="is-6">{assignment.person.fullName}</p>
                          <p className="is-6 tooltip" data-tooltip={longDate}>
                            {dateAgoHuman}
                          </p>
                          <p className="is-6">
                            {assignment.turnedIn ? (
                              <span className="tag is-success">Turned In</span>
                            ) : (
                              <span className="tag is-danger">Due</span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="notification"
                style={{ backgroundColor: scoreInfo.style.buttonColor, color: scoreInfo.style.textColor }}
              >
                {scoreInfo.title}
              </div>

              <hr />
              <div className="content">
                <MarkDownDiv markdown={assignment.homework.bodyWithResolvedUrls} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="buttons">
            {assignment.turnedIn || (
              <button className="button is-success" onClick={() => setNewAssignmentEventName('turnin')}>
                Turn In
              </button>
            )}
            {assignment.turnedIn && (
              <button className="button is-danger" onClick={() => setNewAssignmentEventName('reopen')}>
                Re-open
              </button>
            )}
            <button className="button is-info" onClick={() => setNewAssignmentEventName('comment')}>
              Comment
            </button>
            {profile.isAdmin && (
              <button className="button is-link" onClick={() => setNewAssignmentEventName('grade')}>
                Grade
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {newAssignmentEventComponent}
          {assignment.assignmentEvents
            .sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
            .map(assignmentEvent => (
              <ShowAssignmentEvent
                key={assignmentEvent.id}
                homework={assignment.homework}
                assignmentEvent={assignmentEvent}
              />
            ))}
        </div>
      </section>
    </>
  )
}
