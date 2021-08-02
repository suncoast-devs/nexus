import React from 'react'
import Select from 'react-select'

import { Cohort, Program, UnProxyCollection } from '@/components/models'
import useModelData from '@/hooks/useModelData'
import { InputField } from '@/components/utils/Fields'
import { useQuery } from 'react-query'

function ProgramDropDown({ cohort }: { cohort: Cohort }) {
  const { data: programs = [] } = useQuery(['programs'], () => Program.all().then(UnProxyCollection))

  const options = programs.map(program => ({ value: program.id, label: program.title }))

  return (
    <div className="field">
      <div className="control">
        <label>Program</label>
        <Select
          placeholder="Select a program"
          isSearchable
          onChange={selectedProgram => {
            if (selectedProgram?.value) {
              cohort.programId = selectedProgram?.value
            }
          }}
          options={options}
        />
      </div>
    </div>
  )
}

export function EditCohortForm({
  onSubmit,
  onCancel,
  title,
  cohort,
}: {
  onCancel: () => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  title: string
  cohort: Cohort
}) {
  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        onSubmit(event)
      }}
    >
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
          <button className="button is-primary">Submit</button>
        </div>
        <div className="control">
          <button
            className="button"
            onClick={event => {
              event.preventDefault()

              onCancel()
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}
