import React from 'react'
import { StudentProgressReport, Assignment, ProgressReport, Person } from '@/components/models'
import { GenerateStudentProgressReport } from './GenerateStudentProgressReport'
import { Content } from '../models/StudentProgressReport'

export function Editor({
  progressReport,
  onSaveStudentReport,
  index,
  onSkip,
}: {
  progressReport: ProgressReport
  onSaveStudentReport: (success: boolean) => void
  index: number
  onSkip: () => void
}) {
  const person =
    progressReport.people.find(person => Number(person.id) === Number(progressReport.sortedIdsOfPeople()[index])) ||
    new Person()

  const assignmentsForReport = progressReport.homeworks.map(homework => {
    const assignment = person.assignments.find(assignment => assignment.homework.id === homework.id) || new Assignment()
    assignment.homework = homework

    return assignment
  })

  const studentProgressReport =
    progressReport.studentProgressReports.find(report => Number(report.person.id) === Number(person.id)) ||
    new StudentProgressReport({ content: {} })

  function onCreate({ doingWell, improve, attendanceIssues, image }: Content) {
    studentProgressReport.progressReportId = progressReport.key()
    studentProgressReport.personId = person.key()
    studentProgressReport.content = { doingWell, improve, attendanceIssues }
    studentProgressReport.reportImageData = image?.dataURL || ''
    studentProgressReport.save().then(onSaveStudentReport)
  }

  return (
    <GenerateStudentProgressReport
      reportImageUrl={studentProgressReport.reportImageUrl}
      content={studentProgressReport.content}
      fromDate={progressReport.startDate}
      toDate={progressReport.endDate}
      person={person}
      assignments={assignmentsForReport}
      onCreate={onCreate}
      onSkip={onSkip}
    />
  )
}
