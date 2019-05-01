import React from 'react'
import Select from 'react-select'

import useModelData from '../hooks/useModelData'
import Person from './models/Person'

const PersonDropDown = ({ onSelect, placeholder, isMulti, isSearchable, excludedIDs = [] }) => {
  // eslint-disable-next-line
  const [loadingPeople, people] = useModelData(() => Person.all())

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
      onChange={option => {
        onSelect(isMulti ? option.map(o => o.value) : option.value)
      }}
      options={options}
    />
  )
}

export default PersonDropDown
