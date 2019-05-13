import React from 'react'
import useModelData from '../../hooks/useModelData'
import { Person } from '../models'

const ProfileLoader = ({ id, children }) => {
  const { loading: loading, data: person } = useModelData(() => Person.find(id))

  if (loading) {
    return <></>
  } else {
    return React.cloneElement(children, { profile: person })
  }
}

export default ProfileLoader
