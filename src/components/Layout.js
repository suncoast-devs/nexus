import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Callback from './Callback'
import Home from './Home'
import NewCohort from './cohorts/NewCohort'
import EditCohort from './cohorts/EditCohort'
import Cohorts from './cohorts/Cohorts'
import Gradebook from './cohorts/Gradebook'
import StudentGradebook from './cohorts/StudentGradebook'
import EditHomeworks from './cohorts/EditHomeworks'
import EditProfile from './EditProfile'
import AuthenticatedNavBar from './AuthenticatedNavBar'
import UnauthenticatedNavBar from './UnauthenticatedNavBar'
import EditAttendance from './attendance/EditAttendance'
import ShowAttendance from './attendance/ShowAttendance'

const Layout = ({ profile, forceUpdateProfile, auth }) => {
  const adminRoutes = () => {
    return (
      <Switch>
        <Route
          exact
          path="/cohorts/:id/attendance"
          render={props => <EditAttendance cohort_id={props.match.params.id} auth={auth} {...props} />}
        />
        <Route
          exact
          path="/cohorts/:id/gradebook"
          render={props => <Gradebook cohort_id={props.match.params.id} auth={auth} profile={profile} {...props} />}
        />
        <Route
          exact
          path="/cohorts/:id/homeworks"
          render={props => <EditHomeworks cohort_id={props.match.params.id} auth={auth} {...props} />}
        />
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
            return <EditCohort id={props.match.params.id} auth={auth} {...props} />
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
        <Route exact path="/attendance" render={props => <ShowAttendance profile={profile} auth={auth} {...props} />} />
        <Route
          exact
          path="/gradebook"
          render={props => <StudentGradebook profile={profile} auth={auth} {...props} />}
        />
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
      {profile && profile.isAdmin && adminRoutes()}
      {userRoutes(forceUpdateProfile)}
    </>
  )
}

export default Layout
