import React from 'react'
import cx from 'classnames'

import { Unit, StudentEnrollment } from '../models'
import useModelData from '../../hooks/useModelData'
import { DeleteButton } from '../Buttons'
import PersonDropDown from '../PersonDropDown'
import Person from '../Person'

const EditEnrollment = ({ cohort }) => {
  const {
    loading: loadingStudentEnrollments,
    data: studentEnrollments,
    reload: reloadStudentEnrollments
  } = useModelData(() =>
    StudentEnrollment.includes('person')
      .where({ cohort_id: cohort.id })
      .all()
  )
  const { loading: loadingUnits, data: units } = useModelData(() => Unit.where({ program_id: cohort.program_id }).all())

  if (loadingStudentEnrollments || loadingUnits) {
    return <></>
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

  const toggleUnit = (studentEnrollment, unit) => {
    studentEnrollment.toggleUnit(unit)
    studentEnrollment.save().then(reloadStudentEnrollments)
  }

  const enrollEveryoneInUnit = unit => {
    if (!window.confirm(`Enroll everyone in ${unit.title}`)) {
      return
    }

    const promises = studentEnrollments.map(studentEnrollment => {
      studentEnrollment.ensureUnit(unit)
      return studentEnrollment.save()
    })

    Promise.all(promises).then(reloadStudentEnrollments)
  }

  const table = () => (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Github Repo</th>
          <th>Slack Integration</th>
          {units.map(unit => (
            <th key={unit.id} style={{ cursor: 'pointer' }} onClick={() => enrollEveryoneInUnit(unit)}>
              {unit.title}
            </th>
          ))}
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
                          : ['fas-ban', 'has-text-danger']
                      )}
                    />
                  </span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span className="icon">
                    <i
                      className={cx(
                        'fas',
                        studentEnrollment.person.slackUser.length > 0
                          ? ['fa-check', 'has-text-success']
                          : ['fa-ban', 'has-text-danger']
                      )}
                    />
                  </span>
                </td>
                {units.map(unit => (
                  <td key={unit.id} style={{ textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      onChange={() => toggleUnit(studentEnrollment, unit)}
                      checked={studentEnrollment.isInUnit(unit)}
                    />
                  </td>
                ))}
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
