import React, { useState, useEffect } from 'react'
import Select from 'react-select'

import useModelData from '@/hooks/useModelData'
import Person from '@/components//models/Person'

const PersonDropDown = ({ onSelect, placeholder, isMulti, isSearchable, excludedIDs = [] }) => {
  // eslint-disable-next-line
  const { data: people } = useModelData(() => Person.all())
  const [value, setValue] = useState(null)

  useEffect(() => {
    setValue(null)
  }, [excludedIDs])

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
      value={value}
      onChange={selectedOption => {
        setValue(selectedOption)
        onSelect(isMulti ? selectedOption.map(option => option.value) : selectedOption.value)
      }}
      options={options}
    />
  )
}

export default PersonDropDown
