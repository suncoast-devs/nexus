import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { AdminShowProgressReportsPage } from '/src/pages/progressreports/AdminShowProgressReportsPage'
import { NewProgressReportPage } from '/src/pages/progressreports/NewProgressReportPage'
import { EditProgressReportPage } from '/src/pages/progressreports/EditProgressReportPage'
import { CohortProgressReportsPage } from '/src/pages/progressreports/CohortProgressReportsPage'
import { StudentProgressReportsPage } from '/src/pages/progressreports/StudentProgressReportsPage'
import { AdminShowGradebooksPage } from '/src/pages/gradebook/AdminShowGradebooksPage'
import { Callback } from './Callback'
import { CohortsPage } from '/src/pages/cohorts/CohortsPage'
import { EditCohortPage } from '/src/pages/cohorts/EditCohortPage'
import { EditHomeworksPage } from '/src/pages/homeworks/EditHomeworksPage'
import { EditProfilePage } from '/src/pages/profile/EditProfile'
import { GradebookPage } from '/src/pages/gradebook/GradebookPage'
import { HomePage } from '/src/pages/home/HomePage'
import { NewCohortPage } from '/src/pages/cohorts/NewCohortPage'
import { PeoplePage } from '/src/pages/people/PeoplePage'
import { ProfileLoader } from './utils/ProfileLoader'
import { StudentGradebookPage } from '/src/pages/gradebook/StudentGradebookPage'
import { StudentAssignmentPage } from '/src/pages/assignments/StudentAssignmentPage'
import { AdminShowGradeQueuesPage } from '/src/pages/gradebook/AdminShowGradeQueuesPage'
import { LectureVideosPage } from '/src/pages/lecturevideos/LectureVideosPage'
import { LectureVideoPage } from '/src/pages/lecturevideos/LectureVideoPage'
import { ShowHomeworkPage } from '/src/pages/homeworks/ShowHomeworkPage'
import { StudentAttendancePage } from '/src/pages/attendance/StudentAttendancePage'
import { EditAttendancePage } from '/src/pages/attendance/EditAttendancePage'
import { AdminShowAttendancesPage } from '/src/pages/attendance/AdminShowAttendancesPage'

function PeopleRoutes({ profile, auth }) {
  return (
    <Switch>
      <Route exact path="/people" render={props => <PeoplePage />} />

      <Route
        exact
        path="/people/:id/gradebook"
        render={props => (
          <ProfileLoader id={props.match.params.id}>
            <StudentGradebookPage showTitle profile={profile} auth={auth} {...props} />
          </ProfileLoader>
        )}
      />

      <Route
        exact
        path="/people/:id/attendance"
        render={props => (
          <ProfileLoader id={props.match.params.id}>
            <StudentAttendancePage showTitle profile={profile} auth={auth} {...props} />
          </ProfileLoader>
        )}
      />

      <Route
        exact
        path="/people/:id/progress-reports"
        render={props => (
          <ProfileLoader id={props.match.params.id}>
            <StudentProgressReportsPage showTitle auth={auth} {...props} />
          </ProfileLoader>
        )}
      />
    </Switch>
  )
}

function CohortAdminRoutes({ profile, auth }) {
  return (
    <Switch>
      <Route
        exact
        path="/cohorts/:id/attendance"
        render={props => <EditAttendancePage cohort_id={props.match.params.id} auth={auth} {...props} />}
      />
      <Route
        exact
        path="/cohorts/:id/gradebook"
        render={props => <GradebookPage cohort_id={props.match.params.id} auth={auth} profile={profile} {...props} />}
      />

      <Route
        exact
        path="/cohorts/:id/progress-reports"
        render={props => (
          <CohortProgressReportsPage cohort_id={props.match.params.id} allowNew auth={auth} {...props} />
        )}
      />
      <Route
        exact
        path="/cohorts/:id/lecture-videos"
        render={props => (
          <LectureVideosPage profile={profile} auth={auth} cohortId={props.match.params.id} {...props} />
        )}
      />
      <Route
        exact
        path="/cohorts/:id/progress-reports/new"
        render={props => <NewProgressReportPage cohort_id={props.match.params.id} auth={auth} {...props} />}
      />

      <Route
        exact
        path="/cohorts/:cohortId/homeworks/:homeworkId"
        render={props => (
          <ShowHomeworkPage
            cohortId={props.match.params.cohortId}
            homeworkId={props.match.params.homeworkId}
            {...props}
          />
        )}
      />
      <Route
        exact
        path="/cohorts/:id/homeworks"
        render={props => <EditHomeworksPage cohort_id={props.match.params.id} auth={auth} {...props} />}
      />
      <Route
        exact
        path="/cohorts/new"
        render={props => {
          return <NewCohortPage auth={auth} {...props} />
        }}
      />

      <Route
        exact
        path="/cohorts/:id"
        render={props => {
          return <EditCohortPage id={props.match.params.id} auth={auth} {...props} />
        }}
      />

      <Route
        exact
        path="/cohorts"
        render={props => {
          return <CohortsPage auth={auth} {...props} />
        }}
      />
    </Switch>
  )
}

function AdminProgressReportsRoutes({ profile, auth }) {
  return (
    <Switch>
      <Route
        exact
        path="/progress-reports/:progress_report_id"
        render={props => (
          <EditProgressReportPage
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
          <EditProgressReportPage
            id={props.match.params.progress_report_id}
            progressReportBaseURL={`/progress-reports/${props.match.params.progress_report_id}`}
            index={props.match.params.index}
          />
        )}
      />
      <Route
        exact
        path="/progress-reports"
        render={props => <AdminShowProgressReportsPage profile={profile} auth={auth} {...props} />}
      />
    </Switch>
  )
}

export function AdminRoutes({ profile, auth }) {
  return (
    <>
      <PeopleRoutes profile={profile} auth={auth} />
      <CohortAdminRoutes profile={profile} auth={auth} />
      <AdminProgressReportsRoutes profile={profile} auth={auth} />
      <Route
        exact
        path="/assignment/:id"
        render={props => <StudentAssignmentPage profile={profile} auth={auth} id={props.match.params.id} />}
      />
      <Route exact path="/attendance" render={props => <AdminShowAttendancesPage profile={profile} {...props} />} />
      <Route
        exact
        path="/lecture_videos"
        render={props => <LectureVideosPage profile={profile} auth={auth} {...props} />}
      />
      <Route exact path="/lecture_videos/:id" render={props => <LectureVideoPage id={props.match.params.id} />} />
      <Route
        exact
        path="/gradebook"
        render={props => <AdminShowGradebooksPage profile={profile} auth={auth} {...props} />}
      />
      <Route
        exact
        path="/gradequeue"
        render={props => <AdminShowGradeQueuesPage profile={profile} auth={auth} {...props} />}
      />
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
}

export function UserRoutes({ profile, auth }) {
  return (
    <Switch>
      <Route
        exact
        path="/attendance"
        render={props => <StudentAttendancePage profile={profile} auth={auth} {...props} />}
      />

      <Route
        exact
        path="/lecture_videos"
        render={props => <LectureVideosPage profile={profile} auth={auth} {...props} />}
      />
      <Route exact path="/lecture_videos/:id" render={props => <LectureVideoPage id={props.match.params.id} />} />

      <Route
        exact
        path="/cohorts/:id/lecture-videos"
        render={props => (
          <LectureVideosPage profile={profile} auth={auth} cohortId={props.match.params.id} {...props} />
        )}
      />

      <Route
        exact
        path="/gradebook"
        render={props => <StudentGradebookPage profile={profile} auth={auth} {...props} />}
        showTitle={true}
      />

      <Route
        exact
        path="/assignment/:assignment_id"
        render={props => <StudentAssignmentPage profile={profile} auth={auth} id={props.match.params.assignment_id} />}
      />

      <Route
        exact
        path="/progress-reports"
        render={props => <StudentProgressReportsPage profile={profile} auth={auth} {...props} />}
      />
    </Switch>
  )
}

export function ProfileRoutes({ profile, auth, forceUpdateProfile }) {
  return (
    <Route
      exact
      path="/profile"
      render={props => {
        return <EditProfilePage profile={profile} forceUpdateProfile={forceUpdateProfile} auth={auth} {...props} />
      }}
    />
  )
}

export function PublicRoutes({ profile, auth }) {
  return (
    <Switch>
      <Route
        exact
        path={['/', '/home']}
        render={props =>
          profile.loading ? <></> : <HomePage profile={profile} isAuthenticated={auth.isAuthenticated} {...props} />
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
            window.location = `${import.meta.env.VITE_INVITATION_REDEEM_URL}&invitation_code=${
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
}
