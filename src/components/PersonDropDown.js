import React, { useState } from 'react'
import Select from 'react-select'

import useModelData from '../hooks/useModelData'
import Person from './models/Person'

const PersonDropDown = ({ onSelect, isMulti, isSearchable }) => {
  const [loadingPeople, people] = useModelData(() => Person.all())

  if (loadingPeople) {
    return <></>
  }

  const options = people.map(person => ({ value: person, label: person.fullName }))

  return (
    <Select
      isSearchable={isSearchable}
      isMulti={isMulti}
      getOptionValue={option => {
        return option.value.id
      }}
      onChange={option => {
        onSelect(isMulti ? option.map(o => o.value) : option.value)
      }}
      options={options}
    />
  )
}

export default PersonDropDown
