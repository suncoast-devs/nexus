import React from 'react'
import AuthenticatedNavBar from './AuthenticatedNavBar'
import UnauthenticatedNavBar from './UnauthenticatedNavBar'
import useProfile from '../hooks/useProfile'

const NavBar = props => {
  const me = useProfile()

  if (props.auth.isAuthenticated) {
    return <AuthenticatedNavBar me={me} auth={props.auth} />
  } else {
    return <UnauthenticatedNavBar me={me} auth={props.auth} />
  }
}

export default NavBar
