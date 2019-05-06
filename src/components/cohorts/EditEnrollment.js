import React from 'react'
import { Unit, StudentEnrollment } from '../models'
import useModelData from '../../hooks/useModelData'
import { DeleteButton } from '../Buttons'
import PersonDropDown from '../PersonDropDown'

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
          {units.map(unit => (
            <th key={unit.id} style={{ cursor: 'pointer' }} onClick={() => enrollEveryoneInUnit(unit)}>
              {unit.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {studentEnrollments
          .sort((a, b) => a.person.fullName.localeCompare(b.person.fullName))
          .map(studentEnrollment => {
            return (
              <tr key={studentEnrollment.id}>
                <td>
                  <DeleteButton onClick={() => deletePerson(studentEnrollment)} />
                  {studentEnrollment.person.fullName}
                </td>
                {units.map(unit => (
                  <td key={unit.id}>
                    <input
                      type="checkbox"
                      onChange={() => toggleUnit(studentEnrollment, unit)}
                      checked={studentEnrollment.isInUnit(unit)}
                    />
                  </td>
                ))}
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
