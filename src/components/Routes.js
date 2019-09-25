import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AdminShowAttendances from './attendance/AdminShowAttendances'
import AdminShowGradebooks from './gradebook/AdminShowGradebooks'
import AdminShowProgressReports from './progress/AdminShowProgressReports'
import Callback from './Callback'
import Cohorts from './cohorts/Cohorts'
import EditAttendance from './attendance/EditAttendance'
import EditCohort from './cohorts/EditCohort'
import EditHomeworks from './homeworks/EditHomeworks'
import EditProfile from './EditProfile'
import Gradebook from './gradebook/Gradebook'
import Home from './home/Home'
import NewCohort from './cohorts/NewCohort'
import NewProgressReport from './progress/NewProgressReport'
import People from './People'
import ProfileLoader from './utils/ProfileLoader'
import ProgressReportIndex from './progress/generate/ProgressReportIndex'
import ProgressReports from './progress/ProgressReports'
import StudentAttendance from './attendance/StudentAttendance'
import StudentGradebook from './gradebook/StudentGradebook'
import StudentProgressReports from './progress/StudentProgressReports'

const PeopleRoutes = ({ profile, auth }) => (
  <Switch>
    <Route exact path="/people" render={props => <People />} />

    <Route
      exact
      path="/people/:id/gradebook"
      render={props => (
        <ProfileLoader id={props.match.params.id}>
          <StudentGradebook showTitle profile={profile} auth={auth} {...props} />
        </ProfileLoader>
      )}
    />

    <Route
      exact
      path="/people/:id/attendance"
      render={props => (
        <ProfileLoader id={props.match.params.id}>
          <StudentAttendance showTitle profile={profile} auth={auth} {...props} />
        </ProfileLoader>
      )}
    />

    <Route
      exact
      path="/people/:id/progress-reports"
      render={props => (
        <ProfileLoader id={props.match.params.id}>
          <StudentProgressReports showTitle auth={auth} {...props} />
        </ProfileLoader>
      )}
    />
  </Switch>
)

const CohortAdminRoutes = ({ profile, auth }) => (
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
      exact
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

const AdminProgressReportsRoutes = ({ profile, auth }) => (
  <Switch>
    <Route
      exact
      path="/progress-reports/:progress_report_id"
      render={props => (
        <ProgressReportIndex
          id={props.match.params.progress_report_id}
          progressReportBaseURL={`/progress-reports/${props.match.params.progress_report_id}`}
          index="none"
        />
      )}
    />

    <Route
      exact
      path="/progress-reports/:progress_report_id/:index"
      render={props => (
        <ProgressReportIndex
          id={props.match.params.progress_report_id}
          progressReportBaseURL={`/progress-reports/${props.match.params.progress_report_id}`}
          index={props.match.params.index}
        />
      )}
    />
    <Route
      exact
      path="/progress-reports"
      render={props => <AdminShowProgressReports profile={profile} auth={auth} {...props} />}
    />
  </Switch>
)

const AdminRoutes = ({ profile, auth }) => (
  <>
    <PeopleRoutes profile={profile} auth={auth} />
    <CohortAdminRoutes profile={profile} auth={auth} />
    <AdminProgressReportsRoutes profile={profile} auth={auth} />
    <Route exact path="/attendance" render={props => <AdminShowAttendances profile={profile} {...props} />} />
    <Route exact path="/gradebook" render={props => <AdminShowGradebooks profile={profile} auth={auth} {...props} />} />
    <Route
      exact
      path="/impersonate/:jwt"
      render={props => {
        auth.handleAuthentication(props.match.params.jwt)

        return <Callback {...props} />
      }}
    />
  </>
)

const UserRoutes = ({ profile, auth }) => (
  <Switch>
    <Route exact path="/attendance" render={props => <StudentAttendance profile={profile} auth={auth} {...props} />} />

    <Route exact path="/gradebook" render={props => <StudentGradebook profile={profile} auth={auth} {...props} />} />

    <Route
      exact
      path="/progress-reports"
      render={props => <StudentProgressReports profile={profile} auth={auth} {...props} />}
    />
  </Switch>
)

const ProfileRoutes = ({ profile, auth, forceUpdateProfile }) => (
  <Route
    exact
    path="/profile"
    render={props => {
      return <EditProfile profile={profile} forceUpdateProfile={forceUpdateProfile} auth={auth} {...props} />
    }}
  />
)

const PublicRoutes = ({ profile, auth }) => (
  <Switch>
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
        if (auth.isAuthenticated) {
          // The user is already authenticated so don't process the code.
          // This might be a user re-attempting to use the same invite code.
          window.location = `/`
        } else {
          window.location = `${process.env.REACT_APP_INVITATION_REDEEM_URL}&invitation_code=${
            props.match.params.invitation_code
          }`
        }

        return <Callback {...props} />
      }}
    />

    <Route
      exact
      path="/signout"
      render={props => {
        auth.logout()
        return <Callback {...props} />
      }}
    />
    <Route
      exact
      path="/callback/:jwt"
      render={props => {
        auth.handleAuthentication(props.match.params.jwt)

        return <Callback {...props} />
      }}
    />
  </Switch>
)

export { AdminRoutes, UserRoutes, PublicRoutes, ProfileRoutes }
