import React from 'react'
import Select from 'react-select'

import { Program } from '@/components/models'
import useModelData from '@/hooks/useModelData'
import { InputField } from '@/components/utils/Fields'

function ProgramDropDown({ cohort }) {
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
            cohort.programId = selectedProgram.value
          }}
          options={options}
        />
      </div>
    </div>
  )
}

export function EditCohortForm({ onSubmit, onCancel, title, cohort }) {
  return (
    <form onSubmit={onSubmit}>
      <h1 className="title">{title}</h1>
      <InputField defaultObject={cohort} name="name" />
      {cohort.isPersisted || (
        <>
          <ProgramDropDown cohort={cohort} />
          <InputField defaultObject={cohort} name="startDate" type="date" />
          <InputField defaultObject={cohort} name="endDate" type="date" />
        </>
      )}

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link">Submit</button>
        </div>
        <div className="control">
          <button className="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}
