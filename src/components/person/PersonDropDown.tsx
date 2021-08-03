import React, { useState, useEffect } from 'react'
import Select, { OptionsType } from 'react-select'

import { Person } from '@/components//models/Person'
import { UnProxyCollection } from '../models'
import { useQuery } from 'react-query'

export function PersonDropDown({
  onSelect,
  placeholder,
  isSearchable,
  excludedIDs = [],
}: {
  onSelect: (person: Person) => void
  placeholder: string
  isSearchable: boolean
  excludedIDs: string[]
}) {
  const { data: people = [] } = useQuery(['people'], () => Person.order('full_name').all().then(UnProxyCollection))

  const options = people
    .filter(person => !excludedIDs.includes(person.key()))
    .map(person => ({ value: person, label: person.fullName }))

  return (
    <Select
      options={options}
      placeholder={placeholder}
      isSearchable={isSearchable}
      onChange={function (option) {
        if (option?.value) {
          onSelect(option.value)
        }
      }}
    />
  )
}
