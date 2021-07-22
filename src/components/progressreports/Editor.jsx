import React from 'react'
import { StudentProgressReport, Assignment } from '/src//components/models'
import { GenerateStudentProgressReport } from './GenerateStudentProgressReport'

export function Editor({ progressReport, onSaveStudentReport, index, onSkip }) {
  const person = progressReport.people.find(
    person => parseInt(person.id) === parseInt(progressReport.sortedIdsOfPeople()[index])
  )

  const assignmentsForReport = progressReport.homeworks.map(homework => {
    const assignment = person.assignments.find(assignment => assignment.homework.id === homework.id) || new Assignment()
    assignment.homework = homework

    return assignment
  })

  const studentProgressReport =
    progressReport.studentProgressReports.find(report => parseInt(report.person.id) === parseInt(person.id)) ||
    new StudentProgressReport({ content: {} })

  const onCreate = ({ doingWell, improve, attendanceIssues, image }) => {
    studentProgressReport.progressReportId = progressReport.id
    studentProgressReport.personId = person.id
    studentProgressReport.content = { doingWell, improve, attendanceIssues }
    studentProgressReport.reportImageData = image.dataURL
    studentProgressReport.save().then(onSaveStudentReport)
  }

  return (
    <GenerateStudentProgressReport
      completed={progressReport.completed}
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
