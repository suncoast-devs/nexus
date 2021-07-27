import React from 'react'
import useModelData from '/src/hooks/useModelData'
import { Person } from '/src/components/models'

export function ProfileLoader({ id, children }) {
  const { loading, data: person } = useModelData(() => Person.find(id))

  if (loading) {
    return <></>
  } else {
    return React.cloneElement(children, { profile: person })
  }
}
