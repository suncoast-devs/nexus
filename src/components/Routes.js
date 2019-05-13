import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Callback from './Callback'
import Home from './home/Home'
import NewCohort from './cohorts/NewCohort'
import EditCohort from './cohorts/EditCohort'
import Cohorts from './cohorts/Cohorts'
import Gradebook from './gradebook/Gradebook'
import StudentGradebook from './gradebook/StudentGradebook'
import EditHomeworks from './homeworks/EditHomeworks'
import EditProfile from './EditProfile'
import EditAttendance from './attendance/EditAttendance'
import ShowAttendance from './attendance/ShowAttendance'
import NewProgressReport from './progress/NewProgressReport'
import ProgressReportIndex from './progress/ProgressReportIndex'
import ProgressReports from './progress/ProgressReports'
import AdminShowAttendances from './attendance/AdminShowAttendances'
import AdminShowGradebooks from './gradebook/AdminShowGradebooks'
import AdminShowProgressReports from './progress/AdminShowProgressReports'
import StudentProgressReports from './progress/StudentProgressReports'

const AdminRoutes = ({ profile, auth }) => (
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
      path="/cohorts/:id/progress-reports"
      render={props => <ProgressReports cohort_id={props.match.params.id} allowNew auth={auth} {...props} />}
    />

    <Route
      exact
      path="/cohorts/:id/progress-reports/new"
      render={props => <NewProgressReport cohort_id={props.match.params.id} auth={auth} {...props} />}
    />

    <Route
      exact
      path="/progress-reports/:progress_report_id"
      render={props => <ProgressReportIndex id={props.match.params.progress_report_id} index="complete" />}
    />

    <Route
      exact
      path="/progress-reports/:progress_report_id/:index"
      render={props => (
        <ProgressReportIndex id={props.match.params.progress_report_id} index={props.match.params.index} />
      )}
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

const UserRoutes = ({ profile, forceUpdateProfile, auth }) => (
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
      exact
      path="/progress-reports"
      render={props =>
        profile.isAdmin ? (
          <AdminShowProgressReports profile={profile} auth={auth} {...props} />
        ) : (
          <StudentProgressReports profile={profile} auth={auth} {...props} />
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

const PublicRoutes = ({ profile, auth }) => (
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

export { AdminRoutes, UserRoutes, PublicRoutes }
