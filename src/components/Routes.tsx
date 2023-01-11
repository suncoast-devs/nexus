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
import { LectureVideoPageForCohortId, LectureVideosPageForUser } from '@/pages/lecturevideos/LectureVideosPage'
import { LectureVideoPage } from '@/pages/lecturevideos/LectureVideoPage'
import { ShowHomeworkPage } from '@/pages/homeworks/ShowHomeworkPage'
import { StudentAttendancePage } from '@/pages/attendance/StudentAttendancePage'
import { AdminShowAttendancesPage } from '@/pages/attendance/AdminShowAttendancesPage'
import useProfile from '@/hooks/useProfile'
import { VITE_PYLON_URL } from '@/env'

function PeopleRoutes({}) {
  return (
    <Switch>
      <Route exact path="/people">
        <PeoplePage />
      </Route>
      <Route exact path="/people/:id/gradebook">
        <StudentGradebookPage showTitle />
      </Route>
      <Route exact path="/people/:id/attendance">
        <StudentAttendancePage showTitle />
      </Route>
      <Route exact path="/people/:id/progress-reports">
        <StudentProgressReportsPage showTitle />
      </Route>
    </Switch>
  )
}

function CohortAdminRoutes() {
  return (
    <Switch>
      <Route exact path="/cohorts/:id/progress-reports/new">
        <NewProgressReportPage />
      </Route>

      <Route exact path="/cohorts/:cohortId/homeworks/:homeworkId">
        <ShowHomeworkPage />
      </Route>

      <Route exact path="/cohorts/new">
        <NewCohortPage />
      </Route>

      <Route exact path="/cohorts/:id">
        <EditCohortPage />
      </Route>
      <Route exact path="/cohorts">
        <CohortsPage />
      </Route>
    </Switch>
  )
}

function AdminProgressReportsRoutes() {
  return (
    <Switch>
      <Route exact path="/progress-reports/:progress_report_id">
        <EditProgressReportPage />
      </Route>

      <Route exact path="/progress-reports/:progress_report_id/:index">
        <EditProgressReportPage />
      </Route>
      <Route exact path="/progress-reports">
        <AdminShowProgressReportsPage />
      </Route>
    </Switch>
  )
}

export function AdminRoutes() {
  return (
    <>
      <PeopleRoutes />
      <CohortAdminRoutes />
      <AdminProgressReportsRoutes />
      <Route exact path="/assignment/:id">
        <StudentAssignmentPage />
      </Route>
      <Route exact path="/attendance">
        <AdminShowAttendancesPage />
      </Route>
      <Route exact path="/lecture_videos/:id">
        <LectureVideoPage />
      </Route>
      <Route exact path="/gradebook">
        <AdminShowGradebooksPage />
      </Route>
      <Route exact path="/gradequeue">
        <AdminShowGradeQueuesPage />
      </Route>
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
      <Route exact path="/attendance">
        <StudentAttendancePage showTitle />
      </Route>
      <Route exact path="/lecture_videos">
        <LectureVideosPageForUser />
      </Route>
      <Route exact path="/cohorts/:id/lecture_videos">
        <LectureVideoPageForCohortId />
      </Route>
      <Route exact path="/lecture_videos/:id">
        <LectureVideoPage />
      </Route>
      <Route exact path="/gradebook">
        <StudentGradebookPage showTitle />
      </Route>
      <Route exact path="/assignment/:id">
        <StudentAssignmentPage />
      </Route>
      <Route exact path="/progress-reports">
        <StudentProgressReportsPage showTitle />
      </Route>
    </Switch>
  )
}

export function CommonRoutes() {
  return (
    <Route exact path="/cohorts/:id/lecture-videos">
      <LectureVideoPageForCohortId />
    </Route>
  )
}

export function ProfileRoutes() {
  return (
    <Route exact path="/profile">
      <EditProfilePage />
    </Route>
  )
}

export function PublicRoutes() {
  const { isLoading } = useProfile()

  return (
    <Switch>
      <Route exact path={['/', '/home']}>
        {isLoading ? <></> : <HomePage isAuthenticated={auth.isAuthenticated} />}
      </Route>

      <Route
        exact
        path="/redeem/:invitation_code"
        render={props => {
          if (auth.isAuthenticated) {
            // The user is already authenticated so don't process the code.
            // This might be a user re-attempting to use the same invite code.
            window.location.pathname = `/`
          } else {
              const form = document.createElement('form');
              form.method = 'POST'
              form.action = `${VITE_PYLON_URL}/auth/github&invitation_code=${props.match.params.invitation_code}`;
              document.body.appendChild(form);
              form.submit();
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
