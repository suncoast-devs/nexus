import React from 'react'
import cx from 'classnames'

import { StudentEnrollment } from '@/components/models'
import useModelData from '@/hooks/useModelData'
import { DeleteButton } from '@/components//utils/Buttons'
import { PersonDropDown } from '@/components/person/PersonDropDown'
import { PersonComponent } from '@/components/person/PersonComponent'
import { LoadingIndicator } from '@/components/utils/LoadingIndicator'
import { InvitationCode } from './InvitationCode'

export function EditEnrollment({ cohort }) {
  const {
    loading: loadingStudentEnrollments,
    data: studentEnrollments,
    reload: reloadStudentEnrollments,
  } = useModelData(() => StudentEnrollment.includes('person').where({ cohort_id: cohort.id }).all())

  if (loadingStudentEnrollments) {
    return <LoadingIndicator />
  }

  const addPerson = person => {
    const studentEnrollment = new StudentEnrollment()
    studentEnrollment.cohortId = cohort.id
    studentEnrollment.personId = person.id
    studentEnrollment.save().then(() => {
      reloadStudentEnrollments()
    })
  }

  const deletePerson = studentEnrollment => {
    studentEnrollment.destroy().then(reloadStudentEnrollments)
  }

  const setActive = (studentEnrollment, active) => {
    studentEnrollment.active = active
    studentEnrollment.save().then(reloadStudentEnrollments)
  }

  const setAuditing = (studentEnrollment, auditing) => {
    studentEnrollment.auditing = auditing
    studentEnrollment.save().then(reloadStudentEnrollments)
  }

  const table = () => (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Slack Integration</th>
          <th>Invitation Code</th>
          <th>Active</th>
          <th>Auditing</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {studentEnrollments
          .sort((a, b) => a.person.fullName.localeCompare(b.person.fullName))
          .map(studentEnrollment => {
            return (
              <tr key={studentEnrollment.id}>
                <td>
                  <PersonComponent person={studentEnrollment.person} />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span className="icon">
                    <i
                      className={cx(
                        'fas',
                        studentEnrollment.person.slackUser && studentEnrollment.person.slackUser.length > 0
                          ? ['fa-check', 'has-text-success']
                          : ['fa-ban', 'has-text-danger']
                      )}
                    />
                  </span>
                </td>
                <td>
                  {studentEnrollment.invitationCode && (
                    <InvitationCode invitationCode={studentEnrollment.invitationCode} />
                  )}
                </td>
                <td>
                  <input
                    type="checkbox"
                    onChange={event => {
                      setActive(studentEnrollment, event.target.checked)
                    }}
                    checked={studentEnrollment.active}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    onChange={event => {
                      setAuditing(studentEnrollment, event.target.checked)
                    }}
                    checked={studentEnrollment.auditing}
                  />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <DeleteButton onClick={() => deletePerson(studentEnrollment)} />
                </td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )

  return (
    <>
      {studentEnrollments.length > 0 ? table() : <h1 className="title is-1">Add some students</h1>}
      <PersonDropDown
        placeholder="Select people to add..."
        isSearchable={true}
        onSelect={person => {
          addPerson(person)
        }}
        excludedIDs={studentEnrollments.map(enrollment => enrollment.person.id)}
      />
    </>
  )
}
