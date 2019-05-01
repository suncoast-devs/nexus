import React from 'react'
import { Section, Button, Container } from 'reactbulma'

import Cohort from '../models/Cohort'
import Program from '../models/Program'
import Unit from '../models/Unit'
import useModelData from '../../hooks/useModelData'

import history from '../../history'
import formToObject from '../../utils/formToObject'
import Form from './Form'

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

const EditUnits = props => {
  const { cohort } = props

  const [loadingPrograms, programs] = useModelData(() => Program.all())
  const [loadingUnits, units, forceUpdateUnits] = useModelData(() =>
    Unit.includes('program')
      .where({ cohort_id: cohort.id })
      .all()
  )

  if (loadingPrograms || loadingUnits) {
    return <></>
  }

  const button = (unit, program) => {
    if (unit) {
      return (
        <Button
          danger
          onClick={() => {
            unit.destroy().then(response => {
              forceUpdateUnits()
            })
          }}
        >
          X
        </Button>
      )
    } else {
      return (
        <Button
          link
          onClick={() => {
            // Why do we have to construct a new unit this way?
            const unit = new Unit()
            unit.cohort_id = cohort.id
            unit.program_id = program.id

            unit.save().then(response => {
              forceUpdateUnits()
            })
          }}
        >
          +
        </Button>
      )
    }
  }

  return (
    <table className="table is-bordered is-hoverable is-fullwidth">
      <tbody>
        {programs.map(program => {
          const unit = units.find(unit => unit.program.id === program.id)

          return (
            <tr key={program.id}>
              <td>
                {program.title}
                <span className="is-pulled-right">{button(unit, program)}</span>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const EditCohort = props => {
  const [loadingCohort, cohort] = useModelData(() => Cohort.includes('units').find(props.match.params.id))

  if (loadingCohort) {
    return <></>
  }

  return (
    <Section>
      <Container>
        <Section>
          <Form
            onSubmit={event => submit(event, cohort)}
            cohort={cohort}
            onCancel={event => cancel(event)}
            title="Edit Cohort"
          />
        </Section>
        <Section>
          <EditUnits cohort={cohort} />
        </Section>
      </Container>
    </Section>
  )
}

export default EditCohort
