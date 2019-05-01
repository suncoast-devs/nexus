import React, { useState } from 'react'
import { Section, Container } from 'reactbulma'

import { Cohort, Program, Unit, StudentEnrollment } from '../models'
import useModelData from '../../hooks/useModelData'

import history from '../../history'
import formToObject from '../../utils/formToObject'
import Form from './Form'
import PersonDropDown from '../PersonDropDown'
import { AddButton, DeleteButton } from '../Buttons'

const EditUnits = ({ cohort }) => {
  const [loadingPrograms, programs] = useModelData(() => Program.all())

  const [loadingUnits, units, forceUpdateUnits] = useModelData(() =>
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
              <AddButton onClick={addPeople} />
              <div style={{ flexGrow: 1 }}>
                <PersonDropDown
                  isSearchable={true}
                  isMulti={true}
                  onSelect={people => {
                    setNewPeople(people)
                  }}
                />
              </div>
            </div>
          </>
        )}
      </nav>
    )
  }

  return (
    <>
      {programs.map(program => {
        const unit = units.find(unit => unit.program.id === program.id)

        return <UnitDetails key={program.id} program={program} unit={unit} />
      })}
    </>
  )
}

const EditCohort = props => {
  const {
    match: {
      params: { id }
    }
  } = props

  const [loadingCohort, cohort] = useModelData(() => Cohort.find(id))

  const cancel = event => {
    event.preventDefault()

    history.push('/cohorts')
  }

  const submit = (event, cohort) => {
    event.preventDefault()

    const updatedCohort = formToObject(event.target, cohort)

    updatedCohort.save().then(() => {
      history.push('/cohorts')
    })
  }

  if (loadingCohort) {
    return <></>
  }

  return (
    <Container>
      <Section>
        <Form onSubmit={event => submit(event, cohort)} cohort={cohort} onCancel={event => cancel(event)} title="" />
      </Section>
      <Section>
        <EditUnits cohort={cohort} />{' '}
      </Section>
    </Container>
  )
}

export default EditCohort
