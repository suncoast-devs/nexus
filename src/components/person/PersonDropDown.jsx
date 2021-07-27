import React, { useState, useEffect } from 'react'
import Select from 'react-select'

import useModelData from '/src/hooks/useModelData'
import Person from '/src/components//models/Person'

export function PersonDropDown({ onSelect, placeholder, isMulti, isSearchable, excludedIDs = [] }) {
  // eslint-disable-next-line
  const { data: people } = useModelData(() => Person.per(999).all())
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
