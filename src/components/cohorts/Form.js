import React from 'react'
import { Button, Control, Title, Field } from 'reactbulma'
import Select from 'react-select'

import { Program } from '../models'
import useModelData from '../../hooks/useModelData'
import { InputField } from '../Fields'

const ProgramDropDown = ({ cohort }) => {
  const { data: programs } = useModelData(() => Program.all(), [])

  const options = programs.map(program => ({ value: program.id, label: program.title }))

  return (
    <div className="field">
      <div className="control">
        <label>Program</label>
        <Select
          placeholder="Select a program"
          isSearchable
          onChange={selectedProgram => {
            cohort.program_id = selectedProgram.value
          }}
          options={options}
        />
      </div>
    </div>
  )
}

const Form = ({ onSubmit, onCancel, title, cohort }) => (
  <form onSubmit={onSubmit}>
    <Title>{title}</Title>
    <InputField defaultObject={cohort} name="name" />
    <InputField defaultObject={cohort} name="description" />
    {cohort.isPersisted || (
      <>
        <ProgramDropDown cohort={cohort} />
        <InputField defaultObject={cohort} name="startDate" type="date" />
        <InputField defaultObject={cohort} name="endDate" type="date" />
      </>
    )}

    <Field grouped>
      <Control>
        <Button link>Submit</Button>
      </Control>
      <Control>
        <Button onClick={onCancel}>Cancel</Button>
      </Control>
    </Field>
  </form>
)

export default Form
