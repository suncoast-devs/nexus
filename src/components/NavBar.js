import React, { Suspense } from 'react'
import AuthenticatedNavBar from './AuthenticatedNavBar'
import UnauthenticatedNavBar from './UnauthenticatedNavBar'

const EmptyNav = (
  <nav
    className="navbar has-shadow is-primary"
    role="navigation"
    aria-label="main navigation"
  />
)

const NavBar = props => {
  if (props.auth.isAuthenticated) {
    return (
      <Suspense fallback={EmptyNav}>
        <AuthenticatedNavBar auth={props.auth} />
      </Suspense>
    )
  } else {
    return <UnauthenticatedNavBar auth={props.auth} />
  }
}

export default NavBar
