import React from 'react'
import { Route, Switch } from 'react-router-dom'

import auth from '@/Auth'
import { AdminShowProgressReportsPage } from '@/pages/progressreports/AdminShowProgressReportsPage'
import { NewProgressReportPage } from '@/pages/progressreports/NewProgressReportPage'
import { EditProgressReportPage } from '@/pages/progressreports/EditProgressReportPage'
import { StudentProgressReportsPage } from '@/pages/progressreports/StudentProgressReportsPage'
import { AdminShowGradebooksPage } from '@/pages/gradebook/AdminShowGradebooksPage'
import { Callback } from './Callback'
import { CohortsPage } from '@/pages/cohorts/CohortsPage'
import { EditCohortPage } from '@/pages/cohorts/EditCohortPage'
import { EditProfilePage } from '@/pages/profile/EditProfile'
import { HomePage } from '@/pages/home/HomePage'
import { NewCohortPage } from '@/pages/cohorts/NewCohortPage'
import { PeoplePage } from '@/pages/people/PeoplePage'
import { StudentGradebookPage } from '@/pages/gradebook/StudentGradebookPage'
import { StudentAssignmentPage } from '@/pages/assignments/StudentAssignmentPage'
import { AdminShowGradeQueuesPage } from '@/pages/gradebook/AdminShowGradeQueuesPage'
import { LectureVideosPageForUser } from '@/pages/lecturevideos/LectureVideosPage'
import { LectureVideoPage } from '@/pages/lecturevideos/LectureVideoPage'
import { ShowHomeworkPage } from '@/pages/homeworks/ShowHomeworkPage'
import { StudentAttendancePage } from '@/pages/attendance/StudentAttendancePage'
import { AdminShowAttendancesPage } from '@/pages/attendance/AdminShowAttendancesPage'
import useProfile from '@/hooks/useProfile'

function PeopleRoutes({}) {
  return (
    <Switch>
      <Route exact path="/people" render={() => <PeoplePage />} />
      <Route exact path="/people/:id/gradebook" render={() => <StudentGradebookPage showTitle />} />
      <Route exact path="/people/:id/attendance" render={() => <StudentAttendancePage showTitle />} />
      <Route exact path="/people/:id/progress-reports" render={() => <StudentProgressReportsPage showTitle />} />
    </Switch>
  )
}

function CohortAdminRoutes() {
  return (
    <Switch>
      <Route
        exact
        path="/cohorts/:id/progress-reports/new"
        render={props => <NewProgressReportPage cohort_id={props.match.params.id} />}
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

      <Route exact path="/cohorts/new" render={() => <NewCohortPage />} />
      <Route exact path="/cohorts/:id" render={props => <EditCohortPage id={props.match.params.id} />} />
      <Route exact path="/cohorts" render={() => <CohortsPage />} />
    </Switch>
  )
}

function AdminProgressReportsRoutes() {
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
      <Route exact path="/progress-reports" render={props => <AdminShowProgressReportsPage />} />
    </Switch>
  )
}

export function AdminRoutes() {
  return (
    <>
      <PeopleRoutes />
      <CohortAdminRoutes />
      <AdminProgressReportsRoutes />
      <Route exact path="/assignment/:id" render={props => <StudentAssignmentPage id={props.match.params.id} />} />
      <Route exact path="/attendance" render={props => <AdminShowAttendancesPage />} />
      <Route exact path="/lecture_videos/:id" render={props => <LectureVideoPage id={props.match.params.id} />} />
      <Route exact path="/gradebook" render={props => <AdminShowGradebooksPage />} />
      <Route exact path="/gradequeue" render={props => <AdminShowGradeQueuesPage />} />
      <Route
        exact
        path="/impersonate/:jwt"
        render={props => {
          auth.handleAuthentication(props.match.params.jwt)

          return <Callback />
        }}
      />
    </>
  )
}

export function UserRoutes() {
  return (
    <Switch>
      <Route exact path="/attendance" render={props => <StudentAttendancePage showTitle />} />
      <Route exact path="/lecture_videos" render={props => <LectureVideosPageForUser />} />
      <Route exact path="/lecture_videos/:id" render={props => <LectureVideoPage id={props.match.params.id} />} />
      <Route exact path="/gradebook" render={props => <StudentGradebookPage showTitle />} />
      <Route
        exact
        path="/assignment/:assignment_id"
        render={props => <StudentAssignmentPage id={props.match.params.assignment_id} />}
      />
      <Route exact path="/progress-reports" render={props => <StudentProgressReportsPage showTitle />} />
    </Switch>
  )
}

export function ProfileRoutes() {
  return (
    <Route
      exact
      path="/profile"
      render={props => {
        return <EditProfilePage />
      }}
    />
  )
}

export function PublicRoutes() {
  const { isLoading } = useProfile()

  return (
    <Switch>
      <Route
        exact
        path={['/', '/home']}
        render={() => (isLoading ? <></> : <HomePage isAuthenticated={auth.isAuthenticated} />)}
      />

      <Route
        exact
        path="/redeem/:invitation_code"
        render={props => {
          if (auth.isAuthenticated) {
            // The user is already authenticated so don't process the code.
            // This might be a user re-attempting to use the same invite code.
            window.location.pathname = `/`
          } else {
            window.location.pathname = `${import.meta.env.VITE_INVITATION_REDEEM_URL}&invitation_code=${
              props.match.params.invitation_code
            }`
          }

          return <Callback />
        }}
      />

      <Route
        exact
        path="/signout"
        render={() => {
          auth.logout()
          return <Callback />
        }}
      />
      <Route
        exact
        path="/callback/:jwt"
        render={props => {
          auth.handleAuthentication(props.match.params.jwt)

          return <Callback />
        }}
      />
    </Switch>
  )
}
