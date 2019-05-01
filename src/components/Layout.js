import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Callback from './Callback'
import Home from './Home'
import NewCohort from './cohorts/NewCohort'
import EditCohort from './cohorts/EditCohort'
import Cohorts from './cohorts/Cohorts'
import EditProfile from './EditProfile'
import AuthenticatedNavBar from './AuthenticatedNavBar'
import UnauthenticatedNavBar from './UnauthenticatedNavBar'

const Layout = ({ profile, forceUpdateProfile, auth }) => {
  const adminRoutes = () => {
    // TODO: check if the current user is an admin and render these routes
    if (!auth.isAuthenticated) {
      return <></>
    }

    return (
      <Switch>
        <Route
          exact
          path="/cohorts/new"
          render={props => {
            return <NewCohort auth={auth} {...props} />
          }}
        />

        <Route
          path="/cohorts/:id"
          render={props => {
            return <EditCohort auth={auth} {...props} />
          }}
        />

        <Route
          exact
          path="/cohorts"
          render={props => {
            return <Cohorts auth={auth} {...props} />
          }}
        />
      </Switch>
    )
  }

  const userRoutes = () => {
    return (
      <>
        <Route
          path="/profile"
          render={props => {
            return <EditProfile profile={profile} forceUpdateProfile={forceUpdateProfile} auth={auth} {...props} />
          }}
        />
      </>
    )
  }

  const navbar = () => {
    if (auth.isAuthenticated) {
      return <AuthenticatedNavBar profile={profile} auth={auth} />
    } else {
      return <UnauthenticatedNavBar auth={auth} />
    }
  }

  return (
    <>
      {navbar()}

      <Route path="/" exact render={props => <Home isAuthenticated={auth.isAuthenticated} />} />
      <Route
        path="/signout"
        render={props => {
          auth.logout()
          return <Callback {...props} />
        }}
      />
      <Route
        path="/callback/:jwt"
        render={props => {
          auth.handleAuthentication(props.match.params.jwt)

          return <Callback {...props} />
        }}
      />
      {adminRoutes()}
      {userRoutes(forceUpdateProfile)}
    </>
  )
}

export default Layout
