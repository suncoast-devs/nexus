import React, { useState } from 'react'
import { Assignment, AssignmentEvent } from '@/components/models'
import useModelData from '@/hooks/useModelData'
import moment from 'moment'
import cx from 'classnames'

import { CreateAssignmentComment } from '@/components/assignments/CreateAssignmentComment'
import { MarkDownDiv } from '@/components/utils/MarkDownDiv'
import { ShowAssignmentEvent } from '@/components/assignments/ShowAssignmentEvent'
import { CreateAssignmentTurnIn } from '@/components/assignments/CreateAssignmentTurnIn'
import { GradeAssignment } from '@/components/assignments/GradeAssignment'

export function StudentAssignmentPage({ profile, id }) {
  const { loading, data: assignment, reload } = useModelData(() =>
    Assignment.includes(['person', 'homework', { assignment_events: 'person' }]).find(id)
  )

  const [newAssignmentEventName, setNewAssignmentEventName] = useState('')

  function cancelNewAssignmentEvent() {
    setNewAssignmentEventName('')
  }

  if (loading) {
    return <></>
  }

  const scoreInfo = assignment.scoreInfo()

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

  let newAssignmentEventComponent = null

  switch (newAssignmentEventName) {
    case 'comment':
      newAssignmentEventComponent = (
        <CreateAssignmentComment
          cancelNewAssignmentEvent={cancelNewAssignmentEvent}
          profile={profile}
          assignment={assignment}
          createAssignmentEvent={createAssignmentEvent}
        />
      )
      break

    case 'reopen':
      newAssignmentEventComponent = (
        <CreateAssignmentComment
          cancelNewAssignmentEvent={cancelNewAssignmentEvent}
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
          cancelNewAssignmentEvent={cancelNewAssignmentEvent}
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
          cancelNewAssignmentEvent={cancelNewAssignmentEvent}
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
    <div className="columns">
      <div className={cx('column', assignment.assignmentEvents.length === 0 ? 'is-9' : 'is-half')}>
        <section className="section">
          <div className="box">
            <div className="notification">
              <div className="level">
                <div className="level-left">
                  <div className="level-item">
                    <div className="title is-4">{assignment.homework.title}</div>
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item">
                    <div className="title is-4">{assignment.person.fullName}</div>
                  </div>
                </div>
              </div>
            </div>
            {assignment.turnedIn ? (
              <div
                className="notification"
                style={{ backgroundColor: scoreInfo.style.buttonColor, color: scoreInfo.style.textColor }}
              >
                <span className="subtitle is-4">{scoreInfo.title}</span>
              </div>
            ) : null}

            <div className="content">
              <MarkDownDiv markdown={assignment.homework.bodyWithResolvedUrls} />
            </div>
          </div>
        </section>
      </div>

      <div className={cx('column', assignment.assignmentEvents.length === 0 ? 'is-3' : 'is-half')}>
        <div className="section">
          <div className="container">
            {newAssignmentEventComponent ? (
              newAssignmentEventComponent
            ) : (
              <article className="message is-primary">
                <div className="message-header">
                  <p>Actions</p>
                </div>
                <div className="message-body">
                  <p className="menu-label">What do you want to do?</p>
                  <ul className="menu-list">
                    <li>
                      <ul>
                        <li onClick={() => setNewAssignmentEventName('turnin')}>
                          <a className="is-small">
                            {assignment.turnedIn ? 'Re-turn In My Assignment' : 'Turn In My Assignment'}
                          </a>
                        </li>
                        <li onClick={() => setNewAssignmentEventName('comment')}>
                          <a className="">Leave a Comment</a>
                        </li>
                        {profile.isAdmin ? (
                          <li onClick={() => setNewAssignmentEventName('grade')}>
                            <a>Grade</a>
                          </li>
                        ) : null}
                      </ul>
                    </li>
                  </ul>
                </div>
              </article>
            )}
          </div>

          <div className="mt-6">
            <div className="container">
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
          </div>
        </div>
      </div>
    </div>
  )
}
