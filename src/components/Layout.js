import React from 'react'
import { Route, Switch } from 'react-router-dom'

import useModelData from '../hooks/useModelData'
import { Cohort } from '../components/models'
import Callback from './Callback'
import Home from './Home'
import NewCohort from './cohorts/NewCohort'
import EditCohort from './cohorts/EditCohort'
import Cohorts from './cohorts/Cohorts'
import Gradebook from './gradebook/Gradebook'
import StudentGradebook from './gradebook/StudentGradebook'
import EditHomeworks from './homeworks/EditHomeworks'
import EditProfile from './EditProfile'
import AuthenticatedNavBar from './AuthenticatedNavBar'
import UnauthenticatedNavBar from './UnauthenticatedNavBar'
import EditAttendance from './attendance/EditAttendance'
import ShowAttendance from './attendance/ShowAttendance'

const Layout = ({ profile, forceUpdateProfile, auth }) => {
  const AdminShowAttendances = props => {
    const { data: cohorts } = useModelData(() => Cohort.active())

    return cohorts
      .sort(cohort => cohort.name.localeCompare(cohort.name))
      .map(cohort => <EditAttendance key={cohort.id} cohort_id={cohort.id} {...props} />)
  }

  const AdminShowGradebooks = props => {
    const { data: cohorts } = useModelData(() => Cohort.active())

    return cohorts
      .sort(cohort => cohort.name.localeCompare(cohort.name))
      .map(cohort => (
        <div className="section" key={cohort.id}>
          <div className="container">
            <h1 className="title">{cohort.name}:</h1>
            <Gradebook cohort_id={cohort.id} {...props} />
          </div>
        </div>
      ))
  }

  const AdminRoutes = () => (
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

  const UserRoutes = () => (
    <>
      <Route
        exact
        path="/attendance"
        render={props =>
          profile.isAdmin ? (
            <AdminShowAttendances profile={profile} {...props} />
          ) : (
            <ShowAttendance profile={profile} auth={auth} {...props} />
          )
        }
      />

      <Route
        exact
        path="/gradebook"
        render={props =>
          profile.isAdmin ? (
            <AdminShowGradebooks profile={profile} auth={auth} {...props} />
          ) : (
            <StudentGradebook profile={profile} auth={auth} {...props} />
          )
        }
      />

      <Route
        path="/profile"
        render={props => {
          return <EditProfile profile={profile} forceUpdateProfile={forceUpdateProfile} auth={auth} {...props} />
        }}
      />
    </>
  )

  const PublicRoutes = () => (
    <>
      <Route
        exact
        path="/"
        render={props =>
          profile.loading ? <></> : <Home profile={profile} isAuthenticated={auth.isAuthenticated} {...props} />
        }
      />

      <Route
        exact
        path="/redeem/:invitation_code"
        render={props => {
          window.location = `${process.env.REACT_APP_INVITATION_REDEEM_URL}&invitation_code=${
            props.match.params.invitation_code
          }`

          return <Callback {...props} />
        }}
      />

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
    </>
  )

  return (
    <>
      {auth.isAuthenticated ? (
        <AuthenticatedNavBar profile={profile} auth={auth} />
      ) : (
        <UnauthenticatedNavBar auth={auth} />
      )}
      <PublicRoutes />
      {profile && profile.isAdmin && <AdminRoutes />}
      {profile && !profile.loading && <UserRoutes />}
    </>
  )
}

export default Layout
