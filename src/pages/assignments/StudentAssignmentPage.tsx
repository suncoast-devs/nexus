import React, { useState } from 'react'
import { Assignment, AssignmentEvent, UnProxyRecord } from '@/components/models'
import moment from 'moment'
import cx from 'classnames'

import { CreateAssignmentComment } from '@/components/assignments/CreateAssignmentComment'
import { MarkDownDiv } from '@/components/utils/MarkDownDiv'
import { ShowAssignmentEvent } from '@/components/assignments/ShowAssignmentEvent'
import { CreateAssignmentTurnIn } from '@/components/assignments/CreateAssignmentTurnIn'
import { GradeAssignment } from '@/components/assignments/GradeAssignment'
import useProfile from '@/hooks/useProfile'
import { useParams } from 'react-router'
import { useQuery } from 'react-query'

export type AssignmentEventDetails = {
  assignmentId: string
  name: string
  payload: any
  uploadsSignedIds: number[]
}

export function StudentAssignmentPage() {
  const { id } = useParams<{ id: string }>()
  const { profile } = useProfile()

  const { isLoading, refetch, data: assignment = new Assignment() } = useQuery(['student-assignment', id], () =>
    Assignment.includes(['person', 'homework', { assignment_events: 'person' }])
      .find(id)
      .then(UnProxyRecord)
  )

  const [newAssignmentEventName, setNewAssignmentEventName] = useState('')

  function cancelNewAssignmentEvent() {
    setNewAssignmentEventName('')
  }

  if (isLoading) {
    return <></>
  }

  const scoreInfo = assignment.scoreInfo()

  async function createAssignmentEvent(assignmentEventDetails: AssignmentEventDetails) {
    const assignmentEvent = new AssignmentEvent()
    assignmentEvent.name = assignmentEventDetails.name
    assignmentEvent.payload = assignmentEventDetails.payload
    assignmentEvent.uploadsSignedIds = assignmentEventDetails.uploadsSignedIds
    assignmentEvent.assignmentId = assignment.key()

    await assignmentEvent.save()

    setNewAssignmentEventName('')

    refetch()

    return Promise.resolve(assignmentEvent)
  }

  let newAssignmentEventComponent = null

  switch (newAssignmentEventName) {
    case 'comment':
      newAssignmentEventComponent = (
        <CreateAssignmentComment
          cancelNewAssignmentEvent={cancelNewAssignmentEvent}
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
          assignment={assignment}
          createAssignmentEvent={createAssignmentEvent}
        />
      )
      break

    case 'turnin':
      newAssignmentEventComponent = (
        <CreateAssignmentTurnIn
          cancelNewAssignmentEvent={cancelNewAssignmentEvent}
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
          createAssignmentEvent={createAssignmentEvent}
        />
      )
      break

    default:
      break
  }

  const whatDoYouWantToDoComponent = (
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
                <a className="is-small">{assignment.turnedIn ? 'Re-turn In My Assignment' : 'Turn In My Assignment'}</a>
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
  )

  const shouldAssignmentBeWide = assignment.assignmentEvents.length === 0 && !newAssignmentEventComponent
  const assignmentClassName = shouldAssignmentBeWide ? 'is-9' : 'is-half'
  const sidebarClassName = shouldAssignmentBeWide ? 'is-3' : 'is-half'

  return (
    <div className="columns">
      <div className={cx('column', assignmentClassName)}>
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
                    {assignment.person.id !== profile.id ? (
                      <div className="title is-4">{assignment.person.fullName}</div>
                    ) : null}
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

            <div className="content mb-4">
              <MarkDownDiv markdown={assignment.homework.bodyWithResolvedUrls} />
            </div>
          </div>
        </section>
      </div>

      <div className={cx('column', sidebarClassName)}>
        <div className="section">
          <div className="container">
            {newAssignmentEventComponent ? newAssignmentEventComponent : whatDoYouWantToDoComponent}
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
