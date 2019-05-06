import React from 'react'
import Select from 'react-select'

import useModelData from '../hooks/useModelData'
import Person from './models/Person'

const PersonDropDown = ({ onSelect, placeholder, isMulti, isSearchable, excludedIDs = [] }) => {
  // eslint-disable-next-line
  const { data: people } = useModelData(() => Person.all())

  const options = people
    .filter(person => !excludedIDs.includes(person.id))
    .map(person => ({ value: person, label: person.fullName }))

  return (
    <Select
      placeholder={placeholder}
      isSearchable={isSearchable}
      isMulti={isMulti}
      getOptionValue={option => {
        return option.value.id
      }}
      onChange={selectedOption => {
        onSelect(isMulti ? selectedOption.map(option => option.value) : selectedOption.value)
      }}
      options={options}
    />
  )
}

export default PersonDropDown
