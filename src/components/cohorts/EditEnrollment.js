import React, { useState } from 'react'
import cx from 'classnames'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { StudentEnrollment } from '@/components/models'
import useModelData from '@/hooks/useModelData'
import { DeleteButton } from '@/components//utils/Buttons'
import PersonDropDown from '@/components//PersonDropDown'
import Person from '@/components/Person'
import LoadingIndicator from '@/components/utils/LoadingIndicator'

const EditEnrollment = ({ cohort }) => {
  const {
    loading: loadingStudentEnrollments,
    data: studentEnrollments,
    reload: reloadStudentEnrollments,
  } = useModelData(() =>
    StudentEnrollment.includes('person')
      .selectExtra({ people: 'assignments_repo_exists' })
      .where({ cohort_id: cohort.id })
      .all()
  )

  if (loadingStudentEnrollments) {
    return <LoadingIndicator />
  }

  const addPerson = person => {
    const studentEnrollment = new StudentEnrollment()
    studentEnrollment.cohort_id = cohort.id
    studentEnrollment.person_id = person.id
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

  const InvitationCode = ({ invitationCode }) => {
    const [toolTipText, setToolTipText] = useState('Click to Copy URL')

    return (
      <CopyToClipboard
        text={`${window.location.origin}/redeem/${invitationCode}`}
        onCopy={() => setToolTipText('Copied')}
      >
        <span className="tooltip" style={{ cursor: 'pointer' }} data-tooltip={toolTipText}>
          <code>{invitationCode}</code>
        </span>
      </CopyToClipboard>
    )
  }

  const table = () => (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Github Repo</th>
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
                  <Person person={studentEnrollment.person} />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span className="icon">
                    <i
                      className={cx(
                        'fas',
                        studentEnrollment.person.assignmentsRepoExists
                          ? ['fa-check', 'has-text-success']
                          : ['fa-ban', 'has-text-danger']
                      )}
                    />
                  </span>
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

export default EditEnrollment
