import React, { useState } from 'react'
import { Program, Unit, StudentEnrollment } from '../models'
import useModelData from '../../hooks/useModelData'
import { AddButton, DeleteButton } from '../Buttons'
import PersonDropDown from '../PersonDropDown'

const EditUnits = ({ cohort }) => {
  const { loading: loadingPrograms, data: programs } = useModelData(() => Program.all())

  const { loading: loadingUnits, data: units, reload: forceUpdateUnits } = useModelData(() =>
    Unit.includes(['program', { student_enrollments: 'person' }])
      .where({ cohort_id: cohort.id })
      .all()
  )

  if (loadingPrograms || loadingUnits) {
    return <></>
  }

  const Person = ({ studentEnrollment }) => (
    <div key={studentEnrollment.id} className="panel-block">
      <nav className="level">
        <div className="level-left">
          <div className="level-item">
            <DeleteButton onClick={() => studentEnrollment.destroy().then(forceUpdateUnits)} />
          </div>
        </div>
        <div className="level-right">{studentEnrollment.person.fullName}</div>
      </nav>
    </div>
  )

  const UnitDetails = ({ program, unit }) => {
    const [newPeople, setNewPeople] = useState([])

    const addPeople = () => {
      const promises = newPeople.map(person => {
        const studentEnrollment = new StudentEnrollment()
        studentEnrollment.unit_id = unit.id
        studentEnrollment.person_id = person.id
        return studentEnrollment.save()
      })

      Promise.all(promises).then(forceUpdateUnits)
    }

    const addUnit = () => {
      // Why do we have to construct a new unit this way?
      const unit = new Unit()
      unit.cohort_id = cohort.id
      unit.program_id = program.id

      unit.save().then(forceUpdateUnits)
    }

    const deleteUnit = () => {
      unit.destroy().then(forceUpdateUnits)
    }

    return (
      <nav className="panel">
        <p className="panel-heading">
          {program.title}
          <span className="is-pulled-right">
            {unit ? <DeleteButton onClick={deleteUnit} /> : <AddButton onClick={addUnit} />}
          </span>
        </p>
        {unit && (
          <>
            {unit.studentEnrollments.map(studentEnrollment => (
              <Person key={studentEnrollment.id} studentEnrollment={studentEnrollment} />
            ))}
            <div className="panel-block">
              <div style={{ flexGrow: 1 }}>
                <PersonDropDown
                  placeholder="Select people to add..."
                  isSearchable={true}
                  isMulti={true}
                  onSelect={people => {
                    setNewPeople(people)
                  }}
                  excludedIDs={unit.studentEnrollments.map(enrollment => enrollment.person.id)}
                />
              </div>
              <AddButton onClick={addPeople} />
            </div>
          </>
        )}
      </nav>
    )
  }

  return programs.map(program => {
    const unit = units.find(unit => unit.program.id === program.id)

    return <UnitDetails key={program.id} program={program} unit={unit} />
  })
}

export default EditUnits
