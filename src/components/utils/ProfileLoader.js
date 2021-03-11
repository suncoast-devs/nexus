import React from 'react'
import useModelData from '@/hooks/useModelData'
import { Person } from '@/components/models'

export function ProfileLoader({ id, children }) {
  const { loading, data: person } = useModelData(() => Person.find(id))

  if (loading) {
    return <></>
  } else {
    return React.cloneElement(children, { profile: person })
  }
}
